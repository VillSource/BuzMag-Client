import { useState, type FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import {
  ArrowRightIcon,
  Building2Icon,
  LockIcon,
  MailIcon,
} from "lucide-react";

import { apiClient } from "@/client";
import { issueJwtTokensMutationOptions } from "@/api/hooks/identity/useIssueJwtTokens";
import { tokenStore } from "@/features/auth/token-store";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const TENANT_STORAGE_KEY = "buzmag.tenant";

function getSavedTenant(): string | null {
  const value = localStorage.getItem(TENANT_STORAGE_KEY);
  return value && value.trim() ? value.trim() : null;
}

function mapLoginError(error: unknown): string {
  const status = (error as { status?: number }).status;
  if (status === 401) return "Invalid email or password.";
  if (status === 400) return "The credentials are invalid for this tenant.";
  if (status === 403) return "You don't have access to this workspace.";
  if (status === 500) return "Something went wrong on our side. Please try again.";
  return error instanceof Error ? error.message : "Sign-in failed. Please try again.";
}

export default function LoginPage() {
  const navigate = useNavigate();

  // Persisted tenant — if set, we skip the tenant step on future visits.
  const [tenant, setTenant] = useState<string | null>(() => getSavedTenant());

  // Tenant step
  const [tenantInput, setTenantInput] = useState("");
  const [tenantError, setTenantError] = useState<string | null>(null);

  // Credentials step
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const signInMutation = useMutation(issueJwtTokensMutationOptions({ client: apiClient }));

  const handleTenantSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next = tenantInput.trim();
    if (!next) {
      setTenantError("Please enter your tenant ID.");
      return;
    }
    localStorage.setItem(TENANT_STORAGE_KEY, next);
    setTenant(next);
    setTenantError(null);
    setTenantInput("");
  };

  // Switch to a different tenant — clears the remembered tenant and re-asks.
  const handleChangeTenant = () => {
    localStorage.removeItem(TENANT_STORAGE_KEY);
    setTenant(null);
    setError(null);
  };

  const handleSignIn = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError("Enter your email and password to continue.");
      return;
    }
    setError(null);
    signInMutation.mutate(
      {
        headers: { tenant: tenant ?? "root" },
        body: { email: email.trim(), password },
      },
      {
        onSuccess: (data) => {
          // Store the JWT pair — refresh token persists, access token lives in state.
          tokenStore.setTokens(data.accessToken, data.refreshToken);
          void navigate({ to: "/dashboard" });
        },
        onError: (err) => {
          setError(mapLoginError(err));
        },
      },
    );
  };

  return (
    <div className="relative flex min-h-svh items-center justify-center overflow-hidden bg-muted/40 px-4 py-10">
      {/* Soft background wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--color-primary)/0.08,transparent_55%)]"
      />

      <div className="w-full max-w-sm">
        {/* Brand */}
        <div className="mb-6 flex flex-col items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-xl bg-amber-800 text-lg font-bold text-white shadow-sm">
            M
          </span>
          <span className="font-heading text-xl font-semibold tracking-tight">BuzMag</span>
        </div>

        <Card className="w-full">
          {tenant ? (
            /* ------------------- Credentials step ------------------- */
            <>
              <CardHeader className="text-center">
                <CardTitle className="text-lg">Welcome back</CardTitle>
                <CardDescription>Sign in to your BuzMag workspace.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                {/* Current tenant */}
                <div className="flex items-center justify-between gap-3 rounded-lg border bg-muted/50 px-3 py-2">
                  <div className="flex min-w-0 items-center gap-2">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-amber-700 to-amber-900 text-white">
                      <Building2Icon aria-hidden="true" className="size-3.5" />
                    </span>
                    <span className="truncate text-sm font-medium">{tenant}</span>
                  </div>
                  <Button type="button" variant="ghost" size="sm" onClick={handleChangeTenant}>
                    Change
                  </Button>
                </div>

                <Separator />

                <form onSubmit={handleSignIn} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="email">Email</Label>
                    <InputGroup>
                      <InputGroupInput
                        id="email"
                        type="email"
                        placeholder="you@company.com"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <InputGroupAddon align="inline-start">
                        <MailIcon aria-hidden="true" className="text-muted-foreground" />
                      </InputGroupAddon>
                    </InputGroup>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <Label htmlFor="password">Password</Label>
                      <button
                        type="button"
                        className="text-xs font-medium text-primary underline underline-offset-4"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <InputGroup>
                      <InputGroupInput
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <InputGroupAddon align="inline-start">
                        <LockIcon aria-hidden="true" className="text-muted-foreground" />
                      </InputGroupAddon>
                    </InputGroup>
                  </div>

                  {error && (
                    <p role="alert" className="text-xs font-normal text-destructive">
                      {error}
                    </p>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={signInMutation.isPending}
                  >
                    {signInMutation.isPending ? "Signing in…" : "Sign in"}
                  </Button>
                </form>
              </CardContent>
            </>
          ) : (
            /* --------------------- Tenant step ---------------------- */
            <>
              <CardHeader className="text-center">
                <CardTitle className="text-lg">Welcome to BuzMag</CardTitle>
                <CardDescription>
                  Enter your tenant ID to sign in to your workspace.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleTenantSubmit} className="flex flex-col gap-1.5">
                  <Label htmlFor="tenant">Tenant ID</Label>
                  <InputGroup>
                    <InputGroupInput
                      id="tenant"
                      placeholder="e.g. acme"
                      autoComplete="organization"
                      autoFocus
                      value={tenantInput}
                      onChange={(e) => {
                        setTenantInput(e.target.value);
                        if (tenantError) setTenantError(null);
                      }}
                    />
                    <InputGroupAddon align="inline-start">
                      <Building2Icon aria-hidden="true" className="text-muted-foreground" />
                    </InputGroupAddon>
                  </InputGroup>

                  {tenantError && (
                    <p role="alert" className="text-xs font-normal text-destructive">
                      {tenantError}
                    </p>
                  )}

                  <Button type="submit" size="lg" className="mt-3 w-full">
                    Continue
                    <ArrowRightIcon aria-hidden="true" data-icon="inline-end" />
                  </Button>
                </form>
              </CardContent>
            </>
          )}
        </Card>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          © 2026 BuzMag by Villsource. All rights reserved.
        </p>
      </div>
    </div>
  );
}
