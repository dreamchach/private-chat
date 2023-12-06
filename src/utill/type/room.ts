import { AnyAction } from "@reduxjs/toolkit";
import { NextRouter } from "next/router";
import { Dispatch } from "react";

export interface IroomLink {
    item : any;
    dispatch : Dispatch<AnyAction>
}

export interface IroomModal {
    modal : true;
    setModal : React.Dispatch<React.SetStateAction<boolean>>;
    dispatch : Dispatch<AnyAction>;
    router : NextRouter;
}