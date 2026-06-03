import React from 'react';
import { render, screen } from '@testing-library/react';
import { AiChatSheetEmptyState } from '../AiChatSheetEmptyState';

jest.mock('lucide-react', () => ({
  MessageCircle: () => (
    <div data-testid="message-circle-icon" className="h-12 w-12 mx-auto mb-4 opacity-50">
      MessageCircle Icon
    </div>
  ),
}));

describe('AiChatSheetEmptyState', () => {
  it('should render the empty state component', () => {
    render(<AiChatSheetEmptyState />);

    expect(screen.getByTestId('ai-chat-sheet-empty-state')).toBeInTheDocument();
    expect(screen.getByTestId('message-circle-icon')).toBeInTheDocument();
  });

  it('should display the main heading text', () => {
    render(<AiChatSheetEmptyState />);

    expect(screen.getByText('Ready to plan your next trip?')).toBeInTheDocument();
  });

  it('should display the description text', () => {
    render(<AiChatSheetEmptyState />);

    expect(
      screen.getByText("Tell me your vision and I'll help you plan it, shape it, and make it happen."),
    ).toBeInTheDocument();
  });

  it('should have correct CSS classes for styling', () => {
    render(<AiChatSheetEmptyState />);

    const mainDiv = screen.getByTestId('ai-chat-sheet-empty-state');
    expect(mainDiv).toHaveClass('text-center', 'text-muted-foreground', 'py-8');
  });

  it('should render the icon with correct styling', () => {
    render(<AiChatSheetEmptyState />);

    const icon = screen.getByTestId('message-circle-icon');
    expect(icon).toHaveClass('h-12', 'w-12', 'mx-auto', 'mb-4', 'opacity-50');
  });

  it('should have proper text hierarchy with correct classes', () => {
    render(<AiChatSheetEmptyState />);

    const descriptionText = screen.getByText(
      "Tell me your vision and I'll help you plan it, shape it, and make it happen.",
    );

    expect(descriptionText).toHaveClass('text-sm', 'mt-2');
  });

  it('should render all text content without any missing elements', () => {
    render(<AiChatSheetEmptyState />);

    expect(screen.getByText('Ready to plan your next trip?')).toBeInTheDocument();
    expect(
      screen.getByText("Tell me your vision and I'll help you plan it, shape it, and make it happen."),
    ).toBeInTheDocument();
    expect(screen.getByTestId('message-circle-icon')).toBeInTheDocument();
  });
});
