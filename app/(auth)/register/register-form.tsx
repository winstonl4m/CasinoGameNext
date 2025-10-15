'use client'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ChevronDownIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema, RegisterInput } from '@/lib/validators'
import { calculateAge } from '@/lib/utils'

const RegisterForm = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(undefined)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      username: '',
      password: '',
      confirmPassword: '',
      dateOfBirth: new Date(),
    }
  })

  const onSubmit = async (data: RegisterInput) => {
    setIsLoading(true)
    const age = calculateAge(data.dateOfBirth)
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          username: data.username,
          password: data.password,
          dateOfBirth: age,
        }),
      })

      // Log the full response for debugging
      console.log('Full Response:', response)
      console.log('Status:', response.status)

      // First check status code
      if (response.status === 200 || response.status === 201) {
        let responseData;
        try {
          responseData = await response.json()
          console.log('Response Data:', responseData)
        } catch (parseError) {
          // If JSON parsing fails but status is success, still proceed
          console.warn('Could not parse JSON response:', parseError)
        }

        toast.success('Registration successful! Please login.')
        router.replace('/login')
        return
      }

      // If we get here, it's an error
      const errorData = await response.json()
      toast.error(errorData.message || 'Registration failed')
      
    } catch (err) {
      console.error('Registration error:', err)
      toast.error('Registration failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <div className="flex flex-col gap-6">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            {...register('name')}
            id="name"
            placeholder="John Smith"
          />
          {errors.name && (
            <span className="text-sm text-red-500">{errors.name.message}</span>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="username">Username</Label>
          <Input
            {...register('username')}
            id="username"
            placeholder="JohnSmith1"
          />
          {errors.username && (
            <span className="text-sm text-red-500">{errors.username.message}</span>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input 
            {...register('password')}
            id="password" 
            type="password"
            placeholder="Enter password"
          />
          {errors.password && (
            <span className="text-sm text-red-500">{errors.password.message}</span>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input 
            {...register('confirmPassword')}
            id="confirmPassword" 
            type="password"
            placeholder="Confirm password"
          />
          {errors.confirmPassword && (
            <span className="text-sm text-red-500">{errors.confirmPassword.message}</span>
          )}
        </div>

        <div className="grid gap-2">
          <Label>Date of birth</Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between font-normal"
              >
                {watch('dateOfBirth') ? 
                  watch('dateOfBirth').toLocaleDateString() : 
                  "Select date"
                }
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                captionLayout="dropdown"
                selected={watch('dateOfBirth') || new Date()} // Provide fallback date
                onSelect={(date) => {
                  setValue('dateOfBirth', date || new Date()) // Ensure we always set a Date
                  setOpen(false)
                  setDate(date)
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {errors.dateOfBirth && (
            <span className="text-sm text-red-500">{errors.dateOfBirth.message}</span>
          )}
        </div>
      </div>

      <Button type="submit" className="w-full mt-6" disabled={isLoading}>
        {isLoading ? 'Registering...' : 'Register'}
      </Button>

      <div className='text-sm text-center'>
        Already have an account?{' '} 
        <Link href={'/login'} className='text-blue-600 hover:underline'>
          Sign In
        </Link>
      </div>
    </form>
  )
}

export default RegisterForm