import { Crane } from "@/constants/types";

interface CraneModelsProps {
  cranes: Crane[];
}

export default function CraneModels({ cranes }: CraneModelsProps) {
  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Available Models
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse our comprehensive selection of crane models, each designed
            for specific applications and requirements.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cranes.map((crane, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Crane Image */}
              <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
                <img
                  src={`/craneModels/${crane.name
                    .toLowerCase()
                    .replace(/\s+/g, "-")}.jpg`}
                  alt={crane.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to placeholder if image doesn't exist
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    target.nextElementSibling?.classList.remove("hidden");
                  }}
                />
                {/* Fallback Placeholder */}
                <div className="h-full flex items-center justify-center hidden">
                  <div className="text-center text-gray-500">
                    <svg
                      className="w-16 h-16 mx-auto mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                    <p className="text-sm">Crane Model</p>
                  </div>
                </div>
              </div>

              {/* Crane Details */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {crane.name}
                </h3>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-medium">Capacity:</span>
                    <span className="text-gray-900 font-semibold">
                      {crane.capacity}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600 font-medium">
                      Manufacturer:
                    </span>
                    <span className="text-gray-900 font-semibold">
                      {crane.manufacturer}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600 font-medium">Year:</span>
                    <span className="text-gray-900 font-semibold">
                      {crane.year}
                    </span>
                  </div>
                </div>

                {/* Get a Quote Button */}
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 transform">
                  Get a Quote
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
