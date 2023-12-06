import { AnyAction } from "@reduxjs/toolkit";
import { Dispatch } from "react";
import { Iauth, IwaitPeople } from "./all";

export interface IFriendsHeader {
    dispatch : Dispatch<AnyAction>
}
export interface IAboutMe {
    auth : Iauth
}
export interface IaboutFriends {
    friend : any;
    wait : IwaitPeople;
}