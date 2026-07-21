"use client";

import { useState } from "react";
import { SellerRegistrationData } from "../types/sellerRegistration";

const initialData: SellerRegistrationData = {
  business: {
    businessName: "",
    ownerName: "",
    businessType: "",
    gstin: "",
    panNumber: "",
    email: "",
    mobile: "",
  },

  address: {
    addressLine1: "",
    addressLine2: "",
    landmark: "",
    city: "",
    district: "",
    state: "",
    pincode: "",
  },

  verification: {
    gstCertificate: null,
    panCard: null,
    cancelledCheque: null,
    governmentId: null,
  },

  store: {
    storeName: "",
    username: "",
    description: "",
    logo: null,
    banner: null,
    supportEmail: "",
    supportPhone: "",
  },
};

export default function useSellerRegistration() {
  const [registration, setRegistration] =
    useState<SellerRegistrationData>(initialData);

  const [currentStep, setCurrentStep] = useState(1);

  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  function updateBusiness(
    data: Partial<SellerRegistrationData["business"]>
  ) {
    setRegistration((prev) => ({
      ...prev,
      business: {
        ...prev.business,
        ...data,
      },
    }));
  }

  function updateAddress(
    data: Partial<SellerRegistrationData["address"]>
  ) {
    setRegistration((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        ...data,
      },
    }));
  }

  function updateVerification(
    data: Partial<SellerRegistrationData["verification"]>
  ) {
    setRegistration((prev) => ({
      ...prev,
      verification: {
        ...prev.verification,
        ...data,
      },
    }));
  }

  function updateStore(
    data: Partial<SellerRegistrationData["store"]>
  ) {
    setRegistration((prev) => ({
      ...prev,
      store: {
        ...prev.store,
        ...data,
      },
    }));
  }

  function completeStep(step: number) {
    if (!completedSteps.includes(step)) {
      setCompletedSteps((prev) => [...prev, step]);
    }
  }

  function isStepCompleted(step: number) {
    return completedSteps.includes(step);
  }

  function isStepLocked(step: number) {
    if (step === 1) return false;

    return !completedSteps.includes(step - 1);
  }

  function goToStep(step: number) {
    if (!isStepLocked(step)) {
      setCurrentStep(step);
    }
  }

  return {
    registration,

    currentStep,

    completedSteps,

    updateBusiness,

    updateAddress,

    updateVerification,

    updateStore,

    completeStep,

    isStepCompleted,

    isStepLocked,

    goToStep,
  };
}