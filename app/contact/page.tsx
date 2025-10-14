import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="bg-white text-[#5F6678] pt-20 px-6 md:px-9">
      {/* Header */}
      <section className="py-10 md:py-14">
        <div className="container mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-[#172A4F]">Contact Us</h1>
          <p className="mt-2 max-w-2xl">We’re here to help with rentals, availability, and project guidance.</p>
        </div>
      </section>

      {/* Info blocks */}
      <section className="pb-14 md:pb-20">
        <div className="container mx-auto grid md:grid-cols-2 gap-6">
          {/* Contact Info */}
          <div className="bg-white border border-[#E2E1E1] rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-[#172A4F]">Contact Information</h2>
            <div className="mt-4 space-y-3 text-sm md:text-base">
              <p>
                <span className="font-medium text-[#172A4F]">Phone:</span>{" "}
                <a href="tel:+97100000000" className="hover:text-[#D7953F]">+971 00 000 000</a>
              </p>
              <p>
                <span className="font-medium text-[#172A4F]">Email:</span>{" "}
                <a href="mailto:info@dlift.ae" className="hover:text-[#D7953F]">info@dlift.ae</a>
              </p>
              <p>
                <span className="font-medium text-[#172A4F]">Address:</span>{" "}
                Dubai, United Arab Emirates
              </p>
              <p>
                <Link href="/quote" className="inline-flex items-center mt-2 px-4 py-2 rounded-md bg-[#D7953F] text-white hover:opacity-90 transition text-sm">
                  Get a Quote
                </Link>
              </p>
            </div>
          </div>

          {/* Business Hours */}
          <div className="bg-white border border-[#E2E1E1] rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-[#172A4F]">Business Hours</h2>
            <div className="mt-4 text-sm md:text-base">
              <ul className="space-y-2">
                <li className="flex justify-between border-b border-[#E2E1E1]/70 pb-2">
                  <span>Monday</span>
                  <span>08:00 – 18:00</span>
                </li>
                <li className="flex justify-between border-b border-[#E2E1E1]/70 pb-2">
                  <span>Tuesday</span>
                  <span>08:00 – 18:00</span>
                </li>
                <li className="flex justify-between border-b border-[#E2E1E1]/70 pb-2">
                  <span>Wednesday</span>
                  <span>08:00 – 18:00</span>
                </li>
                <li className="flex justify-between border-b border-[#E2E1E1]/70 pb-2">
                  <span>Thursday</span>
                  <span>08:00 – 18:00</span>
                </li>
                <li className="flex justify-between border-b border-[#E2E1E1]/70 pb-2">
                  <span>Friday</span>
                  <span>08:00 – 18:00</span>
                </li>
                <li className="flex justify-between">
                  <span>Saturday – Sunday</span>
                  <span>Closed</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
