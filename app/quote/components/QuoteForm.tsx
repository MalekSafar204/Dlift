"use client";
import React, { useState, useMemo, useEffect } from "react";
import { craneCategories } from "@/constants/data"; 
import Image from "next/image";
import { Crane, CraneCategory, QuoteFormState } from "@/constants/types";
import { useSearchParams } from "next/navigation";

const initialState: QuoteFormState = {
  categoryId: "",
  modelName: "",
  company: "",
  contactName: "",
  phone: "",
  email: "",
  workType: "",
  location: "",
  startDate: "",
  endDate: "",
};

function CustomCraneRequest() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    categoryId: "",
    capacity: "",
    manufacturer: "",
  requestedModel: "",
  location: "",
  startDate: "",
  endDate: "",
    company: "",
    contactName: "",
    phone: "",
    email: "",
    details: "",
  customCategoryName: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successId, setSuccessId] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const missing: string[] = [];
    if (!form.categoryId) missing.push("category");
    if (form.categoryId === "other" && !form.customCategoryName) missing.push("custom category name");
    if (!form.capacity) missing.push("capacity");
    if (!form.location) missing.push("location");
    if (!form.startDate) missing.push("start date");
    if (!form.endDate) missing.push("end date");
    if (!form.company) missing.push("company");
    if (!form.contactName) missing.push("contact person");
    if (!form.phone) missing.push("phone");
    if (!form.email) missing.push("email");

    if (missing.length) {
      alert(`Please fill all required fields: ${missing.join(", ")}`);
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const notes = [
        form.customCategoryName ? `Custom Category: ${form.customCategoryName}` : null,
        form.requestedModel ? `Requested Model: ${form.requestedModel}` : null,
        form.details ? `Details: ${form.details}` : null,
      ].filter(Boolean).join("\n");

      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          categoryId: form.categoryId || 'other',
          modelId: null,
          company: form.company,
          contactName: form.contactName,
          phone: form.phone,
          email: form.email,
          workType: 'custom-request',
          location: form.location,
          startDate: form.startDate,
          endDate: form.endDate,
          capacityNeeded: form.capacity,
          preferredManufacturer: form.manufacturer || null,
          notes: notes || null,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to submit');
      setSuccessId(json.id);
      setSubmitted(true);
      setForm({
        categoryId: "",
        capacity: "",
        manufacturer: "",
        requestedModel: "",
        location: "",
        startDate: "",
        endDate: "",
        company: "",
        contactName: "",
        phone: "",
        email: "",
        details: "",
        customCategoryName: "",
      });
      setTimeout(() => setSubmitted(false), 4000);
      setOpen(false);
    } catch (err: any) {
      setError(err.message || 'Failed to submit');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mt-16 mb-8">
      <div className="bg-orange-100 border-2 border-orange-400 rounded-lg p-6 shadow-md flex flex-col items-center">
        <h3 className="text-2xl md:text-3xl font-bold text-orange-700 mb-2">Can't find the crane you need?</h3>
        <p className="mb-4 text-orange-800 text-center max-w-2xl">Request a custom crane model for your project. We'll do our best to source exactly what you need.</p>
        <button
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-full mb-4 transition"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Hide Custom Request Form" : "Request a Custom Crane"}
        </button>
        {open && (
          <form onSubmit={handleSubmit} className="w-full max-w-2xl space-y-6 mt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-medium mb-2" htmlFor="custom-categoryId">
                  Crane Category <span className="text-orange-500">*</span>
                </label>
                <select
                  id="custom-categoryId"
                  name="categoryId"
                  value={form.categoryId}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500"
                  required
                >
                  <option value="">Select category</option>
                  {craneCategories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.title}</option>
                  ))}
                  <option value="other">Other (Not Listed)</option>
                </select>
              </div>
              {form.categoryId === "other" && (
                <div>
                  <label className="block font-medium mb-2" htmlFor="custom-customCategoryName">
                    Specify Category Name <span className="text-orange-500">*</span>
                  </label>
                  <input
                    id="custom-customCategoryName"
                    name="customCategoryName"
                    value={form.customCategoryName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g. Rail Crane"
                    required
                  />
                </div>
              )}
              <div>
                <label className="block font-medium mb-2" htmlFor="custom-capacity">
                  Required Capacity <span className="text-orange-500">*</span>
                </label>
                <input
                  id="custom-capacity"
                  name="capacity"
                  value={form.capacity}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500"
                  placeholder="e.g. 100 ton"
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-2" htmlFor="custom-manufacturer">
                  Preferred Manufacturer (optional)
                </label>
                <input
                  id="custom-manufacturer"
                  name="manufacturer"
                  value={form.manufacturer}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500"
                  placeholder="e.g. Liebherr, Demag"
                />
              </div>
              <div>
                <label className="block font-medium mb-2" htmlFor="custom-requestedModel">
                  Requested Model (Name / Series) (optional)
                </label>
                <input
                  id="custom-requestedModel"
                  name="requestedModel"
                  value={form.requestedModel}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500"
                  placeholder="e.g. LTM 1400"
                />
              </div>
              <div>
                <label className="block font-medium mb-2" htmlFor="custom-location">
                  Project Location <span className="text-orange-500">*</span>
                </label>
                <input
                  id="custom-location"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500"
                  placeholder="City / Site"
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-2" htmlFor="custom-startDate">
                  Start Date <span className="text-orange-500">*</span>
                </label>
                <input
                  id="custom-startDate"
                  name="startDate"
                  type="date"
                  value={form.startDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-2" htmlFor="custom-endDate">
                  End Date <span className="text-orange-500">*</span>
                </label>
                <input
                  id="custom-endDate"
                  name="endDate"
                  type="date"
                  value={form.endDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="custom-company" className="block font-medium mb-2">Company Name <span className="text-orange-500">*</span></label>
                <input
                  id="custom-company"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="custom-contactName" className="block font-medium mb-2">Contact Person <span className="text-orange-500">*</span></label>
                <input
                  id="custom-contactName"
                  name="contactName"
                  value={form.contactName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="custom-phone" className="block font-medium mb-2">Phone <span className="text-orange-500">*</span></label>
                <input
                  id="custom-phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="custom-email" className="block font-medium mb-2">Email <span className="text-orange-500">*</span></label>
                <input
                  id="custom-email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="custom-details" className="block font-medium mb-2">Project Details (optional)</label>
                <textarea
                  id="custom-details"
                  name="details"
                  rows={3}
                  value={form.details}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500"
                  placeholder="Tell us more about your project or requirements"
                />
              </div>
            </div>
            <div className="pt-2 flex items-center gap-4 w-full justify-center">
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-bold py-3 px-8 rounded-md transition transform hover:scale-[1.02]"
                disabled={submitting}
              >
                {submitting ? 'Submitting…' : 'Submit Custom Request'}
              </button>
              {submitted && (
                <span className="text-green-700 font-medium">Submitted! We'll be in touch. {successId ? `Ref: ${successId}` : ''}</span>
              )}
              {error && (
                <span className="text-red-700 font-medium">{error}</span>
              )}
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

export default function QuoteForm() {
  const [form, setForm] = useState<QuoteFormState>(initialState);
  const searchParams = useSearchParams();
  const modelId = searchParams.get("model");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successId, setSuccessId] = useState<string | null>(null);

  useEffect(() => {
    if (modelId) {
      const categoryId = modelId?.split("-")[0];
      const initialCategory = craneCategories.find((c) => c.id === categoryId);
      const initialmodel = initialCategory?.cranes.find(
        (cr) => cr.id === modelId
      );
      setForm((prev) => ({
        ...prev,
        categoryId: initialCategory ? initialCategory.id : "",
        modelName: initialmodel ? initialmodel.name : "",
      }));
    }
  }, []);

  const selectedCategory: CraneCategory | undefined = useMemo(
    () => craneCategories.find((c) => c.id === form.categoryId),
    [form.categoryId]
  );

  const selectedCrane: Crane | undefined = useMemo(
    () => selectedCategory?.cranes.find((cr) => cr.name === form.modelName),
    [selectedCategory, form.modelName]
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "categoryId" ? { modelName: "" } : {}),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const requiredFields: (keyof typeof form)[] = [
      "categoryId",
      "modelName",
      "company",
      "contactName",
      "phone",
      "email",
      "workType",
      "location",
      "startDate",
      "endDate",
    ];

    const missing = requiredFields.filter((f) => !form[f].trim());
    if (missing.length) {
      alert("Please fill all required fields before submitting.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          categoryId: form.categoryId,
          modelId: selectedCrane?.id ?? null,
          company: form.company,
          contactName: form.contactName,
          phone: form.phone,
          email: form.email,
          workType: form.workType,
          location: form.location,
          startDate: form.startDate,
          endDate: form.endDate,
          capacityNeeded: selectedCrane?.capacity || 'unspecified',
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to submit');
      setSuccessId(json.id);
      setSubmitted(true);
      setForm(initialState);
      setTimeout(() => setSubmitted(false), 4000);
    } catch (err: any) {
      setError(err.message || 'Failed to submit');
    } finally {
      setSubmitting(false);
    }
  };

  const cranesForCategory = selectedCategory?.cranes ?? [];

  return (
    <section id="quote-form" className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Quote Request Form
        </h2>
        <p className="text-center text-lg md:text-xl max-w-3xl mx-auto mb-12 text-gray-600">
          Choose a crane category and model to auto-fill its specifications,
          then tell us about your project timeline and scope.
        </p>

        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium mb-2" htmlFor="categoryId">
                Crane Category <span className="text-orange-500">*</span>
              </label>
              <select
                id="categoryId"
                name="categoryId"
                value={form.categoryId}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500"
                required
              >
                <option value="">Select category</option>
                {craneCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium mb-2" htmlFor="modelName">
                Crane Model <span className="text-orange-500">*</span>
              </label>
              <select
                id="modelName"
                name="modelName"
                value={form.modelName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500 disabled:bg-gray-100"
                disabled={!form.categoryId}
                required
              >
                <option value="">
                  {form.categoryId ? "Select model" : "Select category first"}
                </option>
                {cranesForCategory.map((crane) => (
                  <option key={crane.name} value={crane.name}>
                    {crane.name} ({crane.capacity})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {selectedCrane && (
            <div className="bg-white border rounded-lg shadow-sm p-6 md:p-8 flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3 relative aspect-video bg-gray-100 rounded overflow-hidden">
                <Image
                  src={selectedCrane.image}
                  alt={selectedCrane.name}
                  fill
                  sizes="(max-width:768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="md:flex-1 space-y-3">
                <h3 className="text-2xl font-bold">{selectedCrane.name}</h3>
                <p className="text-gray-700">{selectedCrane.description}</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                  <div className="bg-gray-100 rounded p-3">
                    <div className="font-semibold">Capacity</div>
                    <div>{selectedCrane.capacity}</div>
                  </div>
                  <div className="bg-gray-100 rounded p-3">
                    <div className="font-semibold">Year</div>
                    <div>{selectedCrane.year}</div>
                  </div>
                  <div className="bg-gray-100 rounded p-3">
                    <div className="font-semibold">Manufacturer</div>
                    <div>{selectedCrane.manufacturer}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="company" className="block font-medium mb-2">
                Company Name <span className="text-orange-500">*</span>
              </label>
              <input
                id="company"
                name="company"
                value={form.company}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div>
              <label htmlFor="contactName" className="block font-medium mb-2">
                Contact Person <span className="text-orange-500">*</span>
              </label>
              <input
                id="contactName"
                name="contactName"
                value={form.contactName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="block font-medium mb-2">
                Phone <span className="text-orange-500">*</span>
              </label>
              <input
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block font-medium mb-2">
                Email <span className="text-orange-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="workType" className="block font-medium mb-2">
                Type of Work / Project Description <span className="text-orange-500">*</span>
              </label>
              <textarea
                id="workType"
                name="workType"
                rows={4}
                value={form.workType}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div>
              <label htmlFor="location" className="block font-medium mb-2">
                Project Location <span className="text-orange-500">*</span>
              </label>
              <input
                id="location"
                name="location"
                value={form.location}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div>
              <label htmlFor="startDate" className="block font-medium mb-2">
                Start Date <span className="text-orange-500">*</span>
              </label>
              <input
                id="startDate"
                name="startDate"
                type="date"
                value={form.startDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div>
              <label htmlFor="endDate" className="block font-medium mb-2">
                End Date <span className="text-orange-500">*</span>
              </label>
              <input
                id="endDate"
                name="endDate"
                type="date"
                value={form.endDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
          </div>

          <div className="pt-4 flex items-center gap-4 w-full justify-center">
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-bold py-3 px-8 rounded-md transition transform hover:scale-[1.02]"
              disabled={submitting}
            >
              {submitting ? 'Submitting…' : 'Submit Request'}
            </button>
            {submitted && (
              <span className="text-green-600 font-medium">
                Submitted! We'll be in touch. {successId ? `Ref: ${successId}` : ''}
              </span>
            )}
            {error && (
              <span className="text-red-600 font-medium">{error}</span>
            )}
          </div>
        </form>
        {/* Custom Crane Request Section */}
        <CustomCraneRequest />
      </div>
    </section>
  );
}
