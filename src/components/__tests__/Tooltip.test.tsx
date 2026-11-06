import { describe, it, expect, vi } from 'vitest';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { render, screen } from '@/test/utils';

type MockProps = {
  children?: React.ReactNode;
  className?: string;
  render?: React.ReactNode;
};

type MockRootProps = {
  children?: React.ReactNode | ((state: { open?: boolean }) => React.ReactNode);
  open?: boolean;
  defaultOpen?: boolean;
};

// Mock the Base UI tooltip primitives
vi.mock('@base-ui/react/tooltip', async () => {
  const actual = await vi.importActual<typeof import('@base-ui/react/tooltip')>('@base-ui/react/tooltip');
  return {
    ...actual,
    Tooltip: {
      ...actual.Tooltip,
      Root: ({ children, open, defaultOpen }: MockRootProps) => {
        return (
          <div data-testid="tooltip-root">
            {typeof children === 'function'
              ? children({ open: open || defaultOpen })
              : children}
          </div>
        );
      },
      Trigger: ({ children, className, render }: MockProps) => (
        <div data-testid="tooltip-trigger" className={className}>
          {render ? render : children}
        </div>
      ),
      Portal: ({ children }: MockProps) => <div data-testid="tooltip-portal">{children}</div>,
      Positioner: ({ children }: MockProps) => <div data-testid="tooltip-positioner">{children}</div>,
      Popup: ({ children, className }: MockProps) => (
        <div data-testid="tooltip-content" className={className}>
          {children}
        </div>
      ),
      Provider: ({ children }: MockProps) => <div data-testid="tooltip-provider">{children}</div>,
      Arrow: () => null,
    },
  };
});

describe('Tooltip Component', () => {
  it('renders tooltip with all subcomponents', () => {
    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>Tooltip content</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
    
    // Use getAllByTestId for provider since there might be multiple
    const providers = screen.getAllByTestId('tooltip-provider');
    expect(providers.length).toBeGreaterThan(0);
    expect(screen.getByTestId('tooltip-root')).toBeInTheDocument();
    expect(screen.getByTestId('tooltip-trigger')).toBeInTheDocument();
    expect(screen.getByText('Hover me')).toBeInTheDocument();
    expect(screen.getByTestId('tooltip-content')).toBeInTheDocument();
    expect(screen.getByText('Tooltip content')).toBeInTheDocument();
  });

  it('renders TooltipContent with default props', () => {
    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>Tooltip content</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
    
    const content = screen.getByTestId('tooltip-content');
    expect(content).toHaveClass('z-50 inline-flex w-fit max-w-xs items-center gap-1.5 rounded-xl bg-foreground px-3 py-1.5 text-xs text-background');
  });

  it('renders TooltipContent with custom className', () => {
    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent className="custom-tooltip">Tooltip content</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
    
    const content = screen.getByTestId('tooltip-content');
    expect(content).toHaveClass('custom-tooltip');
  });

  it('renders TooltipTrigger with custom className', () => {
    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="custom-trigger">Hover me</TooltipTrigger>
          <TooltipContent>Tooltip content</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
    
    const trigger = screen.getByTestId('tooltip-trigger');
    expect(trigger).toHaveClass('custom-trigger');
  });
}); 