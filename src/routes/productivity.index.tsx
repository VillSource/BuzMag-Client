import { createFileRoute } from "@tanstack/react-router";
import ProductivityPage from "../pages/productivity";

export const Route = createFileRoute("/productivity/")({
  component: ProductivityPage,
});
