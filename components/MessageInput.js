import React, { useState, useEffect, useRef } from 'react';

export default function MessageInput({
  messages,
  setMessages,
  loading,
  setLoading,
}) {
  const [input, setInput] = useState('');
  const inputRef = useRef(null);

  // Auto-focus on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Listen for global keypresses to auto-focus + type
  useEffect(() => {
    const handleGlobalKeyPress = (e) => {
      // Ignore if typing inside another input or modifier keys
      if (
        document.activeElement === inputRef.current ||
        e.metaKey ||
        e.ctrlKey ||
        e.altKey
      )
        return;

      // Focus and add typed character
      inputRef.current?.focus();

      const char = e.key.length === 1 ? e.key : '';
      if (char) {
        setInput((prev) => prev + char);
      }
    };

    window.addEventListener('keydown', handleGlobalKeyPress);
    return () => window.removeEventListener('keydown', handleGlobalKeyPress);
  }, []);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    setMessages([...messages, { sender: 'user', text: trimmed }]);
    setInput('');
    setLoading(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: `This is a response to: "${trimmed}"` },
      ]);
      setLoading(false);
    }, 1000);
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
        ref={inputRef}
        className='flex-1 border rounded-lg p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500'
        rows={1}
        placeholder='Type a message...'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={loading}
      />
      <button
        onClick={handleSend}
        className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50'
        disabled={loading}
      >
        Send
      </button>
    </div>
  );
}
