import { describe, it, expect, vi } from 'vitest';
import { Textarea } from '@/components/ui/textarea';
import { render, screen, fireEvent } from '@/test/utils';

describe('Textarea Component', () => {
  it('renders with default props', () => {
    render(<Textarea />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveClass('flex min-h-[60px] w-full rounded-md border border-input');
  });

  it('renders with custom className', () => {
    render(<Textarea className="custom-textarea" />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('custom-textarea');
  });

  it('renders with placeholder', () => {
    render(<Textarea placeholder="Enter text" />);
    const textarea = screen.getByPlaceholderText('Enter text');
    expect(textarea).toBeInTheDocument();
  });

  it('handles value changes', () => {
    const handleChange = vi.fn();
    render(<Textarea onChange={handleChange} />);
    const textarea = screen.getByRole('textbox');
    
    fireEvent.change(textarea, { target: { value: 'test value' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('can be disabled', () => {
    render(<Textarea disabled />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeDisabled();
  });

  it('accepts rows attribute', () => {
    render(<Textarea rows={5} />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('rows', '5');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(<Textarea ref={ref} />);
    expect(ref.current).not.toBeNull();
  });
}); 