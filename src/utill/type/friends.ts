import { AnyAction } from "@reduxjs/toolkit";
import { Dispatch } from "react";

export interface IFriendsHeader {
    dispatch : Dispatch<AnyAction>
}
export interface IAboutMe {
    auth : any
}