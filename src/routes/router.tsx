import React from 'react'
import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router'
import { createBrowserHistory } from '@tanstack/react-router'
import AppShell from '../app-shell/AppShell'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import { Outlet } from '@tanstack/react-router'

// Root route renders the AppShell and an Outlet where child routes mount
const RootRoute = createRootRoute({
  component: () => (
    <AppShell header={<Header />} sidebar={<Sidebar />} footer={<Footer />}>
      <Outlet />
    </AppShell>
  ),
})

// Lazy feature: Home
const HomeComponent = React.lazy(() => import('../features/home'))

const HomeRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: '/',
  component: HomeComponent,
})

// Attach children to the root
RootRoute.addChildren([HomeRoute])

// Create the router
export const router = createRouter({
  routeTree: RootRoute,
  history: createBrowserHistory(),
})

export default router
