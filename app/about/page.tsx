import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div>
      <section id="about" className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            About DLift
          </h2>
          <p className="text-center max-w-3xl mx-auto mb-12 text-gray-600">
            Trusted crane rental partner for over 25 years in the industry.
          </p>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <Image
                width={600}
                height={300}
                src="/logos/logoUpright.jpg"
                alt="Construction site with multiple cranes"
                className="rounded-md shadow-lg w-full"
              />
            </div>
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold mb-4">Our Story</h3>
              <p className="mb-4 text-gray-700">
                DLIFT is a UAE-based crane rental company led by an experienced
                management team with decades of operational expertise in the
                heavy lifting sector. This team continues to oversee the
                operations of Adrighem & Aldibiki in Egypt - a prominent crane
                company serving major infrastructure and industrial projects
                since the 1970s.
              </p>
              <p className="mb-4 text-gray-700">
                Drawing on this established track record, DLIFT was created to
                deliver the same high standards of quality, safety, and
                efficiency to the UAE market, offering crane rental solutions
                from 25 tons to 2000 tons.
              </p>
              <Link
                href={"https://aldibiki.com/"}
                className="mb-4 text-blue-600 hover:underline"
              >
                Our Heritage: Visit Adrighem & Aldibiki's Website
              </Link>
              <div className="flex items-center gap-4 mt-6">
                <div className="bg-gray-800 text-white px-4 py-2 rounded-md text-center">
                  <div className="text-2xl font-bold">50+</div>
                  <div>Cranes in Fleet</div>
                </div>
                <div className="bg-gray-800 text-white px-4 py-2 rounded-md text-center">
                  <div className="text-2xl font-bold">25</div>
                  <div>Years Experience</div>
                </div>
                <div className="bg-gray-800 text-white px-4 py-2 rounded-md text-center">
                  <div className="text-2xl font-bold">500+</div>
                  <div>Projects Completed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
