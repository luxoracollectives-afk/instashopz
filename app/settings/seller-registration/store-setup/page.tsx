"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import ProgressBar from "../components/ProgressBar";
import SectionHeader from "../components/SectionHeader";
import FormInput from "../components/FormInput";
import FormTextarea from "../components/FormTextarea";
import UploadBox from "../components/UploadBox";

import { validateStoreSetup } from "../lib/validation";

export default function StoreSetupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    storeName: "",
    username: "",
    description: "",
    logo: null as File | null,
    banner: null as File | null,
    supportEmail: "",
    supportPhone: "",
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

  function handleTextareaChange(
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleFileChange(
    field: "logo" | "banner",
    file: File | null
  ) {
    setForm((prev) => ({
      ...prev,
      [field]: file,
    }));
  }

  function handleSaveExit() {
    // TODO:
    // Save store setup as draft

    router.push("/settings/seller-registration");
  }

  function handleContinue() {
    const validationErrors = validateStoreSetup(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // TODO:
    // Save store setup

    router.push("/settings/seller-registration/review");
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-8">

        <ProgressBar
          currentStep={4}
          totalSteps={5}
        />

        <div className="mt-8">
          <SectionHeader
            title="Store Setup"
            subtitle="Create your InstaShopz storefront."
          />
        </div>

        <div className="space-y-6 mt-8">

          <FormInput
            label="Store Name"
            name="storeName"
            value={form.storeName}
            placeholder="My Awesome Store"
            onChange={handleInputChange}
            required
            error={errors.storeName}
          />

          <FormInput
            label="Store Username"
            name="username"
            value={form.username}
            placeholder="@mystore"
            onChange={handleInputChange}
            required
            error={errors.username}
          />

          <FormTextarea
            label="Store Description"
            name="description"
            value={form.description}
            placeholder="Describe your store..."
            onChange={handleTextareaChange}
            required
            error={errors.description}
            maxLength={300}
          />

          <UploadBox
            label="Store Logo"
            file={form.logo}
            onChange={(file) =>
              handleFileChange("logo", file)
            }
            error={errors.logo}
          />

          <UploadBox
            label="Store Banner (Optional)"
            file={form.banner}
            onChange={(file) =>
              handleFileChange("banner", file)
            }
          />

          <FormInput
            label="Support Email"
            name="supportEmail"
            type="email"
            value={form.supportEmail}
            placeholder="support@example.com"
            onChange={handleInputChange}
            error={errors.supportEmail}
          />

          <FormInput
            label="Support Phone"
            name="supportPhone"
            type="tel"
            value={form.supportPhone}
            placeholder="9876543210"
            onChange={handleInputChange}
            error={errors.supportPhone}
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