export default function Converter() {
    return (
      <div className="bg-[#f8f6ef] min-h-screen flex items-center justify-center p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl w-full">
          {/* Images Section */}
          <div className="flex flex-col items-start gap-6">
            <img
              src="/11.png"
              alt="Grilled Chicken"
              className="w-80 h-80 object-cover rounded-lg shadow-lg relative -left-28"
            />
            <img
              src="/12.png"
              alt="Bread Loaf"
              className="w-80 h-80 object-cover rounded-lg shadow-lg ml-56 relative -top-28"
            />
          </div>
  
          {/* Converter Section */}
          <div className="flex flex-col justify-center space-y-6">
            <h2 className="text-4xl font-extrabold text-[#38495b]">CONVERTER :</h2>
            <input
              type="text"
              placeholder="Type here"
              className="w-full p-4 rounded-2xl bg-[#CBC5BC] text-white text-lg outline-none"
            />
            <div className="flex justify-end">
            <button className="w-32 px-5 py-2.5 bg-black text-white rounded-lg font-semibold shadow-md hover:bg-gray-800 transition-all">
              Convert
            </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  