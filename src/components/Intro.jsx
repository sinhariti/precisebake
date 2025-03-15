export default function Intro() {
    return (
      <div className="bg-[#f8f6ef] min-h-screen flex items-center justify-center p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl w-full">
          {/* Text Section */}
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl font-extrabold text-[#38495b] mb-9">
              Spread a little joy.
            </h2>
            <p className="text-lg text-[#38495b] leading-relaxed">
              Lil Mix Bakery mixes taste with intention. We know that food is more
              than sustenance, it's an experience. There's comfort in warm cake,
              joy in sweet drizzles, and happiness in pillow-soft bread. We serve
              oven-fresh pastries meant to make our customers smile.
            </p>
            <p className="text-lg text-gray-700 mt-4">
              We look forward to your visit, and hope that we get to bake you
              happy!
            </p>
          </div>
  
          {/* Image Section */}
          <div className="relative">
            <div className="rounded-[30%] overflow-hidden p-2">
              <img
                src="/13.png"
                alt="Croissant"
                className="w-full h-[500px] object-cover rounded-[30%]"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
  