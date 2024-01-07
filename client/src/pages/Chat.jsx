import {useEffect} from 'react'
import {socket} from '../configs/socket'
import { useSelector } from 'react-redux';

const Chat = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userName = useSelector((state) => state.user.userName);



  useEffect(() => {
    if(isLoggedIn && userName){
      socket.connect();
    }

    

    return () => {
      socket.disconnect();
    }
  },[isLoggedIn, userName]);


  return (
    <div>Chat</div>
  )
}

export default Chat
