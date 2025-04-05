import Image from 'next/image'
import React from 'react'
import { options } from './VideoStyle'

function Preview({ formData }) {
    const selectVideoStyle = formData && options.find(item => item.name === formData?.videoStyle);

    return (
        <div className='relative'>
            <h2 className='mb-3 text-2xl'>Preview</h2>
            {selectVideoStyle?.image ? (
                <Image
                    src={selectVideoStyle.image}
                    alt={selectVideoStyle.name || 'Video style preview'}
                    width={100}
                    height={300}
                    className='w-full h-[75vh] object-cover rounded-xl'
                />
            ) : (
                <div className="w-full h-[75vh] bg-gray-300 flex items-center justify-center rounded-xl">
                    <p>No Preview Available</p>
                </div>
            )}
            <h2 className={`absolute text-center w-full bottom-4 ${formData?.caption?.style}`}>
                {formData?.caption?.name}
            </h2>
        </div>
    );
}

export default Preview;