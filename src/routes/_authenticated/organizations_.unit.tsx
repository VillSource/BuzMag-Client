import { OrganizationUnitPage } from '@/pages/organizations/organization-unit'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/organizations_/unit')({
  component: OrganizationUnitPage,
})