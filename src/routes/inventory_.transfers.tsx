import { createFileRoute } from "@tanstack/react-router";
import TransfersPage from "../pages/inventory/transfers";

export const Route = createFileRoute("/inventory_/transfers")({
  component: TransfersPage,
});
