import { PositionPage } from '@/pages/organizations/position'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/organizations_/positions')({
  component: PositionPage,
})
