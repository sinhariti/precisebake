import { useState } from "react";

export default function Converter() {
  //state to hold the input value
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const handleConvert = async () => {
    try {
      // console.log("Convert button clicked with query:", query);
      setLoading(true);
      setError(null);



      const response = await fetch('http://localhost:3001/api/convert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Conversion failed');
      }
      let resultText = data.result;
    
      // Clean up the response if it contains backticks
      if (resultText.includes('```')) {
        // Extract content between backticks
        resultText = resultText.replace(/```json\n|\n```/g, '');
      }
      // console.log("Cleaned result:", resultText);
      setResult(JSON.parse(resultText));

    } catch (err) {
      console.error('Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f8f6ef] min-h-screen flex items-center justify-center p-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl w-full">
        {/* Images Section */}
        <div className="flex flex-col items-center md:items-start gap-6 relative">
          <img
            src="/11.png"
            alt="Grilled Chicken"
            className="w-72 h-72 md:w-80 md:h-80 object-cover rounded-lg shadow-lg transform md:-translate-x-12"
          />
          <img
            src="/12.png"
            alt="Bread Loaf"
            className="w-72 h-72 md:w-80 md:h-80 object-cover rounded-lg shadow-lg transform md:translate-x-72 md:-translate-y-12"
          />
        </div>

        {/* Converter Section */}
        <div>
          <div className="flex flex-col justify-center space-y-6 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#38495b]">CONVERTER :</h2>
            <input
              type="text"
              placeholder="Type here"
              onChange={(e) => setQuery(e.target.value)}
              className="w-full p-4 rounded-2xl bg-[#CBC5BC] text-white text-lg outline-none"
            />
            <div className="flex justify-end">
            <button 
              // onClick={() => {
              //   // Handle conversion logic here
              //   console.log("Convert button clicked with query:", Query);
              // }}
              onClick={handleConvert}
              disabled={loading}
              className="w-32 px-5 py-2.5 bg-black text-white rounded-lg font-semibold shadow-md hover:bg-gray-800 transition-all">
              {loading ? 'Converting...' : 'Convert'}
            </button>
            <div className="flex justify-center md:justify-end">
              <button className="w-32 px-5 py-2.5 bg-black text-white rounded-lg font-semibold shadow-md hover:bg-gray-800 transition-all">
                Convert
              </button>
              gemini_recipe_api
            </div>
            {error && (
              <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
              </div>
            )}
            {result && (
        <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
          <p className="font-bold text-xl">{result.weight}</p>
          {result.assumption && (
            <p className="text-gray-600 mt-2">Assumption: {result.assumption}</p>
          )}
          <p className="font-mono mt-2 text-sm">Calculation: {result.calculation}</p>
        </div>
      )}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
  }
