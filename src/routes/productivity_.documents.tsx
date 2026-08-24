import { createFileRoute } from "@tanstack/react-router";
import DocumentsPage from "../pages/productivity/documents";

export const Route = createFileRoute("/productivity_/documents")({
  component: DocumentsPage,
});
