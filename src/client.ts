import {
  client as baseClient,
  type CallResult,
  type ClientInstance,
  type RequestConfig,
} from "@/api/.kubb/client";

import { tokenStore } from "@/features/auth/token-store";
import { API_BASE_URL } from "@/config";

export { API_BASE_URL } from "@/config";

/** Operations that must never trigger a refresh-retry (credentials exchange). */
const AUTH_PATHS = ["/api/v1/identity/token/issue", "/api/v1/identity/token/refresh"];

function isAuthPath(url: string | undefined): boolean {
  if (!url) return false;
  return AUTH_PATHS.some((path) => url.includes(path));
}

/**
 * Client bound to the API base URL that automatically attaches the Bearer
 * access token to every secured request. It does not retry.
 */
export const authenticatedClient: ClientInstance = baseClient.createClient({
  baseURL: API_BASE_URL,
  auth: async () => tokenStore.getAccessToken() ?? undefined,
});

/**
 * Custom client for all Kubb / TanStack Query operations.
 *
 * 1. Automatically attaches the current access token.
 * 2. On a `401 Unauthorized` (and the call is not itself the login/refresh
 *    endpoint) it refreshes the tokens and retries the request exactly once.
 * 3. Works with `throwOnError: true` (throws `ResponseError`) and
 *    `throwOnError: false` (returns a result with `status: 401`).
 */
export const apiClient: ClientInstance = (async <TBody = unknown>(
  config: RequestConfig<TBody>,
): Promise<CallResult> => {
  try {
    const result = await authenticatedClient(config);
    if (result.status === 401 && !isAuthPath(config.url)) {
      if (await tokenStore.refresh()) {
        return authenticatedClient(config);
      }
    }
    return result;
  } catch (error) {
    if ((error as { status?: number }).status === 401 && !isAuthPath(config.url)) {
      if (await tokenStore.refresh()) {
        return authenticatedClient(config);
      }
    }
    throw error;
  }
}) as unknown as ClientInstance;

/**
 * Wire the shared generated client (used by every Kubb hook unless a `client`
 * is passed) to the API base URL + Bearer token resolver, so generated calls
 * authenticate out of the box. Pass `client: apiClient` where the 401 refresh
 * retry should also apply.
 */
baseClient.setConfig({
  baseURL: API_BASE_URL,
  auth: async () => tokenStore.getAccessToken() ?? undefined,
});
