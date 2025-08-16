"use client";

import Link from "next/link";
import { useState } from "react";
import { craneCategories } from "@/constants/data";

export default function CranesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Our Crane Fleet
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-300">
            Comprehensive range of professional-grade cranes and lifting
            equipment to meet all your project requirements
          </p>
        </div>
      </div>

      {/* Triangular Layout Categories */}
      <div className="space-y-0">
        {craneCategories.map((category, index) => {
          const isLeft = index % 2 === 0;

          return (
            <div key={category.id}>
              {/* --- Desktop / lg+ : diagonal overlay --- */}
              <div className="group relative hidden lg:block h-[500px] overflow-hidden">
                {/* Full-bleed image (never shrinks, only zooms) */}
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-[1200ms] ease-[cubic-bezier(.22,.61,.36,1)] origin-center group-hover:scale-[1.06] group-hover:brightness-110 group-hover:contrast-105"
                  style={{ backgroundImage: `url(${category.image})` }}
                />
                {/* Subtle darken/brighten */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all duration-500" />

                {/* Title overlay (this is what “recedes”) */}
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

                      {/* {selectedCategory === category.id && (
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mt-4 max-h-32 overflow-y-auto">
                          <div className="space-y-2">
                            {category.cranes.map((crane, i) => (
                              <div
                                key={i}
                                className="flex justify-between items-center text-sm"
                              >
                                <div>
                                  <span className="font-semibold">
                                    {crane.name}
                                  </span>
                                  <span className="text-gray-400 ml-2">
                                    ({crane.manufacturer})
                                  </span>
                                </div>
                                <span className="bg-orange-500 text-white px-2 py-1 rounded text-xs">
                                  {crane.capacity}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )} */}
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
              </div>

              {/* --- Mobile & Tablet / <lg : stack image then title --- */}
              <div className="lg:hidden">
                <Link href={"/"}>
                  <div
                    className="h-56 bg-cover bg-center"
                    style={{ backgroundImage: `url(${category.image})` }}
                  />
                </Link>
                <div className="bg-gray-900 text-white p-6">
                  <Link href={"/"}>
                    <h2 className="text-2xl font-bold mb-2">
                      {category.title}
                    </h2>
                  </Link>
                  <p className="text-gray-300 mb-4">{category.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-orange-400 font-semibold">
                      {category.cranes.length} models available
                    </span>
                    <Link
                      href={"/"}
                      className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full"
                    >
                      View Models
                    </Link>
                  </div>
                  {selectedCategory === category.id && (
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 mt-4">
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {category.cranes.map((crane, i) => (
                          <div
                            key={i}
                            className="flex justify-between items-center text-sm"
                          >
                            <div>
                              <span className="font-semibold">
                                {crane.name}
                              </span>
                              <span className="text-gray-400 ml-2">
                                ({crane.manufacturer})
                              </span>
                            </div>
                            <span className="bg-orange-500 text-white px-2 py-0.5 rounded text-xs">
                              {crane.capacity}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Call to Action */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Contact our team to discuss your project requirements and get a
            customized quote for the perfect crane solution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition transform hover:scale-105"
            >
              Get a Quote
            </a>
            <a
              href="#home"
              className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-bold py-3 px-8 rounded-full transition transform hover:scale-105"
            >
              Back to Home
            </a>
          </div>
        </div>
      </div>

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
