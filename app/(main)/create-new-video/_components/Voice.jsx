"use client";
import { ScrollArea } from '@/components/ui/scroll-area';
import React, { useState } from 'react'

const voiceOptions = [
    {
        "value": "af_sarah",
        "name": "Sarah (Female)"
    },
    {
        "value": "af_sky",
        "name": "Sky (Female)"
    },
    {
        "value": "am_adam",
        "name": "Adam (Male)"
    },
    {
        "value": "hf_alpha",
        "name": "Alpha (Female)"
    },
    {
        "value": "af_beta",
        "name": "Beta (Female)"
    },
    {
        "value": "hm_Omega",
        "name": "Omega (Male)"
    },
]

function Voice({ onHandleInputChange }) {
    const [selectedVoice, setSelectedVoice] = useState(null);

    return (
        <div className="mt-5">
            <h2>Choose a Voice</h2>
            <p className="text-sm text-gray-400">Select voice for your video</p>
            <ScrollArea className="h-[150px]">
                <div className="grid grid-cols-2 gap-2 mt-2">
                    {voiceOptions.map((voice, index) => (
                        <h2 key={index} className={`cursor-pointer p-2 dark:bg-slate-900 dark:border-white rounded-xl hover:border ${voice.name === selectedVoice ? 'border' : ''}`} onClick={() => {
                                setSelectedVoice(voice.name);
                                onHandleInputChange && onHandleInputChange('voice', voice.value);
                            }}>
                            {voice.name}
                        </h2>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}

export default Voice;