import React, { useState } from 'react';
import TopicSelector from '@/components/TopicSelector';
import ChatWindow from '@/components/ChatWindow';

export default function Home() {
  const [selectedTopic, setSelectedTopic] = useState(null);

  return (
    <>
      <div className='min-h-screen transition-all duration-300 ease-in-out'>
        {selectedTopic ? (
          <ChatWindow
            topic={selectedTopic}
            goBack={() => setSelectedTopic(null)}
          />
        ) : (
          <TopicSelector onSelectTopic={setSelectedTopic} />
        )}
      </div>
    </>
  );
}
