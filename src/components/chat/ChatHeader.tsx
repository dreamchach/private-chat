import React from 'react'
import { FaArrowLeft } from "react-icons/fa";
import Link from 'next/link';

const ChatHeader = ({router} : any) => {
    return (
        <div className='flex items-center h-12 pl-5 gap-5 bg-basic-green'>
            <Link href='/friends'>
                <FaArrowLeft />
            </Link>
            <div>{router.query.friendNickname}</div>
        </div>
    )
}

export default ChatHeader