import { createRootRoute, Outlet, useRouterState } from '@tanstack/react-router'
import AppShell from '../app-shell/AppShell'

function RootComponent() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })

  // Public pages (e.g. /login) render fully outside the app shell.
  if (pathname === '/login') {
    return <Outlet />
  }

  return (
    <AppShell>
      <Outlet />
    </AppShell>
  )
}

export const Route = createRootRoute({
  component: RootComponent,
})