import Image from "next/image";
import Link from "next/link";
import React from "react";
import CallToAction from "@/components/CallToAction";

export default function AboutPage() {
  return (
    <div className="bg-white text-[#5F6678]">
      {/* Hero */}
      <section
      id="home"
        className="relative overflow-hidden bg-cover bg-center bg-fixed pt-20"
        style={{ backgroundImage: "url('/hero/heroHome.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative container mx-auto px-9 md:px-12 py-16 md:py-24">
          <div className="max-w-3xl text-white">
            <h1 className="text-4xl md:text-5xl font-bold">About Dlift</h1>
            <p className="mt-4 text-lg md:text-xl opacity-95">
              Trusted crane rental partner with decades of heavy lifting expertise—delivering safety, reliability, and performance across the UAE.
            </p>
            <div className="mt-6 flex gap-3">
              <Link href="/quote" className="inline-flex items-center px-5 py-2.5 rounded-md bg-[#D7953F] text-white hover:opacity-90 transition">Get a Quote</Link>
              <Link href="/cranes" className="inline-flex items-center px-5 py-2.5 rounded-md border border-white/60 text-white hover:bg-white/10 transition">View Fleet</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Story + Image */}
      <section id="about" className="py-14 md:py-20 px-9 bg-white">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-[#172A4F] mb-4">
                Our Story
              </h2>
              <p className="mb-4">
                DLIFT is a UAE-based crane rental company led by an experienced
                management team with decades of operational expertise in the
                heavy lifting sector. This team continues to oversee the
                operations of Adrighem & Aldibiki in Egypt—a prominent crane
                company serving major infrastructure and industrial projects
                since the 1970s.
              </p>
              <p className="mb-4">
                Drawing on this established track record, DLIFT was created to
                deliver the same high standards of quality, safety, and
                efficiency to the UAE market, offering crane rental solutions
                from 25 tons to 2000 tons.
              </p>
              <Link
                href="https://aldibiki.com/"
                className="text-[#172A4F] hover:text-[#D7953F] underline underline-offset-4"
              >
                Our Heritage: Visit Adrighem & Aldibiki's Website
              </Link>
              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="bg-[#172A4F] text-white px-4 py-3 rounded-md text-center">
                  <div className="text-2xl font-bold">50+</div>
                  <div className="text-sm opacity-90">Cranes in Fleet</div>
                </div>
                <div className="bg-[#172A4F] text-white px-4 py-3 rounded-md text-center">
                  <div className="text-2xl font-bold">25</div>
                  <div className="text-sm opacity-90">Years Experience</div>
                </div>
                <div className="bg-[#172A4F] text-white px-4 py-3 rounded-md text-center">
                  <div className="text-2xl font-bold">500+</div>
                  <div className="text-sm opacity-90">Projects Completed</div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <Image
                width={560}
                height={336}
                src="/logos/logoUpright.jpg"
                alt="DLift operations and cranes"
                className="rounded-lg shadow-lg w-full border border-[#E2E1E1]"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section
        className="relative py-14 md:py-20 px-9 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(23,42,79,0.85), rgba(23,42,79,0.85)), url('/hero/heroHome.jpg')",
        }}
      >
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-white">
            <h2 className="text-3xl md:text-4xl font-bold">Our Mission</h2>
            <p className="mt-4 text-lg opacity-95">
              To provide safe, reliable, and efficient crane rental solutions tailored to the region’s most demanding projects—powered by a disciplined safety culture, modern fleet, and seasoned operators.
            </p>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-14 md:py-20 px-9 bg-[#EDEDED]">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#172A4F]">Our Vision</h2>
            <p className="mt-4 text-lg">
              To be the UAE’s most trusted heavy lifting partner—recognized for operational excellence, unwavering safety standards, and a relentless focus on client outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="pt-14 md:pt-20 px-9 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#172A4F]">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            <div className="bg-white border border-[#E2E1E1] rounded-lg p-6 shadow-sm">
              <h4 className="text-lg font-semibold text-[#172A4F]">
                Safety First
              </h4>
              <p className="mt-2">
                Industry-leading safety protocols, certified operators, and
                rigorous equipment maintenance schedules.
              </p>
            </div>
            <div className="bg-white border border-[#E2E1E1] rounded-lg p-6 shadow-sm">
              <h4 className="text-lg font-semibold text-[#172A4F]">
                Modern Fleet
              </h4>
              <p className="mt-2">
                A broad range from 25t to 2000t, with reliable brands and
                configurations for diverse project needs.
              </p>
            </div>
            <div className="bg-white border border-[#E2E1E1] rounded-lg p-6 shadow-sm">
              <h4 className="text-lg font-semibold text-[#172A4F]">
                Proven Expertise
              </h4>
              <p className="mt-2">
                Decades of operational experience across infrastructure, oil &
                gas, industrial, and marine sectors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA using shared component */}
      <div className="bg-white pt-5">
        <CallToAction />
      </div>
    </div>
  );
}
