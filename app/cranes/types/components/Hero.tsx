import { CraneCategory } from "@/constants/types";

interface HeroProps {
  category: CraneCategory;
}

export default function Hero({ category }: HeroProps) {
  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-700 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          {category.title}
        </h1>
        <p className="text-xl md:text-2xl max-w-4xl mx-auto text-gray-300 leading-relaxed">
          {category.description}
        </p>
      </div>
    </div>
  );
}
