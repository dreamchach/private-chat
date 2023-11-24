import { useEffect } from 'react'

export default function Home({socket} : any) {
  useEffect(() => {
    const socketConnect = () => {
      if(socket) {
        socket.on('connect', () => {
          console.log('connected')
        })
        socket.on('error', (error : any) => {
          console.log('error')
        })
      }      
    }
    socketConnect()
    
  }, [socket])
  
  return (
    <main>main</main>
  )
}
