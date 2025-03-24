import React, { useState, useEffect, useRef } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import LoadingIndicator from './LoadingIndicator';
import { loadMessages, saveMessages, clearMessages } from '@/services/storage';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function ChatWindow({ topic }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(true);
  const messagesEndRef = useRef(null);
  const chatRef = useRef(null);

  useEffect(() => {
    const stored = loadMessages(topic);
    setMessages(stored);
  }, [topic]);

  useEffect(() => {
    if (messages.length > 0) {
      saveMessages(topic, messages);
    }
  }, [messages, topic]);

  useEffect(() => {
    const scrollEl = chatRef.current;
    if (!scrollEl) return;

    const handleScroll = () => {
      const atBottom =
        scrollEl.scrollHeight - scrollEl.scrollTop === scrollEl.clientHeight;
      setIsScrolledToBottom(atBottom);
    };

    scrollEl.addEventListener('scroll', handleScroll);
    return () => scrollEl.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isScrolledToBottom) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isScrolledToBottom]);

  const handleReset = () => {
    clearMessages(topic);
    setMessages([]);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const content = reader.result;
      setMessages((prev) => [
        ...prev,
        {
          sender: 'user',
          text: `Uploaded file content:\n${content}`,
          timestamp: Date.now(),
        },
      ]);
      setLoading(true);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            sender: 'ai',
            text: `Thanks for the upload! Here's what I understood from it...`,
            timestamp: Date.now(),
          },
        ]);
        setLoading(false);
      }, 1000);
    };
    reader.readAsText(file);
  };

  const handleExportTxt = () => {
    if (messages.length === 0) return;
    const content = messages
      .map((msg) => `${msg.sender === 'user' ? 'You' : 'AI'}: ${msg.text}`)
      .join('\n\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `laer_chat_${topic}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExportPDF = async () => {
    if (!chatRef.current) return;
    const canvas = await html2canvas(chatRef.current);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`laer_chat_${topic}.pdf`);
  };

  return (
    <div className='relative flex justify-center items-center h-screen bg-gradient-to-br from-[#F0F4F8] to-[#E8EEF3] px-4'>
      <button
        onClick={() => (window.location.href = '/')}
        className='fixed top-4 left-4 z-50 flex items-center gap-2 text-sm text-blue-600 bg-white border border-blue-100 px-4 py-2 rounded-full shadow hover:bg-blue-50 transition'
      >
        <FaArrowLeft className='text-xs' />
        Back to Topics
      </button>

      <div className='flex flex-col w-full max-w-3xl h-[92vh] bg-white rounded-2xl shadow-lg overflow-hidden'>
        <div className='flex justify-between items-center px-4 py-3 sm:px-6 sm:py-4 border-b bg-white'>
          <div>
            <h1 className='text-base sm:text-lg font-semibold'>Chat Topic</h1>
            <p className='text-sm text-gray-500'>{topic}</p>
          </div>
          <div className='flex gap-2'>
            <button
              onClick={handleExportTxt}
              className='text-xs sm:text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 transition'
            >
              Export TXT
            </button>
            <button
              onClick={handleExportPDF}
              className='text-xs sm:text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 transition'
            >
              Export PDF
            </button>
            <button
              onClick={handleReset}
              className='text-xs sm:text-sm bg-red-50 text-red-600 px-3 py-1 rounded-full hover:bg-red-100 transition'
            >
              Reset
            </button>
          </div>
        </div>

        <div className='px-4 py-2 sm:px-6 sm:py-3 border-b bg-white'>
          <label className='cursor-pointer text-sm text-blue-600 underline hover:text-blue-800'>
            Upload File
            <input
              type='file'
              accept='.txt,.pdf,.doc,.docx'
              onChange={handleFileUpload}
              className='hidden'
            />
          </label>
        </div>

        <div
          className='relative flex-1 overflow-y-auto px-4 py-3 sm:px-6 sm:py-4 space-y-4 bg-[#F9FAFB] pb-[80px]'
          ref={chatRef}
        >
          {!isScrolledToBottom && (
            <div className='absolute top-0 left-0 w-full h-4 bg-gradient-to-b from-[#F9FAFB] to-transparent z-10 pointer-events-none' />
          )}

          {messages.map((msg, index) => (
            <MessageBubble key={index} message={msg} />
          ))}

          {loading && <LoadingIndicator />}
          <div ref={messagesEndRef} />

          {isScrolledToBottom === false && (
            <div className='absolute bottom-0 left-0 w-full h-4 bg-gradient-to-t from-[#F9FAFB] to-transparent z-10 pointer-events-none' />
          )}
        </div>

        <div className='sticky bottom-0 bg-white border-t p-4 sm:p-3 z-10'>
          <MessageInput
            messages={messages}
            setMessages={setMessages}
            loading={loading}
            setLoading={setLoading}
          />
        </div>
      </div>
    </div>
  );
}
