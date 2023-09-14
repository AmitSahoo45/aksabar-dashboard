'use client';

import Image from 'next/image'
import React from 'react'

const Stats = () => {
    return (
        <section className='mt-5 mb-4 flex flex-wrap justify-between'>

            <div className="flex-1 p-4 bg-white rounded-2xl border-2 border-neutral-200 mt-2 mr-6">
                <div className='w-8 h-8 bg-green-300 rounded-full flex items-center justify-center'>
                    <Image src="/images/tc.svg" alt="hero" width={16} height={16} />
                </div>
                <p className="text-xs font-normal mt-2">Total Revenues</p>
                <div className='flex mt-1 justify-between'>
                    <p>$2,129,430</p>
                    <div className="px-2 py-1 ml-4 bg-emerald-50 rounded-3xl justify-center items-center inline-flex">
                        <div className="text-center text-green-500 text-xs font-semibold uppercase leading-none tracking-wide">
                            +2.5%
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 p-4 bg-white rounded-2xl border-2 border-neutral-200 mt-2 mr-6">
                <div className='w-8 h-8 bg-orange-300 rounded-full flex items-center justify-center'>
                    <Image src="/images/tcr.svg" alt="hero" width={16} height={16} />
                </div>
                <p className="text-xs font-normal mt-2">Total Transactions</p>
                <div className='flex mt-1 justify-between'>
                    <p>1,520</p>
                    <div className="px-2 py-1 ml-4 bg-emerald-50 rounded-3xl justify-center items-center inline-flex">
                        <div className="text-center text-green-500 text-xs font-semibold uppercase leading-none tracking-wide">
                            +1.7%
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 p-4 bg-white rounded-2xl border-2 border-neutral-200 mt-2 mr-6 md:mt-3">
                <div className='w-8 h-8 bg-red-300 rounded-full flex items-center justify-center'>
                    <Image src="/images/like.svg" alt="hero" width={16} height={16} />
                </div>
                <p className="text-xs font-normal mt-2">Total Likes</p>
                <div className='flex mt-1 justify-between'>
                    <p>9,721</p>
                    <div className="px-2 py-1 ml-4 bg-emerald-50 rounded-3xl justify-center items-center inline-flex">
                        <div className="text-center text-green-500 text-xs font-semibold uppercase leading-none tracking-wide">+1.4%</div>
                    </div>
                </div>
            </div>

            <div className="flex-1 p-4 bg-white rounded-2xl border-2 border-neutral-200 mt-2 mr-6 md:mt-3">
                <div className='w-8 h-8 bg-indigo-300 rounded-full flex items-center justify-center'>
                    <Image src="/images/tu.svg" alt="hero" width={16} height={16} />
                </div>
                <p className="text-xs font-normal mt-2">Total Users</p>
                <div className='flex mt-1 justify-between'>
                    <p>9,721</p>
                    <div className="px-2 py-1 ml-4 bg-emerald-50 rounded-3xl justify-center items-center inline-flex">
                        <div className="text-center text-green-500 text-xs font-semibold uppercase leading-none tracking-wide">+4.2%</div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Stats