import React from 'react'
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import FriendAvatar from './FriendAvatar';
import { IaboutFriends } from '@/utill/type/friends';

const AboutFriends = ({friend, wait} : IaboutFriends) => {
    return (
        <div  className='mx-14 flex items-center justify-between gap-5 mt-5 hover:bg-none-button p-2 rounded-xl transition'>
            <FriendAvatar friend={friend}/>
            <div className='ml-5'>
                {wait.waitPeople.includes(friend.userId) && <IoChatbubbleEllipsesOutline color='red' size='30'/>}
            </div>
        </div>
    )
}

export default AboutFriends