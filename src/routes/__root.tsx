import { createRootRoute, Outlet } from '@tanstack/react-router'
import AppShell from '../app-shell/AppShell'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

export const Route = createRootRoute({
  component: () => (
    <AppShell header={<Header />} sidebar={<Sidebar />} footer={<Footer />}>
      <Outlet />
    </AppShell>
  ),
})