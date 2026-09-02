import { createFileRoute } from "@tanstack/react-router";
import { AirShieldPage, airShieldHead } from "@/sites/air-shield/AirShieldForm";

export const Route = createFileRoute("/air-shield")({
  head: airShieldHead,
  component: AirShieldPage,
});
