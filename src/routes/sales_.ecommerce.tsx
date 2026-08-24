import { createFileRoute } from "@tanstack/react-router";
import SalesEcommercePage from "../pages/sales/ecommerce";

export const Route = createFileRoute("/sales_/ecommerce")({
  component: SalesEcommercePage,
});
