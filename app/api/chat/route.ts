import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { message, userId } = await req.json();
   
    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }
   
    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }
   
    // Get the user's chat history for context
    const userHistory = await prisma.chatHistory.findMany({
      where: {
        userId: userId
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 100 // Limit to recent entries for context
    });
   
    // Build context from history
    let historyContext = "";
    if (userHistory.length > 0) {
      historyContext = "Here's some context from previous analyses:\n";
      userHistory.forEach((entry) => {
        historyContext += `${entry.aiResponse}\n---\n`;
      });
    }
   
    // Create the prompt with history context
    const prompt = `You are a helpful nutrition assistant of CalorieSense AI that provides advice based on calorie analysis.
   
    ${historyContext}
   
    User question: ${message}
   
    Please provide a helpful, concise response about nutrition, calories, or diet advice based on the context and question. If there's no relevant context, provide general nutrition guidance.`;
   
    // Generate AI response using direct HTTP request to Gemini 2.5 Flash
    const geminiResponse = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent', {
      method: 'POST',
      headers: {
        'x-goog-api-key': process.env.GEMINI_API_KEY as string,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ]
      })
    });

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      console.error(`Gemini API error: ${geminiResponse.status} - ${errorText}`);
      throw new Error(`Gemini API request failed: ${geminiResponse.status}`);
    }

    const geminiData = await geminiResponse.json();
    
    // Extract the generated text from the response
    const result = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text || 
                   "I couldn't generate a response. Please try again.";
   
    // Save chat to history
    const chatEntry = await prisma.chatHistory.create({
      data: {
        userId: userId,
        userMessage: message,       // Changed from userMessage to message
        aiResponse: result
      }
    });
   
    return NextResponse.json({ response: result, chatId: chatEntry.id }, { status: 200 });
  } catch (error) {
    console.error("Error processing chat:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}