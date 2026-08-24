import { createFileRoute } from "@tanstack/react-router";
import { SalesOrdersPage } from "../pages/sales/orders";

export const Route = createFileRoute("/sales_/orders")({
  component: SalesOrdersPage,
});
