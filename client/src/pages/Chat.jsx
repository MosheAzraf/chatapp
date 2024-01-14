import {useEffect, useState} from 'react'
import {socket} from '../configs/socket'
import { useSelector } from 'react-redux';
import SearchModal from '../components/SearchModal';
import ChatsList from "../components/ChatsList";
import CurrentChat from "../components/CurrentChat";

const Chat = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userName = useSelector((state) => state.user.userName);
  console.log(isLoggedIn, userName)

  //might need that later..
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [chatList, setChatList] = useState([]);
  //start a chat with a user that isn't on chat list..
  const [chatWith, setChatWith] = useState("");


  useEffect(() => {
    if(isLoggedIn && userName){
      //send userName to server to store alongside the 
      //current socket.id connection.
      socket.io.opts.query = {userName};
      socket.connect();
    }

    socket.on("getOnlineUsers", (data) => {
      console.log(data);
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
        <button onClick={() => setIsSearchModalOpen(true)}>Search Users</button>
        <SearchModal
          isOpen={isSearchModalOpen}
          onClose={() => setIsSearchModalOpen(false)}
          setChatWith={setChatWith}
        />
      </div>
      <hr />

      <div className='grid grid-cols-3 items-stretch'>
        <div>
          <ChatsList/>
        </div>

        {/* vartical line */}
        <div className='w-px bg-gray-300'></div>

        <div>
          <CurrentChat/>
        </div>
      </div>
    </div>
  )
}

export default Chat
