import {GoogleGenerativeAI} from "@google/generative-ai";
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

  export const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {text: "Write a detailed, easy-to-follow baking recipe for making a classic marble cake. The recipe should include:\\nA brief introduction about the marble cake, including its texture and flavor profile.\\nA list of all ingredients with precise measurements, categorized into sections (e.g., 'For the Vanilla Batter,' 'For the Chocolate Batter').\\nStep-by-step instructions for preparation, baking, and serving.\\nTips for ensuring the perfect marbling effect and achieving a moist cake.\\nApproximate prep and baking times, as well as the recommended oven temperature.\\nFormat the recipe clearly with headings and bullet points for easy readability. Include an optional note at the end for potential variations or serving suggestions. Also add potential allergy alerts\nmake it short and easy to follow"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "## Classic Marble Cake\n\nMarble cake is a delightful dessert known for its moist crumb and beautiful swirled appearance.  The combination of vanilla and chocolate batters creates a visually stunning and deliciously varied cake.  Expect a tender texture and a balanced sweet flavor.\n\n**Prep time:** 20 minutes\n**Bake time:** 30-35 minutes\n**Oven temperature:** 350°F (175°C)\n\n**Allergy Alert:** This recipe contains eggs, dairy, and wheat.  Adapt as needed for allergies.\n\n\n**Ingredients:**\n\n**For the Vanilla Batter:**\n\n* 1 cup (2 sticks) unsalted butter, softened\n* 1 ¾ cups granulated sugar\n* 4 large eggs\n* 2 teaspoons vanilla extract\n* 2 ½ cups all-purpose flour\n* 2 teaspoons baking powder\n* ½ teaspoon baking soda\n* 1 cup buttermilk\n\n**For the Chocolate Batter:**\n\n* All ingredients from the Vanilla Batter\n* ½ cup unsweetened cocoa powder\n\n\n**Instructions:**\n\n1. **Prepare the batters:** Cream together butter and sugar until light and fluffy. Beat in eggs one at a time, then stir in vanilla extract.\n2. **Dry ingredients:** In a separate bowl, whisk together flour, baking powder, and baking soda.\n3. **Combine:** Gradually add the dry ingredients to the wet ingredients, alternating with the buttermilk, beginning and ending with the dry ingredients. Mix until just combined. Don't overmix.\n4. **Chocolate Batter:** Divide the batter in half. Add cocoa powder to one half and mix until evenly combined.\n5. **Layer the batters:** Spoon alternating dollops of vanilla and chocolate batter into a greased and floured 9x13 inch baking pan. \n6. **Marble Effect:**  Use a knife or toothpick to swirl the batters together gently, creating a marble effect. Don't over-swirl.\n7. **Bake:** Bake for 30-35 minutes, or until a wooden skewer inserted into the center comes out clean.\n8. **Cool:** Let the cake cool in the pan for 10 minutes before inverting it onto a wire rack to cool completely.\n\n\n**Tips for Success:**\n\n* **Room temperature ingredients:** Ensure butter and eggs are at room temperature for optimal creaming.\n* **Gentle swirling:** Avoid over-mixing the batters for a clear marble effect.\n* **Don't overbake:** Overbaking will result in a dry cake. Check for doneness at 30 minutes.\n* **Moist cake:** Use fresh baking powder and soda.  Don't overmix the batter.\n\n\n**Serving Suggestions (Optional):**\n\nDust with powdered sugar, glaze with chocolate ganache, or serve with whipped cream and fresh berries. You can also use different extracts (almond, lemon) to change the flavour.  \n\nEnjoy your delicious marble cake!\n"},
        ],
      },
    ],
  });
