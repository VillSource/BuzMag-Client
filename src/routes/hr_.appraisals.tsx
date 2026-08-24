import { createFileRoute } from "@tanstack/react-router";
import AppraisalsPage from "../pages/hr/appraisals";

export const Route = createFileRoute("/hr_/appraisals")({
  component: AppraisalsPage,
});
