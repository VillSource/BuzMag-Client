import { useSyncExternalStore } from "react";

import { client as baseClient } from "@/api/.kubb/client";
import { refreshJwtTokens } from "@/api/clients/refreshJwtTokens";
import { API_BASE_URL } from "@/config";

/**
 * Token store for JWT authentication.
 *
 * - `accessToken` lives in React state (module-level store) so the UI can react
 *   to sign-in / sign-out / refresh without a full page reload.
 * - `refreshToken` is persisted in `localStorage` so a page reload can restore
 *   the session.
 *
 * `refresh()` uses a single shared in-flight promise so concurrent 401s trigger
 * only one refresh request (token rotation is handled by the API).
 */

const REFRESH_STORAGE_KEY = "buzmag.refreshToken";
const TENANT_STORAGE_KEY = "buzmag.tenant";

/** A bare client (no auth, no refresh-retry) used only to call the refresh endpoint. */
const refreshClient = baseClient.createClient({ baseURL: API_BASE_URL });

let accessToken: string | null = null;
let refreshInFlight: Promise<boolean> | null = null;
const listeners = new Set<() => void>();

function notify(): void {
  for (const listener of listeners) listener();
}

function getRefreshToken(): string | null {
  return localStorage.getItem(REFRESH_STORAGE_KEY);
}

function getTenant(): string {
  return localStorage.getItem(TENANT_STORAGE_KEY)?.trim() || "root";
}

function setTokens(access: string, refresh: string): void {
  accessToken = access;
  localStorage.setItem(REFRESH_STORAGE_KEY, refresh);
  notify();
}

function clearTokens(): void {
  accessToken = null;
  localStorage.removeItem(REFRESH_STORAGE_KEY);
  notify();
}

async function doRefresh(): Promise<boolean> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return false;

  try {
    const { data } = await refreshJwtTokens({
      client: refreshClient,
      headers: { tenant: getTenant() },
      body: { token: accessToken, refreshToken },
      throwOnError: true,
    });
    // The API rotates both tokens on refresh.
    setTokens(data.token, data.refreshToken);
    return true;
  } catch {
    // Refresh token is invalid or expired -> force the user to sign in again.
    clearTokens();
    return false;
  }
}

export const tokenStore = {
  getAccessToken: () => accessToken,
  getRefreshToken,
  getTenant,
  setTokens,
  clear: clearTokens,
  subscribe: (listener: () => void) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
  /** Exchanges the current tokens for a fresh pair. Safe to call concurrently. */
  refresh: (): Promise<boolean> => {
    refreshInFlight ??= doRefresh().finally(() => {
      refreshInFlight = null;
    });
    return refreshInFlight;
  },
};

/** Reactive hook — re-renders components when the access token changes. */
export function useAccessToken(): string | null {
  return useSyncExternalStore(tokenStore.subscribe, tokenStore.getAccessToken);
}
