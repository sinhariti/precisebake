export default function Generate() {
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
                <button className="w-32 px-5 py-2.5 bg-black text-white rounded-lg font-semibold shadow-md hover:bg-gray-800 transition-all">
                Generate!
                </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  