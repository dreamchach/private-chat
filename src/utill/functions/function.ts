import { Dispatch } from "react"
import { randomAvatar, randomColor } from "../redux/authSlice"
import { AnyAction } from "@reduxjs/toolkit"

export const onRandom = (dispatch : Dispatch<AnyAction>) => {
    dispatch(randomColor())
    dispatch(randomAvatar())
}