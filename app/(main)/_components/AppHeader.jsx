"use client";
import { useAuthContext } from '@/app/provider';
import { SidebarTrigger } from '@/components/ui/sidebar';
import Image from 'next/image';
import React from 'react';

function AppHeader() {
    const { user } = useAuthContext();

    return (
        <div className='p-3 flex items-center justify-between'>
            <SidebarTrigger />
            {user?.pictureURL ? (
                <Image
                    src={user.pictureURL}
                    alt="user"
                    width={40}
                    height={40}
                    className='rounded-full'
                />
            ) : (
                <div className='w-10 h-10 bg-gray-300 rounded-full' />
            )}
        </div>
    );
}

export default AppHeader;
