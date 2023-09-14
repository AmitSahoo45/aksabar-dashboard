'use client';

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";
import { signIn, useSession } from 'next-auth/react'
import toast, { Toaster } from 'react-hot-toast';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Stats from '../components/Stats';
import Activities from '../components/Activities';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import Modal from 'react-modal'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        overflowY: 'auto',
        display: 'inline-block'
    }
};

export default function Dashboard() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [instagram, setInstagram] = useState('')
    const [youtube, setYoutube] = useState('')

    const [currentTab, setCurrentTab] = useState(0)
    const [hasbeenSubmitted, setHasBeenSubmitted] = useState(false)

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const { data: session, status } = useSession()
    const router = useRouter()

    const data = {
        labels: ['Red Bull', 'Ferrari', 'Mercedes'],
        datasets: [{
            label: 'My First Dataset',
            data: [498, 396, 214],
            backgroundColor: [
                '#FFCC00',
                '#FF0000',
                '#00D2BE'
            ],
            hoverOffset: 4
        }]
    };

    const config = {
        type: 'doughnut',
        data: data,
    };

    const closeModal = () => setModalIsOpen(false)

    const moveToTab1 = () => {
        if (name === '' || email === '' || mobile === '') {
            toast.error('Please fill all the fields!')
            return false
        } else if (mobile.length !== 10) {
            toast.error('Please enter a valid mobile number!')
            return false
        }

        setCurrentTab(1)
    }

    const onSubmit = () => {
        setHasBeenSubmitted(true)
        setModalIsOpen(false)
    }

    useEffect(() => {
        if (status !== 'authenticated') {
            router.push('/')
            toast.error('You are not logged in!')
        }
    }, [session])

    return (
        <>
            <main className='p-6 flex w-full min-h-[100vh]'>
                {/* dashboard bar */}
                <section className='sm:flex-1 flex-[0.1] w-full bg-gradient-to-b from-blue-500 to-blue-500 rounded-2xl'>
                    <Navbar />
                </section>

                {/* graphs */}
                <section className='flex-4 sm:mx-8 mx-4 w-full'>
                    {/* header */}
                    <Header />
                    <Stats />
                    <Activities />

                    <section className="flex sm:flex-row flex-col mt-4">
                        <div className='flex-[0.4] w-4/5 h-4/5 bg-white rounded-2xl shadow border-2 border-neutral-200'>
                            <div style={{
                                width: '100%',
                                height: '100%',
                                paddingLeft: '20px',
                                paddingRight: '20px'
                            }}>
                                <Doughnut
                                    data={data}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: true,
                                        aspectRatio: 1,
                                        plugins: {
                                            legend: {
                                                display: true,
                                                position: 'right',
                                                labels: {
                                                    font: {
                                                        size: 10,
                                                    },
                                                    color: '#6B7280',
                                                    boxWidth: 10,
                                                    padding: 20,
                                                },
                                            },
                                            title: {
                                                display: true,
                                                text: 'Ferrari VS Mercedes VS Red Bull in 2010',
                                                font: { size: 16 },
                                                color: '#6B7280',
                                                padding: 20,
                                            },
                                        }
                                    }}
                                />
                            </div>
                        </div>
                        <div className="flex-[0.6] bg-white rounded-2xl shadow border-2 border-neutral-200 ml-5">
                            {
                                hasbeenSubmitted ?
                                    (
                                        <div className="flex justify-center h-full flex-col p-5 px-10">
                                            <div className='flex-[0.3] pt-5'>
                                                <p className='text-2xl font-semibold leading-normal'>
                                                    {name}
                                                </p>
                                            </div>
                                            <div className='flex-[0.7] flex flex-col justify-start'>

                                                <div className='flex justify-between items-center w-full'>
                                                    {/* Container containing the data */}
                                                    <div className='flex-[0.5] flex items-center'>
                                                        {/* Image Container */}
                                                        <div className='px-1.5 pt-1 mr-3 bg-emerald-50 rounded-full justify-center items-center inline-flex'>
                                                            <Image src='/images/whatsapp.svg' width={40} height={40} alt='WhatsApp' className='text-green-300'/>
                                                        </div>

                                                        <div className="text-stone-800 text-sm font-normal underline leading-normal">
                                                            +91 {mobile}
                                                        </div>
                                                    </div>
                                                    <div className='flex-[0.5] flex items-center'>
                                                        {/* Image Container */}
                                                        <div className='p-1 mr-3 bg-rose-100 rounded-full justify-center items-center inline-flex'>
                                                            <Image src='/images/instagram.svg' width={35} height={35} alt='Instagram' />
                                                        </div>

                                                        <div className="text-stone-800 text-sm font-normal underline leading-normal">
                                                            {instagram === '' ? 'Not Available' : instagram.split('/')[3]}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='flex justify-between items-center w-full mt-7'>
                                                    {/* Container containing the data */}
                                                    <div className='flex-[0.5] flex items-center'>
                                                        {/* Image Container */}
                                                        <div className='p-0.5 mr-3 bg-violet-100 rounded-full justify-center items-center inline-flex'>
                                                            <Image src='/images/mail.svg' width={40} height={40} alt='Mail' />
                                                        </div>

                                                        <div className="text-stone-800 text-sm font-normal underline leading-normal">
                                                            {email.substring(0, 20) + '..'}
                                                        </div>
                                                    </div>
                                                    <div className='flex-[0.5] flex items-center'>
                                                        {/* Image Container */}
                                                        <div className='p-2 mr-3 bg-rose-100 rounded-full justify-center items-center inline-flex'>
                                                            <Image src='/images/youtube.svg' width={30} height={30} alt='Instagram' />
                                                        </div>

                                                        <div className="text-stone-800 text-sm font-normal underline leading-normal">
                                                            {youtube === '' ? 'Not Available' : youtube.split('/')[3]}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) :
                                    (
                                        <div className="flex justify-center items-center h-full">
                                            <button
                                                onClick={() => setModalIsOpen(true)}
                                                className='flex justify-center items-center flex-col'>
                                                <img src="/images/controls.svg" width={80} height={80} alt='Add Profile' className='bg-neutral-100 rounded-full border border-zinc-100 p-4 mb-3' />
                                                <span>
                                                    Add Profile
                                                </span>
                                            </button>
                                        </div>
                                    )
                            }
                        </div>
                    </section>
                </section>
            </main>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Add Errors Modal"
                style={customStyles}
            >
                <div className='flex justify-between items-center mb-5'>
                    <h2 className='text-stone-800 text-xl font-semibold leading-loose'>Add New Profile</h2>
                    <button onClick={closeModal}>
                        <img src="/images/close.svg" width={20} height={20} alt='Close' />
                    </button>
                </div>
                <Tabs
                    className='w-[300px] sm:w-[500px]'
                    selectedIndex={currentTab}
                >
                    <TabList className='w-full flex mb-4'>
                        <Tab
                            onClick={() => { return false }}
                            selectedClassName='flex-[0.5] !block bg-blue-500 text-white shadow rounded-t-md outline-none' className='flex-[0.5] !block p-2 pl-4 hover:cursor-default'>
                            Basic
                        </Tab>
                        <Tab
                            onClick={() => { return false }}
                            selectedClassName='flex-[0.5] !block bg-blue-500 text-white shadow rounded-t-md outline-none' className='flex-[0.5] !block p-2 pl-4 hover:cursor-default'>
                            Social
                        </Tab>
                    </TabList>

                    <TabPanel>
                        <label className='text-black text-base font-normal'>Enter Name<span className='text-red-500'>*</span></label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="w-full h-11 shadow-sm pl-3 bg-neutral-100 rounded-lg focus:ring-0 self-stretch text-neutral-400 text-base leading-normal mt-1 mb-4"
                            placeholder='Eg. John Doe'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <label className='text-black text-base font-normal'>Enter Email<span className='text-red-500'>*</span></label>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            className="w-full h-11 shadow-sm pl-3 bg-neutral-100 rounded-lg focus:ring-0 self-stretch text-neutral-400 text-base leading-normal mt-1 mb-4"
                            placeholder='Eg. John@xyz.com'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <label className='text-black text-base font-normal mt-3'>Enter Mobile<span className='text-red-500'>*</span></label>
                        <input
                            type="number"
                            name="mobile"
                            id="mobile"
                            min={10}
                            max={10}
                            className="w-full h-11 shadow-sm pl-3 bg-neutral-100 rounded-lg focus:ring-0 self-stretch text-neutral-400 text-base leading-normal mt-1"
                            placeholder='Eg.  9123456789'
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                        />

                        <div className="w-full pb-6 flex-col justify-start items-start gap-6 inline-flex">
                            <div className="self-stretch h-px border border-zinc-100"></div>
                            <div className="self-stretch px-6 justify-between items-center inline-flex">
                                <div className="px-4 py-2 rounded-lg justify-center items-center flex">
                                    <div className="text-center"></div>
                                </div>
                                <div className="justify-start items-start gap-2 flex">
                                    <button
                                        onClick={() => moveToTab1()}
                                        className="px-4 py-2 bg-blue-500 rounded-lg justify-center items-center flex">
                                        <div className="text-center text-white text-sm font-semibold leading-normal">Next</div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </TabPanel>

                    <TabPanel>
                        <label className='text-black text-base font-normal'>Instagram Link<span className='text-red-500'>*</span></label>
                        <input
                            type="text"
                            name="instagram"
                            id="instagram"
                            className="w-full h-11 shadow-sm pl-3 bg-neutral-100 rounded-lg focus:ring-0 self-stretch text-neutral-400 text-base leading-normal mt-1 mb-4"
                            placeholder='Eg. ..instagram.com/username'
                            value={instagram}
                            onChange={(e) => setInstagram(e.target.value)}
                        />

                        <label className='text-black text-base font-normal'>Youtube Link<span className='text-red-500'>*</span></label>
                        <input
                            type="text"
                            name="youtube"
                            id="youtube"
                            className="w-full h-11 shadow-sm pl-3 bg-neutral-100 rounded-lg focus:ring-0 self-stretch text-neutral-400 text-base leading-normal mt-1"
                            placeholder='Eg. ..youtebe/username'
                            value={youtube}
                            onChange={(e) => setYoutube(e.target.value)}
                        />

                        <div className='flex justify-end items-center mt-6'>
                            <div className="w-16 h-10 px-4 py-2 rounded-lg border border-neutral-400 justify-center items-center inline-flex">
                                <button
                                    onClick={() => setCurrentTab(0)}
                                    className="text-center text-stone-800 text-sm font-semibold leading-normal">Back</button>
                            </div>

                            <div
                                className="w-16 h-10 px-4 py-2 ml-2 bg-blue-500 rounded-lg justify-center items-center inline-flex">
                                <button
                                    onClick={() => onSubmit()}
                                    className="text-center text-white text-sm font-semibold leading-normal">Done</button>
                            </div>
                        </div>
                    </TabPanel>
                </Tabs>
            </Modal>

            <Toaster
                position="bottom-left"
                reverseOrder={false}
                gutter={8}
            />
        </>
    )
}