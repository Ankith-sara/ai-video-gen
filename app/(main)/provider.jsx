"use client";
import { SidebarProvider } from '@/components/ui/sidebar'
import React, { useEffect } from 'react'
import AppSider from './_components/AppSider'
import AppHeader from './_components/AppHeader'
import { useAuthContext } from '../provider';
import { useRouter } from 'next/navigation';

function DashboardProvider({ children }) {
  const {user } = useAuthContext();
  const router = useRouter();

  const CheckedUserAuthenticated=()=>{
    if(!user){
      router.replace('/');
    }
  }

  useEffect(()=>{
    user&&CheckedUserAuthenticated();
  },[]);

  return (
    <SidebarProvider>
      <AppSider />
      <div className='flex flex-col w-full h-screen'>
        <AppHeader />
        <div className='p-10'>
        {children}
        </div>
      </div>
    </SidebarProvider>
  )
}

export default DashboardProvider