import React, { useState, useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import LoadingIndicator from './LoadingIndicator';
import { loadMessages, saveMessages, clearMessages } from '@/services/storage';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function ChatWindow({ topic }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const chatRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    setMessages(loadMessages(topic));
  }, [topic]);

  useEffect(() => {
    if (messages.length > 0) {
      saveMessages(topic, messages);
    }
  }, [messages, topic]);

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
        { sender: 'user', text: `Uploaded file content:\n${content}` },
      ]);
      setLoading(true);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            sender: 'ai',
            text: `Thanks for the upload! Here's what I understood from it...`,
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
    <div className='flex flex-col h-screen bg-white'>
      <div className='p-4 border-b bg-blue-600 text-white flex justify-between items-center'>
        <span className='font-semibold text-lg'>Topic: {topic}</span>
        <div className='flex gap-2'>
          <button
            onClick={handleExportTxt}
            className='text-sm bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100 transition'
          >
            Export TXT
          </button>
          <button
            onClick={handleExportPDF}
            className='text-sm bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100 transition'
          >
            Export PDF
          </button>
          <button
            onClick={handleReset}
            className='text-sm bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100 transition'
          >
            Reset Chat
          </button>
        </div>
      </div>

      <div className='p-2 border-b text-center'>
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

      <div className='flex-1 overflow-y-auto px-4 py-6 space-y-4' ref={chatRef}>
        {messages.map((msg, index) => (
          <MessageBubble key={index} message={msg} />
        ))}
        {loading && <LoadingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      <div className='border-t p-4 bg-gray-50'>
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
