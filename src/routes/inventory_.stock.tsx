import { createFileRoute } from "@tanstack/react-router";
import InventoryPage from "../pages/inventory/stock";

export const Route = createFileRoute("/inventory_/stock")({
  component: InventoryPage,
});
