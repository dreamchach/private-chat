import React from 'react'
import { getToken, socketInitial } from "@/utill/functions/functions"
import Avatar from "boring-avatars"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useSelector } from 'react-redux'
import axios from 'axios'
import { io } from 'socket.io-client'

interface IFriend {
    userID : string;
    avatar : string;
    color : string[];
    username : string;
}

const Main = () => {
    const router = useRouter()
    const [friends, setFriends] = useState([])
    const auth = useSelector((state : any) => {
        return state.auth
    })
    let socket : any
    
    useEffect(() => {
        const initial = async () => {
            await axios.get('/api/socket')
            socket = io()
            await socket.connect()
        }
        initial()
        
        return () => {
            if(socket) {
                socket.disconnect()
            }            
        }

        /*
        const socketInitial = async (
            socket : any, 
            setFriends : any,
            auth : any
          ) => {
            try {
              await axios.get('/api/socket')
              socket = io()
              console.log('socket', socket)
              
              socket.auth = auth
              console.log('socket auth', socket)
              const res = await socket.connect()
                console.log(res)

              socket.on('users-data', ({users} : {users : any}) => {
                const notMe = users.filter((user : any) => user.userID !== auth.userId)
                setFriends(notMe)
              })
          
            } catch (error) {
              console.log('socketInitial error')
            }  
          }
          socketInitial(socket, setFriends, auth)
          */
    }, [])

    console.log(friends)

    const friendOnclick = (friendID : string) => {
        const res = getToken(auth.userId, friendID)
        moveChat(res)        
    }

    const moveChat = (room : string) => {
        router.push(`/chatroom/${room}`)
    }

    return (
        <div>
            <div>
                <Avatar
                    size={40}
                    name={auth.avatar}
                    variant='beam'
                    colors={auth.color}
                />
                <div>{auth.nickName}</div>
            </div>
            <div>
                {friends.length > 0 && friends.map((friend : IFriend) => (
                    <div 
                        key={friend.userID} 
                        onClick={() => friendOnclick(friend.userID)}
                    >
                        <Avatar
                            size={40}
                            name={friend.avatar}
                            variant="beam"
                            colors={friend.color}
                        />
                        <div>{friend.username}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Main