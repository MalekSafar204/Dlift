"use client";
import { useEffect, useState } from "react";
import DesktopCraneCard from "./DesktopCraneCard";
import MobileCraneCard from "./MobileCraneCard";
import { LoadingOverlay } from "@/components";
import { getCategories, getCranesCountByCategory } from "@/lib/services";
import { CraneCategoryRow, UiCategory } from "@/constants/types";

export default function CraneCategories() {
  const [categories, setCategories] = useState<UiCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const rows = (await getCategories()) as CraneCategoryRow[];
        // Fetch counts in parallel
        const counts = await Promise.all(
          rows.map((r) => getCranesCountByCategory(r.id))
        );
        if (!mounted) return;
        const ui: UiCategory[] = rows.map((r, i) => ({
          id: r.id,
          title: r.title,
          href: r.href,
          description: r.description,
          image: r.image_url ?? "/cranes/support.jpg",
          cranesCount: counts[i] ?? 0,
        }));
        setCategories(ui);
      } catch (e: any) {
        setError(e?.message ?? "Failed to load categories");
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <LoadingOverlay alt="Loading categories" />;
  if (error)
    return (
      <div id="categories" className="py-10 text-center text-red-500">
        {error}
      </div>
    );

  return (
    <div id="categories" className="space-y-0">
      {categories.map((category, index) => (
        <div key={category.id}>
          <DesktopCraneCard category={category} index={index} />
          <MobileCraneCard category={category} />
        </div>
      ))}
    </div>
  );
}
