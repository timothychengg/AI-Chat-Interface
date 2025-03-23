import React, { useState, useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';

export default function ChatWindow({ topic }) {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    setMessages([
      { sender: 'user', text: 'Hi there!' },
      {
        sender: 'ai',
        text: `Hello! How can I assist you with ${topic.toLowerCase()}?`,
      },
    ]);
  }, [topic]);

  return (
    <div className='flex flex-col h-screen bg-white'>
      <div className='p-4 border-b bg-blue-600 text-white font-semibold text-lg'>
        Topic: {topic}
      </div>

      <div className='flex-1 overflow-y-auto px-4 py-6 space-y-4'>
        {messages.map((msg, index) => (
          <MessageBubble key={index} message={msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className='border-t p-4 bg-gray-50 text-center text-gray-500'>
        <MessageInput
          onSend={(text) => {
            setMessages((prev) => [...prev, { sender: 'user', text }]);

            setTimeout(() => {
              setMessages((prev) => [
                ...prev,
                { sender: 'ai', text: `This is a response to: "${text}"` },
              ]);
            }, 1000);
          }}
        />
      </div>
    </div>
  );
}
