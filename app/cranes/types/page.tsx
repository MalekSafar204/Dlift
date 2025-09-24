"use client";
import { useEffect, useState } from "react";
import { useSearchParams, notFound } from "next/navigation";
import { Hero, CategoryInfo, CraneModels } from "./components";
import { CallToAction, LoadingOverlay } from "@/components";
import { getCategories, getCranesByCategory } from "@/lib/services";
import { CraneCategoryRow, UiCategory, UiCrane } from "@/constants/types";

export default function TypesPage() {
  const searchParams = useSearchParams();
  const categoryHref = searchParams.get("category");
  const [category, setCategory] = useState<UiCategory | null>(null);
  const [cranes, setCranes] = useState<UiCrane[]>([]);
  const [maxCapacity, setMaxCapacity] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const rows = (await getCategories()) as CraneCategoryRow[];
        const row = rows.find((r) => r.href === categoryHref);
        if (!row) {
          notFound();
          return;
        }
        const uiCategory: UiCategory = {
          id: row.id,
          title: row.title,
          href: row.href,
          description: row.description,
          image: row.image_url ?? "/cranes/support.jpg",
        };
        const craneRows = await getCranesByCategory(row.id);
        const uiCranes: UiCrane[] = (craneRows as any[]).map((c) => ({
          id: c.id,
          name: c.name,
          capacity: c.capacity_text ?? `${c.capacity_ton ?? ""} ton`,
          year: c.year_text ?? "",
          manufacturer: c.manufacturer ?? "",
          image: c.image_url ?? "/cranes/support.jpg",
          description: c.description ?? "",
        }));
        if (!mounted) return;
        setCategory(uiCategory);
        setCranes(uiCranes);
        const maxCap = uiCranes.reduce((max, c) => {
          const cap = parseFloat(c.capacity);
          return isNaN(cap) ? max : Math.max(max, cap);
        }, 0);
        setMaxCapacity(isFinite(maxCap) ? maxCap : null);
      } catch (e: any) {
        if (!mounted) return;
        setError(e?.message ?? "Failed to load category");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [categoryHref]);

  if (!categoryHref)
    return (
      <div className="pt-20 text-center text-red-500">
        Missing category parameter
      </div>
    );
  if (loading) return <LoadingOverlay alt="Loading category" />;
  if (error)
    return <div className="pt-20 text-center text-red-500">{error}</div>;
  if (!category) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <Hero category={category as any} />
      <CategoryInfo
        category={category as any}
        count={cranes.length}
        maxCap={maxCapacity}
      />
      <CraneModels cranes={cranes as any} />
      <CallToAction />
    </div>
  );
}
