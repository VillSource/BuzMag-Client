import { createFileRoute } from '@tanstack/react-router'
import PingPage from '../pages/ping'

export const Route = createFileRoute('/ping/$name')({
  component: PingPage,
})