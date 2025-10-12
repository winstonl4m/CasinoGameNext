import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import RegisterForm from './register-form'
import { Button } from '@/components/ui/button'

const RegisterPage = () => {
  return (
    <div className='w-full max-w-md mx-auto'>
        <Card>
            <CardHeader>
                <CardTitle>Register</CardTitle>
                <CardDescription>
                Enter your info below to create an account
                </CardDescription>

            </CardHeader>
            <CardContent>
                <RegisterForm/>
                
            </CardContent>

            
        </Card>
        
    </div>
  )
}

export default RegisterPage