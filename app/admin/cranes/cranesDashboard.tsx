"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { deleteCrane } from "@/lib/services";
import type { CraneRow } from "@/constants/types";
import Image from "next/image";
import EditCraneModal from "./EditCraneModal";
import AddCraneModal from "./AddCraneModal";

export default function CranesDashboard({
  initialCranes,
}: {
  initialCranes: CraneRow[];
}) {
  const [cranes, setCranes] = useState<CraneRow[]>(initialCranes);
  const [selectedCrane, setSelectedCrane] = useState<CraneRow | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [toast, setToast] = useState<{
    type: "success" | "error";
    msg: string;
  } | null>(null);

  useEffect(() => {
    const channel = supabase
      .channel("cranes_changes")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "cranes" },
        (payload) => {
          setCranes((c) => [...c, payload.new as CraneRow]);
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "cranes" },
        (payload) => {
          setCranes((c) =>
            c.map((r) =>
              r.id === (payload.new as any).id ? (payload.new as CraneRow) : r
            )
          );
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "cranes" },
        (payload) => {
          setCranes((c) => c.filter((r) => r.id !== (payload.old as any).id));
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  function flash(type: "success" | "error", msg: string) {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3500);
  }

  async function handleDelete(crane: CraneRow) {
    if (!confirm(`Delete ${crane.name}? This action cannot be undone.`)) return;

    try {
      await deleteCrane(crane.id);
      flash("success", "Crane deleted successfully");
    } catch (error: any) {
      flash("error", error.message || "Failed to delete crane");
    }
  }

  const filtered = cranes.filter((crane) => {
    const nameMatch =
      !searchName ||
      crane.name?.toLowerCase().includes(searchName.toLowerCase());
    const categoryMatch =
      !searchCategory ||
      crane.category_id?.toLowerCase().includes(searchCategory.toLowerCase());
    return nameMatch && categoryMatch;
  });

  // Accessibility: close modals with ESC
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setShowEditModal(false);
        setShowAddModal(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="space-y-6 py-8 px-5 relative">
      {/* Top bar */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-[#172A4F]">
            Cranes Management
          </h2>
          <p className="text-sm text-[#5F6678]">
            View, edit, add, or remove cranes from your fleet.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-[#D7953F] text-white rounded-lg hover:opacity-90 transition font-medium"
        >
          + Add New Crane
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3 md:items-center">
        <div className="flex gap-2">
          <input
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="Search by name..."
            className="border border-[#E2E1E1] rounded-lg px-3 py-2 text-sm w-full md:w-56 bg-white placeholder:text-[#9FA4AF] focus:outline-none focus:ring-2 focus:ring-[#D7953F]/50"
          />
          <input
            value={searchCategory}
            onChange={(e) => setSearchCategory(e.target.value)}
            placeholder="Search by category..."
            className="border border-[#E2E1E1] rounded-lg px-3 py-2 text-sm w-full md:w-56 bg-white placeholder:text-[#9FA4AF] focus:outline-none focus:ring-2 focus:ring-[#D7953F]/50"
          />
        </div>
        <div className="md:ml-auto text-sm text-[#5F6678]">
          Total:{" "}
          <span className="font-semibold text-[#172A4F]">
            {filtered.length}
          </span>{" "}
          cranes
        </div>
      </div>

      {/* Cranes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((crane) => (
          <div
            key={crane.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-[#E2E1E1]"
          >
            {/* Crane Image */}
            <div className="relative h-48 bg-gradient-to-br from-gray-200 to-gray-300">
              {crane.image_url ? (
                <Image
                  src={crane.image_url}
                  alt={crane.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  No Image
                </div>
              )}
            </div>

            {/* Crane Details */}
            <div className="p-4 space-y-2">
              <h3 className="text-lg font-bold text-[#172A4F] truncate">
                {crane.name}
              </h3>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span className="text-[#9FA4AF]">Category:</span>
                  <span className="font-medium text-[#172A4F]">
                    {crane.category_id?.toUpperCase() || "—"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#9FA4AF]">Capacity:</span>
                  <span className="font-medium text-[#172A4F]">
                    {crane.capacity_text || `${crane.capacity_ton}t` || "—"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#9FA4AF]">Manufacturer:</span>
                  <span className="font-medium text-[#172A4F]">
                    {crane.manufacturer || "—"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#9FA4AF]">Year:</span>
                  <span className="font-medium text-[#172A4F]">
                    {crane.year_text || "—"}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-3">
                <button
                  onClick={() => {
                    setSelectedCrane(crane);
                    setShowEditModal(true);
                  }}
                  className="flex-1 px-3 py-2 text-sm bg-[#172A4F] text-white rounded-md hover:opacity-90 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(crane)}
                  className="flex-1 px-3 py-2 text-sm bg-red-600 text-white rounded-md hover:opacity-90 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full text-center py-12 text-[#5F6678]">
            No cranes found
          </div>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 px-4 py-3 rounded-lg shadow-lg text-sm ${
            toast.type === "success"
              ? "bg-[#172A4F] text-white"
              : "bg-red-600 text-white"
          }`}
        >
          {toast.msg}
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedCrane && (
        <EditCraneModal
          crane={selectedCrane}
          onClose={() => {
            setShowEditModal(false);
            setSelectedCrane(null);
          }}
          onSuccess={(msg) => {
            flash("success", msg);
            setShowEditModal(false);
            setSelectedCrane(null);
          }}
          onError={(msg) => flash("error", msg)}
        />
      )}

      {/* Add Modal */}
      {showAddModal && (
        <AddCraneModal
          onClose={() => setShowAddModal(false)}
          onSuccess={(msg) => {
            flash("success", msg);
            setShowAddModal(false);
          }}
          onError={(msg) => flash("error", msg)}
        />
      )}
    </div>
  );
}
