import { NextRouter } from "next/router";
import { Iauth } from "./all";

export interface IchatBody {
    chat : any;
    auth : Iauth;
}

export interface IchatBodyInner {
    key : number;
    item : any;
    auth : Iauth;
}

export interface IchatBodyInnerTime {
    item : any;
    auth : Iauth;
}

export interface IchatInput {
    message : string;
    setMessage : React.Dispatch<React.SetStateAction<string>>;
    auth : Iauth;
}

export interface IprivateChatPayload {
    from : string;
    to : any;
    time : string;
    message : string
}
