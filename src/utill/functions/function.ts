import { Dispatch } from "react"
import { randomAvatar, randomColor } from "../redux/authSlice"
import { AnyAction } from "@reduxjs/toolkit"

export const onRandom = (dispatch : Dispatch<AnyAction>) => {
    dispatch(randomColor())
    dispatch(randomAvatar())
}

const Nowtime = () => {
    const answer = new Date().toLocaleString('ko-KR', {
        hour : 'numeric',
        minute : 'numeric',
        hour12 : true
    })
    return answer
}

export const payload = (auth : any, router : any, message : string) => {
    const answer = {
        from : auth.userId,
        to : router.query.friendUserId,
        time : Nowtime(),
        message,
    }
    return answer
}