import React from 'react'

const ChatDetails = ({key,chatWith}) => {
  return (
    <li key={key}>{chatWith}</li>
  )
}

export default ChatDetails