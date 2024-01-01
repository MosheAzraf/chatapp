import {useEffect} from 'react'
import {socket} from '../configs/socket'

const Chat = () => {
  useEffect(() => {
    socket.connect();

  return () => {
    socket.disconnect();
    }
  },[]);


  return (
    <div>Chat</div>
  )
}

export default Chat
