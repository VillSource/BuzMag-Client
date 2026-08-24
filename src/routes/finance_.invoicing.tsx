import { createFileRoute } from "@tanstack/react-router";
import InvoicingPage from "../pages/finance/invoicing";

export const Route = createFileRoute("/finance_/invoicing")({
  component: InvoicingPage,
});
