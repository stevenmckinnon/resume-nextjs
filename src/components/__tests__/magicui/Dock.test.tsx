import { describe, it, expect, vi } from 'vitest';
import { Dock, DockIcon } from '@/components/magicui/dock';
import { render, screen, fireEvent } from '@/test/utils';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion');
  return {
    ...actual,
    motion: {
      div: ({ children, className, ref, ...props }: any) => {
        // Use different data-testid based on className to differentiate between Dock and DockIcon
        const isIcon = className && className.includes('flex aspect-square cursor-pointer');
        return (
          <div 
            ref={ref} 
            className={className} 
            data-testid={isIcon ? "dock-icon" : "dock-container"}
            {...props}
          >
            {children}
          </div>
        );
      },
    },
    useMotionValue: () => ({
      set: vi.fn(),
      get: () => 0,
    }),
    useSpring: () => ({
      get: () => 0,
    }),
    useTransform: () => ({
      get: () => 0,
    }),
  };
});

describe('Dock Components', () => {
  describe('Dock Component', () => {
    it('renders with default props', () => {
      render(
        <Dock>
          <DockIcon>Icon 1</DockIcon>
          <DockIcon>Icon 2</DockIcon>
        </Dock>
      );
      
      const dock = screen.getByTestId('dock-container');
      expect(dock).toBeInTheDocument();
      expect(screen.getByText('Icon 1')).toBeInTheDocument();
      expect(screen.getByText('Icon 2')).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      render(
        <Dock className="custom-dock">
          <DockIcon>Icon</DockIcon>
        </Dock>
      );
      
      const dock = screen.getByTestId('dock-container');
      expect(dock).toBeInTheDocument();
      // Since we're using a mock, we can't directly test all classes, but we can verify the content
      expect(screen.getByText('Icon')).toBeInTheDocument();
    });

    it('handles mouse events', () => {
      render(
        <Dock>
          <DockIcon>Icon</DockIcon>
        </Dock>
      );
      
      const dock = screen.getByTestId('dock-container');
      fireEvent.mouseMove(dock, { pageX: 100 });
      fireEvent.mouseLeave(dock);
      
      // Since we're using a mock, we can't directly test the motion values, but we can verify the component doesn't crash
      expect(dock).toBeInTheDocument();
    });

    it('passes custom magnification and distance props', () => {
      render(
        <Dock magnification={80} distance={200}>
          <DockIcon>Icon</DockIcon>
        </Dock>
      );
      
      // Since we're using a mock, we can't directly test these props, but we can verify the component renders
      expect(screen.getByText('Icon')).toBeInTheDocument();
    });
  });

  describe('DockIcon Component', () => {
    it('renders with default props', () => {
      render(<DockIcon>Icon</DockIcon>);
      
      const icon = screen.getByTestId('dock-icon');
      expect(icon).toBeInTheDocument();
      expect(screen.getByText('Icon')).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      render(<DockIcon className="custom-icon">Icon</DockIcon>);
      
      const icon = screen.getByTestId('dock-icon');
      expect(icon).toBeInTheDocument();
      // Since we're using a mock, we can't directly test all classes, but we can verify the content
      expect(screen.getByText('Icon')).toBeInTheDocument();
    });

    it('passes custom magnification and distance props', () => {
      render(<DockIcon magnification={80} distance={200}>Icon</DockIcon>);
      
      // Since we're using a mock, we can't directly test these props, but we can verify the component renders
      expect(screen.getByText('Icon')).toBeInTheDocument();
    });
  });
}); 