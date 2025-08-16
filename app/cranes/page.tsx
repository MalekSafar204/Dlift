"use client";

import { Hero, CraneCategories } from "./components";
import { CallToAction } from "@/components";

export default function CranesPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <Hero />
      <CraneCategories />
      <CallToAction />
    </div>
  );
}
