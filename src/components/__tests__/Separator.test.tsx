import { describe, it, expect } from 'vitest';
import { Separator } from '@/components/ui/separator';
import { render, screen } from '@/test/utils';

describe('Separator Component', () => {
  it('renders with default props', () => {
    render(<Separator />);
    const separator = screen.getByRole('none');
    expect(separator).toBeInTheDocument();
    expect(separator).toHaveClass('shrink-0 bg-border');
    expect(separator).toHaveAttribute('data-orientation', 'horizontal');
  });

  it('renders with custom className', () => {
    render(<Separator className="custom-separator" />);
    const separator = screen.getByRole('none');
    expect(separator).toHaveClass('custom-separator');
  });

  it('renders with horizontal orientation', () => {
    render(<Separator orientation="horizontal" />);
    const separator = screen.getByRole('none');
    expect(separator).toHaveAttribute('data-orientation', 'horizontal');
    expect(separator).toHaveClass('h-[1px] w-full');
  });

  it('renders with vertical orientation', () => {
    render(<Separator orientation="vertical" />);
    const separator = screen.getByRole('none');
    expect(separator).toHaveAttribute('data-orientation', 'vertical');
    expect(separator).toHaveClass('h-full w-[1px]');
  });

  it('renders with decorative attribute', () => {
    render(<Separator decorative />);
    const separator = screen.getByRole('none');
    expect(separator).toHaveAttribute('data-orientation', 'horizontal');
  });
}); 