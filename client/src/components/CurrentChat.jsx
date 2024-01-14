// CurrentChat.js
import React from 'react';

const CurrentChat = () => {
  return (
    <div className="flex flex-col h-full">
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
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default CurrentChat;
