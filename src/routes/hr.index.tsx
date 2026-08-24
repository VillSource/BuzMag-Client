import { createFileRoute } from "@tanstack/react-router";
import HrPage from "../pages/hr";

export const Route = createFileRoute("/hr/")({
  component: HrPage,
});
