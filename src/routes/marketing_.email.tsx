import { createFileRoute } from "@tanstack/react-router";
import EmailMarketingPage from "../pages/marketing/email";

export const Route = createFileRoute("/marketing_/email")({
  component: EmailMarketingPage,
});
