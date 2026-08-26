import { OrganizationPage } from '@/pages/organizations/organization'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/organizations/')({
  component: OrganizationPage,
})
