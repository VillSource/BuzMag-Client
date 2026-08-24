import { createFileRoute } from "@tanstack/react-router";
import AttendancesPage from "../pages/hr/attendances";

export const Route = createFileRoute("/hr_/attendances")({
  component: AttendancesPage,
});
