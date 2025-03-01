import { describe, it, expect, vi } from 'vitest';
import { RainbowButton } from '@/components/magicui/rainbow-button';
import { render, screen, fireEvent } from '@/test/utils';

// Mock Next.js Link component
vi.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children, className }: any) => (
    <a href={href} className={className} data-testid="next-link">
      {children}
    </a>
  ),
}));

describe('RainbowButton Component', () => {
  it('renders as a button with default props', () => {
    render(<RainbowButton>Click me</RainbowButton>);
    
    const button = screen.getByRole('button', { name: 'Click me' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('group relative inline-flex');
  });

  it('renders with custom className', () => {
    render(<RainbowButton className="custom-button">Click me</RainbowButton>);
    
    const button = screen.getByRole('button', { name: 'Click me' });
    expect(button).toHaveClass('custom-button');
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<RainbowButton onClick={handleClick}>Click me</RainbowButton>);
    
    const button = screen.getByRole('button', { name: 'Click me' });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('can be disabled', () => {
    render(<RainbowButton disabled>Click me</RainbowButton>);
    
    const button = screen.getByRole('button', { name: 'Click me' });
    expect(button).toBeDisabled();
  });

  it('renders as a link when href is provided', () => {
    render(<RainbowButton href="/test">Click me</RainbowButton>);
    
    const link = screen.getByTestId('next-link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/test');
    expect(link).toHaveTextContent('Click me');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(<RainbowButton ref={ref}>Click me</RainbowButton>);
    expect(ref.current).not.toBeNull();
  });
}); 