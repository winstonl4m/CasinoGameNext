import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  return <header className='w-full border-b'>
    <div className='wrapper flex-between'>
        <div className='flex-start'>
            <div className='flex-start'>

                <Link href={'/'}>
                <span className='hidden lg:block font-bold text-2xl ml-3'>CasinoDemo</span>
                </Link>
                
            </div>
        </div>
        <div className='flex justify-end gap-3'>
            <div className='flex gap-2 items-center'>
         
                <Button className='bg-green-600 font-bold hover:bg-green-700' asChild>
                    <Link href={'/register'}>
                    Register
                    </Link>
                </Button>
                <Button className='bg-green-600 font-bold hover:bg-green-700' asChild>
                    <Link href={'/login'}>
                    Login
                    </Link>
                </Button>
            </div>
        </div>
    </div>
    

  </header>

}

export default Header
