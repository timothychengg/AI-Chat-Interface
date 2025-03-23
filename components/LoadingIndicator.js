import React from 'react';

export default function LoadingIndicator() {
  return (
    <div className='flex items-center space-x-2 text-gray-500 px-2'>
      <div className='animate-bounce'>.</div>
      <div className='animate-bounce delay-150'>.</div>
      <div className='animate-bounce delay-300'>.</div>
      <span className='ml-2'>AI is typing...</span>
    </div>
  );
}
