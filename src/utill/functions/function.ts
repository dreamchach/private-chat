import { Dispatch } from "react"
import { randomAvatar, randomColor, setRoom } from "../redux/authSlice"
import { AnyAction } from "@reduxjs/toolkit"
import axios from "axios"
import { Iauth, Ipayload } from "../type/all"
import { NextRouter } from "next/router"
import { IprivateChatPayload } from "../type/chat"

export const onRandom = (dispatch : Dispatch<AnyAction>) => {
    dispatch(randomColor())
    dispatch(randomAvatar())
}

export const Nowtime = () => {
    const answer = new Date().toLocaleString('ko-KR', {
        hour : 'numeric',
        minute : 'numeric',
        hour12 : true
    })
    return answer
}

export const privateChatInputEnter = async (key : string, message : string, setDouble : React.Dispatch<React.SetStateAction<boolean>>, friendUserId : any, auth : Iauth, payload : IprivateChatPayload, setMessage : React.Dispatch<React.SetStateAction<string>>) => {
    if(key === 'Enter' && message !== '') {
        await setDouble(true)
        
        await axios.post('/api/fetch', {
            to : friendUserId,
            from : auth.userId
        })
        await axios.post('/api/store', {payload})

        await axios.post('/api/message', {payload})

        await setMessage('')
        await setDouble(false)
    }
}

export const privateChatInputClick = async (message : string, setDouble : React.Dispatch<React.SetStateAction<boolean>>, friendUserId : any, auth : Iauth, payload : IprivateChatPayload, setMessage : React.Dispatch<React.SetStateAction<string>>) => {
    if(message !== '') {
        await setDouble(true)
        
        await axios.post('/api/fetch', {
            to : friendUserId,
            from : auth.userId
        })
        await axios.post('/api/store', {payload})
        
        await axios.post('/api/message', {payload})
        
        await setMessage('')
        await setDouble(false)
    }
}

export const allChatInputEnter = async (event : React.KeyboardEvent<HTMLInputElement>, message : string, payload : Ipayload, roomId : any, setMessage : React.Dispatch<React.SetStateAction<string>>) => {
    if(event.key === 'Enter' && message !== '') {
      await axios.post('/api/roommessage', {payload, roomId : roomId})
      setMessage('')
    }
}

export const allChatInputClick = async (message : string, payload : Ipayload, roomId : any, setMessage : React.Dispatch<React.SetStateAction<string>>) => {
    if(message !== '') {
        await axios.post('/api/roommessage', {payload, roomId : roomId})
        setMessage('')
    }
}
/*
export const chatLast = async (friendUserId : any, auth : any, setChat : any) => {
    const res = await axios.post('/api/last', {
      to : friendUserId, 
      from : auth.userId
    })
    console.log('res', res)
    setChat(res.data.data.messages)
  }
*/
export const roomInputClick = async (roomName : string, setModal : React.Dispatch<React.SetStateAction<boolean>>, dispatch : React.Dispatch<AnyAction>, router : NextRouter) => {
    if(roomName !== '') {
      setModal(false)
      const roomId = crypto.randomUUID()
      dispatch(setRoom({roomId, roomName}))
      router.push({
        pathname : `/allchat/${roomId}`,
        query : {
          roomid : roomId,
          roomname : roomName
        }
      })      
    }else {
      alert('채팅방 이름은 공백이 불가능합니다')
    }
  }

export const roomInputKeyup = async (key : string, roomName : string, setModal : React.Dispatch<React.SetStateAction<boolean>>, dispatch : React.Dispatch<AnyAction>, router : NextRouter) => {
    if (key === 'Enter' && roomName !== '') {
      setModal(false)
      const roomId = crypto.randomUUID()
      dispatch(setRoom({roomId, roomName}))
      router.push({
        pathname : `/allchat/${roomId}`,
        query : {
          roomid : roomId,
          roomname : roomName
        }
      }) 
  }else if(key === 'Enter' && roomName === '') {
      alert('이름은 공백이 불가능합니다')
  }
  }