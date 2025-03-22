import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { GoogleGenerativeAI } from "@google/generative-ai";

const prisma = new PrismaClient();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

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
    
    // Generate AI response
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const generatedContent = await model.generateContent(prompt);
    const result = generatedContent.response?.text() || "I couldn't generate a response. Please try again.";
    
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