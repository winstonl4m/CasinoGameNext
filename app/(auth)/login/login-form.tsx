'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import { useAuth } from '@/store/auth-context'
import { log } from 'console'

const LoginForm = () => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const callbackUrl = searchParams.get('callbackUrl') || '/games'
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const {loginSuccess} = useAuth()
    


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setIsLoading(true)
      setError(null)

      const formData = new FormData(e.currentTarget)
      
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: formData.get('username'),
            password: formData.get('password'),
          }),
          credentials: 'include', // Important for handling cookies
        })

        

        const data = await response.json()
        console.log(data)

        if (!response.ok) {
          setError(data.message)
          return
        }
        
        // Destructure the response data
        const { message, user, jwtToken } = data
        

        // Use auth context to handle login
        loginSuccess(jwtToken, user)


        router.push(callbackUrl)
        router.refresh()
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong')
      } finally {
        setIsLoading(false)
      }
    }


    const LoginButton = () => {
        return (<Button 
            type="submit" 
            className="w-full mt-6" 
            disabled={isLoading}
        >
            {isLoading ? 'Logging in...' : 'Login'}
        </Button>
        )
    }


  return <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-6">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
        <div className="grid gap-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            name="username"
            placeholder="JohnSmith1"
            required
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input 
            id="password" 
            type="password"
            name="password" 
            placeholder="Enter password"
            required 
          />
        </div>
      </div>
      <div>
        <LoginButton />
      </div>

      <div className='text-sm text-center mt-4'>
        Don't have an account?{' '} 
        <Link href={'/register'} className='text-blue-600 hover:underline'>
          Register
        </Link>
      </div>
    </form>
}

export default LoginForm