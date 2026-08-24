import { createFileRoute } from "@tanstack/react-router";
import SurveysPage from "../pages/marketing/surveys";

export const Route = createFileRoute("/marketing_/surveys")({
  component: SurveysPage,
});
