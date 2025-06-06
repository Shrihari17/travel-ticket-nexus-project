
const HeroSection = () => {
  return (
    <div className="relative h-[500px] bg-gradient-to-r from-blue-800 to-blue-600 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute h-96 w-96 rounded-full bg-white top-[-100px] left-[-50px]"></div>
        <div className="absolute h-64 w-64 rounded-full bg-white bottom-[-20px] right-[140px]"></div>
        <div className="absolute h-40 w-40 rounded-full bg-white top-[80px] right-[240px]"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 h-full flex items-center relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Travel with Comfort & Convenience
          </h1>
          <p className="text-xl text-blue-100 mb-8">
            Book your bus tickets online and enjoy hassle-free travel to your destination. 
            Get the best prices and special offers on all routes.
          </p>
          <div className="space-y-2">
            <div className="flex items-center text-blue-100">
              <span className="bg-blue-500 p-1 rounded-full mr-2 w-8 h-8 flex items-center justify-center text-white font-medium">✓</span>
              <span>Instant booking confirmation</span>
            </div>
            <div className="flex items-center text-blue-100">
              <span className="bg-blue-500 p-1 rounded-full mr-2 w-8 h-8 flex items-center justify-center text-white font-medium">✓</span>
              <span>Free cancellation on selected routes</span>
            </div>
            <div className="flex items-center text-blue-100">
              <span className="bg-blue-500 p-1 rounded-full mr-2 w-8 h-8 flex items-center justify-center text-white font-medium">✓</span>
              <span>24/7 customer support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
