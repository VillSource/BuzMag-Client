import { createFileRoute } from "@tanstack/react-router";
import ApprovalsPage from "../pages/productivity/approvals";

export const Route = createFileRoute("/productivity_/approvals")({
  component: ApprovalsPage,
});
