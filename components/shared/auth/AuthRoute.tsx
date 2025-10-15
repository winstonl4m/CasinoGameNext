'use client'
import { useAuth } from '@/store/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect, useLayoutEffect, useState } from 'react'

export default function AuthRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useLayoutEffect(() => {
    setMounted(true)
  }, [])

  useLayoutEffect(() => {
    if (mounted && isAuthenticated) {
      router.push('/games')
    }
  }, [isAuthenticated, router, mounted])

  // During SSR and initial mount, render children
  if (!mounted) {
    return <>{children}</>
  }

  if (isAuthenticated) {
    return null
  }

  return <>{children}</>
}