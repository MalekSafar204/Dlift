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
              <div className="h-60 bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
                <img
                  src={crane.image}
                  alt={crane.name}
                  className="w-full h-full object-cover"
                />
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
