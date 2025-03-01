import { describe, it, expect, vi } from 'vitest';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { render, screen, fireEvent, act } from '@/test/utils';

// Mock the useTooltip hook
vi.mock('@radix-ui/react-tooltip', async () => {
  const actual = await vi.importActual('@radix-ui/react-tooltip');
  return {
    ...actual,
    Root: ({ children, open, defaultOpen, onOpenChange }: any) => {
      return (
        <div data-testid="tooltip-root">
          {typeof children === 'function'
            ? children({ open: open || defaultOpen })
            : children}
        </div>
      );
    },
    Trigger: ({ children, className }: any) => (
      <div data-testid="tooltip-trigger" className={className}>{children}</div>
    ),
    Portal: ({ children }: any) => <div data-testid="tooltip-portal">{children}</div>,
    Content: ({ children, className, ...props }: any) => (
      <div data-testid="tooltip-content" className={className} {...props}>
        {children}
      </div>
    ),
    Provider: ({ children }: any) => <div data-testid="tooltip-provider">{children}</div>,
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
    expect(content).toHaveClass('z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2');
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