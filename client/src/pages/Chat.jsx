import {useEffect} from 'react'
import {socket} from '../configs/socket'
import { useSelector } from 'react-redux';

const Chat = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if(isLoggedIn) {
      socket.connect();
    }

    return () => {
      socket.disconnect();
    }
  },[isLoggedIn]);


  return (
    <div>Chat</div>
  )
}

export default Chat
