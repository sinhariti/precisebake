import express from 'express';
import cors from 'cors';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

// Get current directory path
const __dirname = dirname(fileURLToPath(import.meta.url));

// Import your service (also need to update this file to use export default or named exports)
import { convert } from './convert.js';

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

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Conversion API running on port ${PORT}`);
});