import React, { useState, useEffect } from 'react'
import socketIOClient from 'socket.io-client'
const ENDPOINT = 'http://192.168.0.19:3000'

export function App() {
  const [chatMessages, setChatMessages] = useState([])
  const [userMessage, setUserMessage] = useState('')
  const [socket, setSocket] = useState(null)

  function sendMessage(event) {
    event.preventDefault()

    socket.emit("send_message", {
      data: {
        text: userMessage
      }
    })

    setUserMessage('')
  }

  useEffect(() => {
    if (socket === null) {
      setSocket(socketIOClient(ENDPOINT))
    }

    if (socket)
      socket.on("receive_message", response => {
        console.log(response.data)
        setChatMessages(oldMessages => [...oldMessages, response.data.text])
      })
  }, [socket])

  return (
    <div>
      {
        chatMessages.map((message, index) => (
          <p
            key={index}
          >
            {message}
          </p>
        ))
      }

      <form onSubmit={sendMessage}>
        <input
          value={userMessage}
          onChange={event => setUserMessage(event.target.value)}
        />

        <button type='submit'>
          enviar
        </button>
      </form>
    </div>
  )
}
