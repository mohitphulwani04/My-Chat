import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './Chat.css';

const socket = io('http://localhost:8000');

const ChatPage = () => {

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket.on('message', (data) => {
      setMessages((messages) => [...messages, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (message.trim()) {
      socket.emit('message', message.trim());
      setMessage('');
    }
  };

  return (
    <div className="chat-container">
      <div className="message-container">
        {messages.map((message) => (
          <div className="message" key={message.id}>
            <span className="message-id">{message.id}: </span>
            <span className="message-text">{message.message}</span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="input-container">
        <input
          type="text"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="input"
          placeholder="Type a message..."
        />
        <button type="submit" className="button">
          Send
        </button>
      </form>
    </div>
  );
}

  
export default ChatPage
