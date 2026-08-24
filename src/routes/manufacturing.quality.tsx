import { createFileRoute } from "@tanstack/react-router";
import QualityControlPage from "../pages/manufacturing/quality";

export const Route = createFileRoute("/manufacturing/quality")({
  component: QualityControlPage,
});
