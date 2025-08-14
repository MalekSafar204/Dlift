// components/Services.tsx
import React from "react";

const servicesData = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 text-blue-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
        />
      </svg>
    ),
    title: "Equipment Rental",
    description:
      "Flexible rental periods from daily to long-term contracts with full-service maintenance.",
    bg: "bg-blue-100",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 text-green-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
    title: "Operator Services",
    description:
      "Certified crane operators with extensive experience in diverse working conditions.",
    bg: "bg-green-100",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 text-orange-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    ),
    title: "Technical Support",
    description:
      "24/7 emergency support and regular maintenance checks to ensure smooth operations.",
    bg: "bg-orange-100",
  },
];

export const Services: React.FC = () => (
  <section id="services" className="py-16 px-4 bg-white">
    <div className="container mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
        Our Services
      </h2>
      <p className="text-center max-w-3xl mx-auto mb-12 text-gray-600">
        Comprehensive crane rental solutions tailored to your project needs.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {servicesData.map(({ icon, title, description, bg }) => (
          <div
            key={title}
            className={`service-card p-6 rounded-lg shadow-sm hover:shadow-md transition ${bg}`}
          >
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4">
              {icon}
            </div>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
