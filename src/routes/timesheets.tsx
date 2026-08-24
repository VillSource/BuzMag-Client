import { createFileRoute } from "@tanstack/react-router";
import TimesheetsPage from "../pages/timesheets";

export const Route = createFileRoute("/timesheets")({
  component: TimesheetsPage,
});
