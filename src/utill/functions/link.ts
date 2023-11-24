import { setNickName, setUserId } from "../redux/authSlice"
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