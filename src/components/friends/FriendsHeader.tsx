import { removeUser } from '@/utill/redux/authSlice'
import { IFriendsHeader } from '@/utill/type/friends'
import Link from 'next/link'
import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'

const FriendsHeader = ({dispatch} : IFriendsHeader) => {
    return (
        <div className='pl-5 bg-basic-green'>
            <Link 
                href='/' 
                className='flex items-center gap-5 h-12'
                onClick={() => dispatch(removeUser())}
            >
                <FaArrowLeft />
                <div>나가기</div>
            </Link>
        </div>
    )
}

export default FriendsHeader