import { createFileRoute } from "@tanstack/react-router";
import SalesQuotationsPage from "../pages/sales/quotations";

export const Route = createFileRoute("/sales_/quotations")({
  component: SalesQuotationsPage,
});
