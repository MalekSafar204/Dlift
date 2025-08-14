// components/Footer.tsx
import React from "react";

export const Footer: React.FC = () => (
  <footer className="bg-gray-900 text-white py-8 px-4">
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="mb-6 md:mb-0">
          <div className="flex items-center">
            <span className="font-bold text-2xl text-orange-500">
              HeavyLift
            </span>
            <span className="font-light text-xl ml-1">Crane Rentals</span>
          </div>
          <p className="mt-2 text-gray-400">
            Lifting your projects to new heights since 1997
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <a
            href="#"
            className="text-gray-400 hover:text-orange-400 transition"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-orange-400 transition"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-orange-400 transition"
          >
            Sitemap
          </a>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
        <p>&copy; 2023 HeavyLift Crane Rentals. All rights reserved.</p>
      </div>
    </div>
  </footer>
);
