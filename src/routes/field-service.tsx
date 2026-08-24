import { createFileRoute } from "@tanstack/react-router";
import FieldServicePage from "../pages/field-service";

export const Route = createFileRoute("/field-service")({
  component: FieldServicePage,
});
