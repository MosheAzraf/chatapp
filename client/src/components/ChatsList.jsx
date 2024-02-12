import { useEffect, useState } from 'react'

import { useSelector,useDispatch } from 'react-redux';
import { setChatWith, setChatRoomId} from '../redux/features/chatSlice'


import { RiChatPrivateFill } from "react-icons/ri"; //private chat
import { FaPeopleGroup } from "react-icons/fa6"; // group
import { RiContactsFill } from "react-icons/ri"; // contacts





const ChatsList = ({socket}) => {
  const [chatsList,setChatsList] = useState([]);
  const [isPrivate, setIsPrivate] = useState(false);
  const [isGroup, setIsGroup] = useState(false);
  const [isContacts, setIsContacts] = useState(false);
  
  const userName = useSelector((state) => state.user.userName);
  const dispatch = useDispatch();

  const setCurrentChat = (roomId, sendTo) => {
    console.log(roomId, sendTo)
    dispatch(setChatRoomId({roomId}))
    dispatch(setChatWith({sendTo}))
  }

  useEffect(() => {
    socket.on("receiveChatList", (data) => {
      console.log("Chat list received:", data);
      setChatsList(data);
    });

    socket.on("receiveChatListError", (errorData) => {
      console.error("Error receiving chat list:", errorData.error);
    });

    if (userName) {
      socket.emit("loadChatList", { userName });
    } else {
      console.error("UserName is undefined");
    }

    return () => {
      socket.off("receiveChatList");
      socket.off("receiveChatListError");
    };
  }, [socket, userName]);

  return (
    <div className=''>
      <div className=''>
        <ul className='grid grid-cols-3 row-span-3 gap-8'>
          <li><RiChatPrivateFill/></li>
          <li><FaPeopleGroup/></li>
          <li><RiContactsFill/></li>
        </ul>
      </div>
      <ul>
        {
          chatsList && chatsList.map((chat, index) => {
            const filteredUser = chat.users.filter((user) => user.userName !== userName);
            const otherUser = filteredUser[0].userName;
            return (
              <li className='' key={index} onClick={() => setCurrentChat(chat._id, otherUser)}>
                {
                  otherUser
                }
              </li>
            )
          })

        }
      </ul>
    </div>
  )
}

export default ChatsList

// useEffect(() => {    
//   const loadData = async () => {
//     await socket.emit("loadChatList", {userName});
    
//     await socket.on("receiveChatList", (data) => {
//       console.log(data);
//       setChatsList(data);
//     })
//   }
//   loadData();

//   return () => {
//     socket.off("loadChatList");
//     socket.off("reciveChatsList");
//   }
// },[socket]);