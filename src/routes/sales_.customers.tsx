import { createFileRoute } from "@tanstack/react-router";
import SalesCustomersPage from "../pages/sales/customers";

export const Route = createFileRoute("/sales_/customers")({
  component: SalesCustomersPage,
});
