import { createFileRoute } from "@tanstack/react-router";
import MarketingPage from "../pages/marketing";

export const Route = createFileRoute("/marketing")({
  component: MarketingPage,
});
