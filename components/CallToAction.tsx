import Link from "next/link";

export default function CallToAction() {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Ready to Get Started?
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Contact our team to discuss your specific project requirements and get
          a customized quote for the perfect crane solution.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/quote"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition transform hover:scale-105"
          >
            Get a Quote
          </Link>
          <Link
            href="/cranes"
            className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-bold py-3 px-8 rounded-full transition transform hover:scale-105"
          >
            View All Categories
          </Link>
        </div>
      </div>
    </div>
  );
}
