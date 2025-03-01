import { describe, it, expect, vi } from 'vitest';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { render, screen } from '@/test/utils';

// Mock the AvatarImage component
vi.mock('@/components/ui/avatar', async () => {
  const actual = await vi.importActual('@/components/ui/avatar');
  return {
    ...actual,
    AvatarImage: vi.fn().mockImplementation(({ src, alt, className, 'data-testid': dataTestId }) => (
      <img 
        src={src} 
        alt={alt} 
        className={className} 
        data-testid={dataTestId || 'avatar-image'} 
      />
    )),
  };
});

describe('Avatar Component', () => {
  it('renders with default props', () => {
    render(<Avatar data-testid="avatar" />);
    const avatar = screen.getByTestId('avatar');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveClass('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full');
  });

  it('renders with custom className', () => {
    render(<Avatar data-testid="avatar" className="custom-class" />);
    const avatar = screen.getByTestId('avatar');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveClass('custom-class');
  });

  it('renders with AvatarImage', () => {
    render(
      <Avatar>
        <AvatarImage src="/test.jpg" alt="Test User" />
      </Avatar>
    );
    const image = screen.getByTestId('avatar-image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/test.jpg');
    expect(image).toHaveAttribute('alt', 'Test User');
  });

  it('renders with AvatarFallback when no image is provided', () => {
    render(
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    );
    const fallback = screen.getByText('JD');
    expect(fallback).toBeInTheDocument();
  });

  it('renders with AvatarFallback when image fails to load', () => {
    render(
      <Avatar>
        <AvatarImage src="/non-existent.jpg" alt="Test User" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    );
    
    // Simulate image load error
    const image = screen.getByTestId('avatar-image');
    image.dispatchEvent(new Event('error'));
    
    const fallback = screen.getByText('JD');
    expect(fallback).toBeInTheDocument();
  });
}); 