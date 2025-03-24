import React from 'react';

export default function LoadingIndicator() {
  const delays = [0, 200, 400];

  return (
    <div className='flex items-center space-x-2 text-sm text-gray-500 px-4'>
      {delays.map((delay, idx) => (
        <span key={idx} className='relative flex h-2 w-2'>
          <span
            className='animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75'
            style={{ animationDelay: `${delay}ms` }}
          ></span>
          <span className='relative inline-flex h-2 w-2 rounded-full bg-blue-500'></span>
        </span>
      ))}
      <span>AI is typing...</span>
    </div>
  );
}
