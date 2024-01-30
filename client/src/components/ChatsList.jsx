import { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import ChatDetails from './ChatDetails';


const ChatsList = ({socket}) => {
  const [chatsList,setChatsList] = useState([]);
  const [isPrivate, setIsPrivate] = useState(false);
  const [isGroup, setIsGroup] = useState(false);
  const [isContacts, setIsContacts] = useState(false);
  
  const userName = useSelector((state) => state.user.userName);
  const dispatch = useDispatch();//i'll use it to set the room id. 






  useEffect(() => {    
    
    const loadData = () => {
      socket.emit("loadChatList", {userName});
      
      socket.on("receiveChatList",  (data) => {
        console.log(data);
        setChatsList(data);
      })
    }
    loadData()

    return () => {
      socket.off("loadChatList");
      socket.off("reciveChatsList");
    }
  },[socket]);




  return (
    <div>
      
      <ul>
        {
          chatsList && chatsList.map((chat, index) => {
            const otherUser = chat.users.filter((user) => user.userName !== userName)
            console.log(otherUser)
            
            return (
              <li key={index} >
                {
                  otherUser[0].userName
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