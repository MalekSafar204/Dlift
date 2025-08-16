import { CraneCategory } from "@/constants/types";

interface CategoryInfoProps {
  category: CraneCategory;
}

export default function CategoryInfo({ category }: CategoryInfoProps) {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Category Image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Category Details */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              About {category.title}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {category.description}
            </p>

            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Fleet Overview
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-2xl font-bold text-orange-500">
                    {category.cranes.length}
                  </span>
                  <p className="text-gray-600">Available Models</p>
                </div>
                <div>
                  <span className="text-2xl font-bold text-orange-500">
                    {category.cranes.length > 0
                      ? Math.max(
                          ...category.cranes.map(
                            (crane) =>
                              parseInt(crane.capacity.replace(/\D/g, "")) || 0
                          )
                        ) + "+"
                      : "N/A"}
                  </span>
                  <p className="text-gray-600">Max Capacity (tons)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
