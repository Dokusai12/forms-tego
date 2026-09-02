import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormShell, SidebarInfo } from "./components/FormShell";
import { Stepper, StepHeader } from "./components/Stepper";
import { FileDropzone } from "./components/FileDropzone";
import { PhoneInput } from "./components/PhoneInput";
import { countryList, countryOptions } from "./components/types";

const steps = [
  { number: 1, label: "Your details", description: "Who you are and which booking the claim relates to." },
  { number: 2, label: "What happened", description: "The more precisely you describe the disruption, the stronger the claim." },
  { number: 3, label: "Payout & identification", description: "Where compensation is sent if your claim succeeds, and the identification we need to act on your behalf." },
];

const step1Schema = z.object({
  firstName: z.string().min(1, "This field is required"),
  lastName: z.string().min(1, "This field is required"),
  email: z.string().min(1, "This field is required").email("Enter a valid email address"),
  bookingReference: z.string().min(5, "Booking reference must be at least 5 characters"),
  flightNumber: z.string().min(1, "This field is required"),
  files: z.array(z.instanceof(File)).min(1, "At least one file is required"),
  phoneCountry: z.string(),
  phoneNumber: z.string(),
});

const step2Schema = z.object({
  disruptionType: z.string().min(1, "Please select an option"),
  contactedAirline: z.enum(["yes", "no"]).or(z.literal("")).refine((v) => v !== "", "Please select an option"),
  reason: z.string().min(1, "Please select an option"),
  details: z.string(),
});

const step3Schema = z.object({
  streetAddress: z.string().min(1, "This field is required"),
  addressLine2: z.string(),
  city: z.string().min(1, "This field is required"),
  state: z.string(),
  postalCode: z.string().min(1, "This field is required"),
  country: z.string().min(1, "This field is required"),
  accountHolderName: z.string().min(1, "This field is required"),
  bankName: z.string().min(1, "This field is required"),
  bankCountry: z.string().min(1, "This field is required"),
  idFiles: z.array(z.instanceof(File)).min(1, "At least one file is required"),
  terms: z.boolean().refine((v) => v, "You must agree to the terms"),
  privacy: z.boolean().refine((v) => v, "You must agree to the privacy policy"),
});

const disruptionTypes = [
  "Cancelled flight",
  "Delayed flight (3+ hours)",
  "Denied boarding",
  "Missed connection",
];

const reasons = [
  "Not Sure",
  "Technical Problem",
  "Weather",
  "Problems At The Airport",
  "Other",
];

export const airShieldHead = () => ({
  meta: [
    { title: "Flight Disruption Claim — Air Shield" },
    {
      name: "description",
      content:
        "Request compensation for a cancelled, delayed, or denied boarding flight. Tell us what happened and attach your booking.",
    },
    { property: "og:title", content: "Flight Disruption Claim — Air Shield" },
    {
      property: "og:description",
      content:
        "Request compensation for a cancelled, delayed, or denied boarding flight. Tell us what happened and attach your booking.",
    },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ],
});

