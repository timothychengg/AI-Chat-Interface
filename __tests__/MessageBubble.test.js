import React from 'react';
import { render, screen } from '@testing-library/react';
import MessageBubble from '../components/MessageBubble';

describe('MessageBubble', () => {
  it('renders user and AI messages', () => {
    render(
      <MessageBubble message={{ sender: 'user', text: 'Hello there!' }} />
    );
    expect(screen.getByText(/Hello there!/i)).toBeInTheDocument();
  });
});
