import { IAboutMe } from '@/utill/type/friends'
import Avatar from 'boring-avatars'
import React from 'react'

const AboutMe = ({auth} : IAboutMe) => {
    return (
        <div className='flex items-center gap-5 my-14 mx-14'>
            <div className='border-black border rounded-full bg-white'>
                <Avatar
                    size={60}
                    name={auth.avatar}
                    variant='beam'
                    colors={auth.color}
                />
            </div>
            <div className='font-bold text-lg'>{auth.nickName}</div>
        </div>
    )
}

export default AboutMe