export interface Ipayload {
    from : string;
    auth? : Iauth;
    time? : string;
    message : string;
}

export interface Iroom {
    roomId : string;
    roomName : string;
}

export interface Iauth {
    avatar : string;
    color : string[];
    nickName : string;
    room : Iroom;
    userId : string;
}

export interface IwaitPeople {
    waitPeople : string[]
}

export interface Istate {
    auth : Iauth;
    wait : IwaitPeople;
}

/*
export interface Ichat {
    auth? : Iauth;
    from : string;
    message : string;
    time? : string;
}
*/

export interface IroomData {
    roomId : string;
    roomName : string;
    users : Iauth[];
}