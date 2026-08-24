import { createFileRoute } from "@tanstack/react-router";
import ProjectPage from "../pages/project";

export const Route = createFileRoute("/project")({
  component: ProjectPage,
});
