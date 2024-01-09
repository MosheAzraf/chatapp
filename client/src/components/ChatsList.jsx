import React from 'react'

const test = [
  {id:1, name:"a"},
  {id:2, name:"b"},
  {id:3, name:"c"},
  {id:4, name:"d"},
  {id:5, name:"e"},
]

const ChatsList = () => {
  return (
    <div>
      <ul>
        {
          test.map((t, index) => (
            <li key={index}>{t.name}</li>
          ))
        }
      </ul>
    </div>
  )
}

export default ChatsList