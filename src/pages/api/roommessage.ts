export default function ChatHandler (req : any, res : any) {
    if(req.method === 'POST') {
     const roomId = req.body.roomId
     const payload = req.body.payload
     
    res.socket.server.io.to(roomId).emit('room-messages', payload)
     //res.status(201).json({success : true, payload : payload})
    } 
 }