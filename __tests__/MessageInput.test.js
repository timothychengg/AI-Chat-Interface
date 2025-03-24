import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MessageInput from '../components/MessageInput';

describe('MessageInput', () => {
  it('sends a message when Enter is pressed', () => {
    const setMessages = jest.fn();
    const setLoading = jest.fn();

    render(
      <MessageInput
        messages={[]}
        setMessages={setMessages}
        loading={false}
        setLoading={setLoading}
      />
    );

    const textarea = screen.getByPlaceholderText(/type a message/i);
    fireEvent.change(textarea, { target: { value: 'Hello AI' } });

    fireEvent.keyDown(textarea, { key: 'Enter', code: 'Enter' });

    expect(setMessages).toHaveBeenCalled();
    expect(setLoading).toHaveBeenCalledWith(true);
  });
});
