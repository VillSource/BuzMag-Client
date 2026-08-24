import { createFileRoute } from "@tanstack/react-router";
import ManufacturingOrdersPage from "../pages/manufacturing/orders";

export const Route = createFileRoute("/manufacturing/orders")({
  component: ManufacturingOrdersPage,
});
