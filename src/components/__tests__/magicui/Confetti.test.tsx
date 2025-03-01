import { describe, it, expect, vi } from 'vitest';
import { ConfettiButton } from '@/components/magicui/confetti';
import { render, screen, fireEvent } from '@/test/utils';

// Mock canvas-confetti
vi.mock('canvas-confetti', () => ({
  __esModule: true,
  default: vi.fn().mockImplementation(() => Promise.resolve()),
}));

// Mock the Confetti component to avoid issues with canvas
vi.mock('@/components/magicui/confetti', async () => {
  const actual = await vi.importActual('@/components/magicui/confetti');
  return {
    ...actual,
    Confetti: vi.fn().mockImplementation(({ children }) => (
      <div data-testid="confetti-container">
        <canvas data-testid="confetti-canvas" />
        {children}
      </div>
    )),
  };
});

describe('Confetti Components', () => {
  describe('ConfettiButton Component', () => {
    it('renders with default props', () => {
      render(<ConfettiButton>Click me</ConfettiButton>);
      
      const button = screen.getByRole('button', { name: 'Click me' });
      expect(button).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      render(<ConfettiButton className="custom-button">Click me</ConfettiButton>);
      
      const button = screen.getByRole('button', { name: 'Click me' });
      expect(button).toHaveClass('custom-button');
    });

    it('can be clicked', () => {
      render(<ConfettiButton>Click me</ConfettiButton>);
      
      const button = screen.getByRole('button', { name: 'Click me' });
      // Just verify we can click without errors
      fireEvent.click(button);
      expect(button).toBeInTheDocument();
    });

    it('renders with custom props', () => {
      render(
        <ConfettiButton 
          options={{ particleCount: 100, spread: 70 }}
          disabled
          aria-label="Confetti button"
        >
          Click me
        </ConfettiButton>
      );
      
      // When aria-label is set, we need to use getByText instead of getByRole with name
      const button = screen.getByText('Click me').closest('button');
      expect(button).toBeInTheDocument();
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('aria-label', 'Confetti button');
    });
  });
}); 