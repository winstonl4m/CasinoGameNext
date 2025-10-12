import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import { Button } from 'react-day-picker'
import LoginForm from './login-form'

const LoginPage = () => {
  return (
    <div className='w-full max-w-md mx-auto'>
        <Card>
            <CardHeader>
                <CardTitle>Sign In</CardTitle>
                <CardDescription>
                Enter your username and password below to login to your account
                </CardDescription>
                <CardAction>
                </CardAction>
            </CardHeader>
            <CardContent>
                <LoginForm/>
                
            </CardContent>

            
        </Card>
        
    </div>
  )
}

export default LoginPage