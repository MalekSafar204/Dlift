"use client";

import { useState } from "react";

interface Crane {
  name: string;
  capacity: string;
  year: string;
  manufacturer: string;
}

interface CraneCategory {
  id: string;
  title: string;
  description: string;
  cranes: Crane[];
  image: string;
}

const craneCategories: CraneCategory[] = [
  {
    id: "atc",
    title: "All-Terrain Cranes (ATC)",
    description:
      "Versatile cranes designed for both on-road and off-road operations with exceptional mobility and lifting capacity. Our fleet includes premium Liebherr and Demag models ranging from 65 to 500 tons.",
    image: "/towerCrane.jpg",
    cranes: [
      {
        name: "LTM 1120",
        capacity: "70 ton",
        year: "1991 & other years",
        manufacturer: "Liebherr",
      },
      {
        name: "LTM 1100",
        capacity: "65 ton",
        year: "1994",
        manufacturer: "Liebherr",
      },
      {
        name: "LTM 1300",
        capacity: "300 ton",
        year: "2002",
        manufacturer: "Liebherr",
      },
      {
        name: "LTM 1300/1",
        capacity: "300 ton",
        year: "2001",
        manufacturer: "Liebherr",
      },
      {
        name: "LTM 1500-8.1",
        capacity: "500 ton",
        year: "2002",
        manufacturer: "Liebherr",
      },
      {
        name: "AC 200-1",
        capacity: "250 ton",
        year: "2005",
        manufacturer: "Demag",
      },
      {
        name: "AC 100",
        capacity: "100 ton",
        year: "2007",
        manufacturer: "Demag",
      },
    ],
  },
  {
    id: "tc",
    title: "Truck Cranes (TC)",
    description:
      "Mobile cranes mounted on truck chassis for quick deployment and transportation between job sites. Featuring reliable XCMG and Iveco models for efficient project execution.",
    image: "/truckCrane.jpg",
    cranes: [
      {
        name: "QY25K",
        capacity: "25 ton",
        year: "multiple years",
        manufacturer: "XCMG",
      },
      {
        name: "QY50B",
        capacity: "50 ton",
        year: "multiple years",
        manufacturer: "XCMG",
      },
      {
        name: "QY65K",
        capacity: "65 ton",
        year: "multiple years",
        manufacturer: "XCMG",
      },
      {
        name: "QY70K",
        capacity: "70 ton",
        year: "multiple years",
        manufacturer: "XCMG",
      },
      {
        name: "180 E 28",
        capacity: "Truck-mounted",
        year: "N/A",
        manufacturer: "Iveco",
      },
    ],
  },
  {
    id: "rtc",
    title: "Rough Terrain Cranes (RTC)",
    description:
      "Specialized cranes built for challenging off-road conditions with enhanced stability and mobility. Our Terex models provide reliable performance in the most demanding environments.",
    image: "/crawlerCrane.jpg",
    cranes: [
      {
        name: "RT 555",
        capacity: "30 ton",
        year: "2007",
        manufacturer: "Terex",
      },
      {
        name: "RT 555-1",
        capacity: "55 ton",
        year: "2007",
        manufacturer: "Terex",
      },
    ],
  },
  {
    id: "crawler",
    title: "Crawler Cranes",
    description:
      "Heavy-duty cranes with tracked undercarriages for maximum stability and lifting capacity on challenging terrain. From 50 to 320 tons, our crawler fleet handles the most complex lifting operations.",
    image: "/hero1.jpg",
    cranes: [
      {
        name: "SCC1000",
        capacity: "100 ton",
        year: "2008",
        manufacturer: "Sany",
      },
      {
        name: "SCC500D",
        capacity: "50 ton",
        year: "2007",
        manufacturer: "Sany",
      },
      {
        name: "SCC3200",
        capacity: "320 ton",
        year: "2008",
        manufacturer: "Sany",
      },
      {
        name: "QUY70",
        capacity: "70 ton",
        year: "2007, 2003",
        manufacturer: "Zoomlion",
      },
      {
        name: "SCX2500",
        capacity: "250 ton",
        year: "2005",
        manufacturer: "Hitachi Sumitomo",
      },
      {
        name: "LR 1280",
        capacity: "200 ton",
        year: "1993",
        manufacturer: "Liebherr",
      },
      {
        name: "HS843HD",
        capacity: "100 ton",
        year: "2003",
        manufacturer: "Liebherr",
      },
      {
        name: "6100",
        capacity: "100 ton",
        year: "1999",
        manufacturer: "Sennebogen",
      },
      {
        name: "CH135",
        capacity: "135 ton",
        year: "N/A",
        manufacturer: "Ruston Bucyrus",
      },
      { name: "CCH", capacity: "120 ton", year: "1991", manufacturer: "IHI" },
      {
        name: "LS 248 H",
        capacity: "100 ton",
        year: "1987",
        manufacturer: "Link-Belt",
      },
      { name: "MC136", capacity: "55 ton", year: "1990", manufacturer: "Hyco" },
    ],
  },
  {
    id: "special",
    title: "Mobile Harbour & Special Equipment",
    description:
      "Specialized equipment including mobile harbour cranes and versatile lifting solutions for unique applications. Our Grove models provide exceptional performance in specialized environments.",
    image: "/hero2.jpg",
    cranes: [
      {
        name: "GMK 5130",
        capacity: "130 ton",
        year: "1998",
        manufacturer: "Grove",
      },
      {
        name: "GMK 5100",
        capacity: "100 ton",
        year: "2003",
        manufacturer: "Grove",
      },
      {
        name: "GMK 3050",
        capacity: "50 ton",
        year: "1999, 2000",
        manufacturer: "Grove",
      },
    ],
  },
  {
    id: "equipment",
    title: "Supporting Equipment",
    description:
      "Essential support equipment including trailers, manlifts, and tractors to complete your project requirements. Complete solutions for comprehensive project support.",
    image: "/hero3.jpg",
    cranes: [
      {
        name: "Lowbed Trailers",
        capacity: "Various capacities",
        year: "Multiple years",
        manufacturer: "Scheuerle, Welte",
      },
      {
        name: "DAF 2100",
        capacity: "Manlift",
        year: "N/A",
        manufacturer: "DAF",
      },
      {
        name: "Mercedes",
        capacity: "Tractor",
        year: "N/A",
        manufacturer: "Mercedes",
      },
    ],
  },
];

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
        {craneCategories.map((category, index) => (
          <div
            key={category.id}
            className="relative h-96 md:h-[500px] overflow-hidden"
          >
            {/* Content Triangle (Left or Right based on index) */}
            <div
              className={`absolute inset-0 z-10 ${
                index % 2 === 0 ? "left-0" : "right-0"
              }`}
            >
              <div
                className={`h-full ${
                  index % 2 === 0 ? "clip-path-left" : "clip-path-right"
                }`}
              >
                <div className="h-full bg-gradient-to-br from-gray-900 to-gray-700 text-white p-8 md:p-12 flex flex-col justify-center">
                  <div
                    className={`max-w-md ${
                      index % 2 === 0 ? "ml-0" : "ml-auto"
                    }`}
                  >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                      {category.title}
                    </h2>
                    <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                      {category.description}
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-orange-400 font-semibold">
                        {category.cranes.length} models available
                      </span>
                      <button
                        onClick={() =>
                          setSelectedCategory(
                            selectedCategory === category.id
                              ? null
                              : category.id
                          )
                        }
                        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full transition-colors"
                      >
                        {selectedCategory === category.id
                          ? "Hide Details"
                          : "View Details"}
                      </button>
                    </div>

                    {/* Expanded Details */}
                    {selectedCategory === category.id && (
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mt-4">
                        <div className="space-y-2 max-h-32 overflow-y-auto">
                          {category.cranes.map((crane, craneIndex) => (
                            <div
                              key={craneIndex}
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
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Image Triangle (Right or Left based on index) */}
            <div
              className={`absolute inset-0 ${
                index % 2 === 0 ? "right-0" : "left-0"
              }`}
            >
              <div
                className={`h-full ${
                  index % 2 === 0 ? "clip-path-right" : "clip-path-left"
                }`}
              >
                <div
                  className="h-full bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${category.image})` }}
                >
                  <div className="absolute inset-0 bg-black/30"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
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
        .clip-path-left {
          clip-path: polygon(0 0, 0% 100%, 60% 100%, 40% 0);
        }
        .clip-path-right {
          clip-path: polygon(60% 0, 40% 100%, 100% 100%, 100% 0);
        }

        @media (max-width: 768px) {
          .clip-path-left {
            clip-path: polygon(0 0, 0% 100%, 100% 100%, 100% 0);
          }
          .clip-path-right {
            clip-path: polygon(0 0, 0% 100%, 100% 100%, 100% 0);
          }
        }
      `}</style>
    </div>
  );
}
