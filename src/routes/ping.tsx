import React from 'react'
import { createRoute } from '@tanstack/react-router'

// Lazy-load the Ping page (feature)
const PingComponent = React.lazy(() => import('../features/ping'))

export function makePingRoute(rootRoute: any) {
  return createRoute({
    getParentRoute: () => rootRoute,
    path: 'ping/$name',
    component: PingComponent,
  })
}

export default makePingRoute
