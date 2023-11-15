import messageModel from "@/model/Message"
import axios from "axios"
import { io } from "socket.io-client"
import { ISaveMessage } from "../types/api"
import { avatarLists } from "../array/avatarList"
import { setNickName, setUserId } from "../redux/authSlice"

export const randomId = () => {
  return crypto.randomUUID()
}

export const socketInitial = async (
  socket : any, 
  setFriends : any,
  auth : any
) => {
  try {

    await axios.get('/api/socket')
    socket = io()
    
    socket.auth = auth
    await socket.connect()
    /*
    localStorage.setItem('session-username', res.data.username)
    localStorage.setItem('session-userID', res.data.userID)
    localStorage.setItem('session-avatar', avatar)
    localStorage.setItem('session-color', color)    
    */

    socket.on('users-data', ({users} : {users : any}) => {
      const notMe = users.filter((user : any) => user.userID !== auth.userId)
      setFriends(notMe)
    })

  } catch (error) {
    console.log('socketInitial error')
  }  
}

export const getToken = (sender : string, receiver : string) => {
    const key = [sender, receiver].sort().join('_')
    return key
}

export const saveMessages = async({from, to, message, time} : ISaveMessage) => {
    const token = getToken(from, to)
    const data = {from, message, time}
    const res = await messageModel.findOneAndUpdate({userToken : token}, {$push: {messages : data}})
    console.log(2, res)
}

export const fetchMessages = async (io : any, sender : string, receiver : string) => {
    const token = getToken(sender, receiver)
    const foundToken = await messageModel.findOne({userToken : token})

    if(foundToken) {
        io.to(sender).emit('stored-messages', {messages : foundToken.messages})  
    } else {
        const data = {
            userToken : token,
            messages : []
        }
        const message = new messageModel(data)
        const saveMessage = await message.save()

        if(saveMessage) console.log('메시지가 생성되었습니다')
        else console.log('메시지 생성 중 에러가 발생했습니다') 
    }
}

export const onclick = (name : string, router : any, dispatch : any) => {
  dispatch(setNickName(name))
  dispatch(setUserId(name)) 
  if(name !== '') {
      router.push('/friend')
    }
}
export const pressEnter = (key : string, name : string, router : any, dispatch : any) => {
  dispatch(setNickName(name))
  dispatch(setUserId(name))
  if(key === 'Enter' && name !== '') {
      router.push('/friend')
    }
  }

  export const randomColor = (setColor : any) => {
    let colors : string[] = []
    for(let i = 0; colors.length < 5; i += 1) {
      let hex = '#'
      for(let i = 0; i < 3; i += 1) {
        hex += Math.ceil(Math.random()*255).toString(16)
      }
      colors.push(hex)
    }
    setColor(colors)
}

export const randomAvatar = (setAvatar : any) => {
  const length = avatarLists.length
  const number = Math.ceil(Math.random() * length)
  setAvatar(avatarLists[number])
}

export const random = (setColor : any, setAvatar : any) => {
  randomColor(setColor)
  randomAvatar(setAvatar)
}