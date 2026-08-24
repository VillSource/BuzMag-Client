import { createFileRoute } from "@tanstack/react-router";
import EventsPage from "../pages/marketing/events";

export const Route = createFileRoute("/marketing_/events")({
  component: EventsPage,
});
