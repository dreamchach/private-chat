import { setNickName, setRoom, setUserId } from '@/utill/redux/authSlice'
import { AnyAction } from "@reduxjs/toolkit";
import { NextRouter } from "next/router";
import { Dispatch } from "react";

export const onclick = async (name : string, router : NextRouter, dispatch : Dispatch<AnyAction>) => {
    dispatch(setNickName(name))
    dispatch(setUserId(crypto.randomUUID()))

    if(name !== '') {
        router.push('/friends')
    }
}
export const pressEnter = (key : string, name : string, router : NextRouter, dispatch : Dispatch<AnyAction>) => {
    dispatch(setNickName(name))
    dispatch(setUserId(crypto.randomUUID()))

    if(key === 'Enter' && name !== '') {
        router.push('/friends')
    }else if(key === 'Enter' && name === '') {
        alert('이름은 공백이 불가능합니다')
    }
}
export const goFriendChat = (item : any, dispatch : any, auth : any, router : any) => {
    dispatch(setRoom({roomId : '', roomName : ''}))
    if(item.userId !== auth.userId) {
      router.push({
        pathname : `/chat/${auth.userId}-${item.userId}`,
        query : {
            friendUserId : item.userId,
            friendNickname : item.nickName,
            friendAvatar : item.avatar,
            friendColor : item.color,
        }
      })
    }
  }