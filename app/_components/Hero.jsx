import { Button } from '@/components/ui/button'
import React from 'react'
import Authentication from './Authentication'

function Hero() {
    return (
        <div className='p-10 flex flex-col justify-center items-center mt-16 md:px-20 lg:px-36 xl:px-48'>
            <h1 className='text-5xl text-center font-bold'>AI Short Video Generator</h1>
            <p className='text-center text-2xl text-gray-600 mt-4'>Create short videos from text using AI</p>
            <div className='flex gap-4 mt-8'>
                <Button size="lg" variant="secondary">Explore</Button>
                <Authentication>
                    <Button size="lg">Get Started</Button>
                </Authentication>
            </div>
        </div>
    )
}

export default Hero