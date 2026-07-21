"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import ProgressBar from "../components/ProgressBar";
import SectionHeader from "../components/SectionHeader";
import UploadBox from "../components/UploadBox";

import { validateVerification } from "../lib/validation";

export default function VerificationPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    gstCertificate: null as File | null,
    panCard: null as File | null,
    cancelledCheque: null as File | null,
    governmentId: null as File | null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleFileChange(
    name: keyof typeof form,
    file: File | null
  ) {
    setForm((prev) => ({
      ...prev,
      [name]: file,
    }));
  }

  function handleSaveExit() {
    // TODO:
    // Save verification documents as draft

    router.push("/settings/seller-registration");
  }

  function handleContinue() {
    const validationErrors = validateVerification(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // TODO:
    // Save verification documents

    router.push("/settings/seller-registration/store-setup");
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-8">

        <ProgressBar
          currentStep={3}
          totalSteps={5}
        />

        <div className="mt-8">
          <SectionHeader
            title="Verification"
            subtitle="Upload your business verification documents."
          />
        </div>

        <div className="space-y-6 mt-8">

          <UploadBox
            label="GST Certificate"
            file={form.gstCertificate}
            onChange={(file) =>
              handleFileChange("gstCertificate", file)
            }
            error={errors.gstCertificate}
          />

          <UploadBox
            label="PAN Card"
            file={form.panCard}
            onChange={(file) =>
              handleFileChange("panCard", file)
            }
            error={errors.panCard}
          />

          <UploadBox
            label="Cancelled Cheque / Bank Passbook"
            file={form.cancelledCheque}
            onChange={(file) =>
              handleFileChange("cancelledCheque", file)
            }
            error={errors.cancelledCheque}
          />

          <UploadBox
            label="Government ID"
            file={form.governmentId}
            onChange={(file) =>
              handleFileChange("governmentId", file)
            }
            error={errors.governmentId}
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