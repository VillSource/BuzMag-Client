import { createFileRoute } from "@tanstack/react-router";
import PaymentsPage from "../pages/finance/payments";

export const Route = createFileRoute("/finance_/payments")({
  component: PaymentsPage,
});
