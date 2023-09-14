"use client";
import Image from 'next/image'


const Navbar = () => {
    return (

        <div className="w-full h-full flex sm:items-start items-center justify-start flex-col py-4 sm:px-10 lg:px-7 sm:pr-0 lg:pr-12 px-3 text-white">
            <div className="text-white sm:text-4xl text-base font-bold mt-8">Board.</div>
            <div className="w-4 h-4"></div>
            <div className="w-4 h-5"></div>
            <div className="w-4 h-4"></div>
            <div className="flex my-4 hover:cursor-pointer">
                <Image src='/images/dashboard.svg' width={17} height={17} alt='Dashboard' />
                <p className='ml-4 text-lg lg:text-base font-medium sm:block hidden'>
                    Dashboard
                </p>
            </div>
            <div className="flex my-4 hover:cursor-pointer">
                <Image src='/images/transaction.svg' width={17} height={17} alt='Dashboard' />
                <p className='ml-4 text-lg lg:text-base font-medium sm:block hidden'>
                    Transactions
                </p>
            </div>
            <div className="flex my-4 hover:cursor-pointer">
                <Image src='/images/schedule.svg' width={17} height={17} alt='Dashboard' />
                <p className='ml-4 text-lg lg:text-base font-medium sm:block hidden'>
                    Schedules
                </p>
            </div>
            <div className="flex my-4 hover:cursor-pointer">
                <Image src='/images/user.svg' width={17} height={17} alt='Dashboard' />
                <p className='ml-4 text-lg lg:text-base font-medium sm:block hidden'>
                    Users
                </p>
            </div>
            <div className="flex my-4 hover:cursor-pointer">
                <Image src='/images/setting.svg' width={17} height={17} alt='Dashboard' />
                <p className='ml-4 text-lg lg:text-base font-medium sm:block hidden'>
                    Settings
                </p>
            </div>
        </div>
    )
}

export default Navbar