import Link from "next/link";
import { UiCategory } from "@/constants/types";

interface MobileCraneCardProps {
  category: UiCategory;
}

export default function MobileCraneCard({ category }: MobileCraneCardProps) {
  return (
    <div className="lg:hidden">
      <Link href={`/cranes/types?category=${category.href}`}>
        <div
          className="h-56 bg-cover bg-center"
          style={{ backgroundImage: `url(${category.image})` }}
        />
      </Link>
      <div className="bg-gray-900 text-white p-6">
        <Link href={`/cranes/types?category=${category.href}`}>
          <h2 className="text-2xl font-bold mb-2">{category.title}</h2>
        </Link>
        <p className="text-gray-300 mb-4">{category.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-orange-400 font-semibold">
            {category.cranesCount} models available
          </span>
          <Link
            href={`/cranes/types?category=${category.href}`}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full"
          >
            View Models
          </Link>
        </div>
      </div>
    </div>
  );
}
