import React from 'react'
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import FriendAvatar from './FriendAvatar';

const AboutFriends = ({friend, wait} : any) => {
    console.log('component', wait.waitPeople.includes(friend.userId), 'friend', friend)
    return (
        <div  className='mx-14 flex items-center justify-between gap-5 mt-5 hover:bg-none-button p-2 rounded-xl'>
            <FriendAvatar friend={friend}/>
            <div className='ml-5'>
                {wait.waitPeople.includes(friend.userId) && <IoChatbubbleEllipsesOutline color='red' size='30'/>}
            </div>
        </div>
    )
}

export default AboutFriends