import { createSlice } from "@reduxjs/toolkit"
import { avatarLists } from '@/utill/array/avatarList'

export const authSlice = createSlice({
    name : 'auth',
    initialState : {
      nickName : '',
      color : ["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"],
      avatar : 'Mary Baker',
      userId : '',
    },
    reducers : {
      randomColor : (state : any) => {
        let colors : string[] = []
        for(let i = 0; colors.length < 5; i += 1) {
          let hex = '#'
          for(let i = 0; i < 3; i += 1) {
            hex += Math.ceil(Math.random()*255).toString(16)
          }
          colors.push(hex)
        }
        state.color = colors
      },
      randomAvatar : (state) => {
        const length = avatarLists.length
        const number = Math.ceil(Math.random() * length)
        state.avatar = avatarLists[number]
      },
      setNickName : (state, action) => {
        state.nickName = action.payload
      },
      setUserId : (state, action) => {
        state.userId = action.payload
      },
      removeUser : (state) => {
        state.nickName = ''
        state.userId = ''
      }
    },
})

export const {randomColor, randomAvatar, setNickName, setUserId, removeUser} = authSlice.actions

export default authSlice.reducer