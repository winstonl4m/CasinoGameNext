import Header from '@/components/shared/header';
import React from 'react'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex h-screen flex-col'>
        <Header/>
        <main className="flex-1 wrapper">
            {children}
        </main>
    </div>

  );
}
