import { AnyAction } from "@reduxjs/toolkit";
import { Dispatch } from "react";
import { Iauth } from "./all";

export interface IRandomAvatar {
    auth : Iauth;
    dispatch : Dispatch<AnyAction>
}