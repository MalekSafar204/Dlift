export default function Hero() {
  return (
    <section 
      id="home" 
      className="relative h-screen flex items-center justify-center text-center px-4 bg-cover bg-center" 
      style={{ backgroundImage: "url('/hero6.jpg')" }}
    >
      {/* Full‑section overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content on top */}
      <div className="relative max-w-4xl text-white p-8 rounded-lg">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Premium Crane Rental Solutions
        </h1>
        <p className="text-xl md:text-2xl mb-8">
          Heavy duty lifting solutions for industrial, construction and commercial projects
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="#cranes"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full transition transform hover:scale-105"
          >
            Explore Our Fleet
          </a>
          <a
            href="#contact"
            className="border-2 border-white hover:bg-white hover:text-gray-900 text-white font-bold py-3 px-6 rounded-full transition transform hover:scale-105"
          >
            Get a Quote
          </a>
        </div>
      </div>
    </section>
  );
}
