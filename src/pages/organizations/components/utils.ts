/** Format an ISO date-time to a short local date. */
export function formatDate(value: string | null | undefined): string {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "—"
    : date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
}

/** Map an API error to a human-friendly message. */
export function errorMessage(error: unknown): string {
  if (!error) return "";
  const status = (error as { status?: number }).status;
  if (status === 401) return "Unauthorized. Please sign in again.";
  if (status === 403) return "You don't have permission to do that.";
  if (status === 404) return "The record was not found.";
  if (status === 409) return "A record with this code already exists.";
  if (status === 500) return "Something went wrong on the server.";
  return error instanceof Error ? error.message : "Something went wrong.";
}
