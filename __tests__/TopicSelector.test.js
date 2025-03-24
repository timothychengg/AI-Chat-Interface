import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TopicSelector from '../components/TopicSelector';

describe('TopicSelector', () => {
  it('renders topic buttons and handles selection', () => {
    const handleSelect = jest.fn();
    render(<TopicSelector onSelectTopic={handleSelect} />);

    const firstButton = screen.getByText(/Symptom Checker/i);
    expect(firstButton).toBeInTheDocument();

    fireEvent.click(firstButton);
    expect(handleSelect).toHaveBeenCalledWith('Symptom Checker');
  });
});
