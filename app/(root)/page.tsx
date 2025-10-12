import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { welcomeMessage } from '@/lib/constants'


const HomePage = () => {
  return (
    <div className="h-full bg-gray-900 text-white">
      <div className="relative h-full">
        <Image
          src={"/images/landing.jpg"}
          alt="Casino background"
          className="object-cover"
          priority
          fill
        />
        
        <div className="relative z-10">
          <main className="container mx-auto px-4 py-16">
            <div className="text-center">
              <h1 className="text-6xl font-bold mb-8">
                {welcomeMessage.title}
              </h1>
              <p className="text-xl mb-12">
                {welcomeMessage.description}
              </p>
              
                <Link href={"/games"} className='flex justify-center'>
                <div className=" mt-16 w-1/3">
                    <div className="p-6  bg-gray-800 bg-opacity-75 backdrop-blur-sm rounded-lg">
                      <div className='flex items-start justify-center gap-4 mb-4'>

                        <Image
                          src={"/images/icons/icon1.png"}
                          alt="icon1"
                          className="object-cover"
                          priority
                          width={64}
                          height={64}
                        />
                        <Image
                          src={"/images/icons/icon2.png"}
                          alt="icon2"
                          className="object-cover"
                          priority
                          width={64}
                          height={64}
                        />
                        <Image
                          src={"/images/icons/icon3.png"}
                          alt="icon3"
                          className="object-cover"
                          priority
                          width={64}
                          height={64}
                        />
                        <Image
                          src={"/images/icons/icon4.png"}
                          alt="icon4"
                          className="object-cover"
                          priority
                          width={64}
                          height={64}
                        />
                      </div>
                      <p className='text-white font-bold'>PLAY NOW</p>
                    </div>

                  
                </div>

                </Link>
              
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default HomePage