"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import ProgressBar from "../components/ProgressBar";
import SectionHeader from "../components/SectionHeader";
import FormInput from "../components/FormInput";
import FormSelect from "../components/FormSelect";

import { indianStates } from "../constants/indianStates";
import { validateAddress } from "../lib/validation";

export default function AddressPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    addressLine1: "",
    addressLine2: "",
    landmark: "",
    city: "",
    district: "",
    state: "",
    pincode: "",
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
    // Save address details

    router.push("/settings/seller-registration");
  }

  function handleContinue() {
    const validationErrors = validateAddress(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // TODO:
    // Save Address Details

    router.push("/settings/seller-registration/verification");
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-8">

        <ProgressBar
          currentStep={2}
          totalSteps={5}
        />

        <div className="mt-8">
          <SectionHeader
            title="Business Address"
            subtitle="Tell us where your business operates."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

          <div className="md:col-span-2">
            <FormInput
              label="Address Line 1"
              name="addressLine1"
              value={form.addressLine1}
              placeholder="House No., Street, Area"
              onChange={handleInputChange}
              required
              error={errors.addressLine1}
            />
          </div>

          <div className="md:col-span-2">
            <FormInput
              label="Address Line 2"
              name="addressLine2"
              value={form.addressLine2}
              placeholder="Apartment, Building (Optional)"
              onChange={handleInputChange}
            />
          </div>

          <div className="md:col-span-2">
            <FormInput
              label="Landmark"
              name="landmark"
              value={form.landmark}
              placeholder="Near Bus Stand (Optional)"
              onChange={handleInputChange}
            />
          </div>

          <FormInput
            label="City"
            name="city"
            value={form.city}
            placeholder="Enter city"
            onChange={handleInputChange}
            required
            error={errors.city}
          />

          <FormInput
            label="District"
            name="district"
            value={form.district}
            placeholder="Enter district"
            onChange={handleInputChange}
            required
            error={errors.district}
          />

          <FormSelect
            label="State"
            name="state"
            value={form.state}
            placeholder="Select state"
            options={indianStates}
            onChange={handleSelectChange}
            required
            error={errors.state}
          />

          <FormInput
            label="Pincode"
            name="pincode"
            value={form.pincode}
            placeholder="560001"
            onChange={handleInputChange}
            required
            error={errors.pincode}
          />

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