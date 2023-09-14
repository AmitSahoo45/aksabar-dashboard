'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'
import { Bar } from 'react-chartjs-2';
import toast, { Toaster } from 'react-hot-toast';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Activities = () => {

    const [year, setYear] = useState([])
    const [constructor, setConstructor] = useState([])

    const years = [
        '2010',
        '2014',
        '2018',
        '2022',
    ]

    const getdata = async () => {
        try {
            for (let i = 0; i < years.length; i++) {
                const { data: { MRData: { StandingsTable: { StandingsLists } } } } = await axios.get(`https://ergast.com/api/f1/${years[i]}/constructorStandings.json`)
                // append to state
                setYear(prev => [...prev, years[i]])
                const Ferrari = StandingsLists[0].ConstructorStandings.filter((team) => team.Constructor.name === 'Ferrari')
                const Mercedes = StandingsLists[0].ConstructorStandings.filter((team) => team.Constructor.name === 'Mercedes')

                setConstructor(prev => [...prev, { Ferrari, Mercedes }])
            }
        } catch (error) {
            toast.error('Something went wrong')
        }
    }

    useEffect(() => {
        getdata()
    }, [])

    const config = {
        type: 'bar',
        data: {
            labels: year,
            datasets: [
                {
                    label: 'Ferrari',
                    data: constructor.map((item) => item.Ferrari[0].points),
                    backgroundColor: '#FF0000',
                },
                {
                    label: 'Mercedes',
                    data: constructor.map((item) => item.Mercedes[0].points),
                    backgroundColor: '#00D2BE',
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Ferrari VS Mercedes Points(Formula 1)',
                },
            },
        }
    };


    return (
        <>
            <div>
                {
                    constructor.length < 3 ?
                        (
                            <div className='my-8 mx-auto flex justify-center'>
                                <div class="loader border-r-2 rounded-full border-yellow-500 bg-yellow-300 animate-bounce aspect-square w-8 flex justify-center items-center text-yellow-700">
                                    $
                                </div>
                            </div>
                        ) : (
                            <div className="flex justify-center items-center bg-white rounded-2xl shadow border-2 border-neutral-200 px-3">
                                <Bar
                                    data={config.data}
                                    options={config.options}
                                    width={'30%'}
                                    height={'15%'}
                                />
                            </div>
                        )
                }
            </div>
            <Toaster
                position="bottom-left"
                reverseOrder={false}
                gutter={8}
            />
        </>
    )
}

export default Activities