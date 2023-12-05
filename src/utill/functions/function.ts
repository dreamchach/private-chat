import { Dispatch } from "react"
import { randomAvatar, randomColor, setRoom } from "../redux/authSlice"
import { AnyAction } from "@reduxjs/toolkit"
import axios from "axios"

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

export const privateChatInputEnter = async (event : any, message : string, setDouble : any, friendUserId : any, auth : any, payload : any, setMessage : any) => {
    if(event.key === 'Enter' && message !== '') {
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

export const privateChatInputClick = async (message : string, setDouble : any, friendUserId : any, auth : any, payload : any, setMessage : any) => {
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

export const allChatInputEnter = async (event : any, message : string, payload : any, roomId : any, setMessage : any) => {
    if(event.key === 'Enter' && message !== '') {
      await axios.post('/api/roommessage', {payload, roomId : roomId})
      setMessage('')
    }
}

export const allChatInputClick = async (message : string, payload : any, roomId : any) => {
    if(message !== '') {
        await axios.post('/api/roommessage', {payload, roomId : roomId})
    }
}

export const chatLast = async (friendUserId : any, auth : any, setChat : any) => {
    const res = await axios.post('/api/last', {
      to : friendUserId, 
      from : auth.userId
    })
    setChat(res.data.data.messages)
  }

export const roomInputClick = async (roomName : string, setModal : any, dispatch : any, router : any) => {
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

export const roomInputKeyup = async (event : any, roomName : string, setModal : any, dispatch : any, router : any) => {
    if (event.key === 'Enter' && roomName !== '') {
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
  }else if(event.key === 'Enter' && roomName === '') {
      alert('이름은 공백이 불가능합니다')
  }
  }