import React from 'react'
import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router'
import { createBrowserHistory } from '@tanstack/react-router'
import AppShell from '../app-shell/AppShell'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import { Outlet } from '@tanstack/react-router'

// Root route renders the AppShell and an Outlet where child routes mount
// Pathless root
const RootRoute = createRootRoute()

// App layout route renders the AppShell and an Outlet where child routes mount
const AppLayoutRoute = createRoute({
  getParentRoute: () => RootRoute,
  id: 'app',
  component: () => (
    <AppShell header={<Header />} sidebar={<Sidebar />} footer={<Footer />}>
      <Outlet />
    </AppShell>
  ),
})

// Lazy feature: Home
const HomeComponent = React.lazy(() => import('../features/home'))

const HomeRoute = createRoute({
  getParentRoute: () => AppLayoutRoute,
  // index route under the layout
  path: '/',
  component: HomeComponent,
})

// Register layout and children
RootRoute.addChildren([AppLayoutRoute])
const PingComponent = React.lazy(() => import('../features/ping'))
const PingRoute = createRoute({
  getParentRoute: () => AppLayoutRoute,
  path: 'ping/$name',
  component: PingComponent,
})

AppLayoutRoute.addChildren([HomeRoute, PingRoute])

// Create the router
export const router = createRouter({
  routeTree: RootRoute,
  history: createBrowserHistory(),
})

export default router
