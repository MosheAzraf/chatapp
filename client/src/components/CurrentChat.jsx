import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const CurrentChat = ({ socket }) => {
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const chatWith = useSelector((state) => state.chat.startChatWith);
  const currentUser = useSelector((state) => state.user.userName);


  console.log("chatwith:", chatWith);

  useEffect(() => {
    socket.emit("joinRoom", { roomId: chatWith });

    socket.on("receiveMessage", (data) => {
      console.log(data.from, data.message);
      setMessages((prev) => [...prev,
        { from: data.from, message: data.message },
      ]);    
    });

    return () => {
      socket.emit("leaveRoom", { roomId: chatWith });
      socket.off("receiveMessage");
    };
  }, [socket, chatWith]);

  const handleMessage = (e) => {
    e.preventDefault();
    const msg = e.target.value;
    setInputMessage(msg);
  };

  const sendMessage = () => {
    if (inputMessage.trim() !== "") {
      socket.emit("sendMessage", {
        roomId: chatWith,
        from: currentUser,
        message: inputMessage,
      });
    }
  };

  return (
    <div className="flex flex-col h-full">
      <h1 className="">chat with : {chatWith}</h1>

      {/* Messages */}
      <div
        className="flex-grow overflow-y-auto p-4"
        style={{ marginBottom: "4rem" }}
      >
        {messages &&
          messages.map((msg, index) => {
            // Check if the current message is the first message or if the sender is different from the previous message
            const showSenderName =
              index === 0 || messages[index - 1].from !== msg.from;

            return (
              <div
                key={index}
                className={`flex ${
                  msg.from === currentUser ? "justify-start" : "justify-end"
                } hover:bg-gray-300`}
              >
                <div className="flex flex-col">
                  {showSenderName && (
                    <p className="text-black font-bold">{msg.from}</p>
                  )}
                  <p>{msg.message}</p>
                </div>
              </div>
            );
          })}
      </div>

      {/* Input Area */}
      <div className="mt-auto px-4 w-full max-w-[calc(100%-4rem)] mx-auto bg-white border-t border-gray-300">
        {/* Adjust max-w-[calc(100%-4rem)] to match the message container width */}
        <div className="flex gap-2">
          <input
            type="text"
            className="flex-1 p-2 border border-gray-300 rounded"
            placeholder="Type a message..."
            value={inputMessage}
            onChange={handleMessage}
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default CurrentChat;
