import React, { useState } from 'react';

export default function MessageInput({ onSend }) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() === '') return;
    onSend(input.trim());
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className='border-t p-4 bg-white flex items-center gap-2'>
      <textarea
        className='flex-1 border rounded-lg p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500'
        rows={1}
        placeholder='Type a message...'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        onClick={handleSend}
        className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all'
      >
        Send
      </button>
    </div>
  );
}
