import NotificationPage from '@/pages/notification'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/notification')({
  component: NotificationPage,
})