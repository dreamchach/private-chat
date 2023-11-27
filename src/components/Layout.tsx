import Link from 'next/link'
import React from 'react'
import { FaUser } from "react-icons/fa";
import { IoChatbubble } from "react-icons/io5";

const Layout = () => {
  return (
    <div>
        <Link href='/friends'>
          <FaUser />
        </Link>
        <Link href='/rooms'>
          <IoChatbubble />
        </Link>
    </div>
  )
}

export default Layout