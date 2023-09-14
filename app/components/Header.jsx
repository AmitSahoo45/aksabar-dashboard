'use client';

import Image from "next/image";
import { useState } from "react";
import { GrNotification } from 'react-icons/gr'
import { useSession } from 'next-auth/react'

const Header = () => {
    const [search, setSearch] = useState('')

    const { data: session, status } = useSession()

    return (
        <header className='flex sm:items-center items-start justify-between sm:flex-row flex-col'>
            <div>
                <h2 className="text-2xl font-bold sm:mb-0 mb-2">Dashboard</h2>
            </div>

            <div className="flex items-center sm:justify-center justify-between sm:w-auto w-full">
                <input
                    type="text"
                    placeholder="Search"
                    className="rounded-lg px-2 py-2 bg-white focus:outline-none transition-all duration-200"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <GrNotification
                    className="sm:ml-3 ml-1 text-2xl hover:cursor-pointer"
                />
                <div className="w-7 h-7 sm:ml-6 ml-1 sm:mr-0 mr-3">
                    <img src={session?.user?.image} alt='Profile' className='rounded-full' />
                </div>
            </div>
        </header>
    )
}

export default Header