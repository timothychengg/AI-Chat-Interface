import React, { useState, useEffect, useRef } from 'react';
import { FaMicrophone, FaPaperPlane } from 'react-icons/fa';

export default function MessageInput({
  messages,
  setMessages,
  loading,
  setLoading,
}) {
  const [input, setInput] = useState('');
  const inputRef = useRef(null);
  const [isListening, setIsListening] = useState(false);

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

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
    };

    recognition.start();
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
        onClick={handleVoiceInput}
        className={`p-2 rounded-full transition-all ${
          isListening
            ? 'bg-blue-100 text-blue-700'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        } disabled:opacity-50`}
        type='button'
        disabled={loading}
        title='Start voice input'
      >
        <FaMicrophone className='text-lg' />
      </button>
      <button
        onClick={handleSend}
        className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50'
        disabled={loading}
        title='Send Message'
      >
        <FaPaperPlane className='text-sm' />
      </button>
    </div>
  );
}
