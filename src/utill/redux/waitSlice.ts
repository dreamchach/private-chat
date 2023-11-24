import { createSlice } from "@reduxjs/toolkit"

export const waitSlice = createSlice({
    name : 'wait',
    initialState : {waitPeople : []},
    reducers : {
      input : (state : any, action) => {
        const copy = [...state.waitPeople, action.payload]
        const set = new Set(copy)
        state.waitPeople = [...set as any]
      },
      output : (state : any, action) => {
        const array = state.waitPeople.filter((item : string) => item !== action.payload)
        state.waitPeople = array
      }
    },
})

export const {input, output} = waitSlice.actions

export default waitSlice.reducer