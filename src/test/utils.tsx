import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from '@/components/theme-provider';
import { TooltipProvider } from '@/components/ui/tooltip';

// Define a custom render function that includes providers
const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  const AllProviders = ({ children }: { children: React.ReactNode }) => {
    return (
      <ThemeProvider enableSystem attribute="class" defaultTheme="light">
        <TooltipProvider delayDuration={0}>
          {children}
        </TooltipProvider>
      </ThemeProvider>
    );
  };

  return render(ui, { wrapper: AllProviders, ...options });
};

// Re-export everything from testing-library
export * from '@testing-library/react';

// Override the render method
export { customRender as render }; 