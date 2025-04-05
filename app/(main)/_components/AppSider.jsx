"use client";
import React from 'react'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Gem, HomeIcon, LucideFileVideo, Search, WalletCards } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuthContext } from '@/app/provider';

const MenuItems = [
    {
        title: 'Home',
        url: '/dashboard',
        icon: HomeIcon
    },
    {
        title: 'Create New Video',
        url: '/dashboard/create',
        icon: LucideFileVideo
    },
    {
        title: 'Explore Videos',
        url: '/dashboard/explore',
        icon: Search
    },
    {
        title: 'Billing',
        url: 'billing',
        icon: WalletCards
    },
]

function AppSider() {
    const path = usePathname();
    const { user } = useAuthContext();
    return (
        <Sidebar>
            <SidebarHeader />
            <div>
                <div className='flex items-center justify-center gap-3 mt-5 w-full'>
                    <Image src={'/logo.png'} alt="logo" width={60} height={40} className='rounded-full' />
                    <h2 className='font-bold text-2xl'>GenVid</h2>
                </div>
                <h2 className='mt-3 text-lg text-center text-gray-400'>AI Short Video Generator</h2>
            </div>
            <SidebarContent>
                <SidebarGroup >
                    <SidebarGroupContent>
                        <div className='mx-3 mt-8'>
                            <Link href={'/create-new-video'}>
                                <Button className="w-full">+ Create New Video</Button>
                            </Link>
                        </div>
                        <SidebarMenu>
                            {MenuItems.map((menu, index) => (
                                <SidebarMenuItem className="mt-3 mx-3" key={index}>
                                    <SidebarMenuButton isActive={path == menu.url} className='p-5'>
                                        <Link href={menu?.url} className='flex items-center gap-3 p-3'>
                                            <menu.icon />
                                            <span>{menu?.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <div className='p-3 border rounded-lg mb-6 bg-gray-700'>
                    <div className='flex items-center justify-between'>
                        <Gem className='text-gray-400' />
                        <h2 className='text-gray-400'>{user?.credits} Credits Left</h2>
                    </div>
                    <Button className='w-full mt-3'>Buy More Credits</Button>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}

export default AppSider