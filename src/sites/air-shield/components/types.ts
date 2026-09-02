export type ClaimType = "air" | "baggage";

export interface StepConfig {
  number: number;
  label: string;
  description: string;
}

export const countryOptions = [
  { value: "GB", label: "GB +44", code: "+44" },
  { value: "US", label: "US +1", code: "+1" },
  { value: "IE", label: "IE +353", code: "+353" },
  { value: "FR", label: "FR +33", code: "+33" },
  { value: "DE", label: "DE +49", code: "+49" },
  { value: "ES", label: "ES +34", code: "+34" },
  { value: "IT", label: "IT +39", code: "+39" },
  { value: "NL", label: "NL +31", code: "+31" },
  { value: "BE", label: "BE +32", code: "+32" },
  { value: "PT", label: "PT +351", code: "+351" },
  { value: "CH", label: "CH +41", code: "+41" },
  { value: "AT", label: "AT +43", code: "+43" },
  { value: "SE", label: "SE +46", code: "+46" },
  { value: "NO", label: "NO +47", code: "+47" },
  { value: "DK", label: "DK +45", code: "+45" },
  { value: "FI", label: "FI +358", code: "+358" },
  { value: "PL", label: "PL +48", code: "+48" },
  { value: "AU", label: "AU +61", code: "+61" },
  { value: "NZ", label: "NZ +64", code: "+64" },
  { value: "IN", label: "IN +91", code: "+91" },
  { value: "AE", label: "AE +971", code: "+971" },
  { value: "ZA", label: "ZA +27", code: "+27" },
  { value: "SG", label: "SG +65", code: "+65" },
] as const;

export const countryList = [
  "United Kingdom",
  "United States",
  "Ireland",
  "France",
  "Germany",
  "Spain",
  "Italy",
  "Netherlands",
  "Belgium",
  "Portugal",
  "Switzerland",
  "Austria",
  "Sweden",
  "Norway",
  "Denmark",
  "Finland",
  "Poland",
  "Australia",
  "New Zealand",
  "India",
  "United Arab Emirates",
  "South Africa",
  "Singapore",
] as const;

export interface AirStep1Data {
  firstName: string;
  lastName: string;
  email: string;
  bookingReference: string;
  flightNumber: string;
  files: File[];
  phoneCountry: string;
  phoneNumber: string;
}

export interface AirStep2Data {
  disruptionType: string;
  contactedAirline: "yes" | "no";
  reason: string;
  details: string;
}

export interface AirStep3Data {
  streetAddress: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  accountHolderName: string;
  bankName: string;
  bankCountry: string;
  idFiles: File[];
  terms: boolean;
  privacy: boolean;
}

export type AirClaimData = AirStep1Data & AirStep2Data & AirStep3Data;

export interface BaggageStep1Data {
  firstName: string;
  lastName: string;
  email: string;
  bookingReference: string;
  flightNumber: string;
  files: File[];
}

export interface BaggageStep2Data {
  fileReferenceNumber: string;
  baggageTagNumber: string;
  itemsAffected: number;
  circumstances: string;
}

export interface BaggageStep3Data {
  streetAddress: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  accountHolderName: string;
  bankName: string;
  bankCountry: string;
  terms: boolean;
  privacy: boolean;
}

export type BaggageClaimData = BaggageStep1Data & BaggageStep2Data & BaggageStep3Data;
