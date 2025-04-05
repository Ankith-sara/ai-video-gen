"use client";
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea';
import { Loader2Icon, SparkleIcon } from 'lucide-react';
import axios from 'axios';
import { useAuthContext } from '@/app/provider';

const suggestion = [
    "History",
    "Science",
    "Technology",
    "Music",
    "Art",
    "Sports",
    "Entertainment",
    "Travel",
    "Food",
    "Fashion",
    "Lifestyle",
    "Health",
    "Education",
    "Business",
    "Finance",
    "Marketing",
    "Social Media",
    "Politics",
    "News",
    "Motivation",
]

function Topic({ onHandleInputChange }) {
    const [selectedTopic, setSelectedTopic] = useState();
    const [selectedScriptIndex, setSelectedScriptIndex] = useState();
    const [scripts, setScripts] = useState();
    const [loading, setLoading] = useState(false);
    const { user } = useAuthContext();

    const GenerateScript = async () => {
        if (user?.creadits <= 0) {
            toast('Please add more credits!')
            return;
        }
        setLoading(true);
        setSelectedScriptIndex(null);
        try {
            const result = await axios.post('/api/generate-script', { topic: selectedTopic });
            console.log(result.data);
            setScripts(result.data?.scripts);
        } catch (error) {
            console.log(error);

        }
        setLoading(false);
    }

    return (
        <div>
            <h2 className='mb-1'>Project Title</h2>
            <Input placeholder='Enter project title' onChange={(event) => onHandleInputChange('title', event?.target.value)} />
            <div className='mt-5'>
                <h2>Video Topic</h2>
                <p className='text-sm text-gray-600'>Select topic for your video</p>
                <Tabs defaultValue="suggestion" className="w-full mt-2">
                    <TabsList>
                        <TabsTrigger value="suggestion">Suggestions</TabsTrigger>
                        <TabsTrigger value="your_topic">Your Topic</TabsTrigger>
                    </TabsList>
                    <TabsContent value="suggestion">
                        <div className=''>
                            {suggestion.map((suggestion, index) => (
                                <Button variant="outline" key={index} className={`m-1 ${suggestion == selectedTopic && 'bg-secondary'}`} onClick={() => {
                                    setSelectedTopic(suggestion)
                                    onHandleInputChange('topic', suggestion)
                                }}>{suggestion}</Button>
                            ))}
                        </div>
                    </TabsContent>
                    <TabsContent value="your_topic">
                        <div>
                            <h2>Enter your own topic</h2>
                            <Textarea placeholder='Enter your topic' onChange={(event) => onHandleInputChange('topic', event.target.value)} />
                        </div>
                    </TabsContent>
                </Tabs>
                <div>
                    {scripts?.length > 0 &&
                        <div className='mt-5'>
                            <h2 className=''>Select the Script</h2>
                            <div className='grid grid-cols-2 gap-4'>
                                {scripts?.map((item, index) => (
                                    <div key={index} className={`border rounded-xl cursor-pointer p-3 mt-3 ${selectedScriptIndex == index && 'border-white bg-secondary'}`} onClick={() => { setSelectedScriptIndex(index); onHandleInputChange('script', item?.content) }}>
                                        <h2>Script {index + 1}</h2>
                                        <p className='line-clamp-5 text-sm text-gray-400'>{item.content}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    }
                </div>
            </div>
            {!scripts && <Button className="mt-3" size="sm" disabled={loading} onClick={GenerateScript}> {loading ? <Loader2Icon className='animate-spin' /> : <SparkleIcon />} Generate Script</Button>}
        </div>
    )
}

export default Topic