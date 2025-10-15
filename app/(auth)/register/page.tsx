import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React, { useState } from 'react'
import RegisterForm from './register-form'
import { Button } from '@/components/ui/button'
import AuthRoute from '@/components/shared/auth/AuthRoute'
import { useAuth } from '@/store/auth-context'
import { useRouter } from 'next/navigation'

const RegisterPage = () => {

  



  return (
    <AuthRoute>
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
    </AuthRoute>
  )
}

export default RegisterPage