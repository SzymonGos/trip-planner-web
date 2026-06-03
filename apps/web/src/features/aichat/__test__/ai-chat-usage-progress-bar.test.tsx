import React from 'react';
import { render, screen } from '@testing-library/react';
import { AiChatUsageProgressBar } from '../AiChatUsageProgressBar';

jest.mock('@/features/trip/helpers/formatDate', () => ({
  formatDate: (date: string) => `formatted-${date}`,
}));

jest.mock('@/lib/config', () => ({
  USER_AI_CHAT_LIMIT: 20,
}));

describe('AiChatUsageProgressBar', () => {
  const defaultProps = {
    currentUsage: 5,
    usagePercentage: 25,
    resetDate: '2024-01-15',
  };

  describe('Rendering', () => {
    it('should render the component with correct structure', () => {
      render(<AiChatUsageProgressBar {...defaultProps} />);

      const container = screen.getByTestId('progressbar');
      expect(container).toBeInTheDocument();
      expect(container).toHaveTextContent('5/20 messages');
    });

    it('should display current usage and limit correctly', () => {
      render(<AiChatUsageProgressBar {...defaultProps} />);
      expect(screen.getByText('5/20 messages')).toBeInTheDocument();
    });

    it('should render progress bar container', () => {
      render(<AiChatUsageProgressBar {...defaultProps} />);
      const progressContainer = screen.getByTestId('progressbar');
      expect(progressContainer).toBeInTheDocument();
    });

    it('should render progress bar fill with correct width', () => {
      render(<AiChatUsageProgressBar {...defaultProps} />);

      const progressFill = screen.getByTestId('progressbar-fill');
      expect(progressFill).toBeInTheDocument();
      expect(progressFill).toHaveStyle({ width: '25%' });
    });
  });

  describe('Progress Bar Colors', () => {
    it('should show green color when usage is less than 60%', () => {
      render(<AiChatUsageProgressBar {...defaultProps} usagePercentage={30} />);

      const progressFill = screen.getByTestId('progressbar-fill');
      expect(progressFill).toHaveClass('bg-green-500');
    });

    it('should show yellow color when usage is between 60% and 80%', () => {
      render(<AiChatUsageProgressBar {...defaultProps} usagePercentage={70} />);

      const progressFill = screen.getByTestId('progressbar-fill');
      expect(progressFill).toHaveClass('bg-yellow-500');
    });

    it('should show red color when usage is 80% or higher', () => {
      render(<AiChatUsageProgressBar {...defaultProps} usagePercentage={85} />);

      const progressFill = screen.getByTestId('progressbar-fill');
      expect(progressFill).toHaveClass('bg-red-500');
    });

    it('should show red color when usage is exactly 80%', () => {
      render(<AiChatUsageProgressBar {...defaultProps} usagePercentage={80} />);

      const progressFill = screen.getByTestId('progressbar-fill');
      expect(progressFill).toHaveClass('bg-red-500');
    });

    it('should show yellow color when usage is exactly 60%', () => {
      render(<AiChatUsageProgressBar {...defaultProps} usagePercentage={60} />);

      const progressFill = screen.getByTestId('progressbar-fill');
      expect(progressFill).toHaveClass('bg-yellow-500');
    });
  });

  describe('Reset Date Display', () => {
    it('should display reset date when provided', () => {
      render(<AiChatUsageProgressBar {...defaultProps} />);

      expect(screen.getByText('Reset on: formatted-2024-01-15')).toBeInTheDocument();
    });

    it('should not display reset date when not provided', () => {
      render(<AiChatUsageProgressBar currentUsage={5} usagePercentage={25} />);

      expect(screen.queryByText(/Reset on:/)).not.toBeInTheDocument();
    });

    it('should not display reset date when resetDate is undefined', () => {
      render(<AiChatUsageProgressBar {...defaultProps} resetDate={undefined} />);

      expect(screen.queryByText(/Reset on:/)).not.toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle 0% usage correctly', () => {
      render(<AiChatUsageProgressBar currentUsage={0} usagePercentage={0} />);

      expect(screen.getByText('0/20 messages')).toBeInTheDocument();

      const progressFill = screen.getByTestId('progressbar-fill');
      expect(progressFill).toHaveStyle({ width: '0%' });
      expect(progressFill).toHaveClass('bg-green-500');
    });

    it('should handle 100% usage correctly', () => {
      render(<AiChatUsageProgressBar currentUsage={20} usagePercentage={100} />);

      expect(screen.getByText('20/20 messages')).toBeInTheDocument();

      const progressFill = screen.getByTestId('progressbar-fill');
      expect(progressFill).toHaveStyle({ width: '100%' });
      expect(progressFill).toHaveClass('bg-red-500');
    });

    it('should cap progress bar width at 100% even if usage exceeds 100%', () => {
      render(<AiChatUsageProgressBar currentUsage={25} usagePercentage={125} />);

      const progressFill = screen.getByTestId('progressbar-fill');
      expect(progressFill).toHaveStyle({ width: '100%' });
    });

    it('should handle very high usage percentage', () => {
      render(<AiChatUsageProgressBar currentUsage={50} usagePercentage={250} />);

      const progressFill = screen.getByTestId('progressbar-fill');
      expect(progressFill).toHaveStyle({ width: '100%' });
    });
  });

  describe('Accessibility', () => {
    it('should display usage information in a readable format', () => {
      render(<AiChatUsageProgressBar {...defaultProps} />);

      expect(screen.getByText('5/20 messages')).toBeInTheDocument();
    });
  });

  describe('CSS Classes and Styling', () => {
    it('should apply correct CSS classes to container', () => {
      render(<AiChatUsageProgressBar {...defaultProps} />);

      const container = screen.getByText('5/20 messages').parentElement;
      expect(container).toHaveClass('text-xs', 'text-gray-500', 'flex', 'flex-col', 'items-start', 'mt-4');
    });

    it('should apply correct CSS classes to progress bar', () => {
      render(<AiChatUsageProgressBar {...defaultProps} />);

      const progressFill = screen.getByTestId('progressbar-fill');
      expect(progressFill).toHaveClass('h-[6px]', 'rounded-full', 'transition-all', 'duration-300');
    });
  });
});
