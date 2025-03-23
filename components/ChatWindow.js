import React, { useState, useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import LoadingIndicator from './LoadingIndicator';
import { loadMessages, saveMessages } from '@/services/storage';

export default function ChatWindow({ topic }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const stored = loadMessages(topic);
    setMessages(stored);
  }, [topic]);

  useEffect(() => {
    if (messages.length > 0) {
      saveMessages(topic, messages);
    }
  }, [messages, topic]);

  return (
    <div className='flex flex-col h-screen bg-white'>
      <div className='p-4 border-b bg-blue-600 text-white font-semibold text-lg'>
        Topic: {topic}
      </div>

      <div className='flex-1 overflow-y-auto px-4 py-6 space-y-4'>
        {messages.map((msg, index) => (
          <MessageBubble key={index} message={msg} />
        ))}
        {loading && <LoadingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      <div className='border-t p-4 bg-gray-50 text-center text-gray-500'>
        <MessageInput
          messages={messages}
          setMessages={setMessages}
          loading={loading}
          setLoading={setLoading}
        />
      </div>
    </div>
  );
}
