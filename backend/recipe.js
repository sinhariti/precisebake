import { GoogleGenAI } from "@google/genai";
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import dotenv from 'dotenv';
dotenv.config();
const apiKey = process.env.VITE_GOOGLE_GEMINI_API_KEY;
console.log("API: ",apiKey);
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});
const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};
async function generateRecipe(prompt) {

  const apiKey = process.env.GOOGLE_GEMINI_API_KEY; 
  const ai = new GoogleGenAI({ apiKey });
  const FINAL_PROMPT = `${prompt}. The recipe should include: A brief introduction about the [Dish Name], including its flavor profile, texture, and why it is loved by many. A complete list of all ingredients with precise measurements, categorized into logical sections (e.g., 'For the Main Dish,' 'For the Sauce,' or 'For the Topping'). Clear, step-by-step instructions for preparation, cooking/baking, and serving the dish. Ensure the steps are concise and beginner-friendly. Expert tips for achieving the best results, such as keeping the dish moist, getting the right consistency, or enhancing flavors. Approximate preparation and cooking/baking times, along with the recommended temperature or equipment (if applicable). A clear, reader-friendly format with headings, bullet points, and numbered steps for readability. Include allergy alerts for common allergens like gluten, nuts, eggs, or dairy. Provide optional variations or substitutions to accommodate dietary preferences or creative spins on the recipe. Return the recipe in HTML <body> format with the Dish heading in <b> for easy integration into a webpage.`;
  const chatSession = model.startChat(generationConfig);
    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result.response.text());
    return result.response.text();
  }
export { generateRecipe };
