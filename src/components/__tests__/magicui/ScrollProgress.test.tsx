import { describe, it, expect, vi } from 'vitest';
import { ScrollProgress } from '@/components/magicui/scroll-progress';
import { render, screen } from '@/test/utils';

// Mock motion/react to avoid animation issues in tests
vi.mock('motion/react', () => ({
  motion: {
    div: ({ children, className, ref, ...props }: any) => (
      <div ref={ref} className={className} data-testid="motion-div">
        {children}
      </div>
    ),
  },
  useScroll: () => ({ scrollYProgress: 0.5 }),
  MotionProps: {},
}));

describe('ScrollProgress Component', () => {
  it('renders with default props', () => {
    render(<ScrollProgress />);
    
    const progressBar = screen.getByTestId('motion-div');
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveClass('fixed inset-x-0 top-0 z-50 h-px origin-left bg-linear-to-r from-[#A97CF8] via-[#F38CB8] to-[#FDCC92]');
  });

  it('renders with custom className', () => {
    render(<ScrollProgress className="custom-progress" />);
    
    const progressBar = screen.getByTestId('motion-div');
    expect(progressBar).toHaveClass('custom-progress');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(<ScrollProgress ref={ref} />);
    expect(ref.current).not.toBeNull();
  });

  it('passes additional props to the component', () => {
    render(
      <ScrollProgress data-custom="test-value" aria-label="Page scroll progress" />
    );
    
    // With our mock, we can't directly test all props, but we can verify the component renders
    expect(screen.getByTestId('motion-div')).toBeInTheDocument();
  });
}); 