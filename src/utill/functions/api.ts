export const getToken = (sender : string, receiver : string) => {
    const key = [sender, receiver].sort().join('_')
    return key
}

export const saveMessage = async (payload : any, messageModel : any) => {
    const token = getToken(payload.from, payload.to)
    await messageModel.findOneAndUpdate({userToken : token}, {$push: {messages : payload}})    
}

export const fetchMessage = async (socket : any, to : any, io : any, messageModel : any) => {
    const token = getToken(socket.id, to)
    const foundToken = await messageModel.findOne({userToken : token})

    if(foundToken) {
      console.log('token is found')
      io.to(socket.id).emit('stored-messages', {messages : foundToken.messages})
      io.to(to).emit('send-message', socket.id)
    } else {
      const data = {
        userToken : token,
        messages : []
      }
      const message = new messageModel(data)
      const saveMessage = message.save()

      if(saveMessage) console.log('create message')
      else console.log('creating message error')
    }
}