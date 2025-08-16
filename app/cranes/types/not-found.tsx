import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          Crane Category Not Found
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          The crane category you're looking for doesn't exist. Please check the
          URL or browse our available categories.
        </p>
        <div className="space-x-4">
          <Link
            href="/cranes"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full transition-colors duration-300"
          >
            View All Categories
          </Link>
          <Link
            href="/"
            className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-bold py-3 px-6 rounded-full transition-colors duration-300"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
