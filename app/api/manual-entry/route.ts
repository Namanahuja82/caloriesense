import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// Use PrismaClient as a singleton to prevent connection issues
let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  // @ts-ignore - global is not typed correctly
  if (!global.prisma) {
    // @ts-ignore
    global.prisma = new PrismaClient();
  }
  // @ts-ignore
  prisma = global.prisma;
}

export async function POST(req: Request) {
  try {
    const { foodItems, userId } = await req.json();
    
    // Validate input
    if (!foodItems || !Array.isArray(foodItems) || foodItems.length === 0) {
      return NextResponse.json({ error: "Food items are required" }, { status: 400 });
    }
    
    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }
    
    // Format the food items for the prompt
    const formattedItems = foodItems
      .filter(item => item.name.trim() !== '') // Only include items with names
      .map(item => `- ${item.name}${item.quantity ? ` (${item.quantity})` : ''}`)
      .join('\n');
    
    // Check if we have at least one valid item after filtering
    if (!formattedItems) {
      return NextResponse.json({ error: "At least one valid food item is required" }, { status: 400 });
    }
    
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
[ITEM ANALYSIS]
🍽️ [Item Name] × [Quantity] = [Total Calories]
   • [Brief nutrition note highlighting protein/fat/carb content]
   • [Potential dietary flags: high sodium, added sugars, etc.]
[MEAL SUMMARY]
📊 Total Calories: [XXX]
⚖️ Macronutrient Ratio: [Protein/Fat/Carb percentages]
💡 Nutrition Insight: [Personalized tip based on meal composition]
🔄 Healthier Alternatives: [1-2 specific substitution suggestions]
4. After this, include:
  - Total meal calories
  - A single key nutrition insight about the overall meal
  - One practical suggestion to improve the nutritional profile
ANALYSIS GUIDELINES:
- Use standard portion sizes when specific measurements aren't provided
- Consider typical preparation methods for common dishes
- For ambiguous items, note your assumptions clearly
- For beverages, differentiate between regular and diet/zero options when mentioned
If the item description is incomplete, make reasonable estimations based on standard serving sizes, noting your assumptions.`;

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
    
    try {
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
    } catch (dbError) {
      console.error("Database error:", dbError);
      // Return the result even if saving to history failed
      return NextResponse.json({
        calories: result,
        warning: "Analysis generated but couldn't be saved to history"
      }, { status: 200 });
    }
  } catch (error) {
    console.error("Error processing manual entry:", error);
    return NextResponse.json({ 
      error: "Internal server error processing your food items. Please try again." 
    }, { status: 500 });
  }
}
