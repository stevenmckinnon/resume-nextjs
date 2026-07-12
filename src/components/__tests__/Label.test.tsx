import { describe, it, expect, vi } from 'vitest';
import { Label } from '@/components/ui/label';
import { render, screen, fireEvent } from '@/test/utils';

describe('Label Component', () => {
  it('renders with default props', () => {
    render(<Label htmlFor="test">Test Label</Label>);
    const label = screen.getByText('Test Label');
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute('for', 'test');
    expect(label).toHaveClass('flex items-center gap-2 text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-50');
  });

  it('renders with custom className', () => {
    render(<Label className="custom-label" htmlFor="test">Test Label</Label>);
    const label = screen.getByText('Test Label');
    expect(label).toHaveClass('custom-label');
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<Label htmlFor="test" onClick={handleClick}>Test Label</Label>);
    const label = screen.getByText('Test Label');
    
    fireEvent.click(label);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(<Label ref={ref} htmlFor="test">Test Label</Label>);
    expect(ref.current).not.toBeNull();
  });
}); 