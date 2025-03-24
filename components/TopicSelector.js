import React from 'react';
import { motion } from 'framer-motion';
import {
  FaBrain,
  FaHeartbeat,
  FaFlask,
  FaPills,
  FaUserShield,
  FaMicroscope,
  FaNotesMedical,
  FaChild,
  FaHandHoldingMedical,
  FaFileMedical,
} from 'react-icons/fa';

const topics = [
  {
    title: 'Symptom Checker',
    icon: FaHeartbeat,
    desc: 'Get help understanding your current symptoms.',
  },
  {
    title: 'Lab Result Analysis',
    icon: FaFlask,
    desc: 'Break down and interpret your lab reports.',
  },
  {
    title: 'Medication Guidance',
    icon: FaPills,
    desc: 'Understand prescriptions, side effects, and dosage.',
  },
  {
    title: 'Mental Health Support',
    icon: FaBrain,
    desc: 'Talk through emotional wellbeing and stress.',
  },
  {
    title: 'Chronic Condition Management',
    icon: FaUserShield,
    desc: 'Ongoing care for diabetes, asthma, and more.',
  },
  {
    title: 'AI for Diagnosis',
    icon: FaMicroscope,
    desc: 'Explore AI-assisted diagnostic support.',
  },
  {
    title: 'Drug Interaction Checker',
    icon: FaNotesMedical,
    desc: 'Check for medication conflicts.',
  },
  {
    title: 'Pre-Surgery Preparation',
    icon: FaFileMedical,
    desc: 'Understand what to expect and how to prepare.',
  },
  {
    title: 'Pediatric Health Guidance',
    icon: FaChild,
    desc: 'Support for child health, growth, and development.',
  },
  {
    title: 'Insurance Explanation',
    icon: FaHandHoldingMedical,
    desc: 'Help decoding your coverage and benefits.',
  },
];

function TopicCard({ topic, onSelect }) {
  const Icon = topic.icon;
  return (
    <motion.button
      key={topic.title}
      layout
      onClick={() => onSelect(topic.title)}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      aria-label={`Select ${topic.title}`}
      className='bg-white border border-gray-200 hover:shadow-lg rounded-xl p-5 text-left transition-all flex flex-col items-start gap-3 hover:cursor-pointer'
    >
      <Icon className='text-blue-600 text-2xl' />
      <div className='font-semibold text-gray-800 text-base'>{topic.title}</div>
      <div className='text-sm text-gray-500'>{topic.desc}</div>
    </motion.button>
  );
}

export default function TopicSelector({ onSelectTopic }) {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#F0F4F8] to-[#E8EEF3] px-4 py-12'>
      <div className='w-full max-w-6xl'>
        <h1 className='text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-2'>
          What would you like help with today?
        </h1>
        <p className='text-sm text-gray-500 text-center mb-8'>
          Select a topic below to begin chatting with your AI assistant.
        </p>

        <motion.div
          layout
          className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {topics.map((topic) => (
            <TopicCard
              key={topic.title}
              topic={topic}
              onSelect={onSelectTopic}
            />
          ))}
        </motion.div>

        <div className='mt-10 text-center text-xs text-gray-400'>
          Built by Timothy Cheng • Powered by Laer Health
        </div>
      </div>
    </div>
  );
}
