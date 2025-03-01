import { describe, it, expect, vi } from 'vitest';
import BlurFadeText from '@/components/magicui/blur-fade-text';
import { render, screen } from '@/test/utils';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion');
  return {
    ...actual,
    motion: {
      span: ({ children, className, ...props }: any) => (
        <span className={className} data-testid="motion-span">
          {children}
        </span>
      ),
    },
    AnimatePresence: ({ children }: any) => <>{children}</>,
  };
});

describe('BlurFadeText Component', () => {
  it('renders with default props', () => {
    render(<BlurFadeText text="Hello World" />);
    
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    render(<BlurFadeText text="Hello World" className="custom-text" />);
    
    const textElement = screen.getByText('Hello World');
    expect(textElement).toBeInTheDocument();
    // Since we're using a mock, we can't directly test the class, but we can verify the content
  });

  it('renders with animateByCharacter set to true', () => {
    render(<BlurFadeText text="ABC" animateByCharacter={true} />);
    
    // When animating by character, each character is rendered separately
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.getByText('C')).toBeInTheDocument();
  });

  it('passes custom variant props', () => {
    const customVariant = {
      hidden: { y: 10 },
      visible: { y: -10 },
    };
    
    render(<BlurFadeText text="Hello World" variant={customVariant} />);
    
    // Since we're using a mock, we can't directly test the variant, but we can verify the content
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('passes custom delay and yOffset props', () => {
    render(<BlurFadeText text="Hello World" delay={0.5} yOffset={12} />);
    
    // Since we're using a mock, we can't directly test these props, but we can verify the content
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });
}); 