export interface IUsers {
    username : string;
    userID : string;
}
export interface ISaveMessage {
    from : string
    to : string;
    message : string;
    time : string
}
export interface IUserData {
    username : string;
    userID : string;
    avatar : string;
    color : string[]
}