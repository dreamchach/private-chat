import React from 'react'
import { FaArrowLeft } from "react-icons/fa";
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const ChatHeader = ({router} : any) => {
    const searchParams = useSearchParams()
    const friendNickname = searchParams.get('friendNickname')

    return (
        <div className='flex items-center h-12 pl-5 gap-5 bg-basic-green'>
            <Link href='/friends'>
                <FaArrowLeft />
            </Link>
            <div>{friendNickname}</div>
        </div>
    )
}

export default ChatHeader