import { createFileRoute } from "@tanstack/react-router";
import SalesPage from "../pages/sales";

export const Route = createFileRoute("/sales")({
  component: SalesPage,
});
