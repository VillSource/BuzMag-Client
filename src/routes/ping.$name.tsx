import { createFileRoute } from '@tanstack/react-router'
import PingPage from '../features/ping'

export const Route = createFileRoute('/ping/$name')({
  component: PingPage,
})