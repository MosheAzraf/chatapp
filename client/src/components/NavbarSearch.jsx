import { useState } from "react";
import useUserSearch from "../hooks/useUserSearch";
import { useDispatch } from "react-redux";
import { setChatWith } from "../redux/features/chatSlice";


const NavbarSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: users, isLoading, isError } = useUserSearch(searchTerm);

  const dispatch = useDispatch();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectedUserToChatWith = (sendTo) => {
    console.log(sendTo);
    dispatch(setChatWith({sendTo}))
    setSearchTerm("");
  }
  

  return (
    <div className="relative">
      <input
        onChange={handleSearchChange}
        type="text"
        value={searchTerm}
        placeholder="Search for users / groups"
        className="w-full pl-10 pr-3 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300 text-black"
      />
      <div className="absolute top-full left-0 w-[400px] bg-white shadow-md mt-1 max-h-60 overflow-auto z-10">
        {isLoading && <p className="p-2 text-gray-500">Loading...</p>}
        {isError && (
          <p className="p-2 text-red-500">Error: Could not fetch users.</p>
        )}
        {users &&
          users.map((user, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-2 hover:bg-gray-100 rounded-md"
            >
              <p className="flex-1 truncate text-black">{user.userName}</p>
              <div className="flex space-x-1">
                <button
                  onClick={() => handleSelectedUserToChatWith(user.userName)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-xs flex-shrink-0"
                >
                  Start Chat
                </button>
                <button className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-1 px-2 rounded text-xs flex-shrink-0">
                  Block
                </button>
                <button className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-1 px-2 rounded text-xs flex-shrink-0">
                  Remove
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default NavbarSearch;

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


// const handleSelectedUserToChatWith = (sendTo) => {
//   const roomId = [currentUser, sendTo].sort().join('_');
//   dispatch(setChat({roomId,sendTo}));
//   console.log("chat initiated with:", {roomid: roomId, sendTo})
//   setSearchTerm("");
// }
