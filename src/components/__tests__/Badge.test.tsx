import { describe, it, expect } from 'vitest';
import { Badge } from '@/components/ui/badge';
import { render, screen } from '@/test/utils';

describe('Badge Component', () => {
  it('renders with default variant', () => {
    render(<Badge>Test Badge</Badge>);
    const badge = screen.getByText('Test Badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-primary');
  });

  it('renders with secondary variant', () => {
    render(<Badge variant="secondary">Secondary Badge</Badge>);
    const badge = screen.getByText('Secondary Badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-secondary');
  });

  it('renders with destructive variant', () => {
    render(<Badge variant="destructive">Destructive Badge</Badge>);
    const badge = screen.getByText('Destructive Badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-destructive');
  });

  it('renders with outline variant', () => {
    render(<Badge variant="outline">Outline Badge</Badge>);
    const badge = screen.getByText('Outline Badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('text-foreground');
  });

  it('applies custom className', () => {
    render(<Badge className="custom-class">Custom Badge</Badge>);
    const badge = screen.getByText('Custom Badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('custom-class');
  });
}); 