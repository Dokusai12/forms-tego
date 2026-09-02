import { createFileRoute } from "@tanstack/react-router";
import {
  BaggageShieldPage,
  baggageShieldHead,
} from "@/sites/baggage-shield/BaggageShieldForm";

export const Route = createFileRoute("/baggage-shield")({
  head: baggageShieldHead,
  component: BaggageShieldPage,
});
