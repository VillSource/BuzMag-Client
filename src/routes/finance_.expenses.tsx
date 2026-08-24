import { createFileRoute } from "@tanstack/react-router";
import ExpensesPage from "../pages/finance/expenses";

export const Route = createFileRoute("/finance_/expenses")({
  component: ExpensesPage,
});
