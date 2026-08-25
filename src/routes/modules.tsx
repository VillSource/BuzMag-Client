import ModulesPage from '@/pages/modules'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/modules')({
  component: ModulesPage,
})
