// components/ContactForm.tsx
import React from "react";

export const ContactForm: React.FC = () => (
  <section id="contact" className="py-16 px-4 bg-white">
    <div className="container mx-auto max-w-6xl">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
        Get in Touch
      </h2>
      <p className="text-center max-w-3xl mx-auto mb-12 text-gray-600">
        Have a project in mind? Contact us for a customized quote.
      </p>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Contact Info */}
        <div className="md:w-1/2 bg-gray-100 p-8 rounded-lg shadow-sm">
          <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
          <div className="space-y-4">
            {[
              {
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                ),
                label: "Phone",
                value: "(555) 123-4567",
              },
              {
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                ),
                label: "Email",
                value: "rentals@heavylift.com",
              },
              {
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                ),
                label: "Address",
                value: "123 Industrial Park Drive\nConstruction City, CC 12345",
              },
            ].map(({ icon, label, value }) => (
              <div key={label} className="flex items-start gap-4">
                <div className="bg-blue-100 p-2 rounded-full">{icon}</div>
                <div>
                  <h4 className="font-semibold">{label}</h4>
                  <p className="text-gray-600 whitespace-pre-line">{value}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-4">Business Hours</h3>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="font-medium">Mon–Fri</span>
                <span>7:00 AM – 6:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Sat</span>
                <span>8:00 AM – 4:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Sun</span>
                <span>Emergency Service Only</span>
              </li>
            </ul>
          </div>
        </div>
        {/* Form */}
        <div className="md:w-1/2">
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block mb-1 font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="company" className="block mb-1 font-medium">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block mb-1 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block mb-1 font-medium">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label htmlFor="crane-type" className="block mb-1 font-medium">
                Crane Type Interested In
              </label>
              <select
                id="crane-type"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select crane type</option>
                <option value="tower">Tower Crane</option>
                <option value="crawler">Crawler Crane</option>
                <option value="truck">Truck Mounted Crane</option>
                <option value="rough">Rough Terrain Crane</option>
                <option value="gantry">Gantry Crane</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="project-details"
                className="block mb-1 font-medium"
              >
                Project Details
              </label>
              <textarea
                id="project-details"
                rows={4}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-md transition transform hover:scale-105"
            >
              Submit Inquiry
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
);
