import { AnyAction } from "@reduxjs/toolkit";
import { Dispatch } from "react";
import { Iauth, Ipayload } from "./all";
import { NextRouter } from "next/router";

export interface IallChatHeader {
    setModal : React.Dispatch<React.SetStateAction<boolean>>;
    roomName : any;
    setOpenRoomUsers : React.Dispatch<React.SetStateAction<boolean>>;
    openRoomUsers : boolean;
}

export interface IallChatUserList {
    roomUsers : any;
    dispatch : Dispatch<AnyAction>
    auth : Iauth;
    router : NextRouter;
}

export interface IallChatBody {
    chat : any;
    auth : Iauth;
}

export interface IallChatInput {
    message : string;
    setMessage : React.Dispatch<React.SetStateAction<string>>;
    payload : Ipayload;
    roomId : any;
}

export interface IallChatModal {
    modal : true;
    router : NextRouter;
    setModal : React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IallChatBodyInner {
    item : any;
    auth : Iauth;
}