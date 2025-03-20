import { ChatSession } from "@google/generative-ai";
import { toast } from "sonner"

function Generate() {

  const AI_PROMPT = "{Prompt}. The recipe should include: A brief introduction about the [Dish Name], including its flavor profile, texture, and why it is loved by many.A complete list of all ingredients with precise measurements, categorized into logical sections (e.g., 'For the Main Dish,' 'For the Sauce,' or 'For the Topping'). Clear, step-by-step instructions for preparation, cooking/baking, and serving the dish. Ensure the steps are concise and beginner-friendly.Expert tips for achieving the best results, such as keeping the dish moist, getting the right consistency, or enhancing flavors. Approximate preparation and cooking/baking times, along with the recommended temperature or equipment (if applicable).A clear, reader-friendly format with headings, bullet points, and numbered steps for readability. Include allergy alerts for common allergens like gluten, nuts, eggs, or dairy. Provide optional variations or substitutions to accommodate dietary preferences or creative spins on the recipe.Return the recipe in HTML <body> format for easy integration into a webpage. Allow placeholders to be replaced for dish-specific ingredients, steps, and tips."
  async function generateRecipe(FINAL_PROMPT) {
    const session = new ChatSession({
      apiKey: import.meta.env.VITE_GENERATIVE_AI_KEY,
    });
    const response = await session.sendMessage(FINAL_PROMPT);
    console.log(response.text);
  }
  const onGenerate = async() => {
    const textarea = document.querySelector('textarea');
    if (!textarea) {
      toast('Textarea not found', { type: 'error' }); // Added toast type
      return;
    }
    if (textarea.value.trim() === "") {
      toast('Please enter some text',{type: 'error'}); // Added toast type
      textarea.focus(); // Guide user back to the textarea
      return;
    }
    const generatedText = textarea.value.trim();
    const FINAL_PROMPT = AI_PROMPT.replace("{Prompt}", generatedText);

    // Simulate success toast
    toast('Recipe generated successfully!', {type: 'success'});
    console.log(FINAL_PROMPT);
    try {
      generateRecipe(FINAL_PROMPT);
    } catch (error) {
      console.error("Error generating recipe:", error);
      toast('Failed to generate recipe. Please try again.', { type: 'error' });
    }
  };

  return (
    <div className="bg-[#f8f6ef] min-h-screen flex items-center justify-center p-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl w-full">
        {/* Image Section */}
        <div className="relative">
          <div className="overflow-hidden rounded-tl-[50%] rounded-tr-[50%]">
            <img
              src="/10.png"
              alt="Croissant"
              className="w-full h-[500px] object-cover"
            />
          </div>
        </div>

        {/* Text & Input Section */}
        <div className="flex flex-col justify-center space-y-6">
          <h2 className="text-4xl font-extrabold text-[#38495b]">
            Generate Recipes!
          </h2>
          <textarea
            placeholder="Type here"
            className="w-full h-36 p-4 rounded-3xl bg-[#CBC5BC] text-white text-lg outline-none"
          />
          <div className="flex justify-end">
            <button
              onClick={onGenerate}
              className="w-32 px-5 py-2.5 bg-black text-white rounded-lg font-semibold shadow-md hover:bg-gray-800 transition-all"
            >
              Generate!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Generate;
