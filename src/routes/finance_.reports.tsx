import { createFileRoute } from "@tanstack/react-router";
import FinancialReportsPage from "../pages/finance/reports";

export const Route = createFileRoute("/finance_/reports")({
  component: FinancialReportsPage,
});
