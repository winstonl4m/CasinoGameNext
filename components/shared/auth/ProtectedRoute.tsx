'use client'
import { useAuth } from '@/store/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect, useLayoutEffect } from 'react'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useLayoutEffect(() => {
    if (!isAuthenticated) {
      router.push(`/login?callbackUrl=${window.location.pathname}`)
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}