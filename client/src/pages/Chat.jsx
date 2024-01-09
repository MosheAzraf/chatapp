import {useEffect, useState} from 'react'
import {socket} from '../configs/socket'
import { useSelector } from 'react-redux';

const Chat = () => {
  //redux states
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userName = useSelector((state) => state.user.userName);
  console.log(isLoggedIn, userName)
  
  //react states
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
      <hr />

      <div className='flex'>
        <button>search users</button>
      </div>
      <hr />

      <div className='grid grid-cols-3 items-stretch'>
        <div>
          <p>chat list</p>
        </div>

        {/* vartical line */}
        <div className='w-px bg-gray-300'></div>

        <div>
          <p>current chat</p>
        </div>
      </div>



    </div>
  )
}

export default Chat
