'use client'
import { useAuthContext } from '@/app/provider';
import { Button } from '@/components/ui/button';
import { api } from '@/convex/_generated/api';
import { useConvex } from 'convex/react';
import { RefreshCcw } from 'lucide-react';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

function VideoList() {
    const [videoList, setVideoList] = useState([]);
    const convex = useConvex();
    const { user } = useAuthContext();

    const GetUserVideoList = async () => {
        const result = await convex.query(api.videoData.GetUserVideos, {
            uid: user?._id
        });
        setVideoList(result);
        const isPendingVideo = result?.find((item) => item.status == 'pending');
        isPendingVideo && GetPendingVideoStatus(isPendingVideo);
    };

    const GetPendingVideoStatus = (pendingVideo) => {
        const intervalId = setInterval(async () => {
            const result = await convex.query(api.videoData.GetVideoById, {
                videoId: pendingVideo?._id
            });
            if (result.status == 'completed') {
                clearInterval(intervalId);
                GetUserVideoList();
            }
            console.log('Still Pending...');
        }, 5000);
    };    

    useEffect(() => {
        if (user) GetUserVideoList();
    }, [user]);

    return (
        <div className="px-5">
            {videoList?.length === 0 ? (
                <div className="flex flex-col items-center justify-center mt-28 gap-5 p-6 border border-dashed rounded-xl py-16 text-center">
                    <Image src="/logo.png" alt="logo" width={60} height={60} />
                    <h2 className="text-gray-400 text-lg">
                        You don't have any videos yet. Start by creating one.
                    </h2>
                    <Link href="/create-new-video">
                        <Button className="px-6 py-2"> + Create New Video</Button>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-10">
                    {videoList?.map((video, index) => (
                        <Link key={index} href={'/play-video/' + video?._id}>
                            <div className="relative group rounded-xl overflow-hidden shadow-lg border border-gray-800 transition-all hover:scale-105 hover:shadow-xl">
                                {video?.status === 'completed' ? (
                                    <Image
                                        src={video?.images?.length > 0 ? video.images[0] : '/placeholder.jpg'}
                                        alt={video?.title || 'Video Thumbnail'}
                                        width={200}
                                        height={300}
                                        className="w-full h-auto object-cover aspect-[2/3] rounded-xl"
                                    />
                                ) : (
                                    <div className="aspect-[2/3] w-full rounded-xl bg-slate-900 flex flex-col items-center justify-center gap-2 text-white animate-pulse">
                                        <RefreshCcw className="animate-spin text-gray-400" size={24} />
                                        <h2 className="text-gray-300 text-sm">Generating...</h2>
                                    </div>
                                )}

                                {/* Video Details */}
                                <div className="absolute bottom-3 left-0 right-0 bg-black/60 text-white p-3 rounded-b-xl">
                                    <p className="font-semibold truncate">{video?.title}</p>
                                    <p className="text-xs text-gray-300">{moment(video?._creationTime).fromNow()}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

export default VideoList;