export default function ChatHandler (req : any, res : any) {
    if(req.method === 'POST') {
     const payload = req.body.payload
     
     //res.socket.server.io.to(to).emit('fetch-messages', from)
     res.status(201).json({success : true, payload : payload})
    } 
 }