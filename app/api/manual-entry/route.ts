import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { GoogleGenerativeAI } from "@google/generative-ai";

const prisma = new PrismaClient();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export async function POST(req: Request) {
  try {
    const { foodItems, userId } = await req.json();

    if (!foodItems || !Array.isArray(foodItems) || foodItems.length === 0) {
      return NextResponse.json({ error: "Food items are required" }, { status: 400 });
    }

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    // Format the food items for the prompt
    const formattedItems = foodItems.map(item => 
      `- ${item.name}${item.quantity ? ` (${item.quantity})` : ''}`
    ).join('\n');

    // Build the prompt
      const prompt = `You are CalorieSense AI, an expert nutritionist with encyclopedic knowledge of global cuisine and their nutritional content.

  TASK: Analyze the following manually entered food items and provide a detailed caloric breakdown.

  FOOD ITEMS:
  ${formattedItems}

  INSTRUCTIONS:
  1. Analyze each food/beverage item provided
  2. For each item, provide:
    - Estimated calories (based on standard portions)
    - Brief nutritional insight
  3. Format your response in this precise structure:

 ITEM ANALYSIS]
🍽️ [Item Name] × [Quantity] = [Total Calories]
   • [Brief nutrition note highlighting protein/fat/carb content]
   • [Potential dietary flags: high sodium, added sugars, etc.]

[MEAL SUMMARY]
📊 Total Calories: [XXX]
⚖️ Macronutrient Ratio: [Protein/Fat/Carb percentages]
💡 Nutrition Insight: [Personalized tip based on meal composition]
🔄 Healthier Alternatives: [1-2 specific substitution suggestions]

  4. After this , include:
    - Total meal calories
    - A single key nutrition insight about the overall meal
    - One practical suggestion to improve the nutritional profile

  ANALYSIS GUIDELINES:
  - Use standard portion sizes when specific measurements aren't provided
  - Consider typical preparation methods for common dishes
  - For ambiguous items, note your assumptions clearly
  - For beverages, differentiate between regular and diet/zero options when mentioned

  If the item description is incomplete, make reasonable estimations based on standard serving sizes, noting your assumptions.`;

    // Generate AI response
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const generatedContent = await model.generateContent(prompt);
    const result = generatedContent.response?.text() || "I couldn't generate a response. Please try again.";

    // Save to history
    const history = await prisma.chatHistory.create({
      data: { 
        userId: userId, 
        userMessage: `Manual entry: ${formattedItems}`,
        aiResponse: result 
      }
    });

    return NextResponse.json({ 
      calories: result,
      historyId: history.id
    }, { status: 200 });
  } catch (error) {
    console.error("Error processing manual entry:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}