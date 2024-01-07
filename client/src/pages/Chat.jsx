import {useEffect, useState} from 'react'
import {socket} from '../configs/socket'
import { useSelector } from 'react-redux';




const Chat = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userName = useSelector((state) => state.user.userName);
  console.log(isLoggedIn, userName)
  const [onlineUsers, setOnlineUsers] = useState([]);



  useEffect(() => {
    if(isLoggedIn && userName){
      //send userName to server to store alongside the 
      //current socket.id connection.
      socket.io.opts.query = {userName};
      socket.connect();
    }

    socket.on("getOnlineUsers", (data) => {
      setOnlineUsers(data);
    });


    return () => {
      socket.disconnect();
    }
  },[isLoggedIn, userName]);


  return (
    <div>
      <h1>chat</h1>
      <button onClick={() => console.log("users:",onlineUsers)}>get users</button>

    </div>
  )
}

export default Chat
