import { UiCrane } from "@/constants/types";
import Image from "next/image";
import Link from "next/link";

interface CraneModelsProps {
  cranes: UiCrane[];
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

        <div className="space-y-6">
          {cranes.map((crane, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-200"
            >
              {/* Crane Image */}
              <div className="md:w-1/3 relative w-full h-96 bg-gradient-to-br from-gray-200 to-gray-300 flex-shrink-0">
                <Image
                  src={crane.image}
                  fill
                  priority
                  sizes="100vw"
                  alt={crane.name}
                  className="object-cover rounded-l-xl md:rounded-none"
                />
              </div>

              {/* Crane Details */}
              <div className="flex-1 p-6 flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {crane.name}
                </h3>
                <div className="divide-y divide-gray-100 border-t border-b border-gray-100 mb-3">
                  <div className="flex items-center justify-between py-2 text-sm">
                    <span className="text-gray-600 font-medium">Capacity:</span>
                    <span className="text-gray-900 font-semibold">
                      {crane.capacity}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2 text-sm">
                    <span className="text-gray-600 font-medium">
                      Manufacturer:
                    </span>
                    <span className="font-semibold text-gray-900">
                      {crane.manufacturer}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2 text-sm">
                    <span className="text-gray-600 font-medium">Year:</span>
                    <span className="font-semibold text-gray-900">
                      {crane.year}
                    </span>
                  </div>
                </div>
                <div className="mb-3 text-gray-700 text-sm">
                  <span className="font-semibold">Description: </span>
                  {crane.description}
                </div>
                <Link href={`/quote?model=${crane.id}`} className="self-start mt-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-md shadow-sm transition-colors duration-200">
                  Get a Quote
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
