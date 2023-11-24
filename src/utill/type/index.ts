import { AnyAction } from "@reduxjs/toolkit";
import { Dispatch } from "react";

export interface IRandomAvatar {
    auth : any;
    dispatch : Dispatch<AnyAction>
}