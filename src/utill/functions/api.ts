export const getToken = (sender : string, receiver : string) => {
    const key = [sender, receiver].sort().join('_')
    return key
}