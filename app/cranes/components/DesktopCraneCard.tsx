import Link from "next/link";
import { CraneCategory } from "@/constants/types";

interface DesktopCraneCardProps {
  category: CraneCategory;
  index: number;
}

export default function DesktopCraneCard({
  category,
  index,
}: DesktopCraneCardProps) {
  const isLeft = index % 2 === 0;

  return (
    <div className="group relative hidden lg:block h-[500px] overflow-hidden">
      {/* Full-bleed image (never shrinks, only zooms) */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-[1200ms] ease-[cubic-bezier(.22,.61,.36,1)] origin-center group-hover:scale-[1.06] group-hover:brightness-110 group-hover:contrast-105"
        style={{ backgroundImage: `url(${category.image})` }}
      />
      {/* Subtle darken/brighten */}
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all duration-500" />

      {/* Title overlay (this is what "recedes") */}
      <div
        className={`absolute inset-0 z-10 text-white ${
          isLeft ? "overlay-left" : "overlay-right"
        }`}
      >
        <div className="h-full bg-gradient-to-br from-gray-900 to-gray-700/95 p-12 flex flex-col justify-center">
          <div className={`max-w-md ${isLeft ? "" : "ml-auto"}`}>
            <h2 className="text-4xl font-bold mb-4 text-white/85">
              {category.title}
            </h2>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              {category.description}
            </p>
            <div className="flex items-center justify-between mb-4">
              <span className="text-orange-400 font-semibold">
                {category.cranes.length} models available
              </span>
              <Link
                href={"/"}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full transition-colors duration-500"
              >
                View Models
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Clickable overlay for only the image area (not the title overlay) */}
      <Link
        href={"/"}
        className="absolute inset-0 z-5 cursor-pointer"
        aria-label={`View ${category.title} details`}
        style={{
          clipPath: isLeft
            ? "polygon(58% 0, 100% 0, 100% 100%, 46% 100%)"
            : "polygon(0 0, 54% 0, 42% 100%, 0% 100%)",
        }}
      />

      {/* Clickable overlay for the uncovered area on hover */}
      <Link
        href={"/"}
        className="absolute inset-0 z-5 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-600"
        aria-label={`View ${category.title} details`}
        style={{
          clipPath: isLeft
            ? "polygon(47% 0, 58% 0, 46% 100%, 35% 100%)"
            : "polygon(54% 0, 65% 0, 53% 100%, 42% 100%)",
        }}
      />

      {/* CSS for triangular clipping */}
      <style jsx>{`
        /* Left-side wedge (title on left) */
        .overlay-left {
          clip-path: polygon(0 0, 58% 0, 46% 100%, 0% 100%);
          transition: clip-path 600ms ease;
        }
        .group:hover .overlay-left {
          clip-path: polygon(0 0, 47% 0, 35% 100%, 0% 100%);
        }

        /* Right-side wedge (title on right) */
        .overlay-right {
          clip-path: polygon(100% 0, 100% 100%, 42% 100%, 54% 0);
          transition: clip-path 600ms ease;
        }
        .group:hover .overlay-right {
          clip-path: polygon(100% 0, 100% 100%, 53% 100%, 65% 0);
        }
      `}</style>
    </div>
  );
}
