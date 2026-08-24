import { createFileRoute } from "@tanstack/react-router";
import HelpdeskPage from "../pages/helpdesk";

export const Route = createFileRoute("/helpdesk")({
  component: HelpdeskPage,
});
