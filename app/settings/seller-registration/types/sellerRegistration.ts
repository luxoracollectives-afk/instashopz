export interface BusinessDetails {
  businessName: string;
  ownerName: string;
  businessType: string;
  gstin: string;
  panNumber: string;
  email: string;
  mobile: string;
}

export interface BusinessAddress {
  addressLine1: string;
  addressLine2: string;
  landmark: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
}

export interface VerificationDetails {
  gstCertificate: File | null;
  panCard: File | null;
  cancelledCheque: File | null;
  governmentId: File | null;
}

export interface StoreSetup {
  storeName: string;
  username: string;
  description: string;
  logo: File | null;
  banner: File | null;
  supportEmail: string;
  supportPhone: string;
}

export interface SellerRegistrationData {
  business: BusinessDetails;
  address: BusinessAddress;
  verification: VerificationDetails;
  store: StoreSetup;
}