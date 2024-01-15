import {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';

const CurrentChat = ({ socket}) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const chatWith = useSelector(state => state.chat.startChatWith);
  console.log("chatwith:", chatWith);   

  useEffect(() => {
    socket.emit("joinRoom", {roomId: chatWith});
    
    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, data]);
      console.log(data);
      console.log(messages);
    })

    return () => {
      socket.emit("leaveRoom",{roomId:chatWith})
      socket.off("receiveMessage");
    }
  },[socket, chatWith]);

  const handleMessage = (e) => {
    e.preventDefault();
    const msg = e.target.value;
    setMessage(msg);
  };

  const sendMessage = () => {
    socket.emit("sendMessage", {roomId:chatWith, message:message});
  }


  return (
    <div className="flex flex-col h-full">
      <h1 className=''>chat with : {chatWith}</h1>
      {/* Messages */}
      <div className="flex-grow overflow-y-auto p-4">
        {/* Messages will go here */}
      </div>

      {/* Input Area */}
      <div className="p-2 bg-white border-t border-gray-300">
        <div className="flex gap-2">
          <input
            type="text"
            className="flex-1 p-2 border border-gray-300 rounded"
            placeholder="Type a message..."
            onChange={handleMessage}
          />
          <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default CurrentChat;
