export default function Hero() {
  return (
    <section
      className="relative h-[70vh] md:h-screen flex items-center justify-center text-center px-4 bg-cover bg-center"
  style={{ backgroundImage: "url('/hero/heroQuote.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative max-w-3xl text-white p-8 rounded-lg">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Request a Quote</h1>
        <p className="text-xl md:text-2xl mb-8">
          Select a crane category & model then tell us about your project. Our team will respond promptly.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="#quote-form"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full transition transform hover:scale-105"
          >
            Start Quote
          </a>
          <a
            href="/#contact"
            className="border-2 border-white hover:bg-white hover:text-gray-900 text-white font-bold py-3 px-6 rounded-full transition transform hover:scale-105"
          >
            General Contact
          </a>
        </div>
      </div>
    </section>
  );
}

