import { useEffect, useState } from "react";
import { socket } from "../configs/socket";
import { useSelector, useDispatch } from "react-redux";
import ChatsList from "../components/ChatsList";
import CurrentChat from "../components/CurrentChat";

const Chat = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userName = useSelector((state) => state.user.userName);
  console.log(isLoggedIn, userName);

  //might need that later..
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    if (isLoggedIn && userName) {
      //send userName to server to store alongside the
      //current socket.id connection.
      socket.io.opts.query = { userName };
      socket.connect();
    }

    socket.on("getOnlineUsers", (data) => {
      console.log(data);
      setOnlineUsers(data);
    });

    return () => {
      socket.disconnect();
    };
  }, [isLoggedIn, userName]);

  return (
    <div className="flex flex-1 overflow-hidden"> {/* flex-1 to fill the space, overflow-hidden to prevent additional scrolling */}
      <div className="w-1/4 bg-gray-200 p-4 overflow-y-auto">
        <ChatsList />
      </div>
      <div className="flex flex-col w-3/4">
        <CurrentChat socket={socket} />
      </div>
    </div>
  );
};

export default Chat;
