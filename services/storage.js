const STORAGE_KEY_PREFIX = 'laer_chat_topic_';

export function saveMessages(topic, messages) {
  localStorage.setItem(STORAGE_KEY_PREFIX + topic, JSON.stringify(messages));
}

export function loadMessages(topic) {
  const stored = localStorage.getItem(STORAGE_KEY_PREFIX + topic);
  return stored ? JSON.parse(stored) : [];
}

export function clearMessages(topic) {
  localStorage.removeItem(STORAGE_KEY_PREFIX + topic);
}
