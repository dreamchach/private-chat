import Link from 'next/link'
import { useRouter } from 'next/router';
import React from 'react'
import { FaUser } from "react-icons/fa";
import { IoChatbubble } from "react-icons/io5";

const Layout = () => {
  const router = useRouter()
  console.log(router)
  return (
    <div className='h-screen fixed bg-slate-100'>
        <Link href='/friends'>
          <div className={`flex flex-col items-center justify-center my-16 ${router.pathname === '/friends' ? 'text-slate-950' : 'text-slate-300'} hover:text-slate-500`}>
            <div className='w-14 text-4xl'>
              <FaUser />
            </div>
            <div className='flex items-center justify-center text-xs'>친구</div>
          </div>
        </Link>
        <Link href='/rooms'>
          <div className={`flex flex-col items-center justify-center my-16 ${router.pathname === '/rooms' ? 'text-slate-950' : 'text-slate-300'} hover:text-slate-500`}>
            <div className='w-14 text-4xl'>
              <IoChatbubble />
            </div>
            <div className='flex items-center justify-center text-xs'>채팅</div>
          </div>
        </Link>
    </div>
  )
}

export default Layout