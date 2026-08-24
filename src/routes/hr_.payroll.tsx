import { createFileRoute } from "@tanstack/react-router";
import PayrollPage from "../pages/hr/payroll";

export const Route = createFileRoute("/hr_/payroll")({
  component: PayrollPage,
});
