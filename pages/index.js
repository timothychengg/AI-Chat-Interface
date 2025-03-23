import React, { useState } from 'react';
import TopicSelector from '@/components/TopicSelector';
import ChatWindow from '@/components/ChatWindow';

export default function Home() {
  const [selectedTopic, setSelectedTopic] = useState(null);

  return (
    <>
      {!selectedTopic ? (
        <TopicSelector onSelectTopic={setSelectedTopic} />
      ) : (
        <ChatWindow topic={selectedTopic} />
      )}
    </>
  );
}
