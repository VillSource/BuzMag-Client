import { createFileRoute } from "@tanstack/react-router";
import MyFilesPage from "../pages/my-files";

export const Route = createFileRoute("/my-files")({
  component: MyFilesPage,
});
