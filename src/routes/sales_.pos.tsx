import { createFileRoute } from "@tanstack/react-router";
import SalesPosPage from "../pages/sales/pos";

export const Route = createFileRoute("/sales_/pos")({
  component: SalesPosPage,
});
