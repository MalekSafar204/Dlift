import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center text-center px-4 bg-cover bg-center"
  style={{ backgroundImage: "url('/hero/heroCranes.jpg')" }}
    >
      {/* Full‑section overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content on top (mirrors home page hero) */}
      <div className="relative max-w-4xl text-white p-8 rounded-lg">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Crane Fleet</h1>
        <p className="text-xl md:text-2xl mb-8">
          Comprehensive range of professional-grade cranes and lifting equipment
          to meet all your project requirements
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="#categories"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full transition transform hover:scale-105"
          >
            Browse Categories
          </a>
          <Link
            href="/quote"
            className="border-2 border-white hover:bg-white hover:text-gray-900 text-white font-bold py-3 px-6 rounded-full transition transform hover:scale-105"
          >
            Get a Quote
          </Link>
        </div>
      </div>
    </section>
  );
}
