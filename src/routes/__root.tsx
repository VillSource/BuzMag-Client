import { createRootRoute, Outlet } from '@tanstack/react-router'
import AppShell from '../app-shell/AppShell'
import Footer from '../features/Footer'
import Header from '../features/Header'
import Sidebar from '../features/Sidebar'

export const Route = createRootRoute({
  component: () => (
    <AppShell header={<Header />} sidebar={<Sidebar />} footer={<Footer />}>
      <Outlet />
    </AppShell>
  ),
})