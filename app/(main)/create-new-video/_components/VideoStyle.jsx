"use client";
import Image from 'next/image'
import React, { useState } from 'react'

export const options = [
    {
        name:'Realistic',
        image: '/Realistic.jpeg'
    },
    {
        name:'Cinematic',
        image: '/cinema.jpeg'
    },
    {
        name:'cartoon',
        image: '/cartoon.jpeg'
    },
    {
        name:'Watercolor',
        image: '/Watercolor.jpeg'
    },
    {
        name:'Cyberpunk',
        image: '/Cyberpunk.jpeg'
    },
    {
        name:'Minimal',
        image: '/Minimal.jpeg'
    },
    {
        name: 'Anime',
        image: '/Anime.jpeg'
    }
]

function VideoStyle({onHandleInputChange}) {
    const [selectedStyle, setSelectedStyle] = useState();
  return (
    <div className='mt-5'>
        <h2>Video Style</h2>
        <p className='text-sm text-gray-400 mb-1'>Select video style</p>
        <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2'>
            {options?.map((option, index) => (
                <div className='relative' onClick={()=>{setSelectedStyle(option.name); onHandleInputChange('videoStyle', option.name)}} key={index}>
                    <Image src={option.image} alt={option.name} width={150} height={100} className={`object-cover h-[90px] lg:h-[130px] xl:h-[180px] rounded-lg p-1 hover:border border-gray-300 cursor-pointer ${option.name == selectedStyle && 'border'}`} />
                    <p className='absolute bottom-1 font-bold text-center w-full'>{option.name}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default VideoStyle