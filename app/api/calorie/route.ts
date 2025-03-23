import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Convert file buffer to base64 for AI processing
function fileToGenerativePart(buffer: Buffer, mimeType: string) {
  return {
    inlineData: {
      data: buffer.toString("base64"),
      mimeType,
    },
  };
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("billImage") as File | null;
    const userId = formData.get("userId") as string | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    if (!userId || userId.trim() === "") {
      return NextResponse.json({ error: "User ID required" }, { status: 400 });
    }

    // Convert file into buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `You are CalorieSense AI, an expert nutritionist with encyclopedic knowledge of global cuisine, restaurant dishes, and their nutritional content. 

    Your task is to analyze the extracted text from a restaurant bill and provide a detailed caloric breakdown.
    
    INSTRUCTIONS:
    1. Carefully analyze each food/beverage item on the bill
    2. For each item, provide:
       - Estimated calories (based on standard restaurant portions)
       - Brief nutritional insight (optional for main items)
    3. Format your response in this precise line  by line structure:

    like the following format
    [ITEM ANALYSIS]
🍽️ [Item Name] × [Quantity] = [Total Calories]
   • [Brief nutrition note highlighting protein/fat/carb content]
   • [Potential dietary flags: high sodium, added sugars, etc.]

[MEAL SUMMARY]
📊 Total Calories: [XXX]
⚖️ Macronutrient Ratio: [Protein/Fat/Carb percentages]
💡 Nutrition Insight: [Personalized tip based on meal composition]
🔄 Healthier Alternatives: [1-2 specific substitution suggestions]

    
    4. More Include
       - Total meal calories
       - A single key nutrition insight about the overall meal
    
    ANALYSIS GUIDELINES:
    - Use standard restaurant portion sizes when specific measurements aren't available
    - For combo meals, break down individual components when possible
    - Consider cooking methods mentioned (fried, grilled, etc.)
    - Account for sides, toppings, and condiments mentioned
    - For ambiguous items, note your assumptions clearly
    - For beverages, differentiate between regular and diet/zero options
    
    If the bill contains abbreviated menu items, use your food knowledge to make reasonable estimations, noting your assumptions.`;

    // Convert file buffer to base64 format
    const imageParts = [fileToGenerativePart(buffer, file.type)];

    // Generate response
    const generatedContent = await model.generateContent([prompt, ...imageParts]);

    const result = generatedContent.response?.candidates?.[0]?.content?.parts?.[0]?.text || "No response received";
    const aiResponse = result;

    const history = await prisma.chatHistory.create({
      data: { userId, aiResponse }
    }).catch(err => {
      console.error("Prisma error:", err);
    });
    

    return NextResponse.json({history,calories: result }, { status: 200 });
  } catch (error) {
    console.error("Error processing bill:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
