"use client";
import { useState, useRef } from "react";
import { createCrane, uploadCraneImage, updateCrane } from "@/lib/services";
import type { CraneRow } from "@/constants/types";
import Image from "next/image";

interface AddCraneModalProps {
  onClose: () => void;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

export default function AddCraneModal({
  onClose,
  onSuccess,
  onError,
}: AddCraneModalProps) {
  const [formData, setFormData] = useState<Partial<CraneRow>>({});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Categories
  const categories = [
    { id: "atc", label: "All Terrain Crane (ATC)" },
    { id: "tc", label: "Truck Crane (TC)" },
    { id: "rtc", label: "Rough Terrain Crane (RTC)" },
    { id: "crawler", label: "Crawler Crane" },
    { id: "special", label: "Special Crane" },
    { id: "support", label: "Support Equipment" },
  ];

  function handleChange(field: keyof CraneRow, value: string | number | null) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      onError("Please select a valid image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      onError("Image must be less than 5MB");
      return;
    }

    setImageFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!formData.category_id) {
      onError("Please select a category");
      return;
    }

    setSaving(true);

    try {
      // Derive deterministic crane id: `${category_id}-${normalized name}`
      const cat = String(formData.category_id);
      const rawName = String(formData.name || "");
      const normalizedName = rawName
        .trim()
        // separate letter-digit and digit-letter boundaries with hyphens
        .replace(/([A-Za-z])([0-9])/g, "$1-$2")
        .replace(/([0-9])([A-Za-z])/g, "$1-$2")
        // normalize spaces/underscores and any non-alphanumerics to hyphen
        .replace(/[_\s]+/g, "-")
        .replace(/[^A-Za-z0-9-]+/g, "-")
        // collapse multiple hyphens and trim
        .replace(/-+/g, "-")
        .replace(/^-+|-+$/g, "")
        .toLowerCase();

      const id = `${cat}-${normalizedName}`;

      // Create the crane with our custom id
      let payload: Partial<CraneRow> = { id, ...formData };
      const newCrane = await createCrane(payload);

      // Upload image if provided
      if (imageFile) {
        const imageUrl = await uploadCraneImage(
          imageFile,
          newCrane.id,
          formData.category_id
        );

        // Update crane with image URL
        await updateCrane(newCrane.id, { image_url: imageUrl });
      }

      onSuccess("Crane added successfully!");
    } catch (error: any) {
      onError(error.message || "Failed to add crane");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-[#E2E1E1] px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-2xl font-bold text-[#172A4F]">Add New Crane</h2>
          <button
            onClick={onClose}
            className="text-[#9FA4AF] hover:text-[#172A4F] text-3xl leading-none"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Name */}
          <div>
            <label className="block text-base font-medium text-[#172A4F] mb-2">
              Crane Name *
            </label>
            <input
              type="text"
              required
              value={formData.name || ""}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full border border-[#E2E1E1] rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#D7953F]/50"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-base font-medium text-[#172A4F] mb-2">
              Category *
            </label>
            <select
              required
              value={formData.category_id || ""}
              onChange={(e) => handleChange("category_id", e.target.value)}
              className="w-full border border-[#E2E1E1] rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#D7953F]/50"
            >
              <option value="">Select category...</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Capacity & Year Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-base font-medium text-[#172A4F] mb-2">
                Capacity (text)
              </label>
              <input
                type="text"
                placeholder="e.g., 100t"
                value={formData.capacity_text || ""}
                onChange={(e) => handleChange("capacity_text", e.target.value)}
                className="w-full border border-[#E2E1E1] rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#D7953F]/50"
              />
            </div>
            <div>
              <label className="block text-base font-medium text-[#172A4F] mb-2">
                Capacity (tons)
              </label>
              <input
                type="number"
                placeholder="e.g., 100"
                value={formData.capacity_ton ?? ""}
                onChange={(e) =>
                  handleChange(
                    "capacity_ton",
                    e.target.value ? parseFloat(e.target.value) : null
                  )
                }
                className="w-full border border-[#E2E1E1] rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#D7953F]/50"
              />
            </div>
          </div>

          {/* Manufacturer & Year */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-base font-medium text-[#172A4F] mb-2">
                Manufacturer
              </label>
              <input
                type="text"
                placeholder="e.g., Liebherr"
                value={formData.manufacturer || ""}
                onChange={(e) => handleChange("manufacturer", e.target.value)}
                className="w-full border border-[#E2E1E1] rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#D7953F]/50"
              />
            </div>
            <div>
              <label className="block text-base font-medium text-[#172A4F] mb-2">
                Year
              </label>
              <input
                type="text"
                placeholder="e.g., 2020"
                value={formData.year_text || ""}
                onChange={(e) => handleChange("year_text", e.target.value)}
                className="w-full border border-[#E2E1E1] rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#D7953F]/50"
              />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-base font-medium text-[#172A4F] mb-2">
              Crane Image
            </label>
            <div className="space-y-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full border border-[#E2E1E1] rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#D7953F]/50"
              />
              {imagePreview && (
                <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    fill
                    className="object-contain"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-base font-medium text-[#172A4F] mb-2">
              Description
            </label>
            <textarea
              rows={3}
              placeholder="Brief description of the crane..."
              value={formData.description || ""}
              onChange={(e) => handleChange("description", e.target.value)}
              className="w-full border border-[#E2E1E1] rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#D7953F]/50"
            />
          </div>

          {/* Spec Category */}
          <div>
            <label className="block text-base font-medium text-[#172A4F] mb-2">
              Spec Category
            </label>
            <input
              type="text"
              placeholder="e.g., Main Boom"
              value={formData.spec_category_text || ""}
              onChange={(e) =>
                handleChange("spec_category_text", e.target.value)
              }
              className="w-full border border-[#E2E1E1] rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#D7953F]/50"
            />
          </div>

          {/* Main Boom Min/Max */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-base font-medium text-[#172A4F] mb-2">
                Main Boom Min (m)
              </label>
              <input
                type="number"
                step="0.1"
                placeholder="e.g., 12.8"
                value={formData.spec_main_boom_min_m ?? ""}
                onChange={(e) =>
                  handleChange(
                    "spec_main_boom_min_m",
                    e.target.value ? parseFloat(e.target.value) : null
                  )
                }
                className="w-full border border-[#E2E1E1] rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#D7953F]/50"
              />
            </div>
            <div>
              <label className="block text-base font-medium text-[#172A4F] mb-2">
                Main Boom Max (m)
              </label>
              <input
                type="number"
                step="0.1"
                placeholder="e.g., 60"
                value={formData.spec_main_boom_max_m ?? ""}
                onChange={(e) =>
                  handleChange(
                    "spec_main_boom_max_m",
                    e.target.value ? parseFloat(e.target.value) : null
                  )
                }
                className="w-full border border-[#E2E1E1] rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#D7953F]/50"
              />
            </div>
          </div>

          {/* Max Hoist Height */}
          <div>
            <label className="block text-base font-medium text-[#172A4F] mb-2">
              Max Hoist Height (m)
            </label>
            <input
              type="number"
              step="0.1"
              placeholder="e.g., 82"
              value={formData.spec_max_hoist_height_m ?? ""}
              onChange={(e) =>
                handleChange(
                  "spec_max_hoist_height_m",
                  e.target.value ? parseFloat(e.target.value) : null
                )
              }
              className="w-full border border-[#E2E1E1] rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#D7953F]/50"
            />
          </div>

          {/* Jib Type */}
          <div>
            <label className="block text-base font-medium text-[#172A4F] mb-2">
              Jib Type
            </label>
            <input
              type="text"
              placeholder="e.g., Lattice Extension"
              value={formData.spec_jib_type || ""}
              onChange={(e) => handleChange("spec_jib_type", e.target.value)}
              className="w-full border border-[#E2E1E1] rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#D7953F]/50"
            />
          </div>

          {/* Jib Min/Max */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-base font-medium text-[#172A4F] mb-2">
                Jib Min (m)
              </label>
              <input
                type="number"
                step="0.1"
                placeholder="e.g., 10"
                value={formData.spec_jib_min_m ?? ""}
                onChange={(e) =>
                  handleChange(
                    "spec_jib_min_m",
                    e.target.value ? parseFloat(e.target.value) : null
                  )
                }
                className="w-full border border-[#E2E1E1] rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#D7953F]/50"
              />
            </div>
            <div>
              <label className="block text-base font-medium text-[#172A4F] mb-2">
                Jib Max (m)
              </label>
              <input
                type="number"
                step="0.1"
                placeholder="e.g., 19"
                value={formData.spec_jib_max_m ?? ""}
                onChange={(e) =>
                  handleChange(
                    "spec_jib_max_m",
                    e.target.value ? parseFloat(e.target.value) : null
                  )
                }
                className="w-full border border-[#E2E1E1] rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#D7953F]/50"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-5 py-3 text-base border border-[#E2E1E1] text-[#172A4F] rounded-lg hover:bg-[#E2E1E1] transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 px-5 py-3 text-base bg-[#D7953F] text-white rounded-lg hover:opacity-90 transition disabled:opacity-50"
            >
              {saving ? "Adding..." : "Add Crane"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
