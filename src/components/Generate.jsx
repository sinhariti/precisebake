import { useState, useEffect, useRef } from "react";
import Modal from "react-modal";
import {Progress} from "./ui/progress";
import { GoogleGenAI } from "@google/genai";
import { toast } from "sonner";
import ClipLoader from "react-spinners/ClipLoader";

// Ensure accessibility for screen readers
Modal.setAppElement("#root");

function Generate() {
  
  const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;
  const ai = new GoogleGenAI({ apiKey: apiKey });

  const AI_PROMPT = "{Prompt}. The recipe should include: A brief introduction about the [Dish Name], including its flavor profile, texture, and why it is loved by many. A complete list of all ingredients with precise measurements, categorized into logical sections (e.g., 'For the Main Dish,' 'For the Sauce,' or 'For the Topping'). Clear, step-by-step instructions for preparation, cooking/baking, and serving the dish. Ensure the steps are concise and beginner-friendly. Expert tips for achieving the best results, such as keeping the dish moist, getting the right consistency, or enhancing flavors. Approximate preparation and cooking/baking times, along with the recommended temperature or equipment (if applicable). A clear, reader-friendly format with headings, bullet points, and numbered steps for readability. Include allergy alerts for common allergens like gluten, nuts, eggs, or dairy. Provide optional variations or substitutions to accommodate dietary preferences or creative spins on the recipe. Return the recipe in HTML <body> format with the Dish heading in <> for easy integration into a webpage.";

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recipeHTML, setRecipeHTML] = useState("");
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const modalContentRef = useRef(null);

  async function generateRecipe(FINAL_PROMPT) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: FINAL_PROMPT,
      });
      if (response.text) {
        let cleanedHTML = response.text.replace(/```html|```/g, "").trim();
  
        setRecipeHTML(cleanedHTML);
        setIsOpen(true);
        toast("Recipe generated successfully!", { type: "success" });
      } else {
        throw new Error("Empty response received.");
      }
    } catch (error) {
      console.error("Error generating recipe:", error);
      toast("Failed to generate recipe. Please try again.", { type: "error" });
    } finally {
      setLoading(false);
    }
  }

  const onGenerate = async () => {
    const textarea = document.querySelector("textarea");
    if (!textarea) {
      toast("Textarea not found", { type: "error" });
      return;
    }
    if (textarea.value.trim() === "") {
      toast("Please enter some text", { type: "error" });
      textarea.focus();
      return;
    }

    setLoading(true);
    const generatedText = textarea.value.trim();
    const FINAL_PROMPT = AI_PROMPT.replace("{Prompt}", generatedText);

    generateRecipe(FINAL_PROMPT);
  };

  // Scroll Button Logic
  const handleScroll = () => {
    if (modalContentRef.current) {
      setShowScrollBtn(modalContentRef.current.scrollTop > 200);
    }
  };

  const scrollToTop = () => {
    if (modalContentRef.current) {
      modalContentRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-[#f8f6ef] min-h-screen flex items-center justify-center p-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl w-full">
        <div className="relative">
          <div className="overflow-hidden rounded-tl-[50%] rounded-tr-[50%]">
            <img
              src="/10.png"
              alt="Croissant"
              className="w-full h-[500px] object-cover"
            />
          </div>
        </div>

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

      {/* Loader */}
      {loading && (
        <div className="fixed inset-0 flex justify-center items-center bg-transparent">
          <ClipLoader color="#A89F96" loading={loading} size={100} />
        </div>
      )}

      {/* Modal for Recipe Display */}
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        contentLabel="Generated Recipe"
        className="bg-[#f8f6ef] p-6 rounded-xl shadow-lg max-w-3xl mx-auto mt-20 outline-none relative"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-2xl font-semibold mb-4">Here's Your Recipe!</h2>
        
        <div
          ref={modalContentRef}
          className="max-h-[400px] overflow-y-auto p-4 border rounded-lg bg-gray-50 text-gray-700"
          onScroll={handleScroll}
        >
          <div dangerouslySetInnerHTML={{ __html: recipeHTML }} />
        </div>

        {showScrollBtn && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-10 right-10 bg-[#f8f6ef] text-black p-2 rounded-full shadow-md hover:bg-[#7d695f] transition-all"
          >
            ⬆ Scroll to Top
          </button>
        )}

        <div className="flex justify-end mt-4">
          <button
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-all"
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Generate;
