import { output } from '@/utill/redux/waitSlice'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import FriendsHeader from '@/components/friends/FriendsHeader'
import AboutMe from '@/components/friends/AboutMe'
import AboutFriends from '@/components/friends/AboutFriends'
import { socketConnect } from '@/utill/functions/socket'

const Friends = ({socket} : any) => {
    const [friends, setFriends] = useState<any>([])
    const auth = useSelector((state : any) => {
        return state.auth
    })
    const wait = useSelector((state : any) => {
        return state.wait
    })
    const dispatch = useDispatch()
    
    useEffect(() => {
        console.log(1)
        console.log(socket)
        socketConnect(socket, auth, setFriends, dispatch)
        console.log(2)
    }, [socket])

  return (
    <div>
        <FriendsHeader dispatch={dispatch} />
        <AboutMe auth={auth} />
        <div className='mx-14 mt-14 flex items-center justify-center text-sm text-none-text font-bold'>접속한 유저</div>
        {friends.length > 0 ? 
            friends.map((friend : any) => (
                <Link 
                    href={{
                        pathname : `/chat/${auth.userId}-${friend.userId}`,
                        query : {
                            friendUserId : friend.userId,
                            friendNickname : friend.nickName,
                            friendAvatar : friend.avatar,
                            friendColor : friend.color,
                        }
                    }} 
                    key={friend.userId}
                    onClick={() => dispatch(output(friend.userId))}
                >
                    <AboutFriends friend={friend} wait={wait} />
                </Link>
            )) : 
            <div className='mt-14 flex items-center justify-center text-sm text-none-text font-bold'>접속 중인 유저 없음</div>
        }
    </div>
  )
}

export default Friends