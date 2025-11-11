import React, { Suspense } from "react";
// import Hero from './components/Hero'
import QuoteForm from "./components/QuoteForm";
import { getCategories, getCranes } from "@/lib/services";
import {
  CraneCategory,
  CraneCategoryRow
} from "@/constants/types";

const page = async () => {
  const categories = await getCategories();
  const cranes = await getCranes();
  const craneCategories: CraneCategory[] = (
    categories as CraneCategoryRow[]
  ).map((c) => ({
    ...c,
    image: c.image_url ?? "",
    cranes: cranes.filter((crane) => crane.category_id === c.id),
  }));

  return (
    <div className="bg-white min-h-screen pt-20">
      {/* <Hero /> */}
      <Suspense
        fallback={
          <div className="py-24 text-center text-gray-500">Loading form...</div>
        }
      >
        <QuoteForm craneCategories={craneCategories} />
      </Suspense>
    </div>
  );
};

export default page;
