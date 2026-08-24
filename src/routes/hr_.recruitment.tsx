import { createFileRoute } from "@tanstack/react-router";
import RecruitmentPage from "../pages/hr/recruitment";

export const Route = createFileRoute("/hr_/recruitment")({
  component: RecruitmentPage,
});
