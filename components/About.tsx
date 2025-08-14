// components/About.tsx
import Image from "next/image";
import React from "react";

export const About: React.FC = () => (
  <section id="about" className="py-16 px-4 bg-gray-100">
    <div className="container mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
        About HeavyLift
      </h2>
      <p className="text-center max-w-3xl mx-auto mb-12 text-gray-600">
        Trusted crane rental partner for over 25 years in the industry.
      </p>
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="md:w-1/2">
          <Image
          width={800}
          height={500}
            src="/aboutSite2.jpg"
            alt="Construction site with multiple cranes"
            className="rounded-lg shadow-lg w-full"
          />
        </div>
        <div className="md:w-1/2">
          <h3 className="text-2xl font-bold mb-4">Our Story</h3>
          <p className="mb-4 text-gray-700">
            Founded in 1997, HeavyLift Crane Rentals started with just two
            cranes and a vision to provide reliable lifting solutions. Today we
            operate a fleet of over 50 cranes across the region, but we still
            maintain our family-owned approach to service.
          </p>
          <p className="mb-4 text-gray-700">
            Our team of certified professionals brings decades of combined
            experience to every project, ensuring safety, efficiency, and
            cost-effectiveness.
          </p>
          <div className="flex items-center gap-4 mt-6">
            <div className="bg-gray-800 text-white px-4 py-2 rounded-lg text-center">
              <div className="text-2xl font-bold">50+</div>
              <div>Cranes in Fleet</div>
            </div>
            <div className="bg-gray-800 text-white px-4 py-2 rounded-lg text-center">
              <div className="text-2xl font-bold">25</div>
              <div>Years Experience</div>
            </div>
            <div className="bg-gray-800 text-white px-4 py-2 rounded-lg text-center">
              <div className="text-2xl font-bold">500+</div>
              <div>Projects Completed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
