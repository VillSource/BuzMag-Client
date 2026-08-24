import { createFileRoute } from "@tanstack/react-router";
import TodoTasksPage from "../pages/productivity/todo";

export const Route = createFileRoute("/productivity_/todo")({
  component: TodoTasksPage,
});
