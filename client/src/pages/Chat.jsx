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
    
    <div className="relative flex h-screen">      
      {/* SearchModal */}
      {isSearchModalOpen && (
        <SearchModal
          isOpen={isSearchModalOpen}
          onClose={() => setIsSearchModalOpen(false)}
          setChatWith={setChatWith}
        />
      )}

      <div className="flex w-full h-full">
        <div className="w-1/4 bg-gray-200 p-4 overflow-y-auto">
          <ChatsList />
        </div>
        <div className="flex flex-col w-3/4">
          <CurrentChat />
        </div>
      </div>
    </div>
  )
}

export default Chat
