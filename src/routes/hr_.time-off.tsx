import { createFileRoute } from "@tanstack/react-router";
import TimeOffPage from "../pages/hr/time-off";

export const Route = createFileRoute("/hr_/time-off")({
  component: TimeOffPage,
});
