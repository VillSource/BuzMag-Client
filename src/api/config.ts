/**
 * Shared API configuration used by the Kubb-generated clients.
 *
 * Override with `VITE_API_URL` in a `.env` file when pointing at a real backend.
 */
export const API_BASE_URL: string =
  (import.meta.env.VITE_API_URL as string | undefined) ?? "https://localhost:7030";
