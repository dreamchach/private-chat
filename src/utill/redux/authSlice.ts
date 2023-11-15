import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { avatarLists } from "../array/avatarList";
import axios from "axios";

export const setUserId = createAsyncThunk('auth/setUserId', async (value : any) => {
  const res = await axios.post('/api/session', {
    username : value
  })
  return res.data
})

export const authSlice = createSlice({
    name : 'auth',
    initialState : {
      nickName : '',
      color : ["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"],
      avatar : 'Mary Baker',
      userId : ''
    },
    reducers : {
      randomColor : (state) => {
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
      }
    },
    extraReducers : (builder) => {
      builder.addCase(setUserId.fulfilled, (state, action) => {
        state.userId = action.payload.userID
      })
    }
})

export const {randomColor, randomAvatar, setNickName} = authSlice.actions

export default authSlice.reducer