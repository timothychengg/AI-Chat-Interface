import React, { useState, useEffect, useRef } from 'react';

export default function MessageInput({
  messages,
  setMessages,
  loading,
  setLoading,
}) {
  const [input, setInput] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleGlobalKeyPress = (e) => {
      if (
        document.activeElement === inputRef.current ||
        e.metaKey ||
        e.ctrlKey ||
        e.altKey
      )
        return;

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

    setMessages([
      ...messages,
      { sender: 'user', text: trimmed, timestamp: Date.now() },
    ]);
    setInput('');
    setLoading(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: `This is a response to: "${trimmed}"`,
          timestamp: Date.now(),
        },
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

  const handleVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Voice recognition is not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
    };
  };

  return (
    <div className='flex items-center gap-3'>
      <textarea
        ref={inputRef}
        className='flex-1 bg-gray-100 border border-gray-300 rounded-xl p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900'
        rows={1}
        placeholder='Type a message...'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={loading}
      />
      <button
        onClick={handleVoiceInput}
        className='text-xl text-gray-500 hover:text-blue-600 transition disabled:opacity-50'
        disabled={loading}
        title='Start voice input'
      >
        🎤
      </button>
      <button
        onClick={handleSend}
        className='bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition disabled:opacity-50 text-sm'
        disabled={loading}
      >
        Send
      </button>
    </div>
  );
}
