import { onRandom } from '@/utill/functions/function'
import { IRandomAvatar } from '@/utill/type'
import Avatar from 'boring-avatars'
import React from 'react'

const RandomAvatar = ({auth, dispatch} : IRandomAvatar) => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-8">
        <div className='border-white border rounded-full bg-white'>
            <Avatar
                size={80}
                name={auth.avatar}
                variant='beam'
                colors={auth.color}
            />        
        </div>
        <button 
            onClick={() => onRandom(dispatch)}
            className="box-border mx-14 my-0 w-300 py-2.5 px-5 rounded-xl border-2 bg-blow-green shadow border-black min-w-300 hover:bg-hover-green hover:text-white hover:shadow-xl hover:border-white"
        >
            Random
        </button>
    </div>
  )
}

export default RandomAvatar