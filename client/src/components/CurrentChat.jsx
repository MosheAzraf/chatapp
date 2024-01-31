import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const CurrentChat = ({ socket }) => {
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const currentUser = useSelector((state) => state.user.userName);
  const room = useSelector((state) => state.chat.roomId);
  const chatWith = useSelector((state) => state.chat.sendTo);
  console.log("chatWith:", chatWith)

  useEffect(() => {
    if(room){
      socket.emit("joinRoom", { roomId: room });
    }

    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [
        ...prev,
        { from: data.from, message: data.message },
      ]);
    });

    return () => {
      socket.emit("leaveRoom", { roomId: room });
      socket.off("receiveMessage");
    };
  }, [socket, chatWith]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]); 

  const handleMessage = (e) => {
    setInputMessage(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const sendMessage = async () => {
    if (inputMessage.trim() !== "") {
      await socket.emit("sendMessage", {
        roomId: room,
        from: currentUser,
        to:chatWith,
        message: inputMessage,
      });
      setInputMessage("");
    }
  };

  return (
    <div className="flex flex-col h-full">
      <h1 className="p-4 border-b flex-shrink-0">Chat with: {chatWith}</h1>
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, index) => {
          const showSenderName =
            index === 0 || messages[index - 1].from !== msg.from;
          return (
            <div
              key={index}
              className={`flex ${
                msg.from === currentUser ? "justify-start" : "justify-end"
              }`}
            >
              <div className="flex flex-col">
                {showSenderName && (
                  <p className="text-black font-bold">{msg.from}</p>
                )}
                <p className="break-words">{msg.message}</p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex-none p-4 bg-white border-t border-gray-300">
        <div className="flex items-center">
          <input
            className="flex-1 py-2 px-3 rounded-l-full bg-gray-100 focus:outline-none"
            onKeyDown={handleKeyPress}
            onChange={handleMessage}
            type="text"
            placeholder="Type your message"
            value={inputMessage}
          />
          <button
            className="flex-shrink-0 py-2 px-4 bg-blue-500 text-white rounded-r-full hover:bg-blue-600"
            onKeyDown={handleKeyPress}
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default CurrentChat;
