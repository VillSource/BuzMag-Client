import { createFileRoute } from "@tanstack/react-router";
import MaintenancePage from "../pages/manufacturing/maintenance";

export const Route = createFileRoute("/manufacturing/maintenance")({
  component: MaintenancePage,
});
