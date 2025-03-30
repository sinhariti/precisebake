export default function Converter() {
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
              className="w-full p-4 rounded-2xl bg-[#CBC5BC] text-white text-lg outline-none"
            />
            <div className="flex justify-center md:justify-end">
              <button className="w-32 px-5 py-2.5 bg-black text-white rounded-lg font-semibold shadow-md hover:bg-gray-800 transition-all">
                Convert
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
