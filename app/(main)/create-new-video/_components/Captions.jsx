"use client";
import React, { useState } from 'react'

const options = [
    {
        name: 'Youtuber',
        style: 'text-yellow-500 text-3xl uppercase',
    },
    {
        name: 'Streamer',
        style: 'text-purple-500 text-2xl italic',
    },
    {
        name: 'Gamer',
        style: 'text-red-500 text-4xl font-bold',
    },
    {
        name: 'Vlogger',
        style: 'text-blue-400 text-3xl font-semibold',
    },
    {
        name: 'Influencer',
        style: 'text-pink-500 text-2xl underline',
    },
    {
        name: 'Podcaster',
        style: 'text-green-500 text-3xl tracking-widest',
    },
    {
        name: 'Designer',
        style: 'text-indigo-500 text-4xl font-extrabold',
    },
    {
        name: 'Artist',
        style: 'text-orange-400 text-3xl lowercase italic',
    },
    {
        name: 'Developer',
        style: 'text-gray-700 text-2xl font-medium',
    },
    {
        name: 'Photographer',
        style: 'text-teal-500 text-3xl capitalize tracking-wide',
    },
    {
        name: 'Writer',
        style: 'text-black text-2xl font-light italic',
    },
    {
        name: 'Entrepreneur',
        style: 'text-yellow-600 text-4xl font-black uppercase',
    },
    {
        name: 'Coach',
        style: 'text-blue-600 text-3xl font-thin',
    },
    {
        name: 'Innovator',
        style: 'text-purple-700 text-2xl font-extrabold tracking-tight',
    },
    {
        name: 'Explorer',
        style: 'text-green-700 text-3xl italic underline',
    }
];

function Captions({ onHandleInputChange }) {
    const [selectedCaptionStyle, setSelectedCaptionStyle] = useState();
    return (
        <div>
            <h2>Caption Style</h2>
            <p className='text-sm text-gray-400'>Select a style for your captions</p>
            <div className='flex flex-wrap gap-4 mt-2'>
                {options.map((option, index) => (
                    <div key={index} onClick={() => {
                        setSelectedCaptionStyle(option.name)
                        onHandleInputChange('caption',option)
                    }} className={`p-2 hover:border bg-slate-900 rounded-xl border-gray-300 cursor-pointer ${selectedCaptionStyle == option.name && 'border'}`}>
                        <h2 className={option.style}>{option.name}</h2>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Captions