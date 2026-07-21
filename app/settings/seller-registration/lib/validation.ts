import { SellerRegistrationData } from "../types/sellerRegistration";

export const emailRegex =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const mobileRegex =
  /^[6-9]\d{9}$/;

export const gstRegex =
  /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{3}$/;

export const panRegex =
  /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

export const pincodeRegex =
  /^[1-9][0-9]{5}$/;

export function validateBusinessDetails(
  data: SellerRegistrationData["business"]
) {
  const errors: Record<string, string> = {};

  if (!data.businessName.trim()) {
    errors.businessName = "Business name is required.";
  }

  if (!data.ownerName.trim()) {
    errors.ownerName = "Owner name is required.";
  }

  if (!data.businessType) {
    errors.businessType = "Select a business type.";
  }

  if (!gstRegex.test(data.gstin.toUpperCase())) {
    errors.gstin = "Enter a valid GSTIN.";
  }

  if (!panRegex.test(data.panNumber.toUpperCase())) {
    errors.panNumber = "Enter a valid PAN number.";
  }

  if (!emailRegex.test(data.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!mobileRegex.test(data.mobile)) {
    errors.mobile = "Enter a valid 10-digit mobile number.";
  }

  return errors;
}

export function validateAddress(
  data: SellerRegistrationData["address"]
) {
  const errors: Record<string, string> = {};

  if (!data.addressLine1.trim()) {
    errors.addressLine1 = "Address is required.";
  }

  if (!data.city.trim()) {
    errors.city = "City is required.";
  }

  if (!data.district.trim()) {
    errors.district = "District is required.";
  }

  if (!data.state.trim()) {
    errors.state = "State is required.";
  }

  if (!pincodeRegex.test(data.pincode)) {
    errors.pincode = "Enter a valid pincode.";
  }

  return errors;
}

export function validateVerification(
  data: SellerRegistrationData["verification"]
) {
  const errors: Record<string, string> = {};

  if (!data.gstCertificate) {
    errors.gstCertificate = "GST Certificate is required.";
  }

  if (!data.panCard) {
    errors.panCard = "PAN Card is required.";
  }

  if (!data.cancelledCheque) {
    errors.cancelledCheque =
      "Cancelled cheque or bank passbook is required.";
  }

  if (!data.governmentId) {
    errors.governmentId = "Government ID is required.";
  }

  return errors;
}

export function validateStoreSetup(
  data: SellerRegistrationData["store"]
) {
  const errors: Record<string, string> = {};

  if (!data.storeName.trim()) {
    errors.storeName = "Store name is required.";
  }

  if (!data.username.trim()) {
    errors.username = "Store username is required.";
  }

  if (data.description.trim().length < 20) {
    errors.description =
      "Store description should be at least 20 characters.";
  }

  if (!data.logo) {
    errors.logo = "Store logo is required.";
  }

  // Banner image is optional

  if (
    data.supportEmail &&
    !emailRegex.test(data.supportEmail)
  ) {
    errors.supportEmail = "Enter a valid support email.";
  }

  if (
    data.supportPhone &&
    !mobileRegex.test(data.supportPhone)
  ) {
    errors.supportPhone = "Enter a valid support phone number.";
  }

  return errors;
}