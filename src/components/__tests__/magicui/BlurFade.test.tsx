import { describe, it, expect, vi } from 'vitest';
import BlurFade from '@/components/magicui/blur-fade';
import { render, screen } from '@/test/utils';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion');
  return {
    ...actual,
    motion: {
      div: ({ children, className, ref, ...props }: any) => (
        <div ref={ref} className={className} data-testid="motion-div">
          {children}
        </div>
      ),
    },
    AnimatePresence: ({ children }: any) => <>{children}</>,
    useInView: () => true,
  };
});

describe('BlurFade Component', () => {
  it('renders with default props', () => {
    render(
      <BlurFade>
        <p>Test content</p>
      </BlurFade>
    );
    
    const motionDiv = screen.getByTestId('motion-div');
    expect(motionDiv).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    render(
      <BlurFade className="custom-class">
        <p>Test content</p>
      </BlurFade>
    );
    
    const motionDiv = screen.getByTestId('motion-div');
    expect(motionDiv).toHaveClass('custom-class');
  });

  it('passes custom duration and delay props', () => {
    render(
      <BlurFade duration={0.8} delay={0.2}>
        <p>Test content</p>
      </BlurFade>
    );
    
    // Since we're mocking the component, we can't directly test the animation properties
    // But we can verify the component renders correctly
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('passes custom yOffset and blur props', () => {
    render(
      <BlurFade yOffset={10} blur="10px">
        <p>Test content</p>
      </BlurFade>
    );
    
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });
}); 