import express from 'express';
import cors from 'cors';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { convert } from './convert.js';
import { generateRecipe } from './recipe.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/convert', async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }
    
    const result = await convert(query);
    res.json({ result });
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ error: 'Conversion failed', message: error.message });
  }
});

app.post('/api/recipe', async (req, res) => {
  try {
    const { FINAL_PROMPT } = req.body;
    if (!FINAL_PROMPT) {
      return res.status(400).json({ error: 'FINAL_PROMPT is required' });
    }

    // Call the AI function and return the actual result
    const recipeHtml = await generateRecipe(FINAL_PROMPT);
    
    if (!recipeHtml) {
      return res.status(500).json({ error: 'Failed to generate recipe' });
    }

    res.json({ recipe: recipeHtml });
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ error: 'Recipe generation failed', message: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Conversion API running on port ${PORT}`);
});
