import Link from 'next/link'
import React from 'react'
import { FaUser } from "react-icons/fa";
import { IoChatbubble } from "react-icons/io5";

const Layout = () => {
  return (
    <div className='h-screen fixed bg-slate-100'>
        <Link href='/friends'>
          <div className='w-14 text-4xl my-16 text-slate-400 hover:text-slate-950'>
            <FaUser />
          </div>
          <div className='text-slate-400 hover:text-slate-950 text-xs'>친구</div>
        </Link>
        <Link href='/rooms'>
          <div className='w-14 text-4xl my-16 text-slate-400 hover:text-slate-950'>
            <IoChatbubble />
          </div>
          <div className='text-slate-400 hover:text-slate-950 text-xs'>채팅</div>
        </Link>
    </div>
  )
}

export default Layout