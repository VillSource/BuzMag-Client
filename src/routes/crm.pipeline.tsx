import { createFileRoute } from "@tanstack/react-router";
import PipelinePage from "../pages/crm/pipeline";

export const Route = createFileRoute("/crm/pipeline")({
  component: PipelinePage,
});
