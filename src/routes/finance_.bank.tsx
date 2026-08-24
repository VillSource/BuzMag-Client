import { createFileRoute } from "@tanstack/react-router";
import BankSynchronizationPage from "../pages/finance/bank";

export const Route = createFileRoute("/finance_/bank")({
  component: BankSynchronizationPage,
});
