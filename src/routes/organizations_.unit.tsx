import { OrganizationUnitPage } from '@/pages/organizations/organization-unit'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/organizations_/unit')({
  component: OrganizationUnitPage,
})