import { createFileRoute } from "@tanstack/react-router";
import SocialMarketingPage from "../pages/marketing/social";

export const Route = createFileRoute("/marketing_/social")({
  component: SocialMarketingPage,
});
