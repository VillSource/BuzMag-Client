import { createRootRoute, Outlet } from '@tanstack/react-router'
import AppShell from '../app-shell/AppShell'

export const Route = createRootRoute({
  component: () => (
    <AppShell>
      <Outlet />
    </AppShell>
  ),
})