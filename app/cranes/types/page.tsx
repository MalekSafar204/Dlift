"use client";

import { useSearchParams } from "next/navigation";
import { craneCategories } from "@/constants/data";
import { notFound } from "next/navigation";
import { Hero, CategoryInfo, CraneModels } from "./components";
import { CallToAction } from "@/components";

export default function TypesPage() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category");

  // Find the category based on the query parameter
  const category = craneCategories.find((cat) => cat.href === categoryId);

  if (!category) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <Hero category={category} />
      <CategoryInfo category={category} />
      <CraneModels cranes={category.cranes} />
      <CallToAction />
    </div>
  );
}
