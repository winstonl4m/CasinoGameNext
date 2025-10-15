"use client"
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useAuth } from '@/store/auth-context'
import { toast } from "sonner"


const Header = () => {

    const {isAuthenticated, user, logout, updateBalance} = useAuth()
    const [isMounted, setIsMounted] = useState(false)

    const [showDepositDialog, setShowDepositDialog] = useState(false)
    const [selectedAmount, setSelectedAmount] = useState<string>('')

    useEffect(() => {
        setIsMounted(true)
    }, [])



    const handleLogout = () => {
        logout()
    }

    // deposit into user
    const handleDeposit = async () => {
        if (!selectedAmount) {
            toast.error('Please select an amount')
            return
        }

        try {
            const amount = parseInt(selectedAmount)
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
                },
                body: JSON.stringify({
                    amount: amount
                })
            })

            const data = await response.json()
            console.log(data)
    


            

            // Update local state with new balance
            await updateBalance(data.balance)
            toast.success(`Successfully deposited $${amount}`)
            setShowDepositDialog(false)
            setSelectedAmount('')
        } catch (error) {
            console.error('Deposit error:', error)
            toast.error(error instanceof Error ? error.message : 'Failed to process deposit')
        }
    }

    // Render a simplified version during SSR and initial mount
    if (!isMounted) {
        return (
            <header className='w-full border-b'>
                <div className='wrapper flex-between'>
                    <div className='flex-start'>
                        <Link href={'/'}>
                            <span className='hidden lg:block font-bold text-2xl ml-3'>CasinoDemo</span>
                        </Link>
                    </div>
                    <div className='flex justify-end gap-3'></div>
                </div>
            </header>
        )
    }

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
            {isAuthenticated && user ? (
                <div className='flex gap-2 items-center'>
                    <div className='flex'>
                        <span className='font-bold'>Hello {user.name}</span>
                    </div>
                    <div className='flex'>
                        <span className='font-bold'>Balance: ${user.balance} EUR</span>
                    </div>
                    <Button 
                        className='bg-green-600 font-bold hover:bg-green-700'
                        onClick={() => setShowDepositDialog(true)}
                    >
                        Add balance
                    </Button>
         
                    <Button 
                        className='bg-green-600 font-bold hover:bg-green-700'
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                    {/* Deposit Dialog */}
                        <Dialog open={showDepositDialog} onOpenChange={setShowDepositDialog}>
                            <DialogContent className="bg-gray-800 text-white">
                                <DialogHeader>
                                    <DialogTitle>Add Balance</DialogTitle>
                                </DialogHeader>
                                <div className="py-4">
                                    <Select
                                        value={selectedAmount}
                                        onValueChange={setSelectedAmount}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select amount" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1">$1</SelectItem>
                                            <SelectItem value="5">$5</SelectItem>
                                            <SelectItem value="10">$10</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <DialogFooter>
                                    <Button
                                        className="bg-red-600 hover:bg-red-700"
                                        variant="outline"
                                        onClick={() => setShowDepositDialog(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        className="bg-green-600 hover:bg-green-700"
                                        onClick={handleDeposit}
                                        disabled={!selectedAmount}
                                    >
                                        Deposit
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                </div>
                ) : (
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
                    </div>)}       
        </div>
    </div>
    

  </header>

}

export default Header
