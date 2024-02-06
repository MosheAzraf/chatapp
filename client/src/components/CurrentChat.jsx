import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setChatRoomId } from "../redux/features/chatSlice";

const CurrentChat = ({ socket }) => {
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.userName);
  const roomId = useSelector((state) => state.chat.roomId);
  const chatWith = useSelector((state) => state.chat.sendTo);
  console.log("chatWith:", chatWith);

  useEffect(() => {
    if (roomId) {
      socket.emit("joinRoom", { roomId: roomId });
      socket.on("loadChatMessages", (data) => {
        setMessages(data);
      });
    }

    socket.on("receiveMessage", (data) => {
      console.log("receiveMessage", data);
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.emit("leaveRoom", { roomId: roomId });
      socket.off("receiveMessage");
      socket.off("loadChatMessages");
    };
  }, [socket, roomId, chatWith]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
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
    if (inputMessage.trim() !== "" && chatWith.length > 0) {
      if (!roomId) {
        // Create chat only if roomId does not exist
        socket.emit(
          "createChat",
          { from: currentUser, to: chatWith },
          (response) => {
            if (response.success) {
              const newRoomId = response.chatId;
              dispatch(setChatRoomId({ roomId: newRoomId }));
              emitMessage(newRoomId);
            } else {
              console.error("Error creating chat:", response.error);
            }
          }
        );
      } else {
        emitMessage(roomId);
      }
    }
  };

  const emitMessage = (roomId) => {
    socket.emit("sendMessage", {
      roomId: roomId,
      from: currentUser,
      to: chatWith,
      message: inputMessage,
    });
    setInputMessage("");
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
                  <p className="text-black font-bold">
                    {msg.from} {msg.time}{" "}
                  </p>
                )}

                <p className="break-words">{msg.text}</p>
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

// socket.emit('createChat', { from: currentUser, to: sendTo }, (response) => {
//   if (response.success) {
//       // Use the chatId returned from the server
//       const roomId = response.chatId;
//       dispatch(setChat({ roomId, sendTo }));
//       console.log("Chat initiated with:", { roomId, sendTo });
//   } else {
//       // Handle any errors (e.g., display an error message)
//       console.error("Error creating chat:", response.error);
//   }
// });
