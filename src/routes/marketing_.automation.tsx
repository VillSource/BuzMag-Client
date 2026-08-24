import { createFileRoute } from "@tanstack/react-router";
import MarketingAutomationPage from "../pages/marketing/automation";

export const Route = createFileRoute("/marketing_/automation")({
  component: MarketingAutomationPage,
});
