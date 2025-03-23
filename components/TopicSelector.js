import React from 'react';

const topics = [
  'Symptom Checker',
  'Lab Result Analysis',
  'Medication Guidance',
  'Mental Health Support',
  'Chronic Condition Management',
  'AI for Diagnosis',
];

export default function TopicSelector({ onSelectTopic }) {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-white p-6'>
      <h1 className='text-2xl font-bold mb-6 text-gray-800 text-center'>
        Select a Conversation Topic
      </h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md'>
        {topics.map((topic, idx) => (
          <button
            key={idx}
            onClick={() => onSelectTopic(topic)}
            className='bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow transition-all'
          >
            {topic}
          </button>
        ))}
      </div>
    </div>
  );
}
