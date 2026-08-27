import { createFileRoute, redirect } from '@tanstack/react-router'
import { tokenStore } from '@/features/auth/token-store'
import LoginPage from '@/pages/login'

export const Route = createFileRoute('/login')({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      redirect: (search.redirect as string) || '/',
    }
  },
  beforeLoad: ({ search }) => {
    if (!!tokenStore.getRefreshToken()) {
      throw redirect({ to: search.redirect })
    }
  },
  component: LoginPage,
})