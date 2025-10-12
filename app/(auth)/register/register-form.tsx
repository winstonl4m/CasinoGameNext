'use client'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ChevronDownIcon } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React from 'react'

const RegisterForm = () => {

    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get('callbackUrl') || '/'

    const [open, setOpen] = React.useState(false)
    const [date, setDate] = React.useState<Date | undefined>(undefined)



    const RegisterButton = () => {
        return (<Button type="submit" className="w-full mt-6">
            Register
        </Button>
        )
    }


  return <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Smith"
                required
              />
            </div>
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
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
              </div>
              <Input 
                id="confirmPassword" 
                type="password"
                name="confirmPassword" 
                placeholder="Confirm password"
                required 
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="date" className="px-1">
                    Date of birth
                </Label>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        id="date"
                        className="w-full justify-between font-normal"
                    >
                        {date ? date.toLocaleDateString() : "Select date"}
                        <ChevronDownIcon />
                    </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={date}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                        setDate(date)
                        setOpen(false)
                        }}
                    />
                    </PopoverContent>
                </Popover>
                </div>
          </div>
          <div>
            <RegisterButton/>
          </div>

          <div className='text-sm text-center'>
            Already have an account?{' '} 
            <Link href={'/login'} target='_self' className='link'>Sign In</Link>

          </div>
        </form>

}

export default RegisterForm