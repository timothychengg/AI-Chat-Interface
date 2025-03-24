import React from 'react';

export default function LoadingIndicator() {
  return (
    <div className='flex items-center space-x-2 text-sm text-gray-500 px-4'>
      <span className='relative flex h-2 w-2'>
        <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75'></span>
        <span className='relative inline-flex rounded-full h-2 w-2 bg-blue-500'></span>
      </span>
      <span className='relative flex h-2 w-2'>
        <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75 animation-delay-200'></span>
        <span className='relative inline-flex rounded-full h-2 w-2 bg-blue-500'></span>
      </span>
      <span className='relative flex h-2 w-2'>
        <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75 animation-delay-400'></span>
        <span className='relative inline-flex rounded-full h-2 w-2 bg-blue-500'></span>
      </span>
      <span>AI is typing...</span>
    </div>
  );
}
