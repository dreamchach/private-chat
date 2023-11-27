import Layout from '@/components/Layout'
import FriendsHeader from '@/components/friends/FriendsHeader'
import React from 'react'
import { useDispatch } from 'react-redux'
import { FaPlus } from "react-icons/fa";

const rooms = () => {
  const dispatch = useDispatch()

  return (
    <div className='flex flex-row'>
        <Layout />
        <div className='ml-14 w-full'>
          <FriendsHeader dispatch={dispatch} />
          <div>
            <button>
              <FaPlus /> 채팅방 생성
            </button>
          </div>
        </div>
    </div>
  )
}

export default rooms