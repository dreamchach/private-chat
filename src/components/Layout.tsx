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
        <Link href='/friends' className='my-16'>
          <div className='w-14 text-4xl text-slate-400 hover:text-slate-950'>
            <FaUser />
          </div>
          <div className='flex items-center justify-center text-slate-400 hover:text-slate-950 text-xs'>친구</div>
        </Link>
        <Link href='/rooms' className='my-16'>
          <div className='w-14 text-4xl text-slate-400 hover:text-slate-950'>
            <IoChatbubble />
          </div>
          <div className='flex items-center justify-center text-slate-400 hover:text-slate-950 text-xs'>채팅</div>
        </Link>
    </div>
  )
}

export default Layout