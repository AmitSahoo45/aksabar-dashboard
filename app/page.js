'use client';

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";
import { signIn, useSession } from 'next-auth/react'
import toast, { Toaster } from 'react-hot-toast';

export default function Home() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [isLogin, setIsLogin] = useState(true)

  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard')
      toast.success('Logged in successfully!')
    }
  }, [session])

  return (
    <main className='flex flex-row h-full'>
      {/* left side */}
      <section className="flex flex-col flex-1 bg-login h-[100vh]">

        <div className="flex-[0.2] px-8 py-6 pl-16 pt-10">
          <Image src='/images/logo.png' width={50} height={50} alt='Logo' />
        </div>

        <div className="flex-[0.6] flex items-center justify-center relative">
          <div className="text-white text-7xl font-bold absolute top-[30%] left-[25%]">Board.</div>
        </div>

        <div className="flex-[0.2] w-full relative">
          <div className="flex flex-row absolute top-[30%] left-[25%]">
            <div className="m-3">
              <Image src='/images/github.svg' width={30} height={30} alt='GitHub' />
            </div>

            <div className="m-3">
              <Image src='/images/x.svg' width={30} height={30} alt='Twitter' />
            </div>

            <div className="m-3">
              <Image src='/images/linkedin.svg' width={30} height={30} alt='LinkedIn' />
            </div>

            <div className="m-3">
              <Image src='/images/discord.svg' width={30} height={30} alt='Discord' />
            </div>
          </div>

        </div>
      </section>
      {/* right side */}
      <section className="flex-1 flex items-start flex-col mt-20">
        {/* main component */}
        <div className="px-2">

          <div className="text-black text-4xl font-bold mb-2">Sign In</div>
          <div className="text-black text-base font-normal">Sign in to your account</div>

          {/* buttons */}
          <div className="my-3 flex flex-row mt-4">
            <button
              onClick={() => signIn('google')}
              className="relative flex items-center justify-center cursor-pointer transition-all duration-200 shadow hover:shadow-md rounded-lg p-3">
              <Image src='/images/google.svg' height={20} width={20} alt='Google' />
              <p className="w-32 h-4 text-center text-zinc-500 text-xs font-normal">Sign in with Google</p>
            </button>

            <div className="relative flex items-center justify-center cursor-pointer transition-all duration-200 shadow hover:shadow-md rounded-lg p-3 ml-3">
              <Image src='/images/apple.svg' height={20} width={20} alt='Apple' />
              <p className="w-32 h-4 text-center text-zinc-500 text-xs font-normal">Sign in with Apple</p>
            </div>
          </div>


          {/* Container for Auth data */}
          <div>
            <div className="w-96 h-80 bg-white rounded-2xl px-3 py-3 pl-5 pt-6">

              {!isLogin && (
                <>
                  <div className="text-black text-base mb-1">
                    Full Name
                  </div>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="w-full h-11 shadow-sm pl-3 bg-neutral-100 rounded-lg focus:ring-0"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </>
              )}

              <div className="text-black text-base mb-1 mt-3">
                Email address
              </div>

              <input
                type="text"
                name="email"
                id="email"
                className="w-full h-11 shadow-sm pl-3 bg-neutral-100 rounded-lg focus:ring-0"
                placeholder="johndoe@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <div className="text-black text-base mb-1 mt-3">
                Password
              </div>

              <input
                type="password"
                name="password"
                id="password"
                className="w-full h-11 shadow-sm pl-3 bg-gray-200 rounded-lg focus:ring-0 mb-4"
                placeholder="johndoe@12345"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div className="text-blue-600 text-base">Forgot password?</div>

              <div className="w-full bg-blue-500 rounded-lg text-center mt-6">
                <button className="w-full h-11 text-white text-base font-semibold">Sign in</button>
              </div>

              <div className="w-full bg-slate-50 mt-3">
                <div className="text-black text-base font-normal text-center py-3">
                  {isLogin ? 'Don\'t have an account?' : 'Already have an account?'}
                  <span className="text-blue-600 cursor-pointer" onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? ' Sign up' : ' Sign in'}
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <Toaster
        position="bottom-left"
        reverseOrder={false}
        gutter={8}
      />
    </main>
  )
}