export function AirShieldPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const form1 = useForm({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      bookingReference: "",
      flightNumber: "",
      files: [],
      phoneCountry: "GB",
      phoneNumber: "",
    },
  });

  const form2 = useForm({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      disruptionType: "",
      contactedAirline: "" as "" | "yes" | "no",
      reason: "",
      details: "",
    },
  });

  const form3 = useForm({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      streetAddress: "",
      addressLine2: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      accountHolderName: "",
      bankName: "",
      bankCountry: "",
      idFiles: [],
      terms: false,
      privacy: false,
    },
  });

  const handleNext = async () => {
    if (step === 1) {
      const valid = await form1.trigger();
      if (!valid) return;
      setStep(2);
    } else if (step === 2) {
      const valid = await form2.trigger();
      if (!valid) return;
      setStep(3);
    } else if (step === 3) {
      const valid = await form3.trigger();
      if (!valid) return;
      setSubmitted(true);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  if (submitted) {
    return (
      <FormShell
        eyebrow="Air Shield"
        title="Claim submitted"
        description="We have received your flight disruption claim. Our team will review it and contact you with next steps."
      >
        <div className="py-12 text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-indigo text-indigo-foreground">
            <Check className="h-8 w-8" />
          </div>
          <h2 className="mt-6 font-display text-2xl font-bold text-foreground">
            Thank you, {form1.getValues("firstName")}
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-sm text-muted-foreground">
            A confirmation has been sent to {form1.getValues("email")}. We will be in touch once
            we have assessed your claim.
          </p>
        </div>
      </FormShell>
    );
  }

  return (
    <FormShell
      eyebrow="Air Shield"
      title="Request compensation for flight disruption."
      description="Tell us what happened and attach your booking. We assess your claim against the applicable flight compensation rules and pursue it with the airline on your behalf."
      sidebar={
        <SidebarInfo
          items={[
            { label: "Booking confirmation", value: "Your itinerary, boarding pass or airline confirmation." },
            { label: "Flight details", value: "Booking reference and flight number." },
            { label: "Identification", value: "Passport or national ID for the named passenger." },
            { label: "Bank details", value: "Where compensation should be sent if your claim succeeds." },
          ]}
        />
      }
    >
      <Stepper steps={steps} currentStep={step} />
      <StepHeader step={steps[step - 1]!} steps={steps} />

      {step === 1 && (
        <form className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-sm font-semibold text-foreground">
                First name
              </Label>
              <Input
                id="firstName"
                {...form1.register("firstName")}
                className="rounded-xl border-input bg-canvas-soft"
              />
              {form1.formState.errors.firstName && (
                <p className="text-xs font-medium text-destructive">
                  {form1.formState.errors.firstName.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-sm font-semibold text-foreground">
                Last name
              </Label>
              <Input
                id="lastName"
                {...form1.register("lastName")}
                className="rounded-xl border-input bg-canvas-soft"
              />
              {form1.formState.errors.lastName && (
                <p className="text-xs font-medium text-destructive">
                  {form1.formState.errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-semibold text-foreground">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              {...form1.register("email")}
              className="rounded-xl border-input bg-canvas-soft"
            />
            {form1.formState.errors.email ? (
              <p className="text-xs font-medium text-destructive">
                {form1.formState.errors.email.message}
              </p>
            ) : (
              <p className="text-xs text-muted-foreground">
                We send claim updates to this address, so please check it carefully.
              </p>
            )}
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="bookingReference" className="text-sm font-semibold text-foreground">
                Booking reference
              </Label>
              <Input
                id="bookingReference"
                {...form1.register("bookingReference")}
                className="rounded-xl border-input bg-canvas-soft"
              />
              {form1.formState.errors.bookingReference ? (
                <p className="text-xs font-medium text-destructive">
                  {form1.formState.errors.bookingReference.message}
                </p>
              ) : (
                <p className="text-xs text-muted-foreground">As issued by the airline.</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="flightNumber" className="text-sm font-semibold text-foreground">
                Flight number
              </Label>
              <Input
                id="flightNumber"
                {...form1.register("flightNumber")}
                className="rounded-xl border-input bg-canvas-soft"
              />
              {form1.formState.errors.flightNumber && (
                <p className="text-xs font-medium text-destructive">
                  {form1.formState.errors.flightNumber.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold text-foreground">Upload your booking information</Label>
            <FileDropzone
              files={form1.watch("files")}
              onChange={(files) => form1.setValue("files", files, { shouldValidate: true })}
              maxFiles={10}
              label="Upload your booking information"
              description="Your itinerary, boarding pass or airline confirmation. PDF or image, up to 10 files."
              error={form1.formState.errors.files?.message}
            />
          </div>

          <PhoneInput
            countryValue={form1.watch("phoneCountry")}
            onCountryChange={(value) => form1.setValue("phoneCountry", value)}
            numberValue={form1.watch("phoneNumber")}
            onNumberChange={(value) => form1.setValue("phoneNumber", value)}
          />
          <p className="-mt-4 text-xs text-muted-foreground">
            Optional — only used if we need to reach you quickly about the claim.
          </p>
        </form>
      )}

      {step === 2 && (
        <form className="space-y-6">
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-foreground">What happened with your flight?</Label>
            <Select
              value={form2.watch("disruptionType")}
              onValueChange={(value) => form2.setValue("disruptionType", value, { shouldValidate: true })}
            >
              <SelectTrigger className="rounded-xl border-input bg-canvas-soft">
                <SelectValue placeholder="Select what happened" />
              </SelectTrigger>
              <SelectContent>
                {disruptionTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {form2.formState.errors.disruptionType && (
              <p className="text-xs font-medium text-destructive">
                {form2.formState.errors.disruptionType.message}
              </p>
            )}
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-semibold text-foreground">Have you already contacted the airline?</Label>
            <div className="flex gap-4">
              {(["yes", "no"] as const).map((value) => (
                <label
                  key={value}
                  className={`flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-3 transition-colors ${
                    form2.watch("contactedAirline") === value
                      ? "border-indigo bg-indigo-subtle"
                      : "border-border bg-canvas-soft hover:border-indigo/30"
                  }`}
                >
                  <input
                    type="radio"
                    value={value}
                    checked={form2.watch("contactedAirline") === value}
                    onChange={() => form2.setValue("contactedAirline", value, { shouldValidate: true })}
                    className="h-4 w-4 text-indigo focus:ring-indigo"
                  />
                  <span className="text-sm font-medium capitalize text-foreground">{value}</span>
                </label>
              ))}
            </div>
            {form2.formState.errors.contactedAirline && (
              <p className="text-xs font-medium text-destructive">
                {form2.formState.errors.contactedAirline.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold text-foreground">
              Did the airline provide any reason for the disruption?
            </Label>
            <Select
              value={form2.watch("reason")}
              onValueChange={(value) => form2.setValue("reason", value, { shouldValidate: true })}
            >
              <SelectTrigger className="rounded-xl border-input bg-canvas-soft">
                <SelectValue placeholder="Please select an option" />
              </SelectTrigger>
              <SelectContent>
                {reasons.map((reason) => (
                  <SelectItem key={reason} value={reason}>
                    {reason}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {form2.formState.errors.reason && (
              <p className="text-xs font-medium text-destructive">
                {form2.formState.errors.reason.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="details" className="text-sm font-semibold text-foreground">
              Please tell us any further details to support your claim{" "}
              <span className="font-normal text-muted-foreground">(optional)</span>
            </Label>
            <Textarea
              id="details"
              {...form2.register("details")}
              rows={4}
              className="rounded-xl border-input bg-canvas-soft"
            />
            <p className="text-xs text-muted-foreground">
              Optional. Anything the airline told you, how long you waited, or what it cost you.
            </p>
          </div>
        </form>
      )}

      {step === 3 && (
        <form className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-display text-lg font-semibold text-foreground">Address</h3>
            <div className="space-y-2">
              <Label htmlFor="streetAddress" className="text-sm font-semibold text-foreground">
                Street address
              </Label>
              <Input
                id="streetAddress"
                {...form3.register("streetAddress")}
                className="rounded-xl border-input bg-canvas-soft"
              />
              {form3.formState.errors.streetAddress && (
                <p className="text-xs font-medium text-destructive">
                  {form3.formState.errors.streetAddress.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="addressLine2" className="text-sm font-semibold text-foreground">
                Address line 2{" "}
                <span className="font-normal text-muted-foreground">(optional)</span>
              </Label>
              <Input
                id="addressLine2"
                {...form3.register("addressLine2")}
                className="rounded-xl border-input bg-canvas-soft"
              />
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="city" className="text-sm font-semibold text-foreground">
                  City
                </Label>
                <Input
                  id="city"
                  {...form3.register("city")}
                  className="rounded-xl border-input bg-canvas-soft"
                />
                {form3.formState.errors.city && (
                  <p className="text-xs font-medium text-destructive">
                    {form3.formState.errors.city.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="state" className="text-sm font-semibold text-foreground">
                  State / region / province{" "}
                  <span className="font-normal text-muted-foreground">(optional)</span>
                </Label>
                <Input
                  id="state"
                  {...form3.register("state")}
                  className="rounded-xl border-input bg-canvas-soft"
                />
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="postalCode" className="text-sm font-semibold text-foreground">
                  Postal / ZIP code
                </Label>
                <Input
                  id="postalCode"
                  {...form3.register("postalCode")}
                  className="rounded-xl border-input bg-canvas-soft"
                />
                {form3.formState.errors.postalCode && (
                  <p className="text-xs font-medium text-destructive">
                    {form3.formState.errors.postalCode.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-foreground">Country</Label>
                <Select
                  value={form3.watch("country")}
                  onValueChange={(value) => form3.setValue("country", value, { shouldValidate: true })}
                >
                  <SelectTrigger className="rounded-xl border-input bg-canvas-soft">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent className="max-h-72">
                    {countryList.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form3.formState.errors.country && (
                  <p className="text-xs font-medium text-destructive">
                    {form3.formState.errors.country.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-display text-lg font-semibold text-foreground">Bank details</h3>
            <div className="space-y-2">
              <Label htmlFor="accountHolderName" className="text-sm font-semibold text-foreground">
                Account Holder Name
              </Label>
              <Input
                id="accountHolderName"
                {...form3.register("accountHolderName")}
                className="rounded-xl border-input bg-canvas-soft"
              />
              {form3.formState.errors.accountHolderName && (
                <p className="text-xs font-medium text-destructive">
                  {form3.formState.errors.accountHolderName.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="bankName" className="text-sm font-semibold text-foreground">
                Bank Name
              </Label>
              <Input
                id="bankName"
                {...form3.register("bankName")}
                className="rounded-xl border-input bg-canvas-soft"
              />
              {form3.formState.errors.bankName && (
                <p className="text-xs font-medium text-destructive">
                  {form3.formState.errors.bankName.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-foreground">Bank Country</Label>
              <Select
                value={form3.watch("bankCountry")}
                onValueChange={(value) => form3.setValue("bankCountry", value, { shouldValidate: true })}
              >
                <SelectTrigger className="rounded-xl border-input bg-canvas-soft">
                  <SelectValue placeholder="Select bank country" />
                </SelectTrigger>
                <SelectContent className="max-h-72">
                  {countryList.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form3.formState.errors.bankCountry ? (
                <p className="text-xs font-medium text-destructive">
                  {form3.formState.errors.bankCountry.message}
                </p>
              ) : (
                <p className="text-xs text-muted-foreground">
                  We will ask for the banking details relevant to this country.
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold text-foreground">Identification</Label>
            <FileDropzone
              files={form3.watch("idFiles")}
              onChange={(files) => form3.setValue("idFiles", files, { shouldValidate: true })}
              maxFiles={4}
              label="Upload your identification"
              description="Passport or national ID for the named passenger."
              error={form3.formState.errors.idFiles?.message}
            />
          </div>

          <div className="space-y-4 rounded-xl border border-border bg-canvas-soft p-4">
            <div className="flex items-start gap-3">
              <Checkbox
                id="terms"
                checked={form3.watch("terms")}
                onCheckedChange={(checked) => form3.setValue("terms", checked === true, { shouldValidate: true })}
                className="mt-0.5"
              />
              <Label htmlFor="terms" className="cursor-pointer text-sm font-normal leading-relaxed text-foreground">
                I have read and agree to the{" "}
                <a href="#" className="font-medium text-indigo hover:underline">
                  Terms and Conditions
                </a>
                .
              </Label>
            </div>
            <div className="flex items-start gap-3">
              <Checkbox
                id="privacy"
                checked={form3.watch("privacy")}
                onCheckedChange={(checked) => form3.setValue("privacy", checked === true, { shouldValidate: true })}
                className="mt-0.5"
              />
              <Label htmlFor="privacy" className="cursor-pointer text-sm font-normal leading-relaxed text-foreground">
                I have read and agree to the{" "}
                <a href="#" className="font-medium text-indigo hover:underline">
                  Privacy Policy
                </a>
                .
              </Label>
            </div>
            {(form3.formState.errors.terms || form3.formState.errors.privacy) && (
              <p className="text-xs font-medium text-destructive">You must agree to continue.</p>
            )}
          </div>
        </form>
      )}

      <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
        <Button
          type="button"
          variant="outline"
          onClick={handleBack}
          disabled={step === 1}
          className="rounded-full border-border bg-background px-5 text-foreground hover:bg-muted disabled:opacity-30"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back
        </Button>
        <Button
          type="button"
          onClick={handleNext}
          className="rounded-full bg-ink px-6 text-primary-foreground hover:bg-ink/90"
        >
          {step === 3 ? "Submit" : "Next"}
          {step !== 3 && <ChevronRight className="ml-1 h-4 w-4" />}
        </Button>
      </div>
    </FormShell>
  );
}
