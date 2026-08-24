import { createFileRoute } from "@tanstack/react-router";
import PurchaseMrpPage from "../pages/inventory/purchase";

export const Route = createFileRoute("/inventory_/purchase")({
  component: PurchaseMrpPage,
});
