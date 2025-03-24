import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export default function MessageBubble({ message }) {
  const isUser = message.sender === 'user';

  const time = useMemo(() => {
    if (!message.timestamp) return '';
    return new Date(message.timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  }, [message.timestamp]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`w-fit max-w-[75%] sm:max-w-[85%] md:max-w-[60%] p-3 rounded-xl shadow-sm relative text-sm whitespace-pre-wrap break-words ${
          isUser
            ? 'bg-blue-600 text-white rounded-br-none'
            : 'bg-gray-100 text-gray-900 rounded-bl-none'
        }`}
      >
        {!isUser && <div className='absolute -top-4 left-0 text-lg'>🤖</div>}

        <div>{message.text}</div>

        <div className='text-xs mt-2 text-gray-400 text-right'>{time}</div>
      </div>
    </motion.div>
  );
}
