import { describe, it, expect, vi } from 'vitest';
import { Button } from '@/components/ui/button';
import { render, screen, fireEvent } from '@/test/utils';

describe('Button Component', () => {
  it('renders with default variant and size', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: 'Click me' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-primary');
    expect(button).toHaveClass('h-9');
  });

  it('renders with secondary variant', () => {
    render(<Button variant="secondary">Secondary</Button>);
    const button = screen.getByRole('button', { name: 'Secondary' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-secondary');
  });

  it('renders with destructive variant', () => {
    render(<Button variant="destructive">Destructive</Button>);
    const button = screen.getByRole('button', { name: 'Destructive' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-destructive');
  });

  it('renders with outline variant', () => {
    render(<Button variant="outline">Outline</Button>);
    const button = screen.getByRole('button', { name: 'Outline' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('border-input');
  });

  it('renders with ghost variant', () => {
    render(<Button variant="ghost">Ghost</Button>);
    const button = screen.getByRole('button', { name: 'Ghost' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('hover:bg-accent');
  });

  it('renders with link variant', () => {
    render(<Button variant="link">Link</Button>);
    const button = screen.getByRole('button', { name: 'Link' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('text-primary');
  });

  it('renders with small size', () => {
    render(<Button size="sm">Small</Button>);
    const button = screen.getByRole('button', { name: 'Small' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('h-8');
  });

  it('renders with large size', () => {
    render(<Button size="lg">Large</Button>);
    const button = screen.getByRole('button', { name: 'Large' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('h-10');
  });

  it('renders with icon size', () => {
    render(<Button size="icon">Icon</Button>);
    const button = screen.getByRole('button', { name: 'Icon' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('h-9 w-9');
  });

  it('applies custom className', () => {
    render(<Button className="custom-class">Custom</Button>);
    const button = screen.getByRole('button', { name: 'Custom' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('custom-class');
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    const button = screen.getByRole('button', { name: 'Click me' });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole('button', { name: 'Disabled' });
    expect(button).toBeDisabled();
  });
}); 