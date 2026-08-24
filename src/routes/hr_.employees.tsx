import { createFileRoute } from "@tanstack/react-router";
import EmployeesPage from "../pages/hr/employees";

export const Route = createFileRoute("/hr_/employees")({
  component: EmployeesPage,
});
