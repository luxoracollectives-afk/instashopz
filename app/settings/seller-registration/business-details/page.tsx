"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import ProgressBar from "../components/ProgressBar";
import SectionHeader from "../components/SectionHeader";
import FormInput from "../components/FormInput";
import FormSelect from "../components/FormSelect";

import { businessTypes } from "../constants/businessTypes";
import { validateBusinessDetails } from "../lib/validation";

export default function BusinessDetailsPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    businessName: "",
    ownerName: "",
    businessType: "",
    gstin: "",
    panNumber: "",
    email: "",
    mobile: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSelectChange(
    e: React.ChangeEvent<HTMLSelectElement>
  ) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSaveExit() {
    // TODO:
    // Save form data

    router.push("/settings/seller-registration");
  }

  function handleContinue() {
    const validationErrors = validateBusinessDetails(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // TODO:
    // Save data using Seller Registration Context
    // Mark Step 1 as completed
    // Unlock Address Step

    router.push("/settings/seller-registration/address");
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-8">

        <ProgressBar
          currentStep={1}
          totalSteps={5}
        />

        <div className="mt-8">
          <SectionHeader
            title="Business Details"
            subtitle="Tell us about your business. This information will be used to verify your seller account."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

          <FormInput
            label="Business Name"
            name="businessName"
            value={form.businessName}
            placeholder="Enter your business name"
            onChange={handleInputChange}
            required
            error={errors.businessName}
          />

          <FormInput
            label="Owner Name"
            name="ownerName"
            value={form.ownerName}
            placeholder="Enter owner's full name"
            onChange={handleInputChange}
            required
            error={errors.ownerName}
          />

          <FormSelect
            label="Business Type"
            name="businessType"
            value={form.businessType}
            placeholder="Select business type"
            options={businessTypes}
            onChange={handleSelectChange}
            required
            error={errors.businessType}
          />

          <FormInput
            label="GSTIN"
            name="gstin"
            value={form.gstin}
            placeholder="22AAAAA0000A1Z5"
            onChange={handleInputChange}
            required
            error={errors.gstin}
          />

          <FormInput
            label="PAN Number"
            name="panNumber"
            value={form.panNumber}
            placeholder="ABCDE1234F"
            onChange={handleInputChange}
            required
            error={errors.panNumber}
          />

          <FormInput
            label="Email Address"
            name="email"
            type="email"
            value={form.email}
            placeholder="example@email.com"
            onChange={handleInputChange}
            required
            error={errors.email}
          />

          <div className="md:col-span-2">
            <FormInput
              label="Mobile Number"
              name="mobile"
              type="tel"
              value={form.mobile}
              placeholder="9876543210"
              onChange={handleInputChange}
              required
              error={errors.mobile}
            />
          </div>

        </div>

        <div className="flex justify-between items-center mt-10">

          <div className="flex gap-4">

            <button
              type="button"
              onClick={() => router.back()}
              className="
                border
                border-zinc-700
                hover:border-yellow-400
                text-white
                px-6
                py-3
                rounded-full
                transition
              "
            >
              Back
            </button>

            <button
              type="button"
              onClick={handleSaveExit}
              className="
                border
                border-yellow-400
                text-yellow-400
                hover:bg-yellow-400
                hover:text-black
                px-6
                py-3
                rounded-full
                transition
              "
            >
              Save & Exit
            </button>

          </div>

          <button
            type="button"
            onClick={handleContinue}
            className="
              bg-yellow-400
              hover:bg-yellow-300
              text-black
              font-semibold
              px-8
              py-3
              rounded-full
              transition
            "
          >
            Continue
          </button>

        </div>

      </div>
    </main>
  );
}