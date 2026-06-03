import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AiChatSheetInput } from '../AiChatSheetInput';

jest.mock('lucide-react', () => ({
  Loader2: () => (
    <div data-testid="ai-chat-input-loader" className="h-4 w-4 animate-spin">
      Loading...
    </div>
  ),
}));

describe('AiChatSheetInput', () => {
  const defaultProps = {
    inputRef: React.createRef<HTMLTextAreaElement>(),
    inputValue: '',
    onInputChange: jest.fn(),
    onKeyPress: jest.fn(),
    isLoading: false,
    onSendMessage: jest.fn(),
    authUserId: 'user-123',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Authentication State Rendering', () => {
    it('should render SignInButton when authUserId does not exist', () => {
      render(<AiChatSheetInput {...defaultProps} authUserId="" />);

      expect(screen.getByTestId('sign-in-button')).toBeInTheDocument();
      expect(screen.getByText('Sign In')).toBeInTheDocument();
    });

    it('should render input component when authUserId exists', () => {
      render(<AiChatSheetInput {...defaultProps} authUserId="user-123" />);

      expect(screen.getByTestId('ai-chat-input')).toBeInTheDocument();
      expect(screen.getByTestId('send-button')).toBeInTheDocument();

      const sendButton = screen.getByTestId('send-button');
      expect(sendButton.querySelector('svg')).toBeInTheDocument();

      expect(screen.queryByTestId('sign-in-button')).not.toBeInTheDocument();
    });
  });

  describe('Input Behavior', () => {
    it('should call onInputChange when textarea value changes', () => {
      const onInputChange = jest.fn();
      render(<AiChatSheetInput {...defaultProps} onInputChange={onInputChange} />);

      const textarea = screen.getByTestId('ai-chat-input');
      fireEvent.change(textarea, { target: { value: 'Hello world' } });

      expect(onInputChange).toHaveBeenCalledWith('Hello world');
    });

    it('should have correct textarea attributes', () => {
      render(<AiChatSheetInput {...defaultProps} />);

      const textarea = screen.getByTestId('ai-chat-input');
      expect(textarea).toHaveAttribute('name', 'ai-chat-input');
      expect(textarea).toHaveAttribute('placeholder', 'What do you need help with?');
    });
  });

  describe('Send Button Behavior', () => {
    it('should be disabled when input is empty', () => {
      render(<AiChatSheetInput {...defaultProps} inputValue="" />);

      const sendButton = screen.getByTestId('send-button');
      expect(sendButton).toBeDisabled();
    });

    it('should be disabled when input contains only whitespace', () => {
      render(<AiChatSheetInput {...defaultProps} inputValue="   " />);

      const sendButton = screen.getByTestId('send-button');
      expect(sendButton).toBeDisabled();
    });

    it('should be enabled when input has content', () => {
      render(<AiChatSheetInput {...defaultProps} inputValue="Hello world" />);

      const sendButton = screen.getByTestId('send-button');
      expect(sendButton).toBeEnabled();
    });

    it('should call onSendMessage when clicked', () => {
      const onSendMessage = jest.fn();
      render(<AiChatSheetInput {...defaultProps} inputValue="Hello" onSendMessage={onSendMessage} />);

      const sendButton = screen.getByTestId('send-button');
      sendButton.click();

      expect(onSendMessage).toHaveBeenCalledTimes(1);
    });
  });

  describe('Loading State', () => {
    it('should disable textarea when loading', () => {
      render(<AiChatSheetInput {...defaultProps} isLoading={true} />);

      const textarea = screen.getByTestId('ai-chat-input');
      expect(textarea).toBeDisabled();
    });

    it('should disable send button when loading', () => {
      render(<AiChatSheetInput {...defaultProps} isLoading={true} inputValue="Hello" />);

      const sendButton = screen.getByTestId('send-button');
      expect(sendButton).toBeDisabled();
    });

    it('should show loading spinner when loading', () => {
      render(<AiChatSheetInput {...defaultProps} isLoading={true} />);

      expect(screen.getByTestId('ai-chat-input-loader')).toBeInTheDocument();
    });

    it('should not show loading spinner when not loading', () => {
      render(<AiChatSheetInput {...defaultProps} isLoading={false} />);

      expect(screen.queryByTestId('ai-chat-input-loader')).not.toBeInTheDocument();
    });
  });
});
