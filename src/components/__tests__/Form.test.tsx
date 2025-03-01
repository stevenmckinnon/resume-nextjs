import { describe, it, expect, vi } from 'vitest';
import { 
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
  useFormField
} from '@/components/ui/form';
import { render, screen } from '@/test/utils';
import { useForm, FormProvider } from 'react-hook-form';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import React from 'react';

// Mock the useFormField hook
vi.mock('@/components/ui/form', async () => {
  const actual = await vi.importActual('@/components/ui/form');
  return {
    ...actual,
    useFormField: vi.fn().mockReturnValue({
      id: 'test-id',
      name: 'test',
      formItemId: 'test-form-item',
      formDescriptionId: 'test-form-description',
      formMessageId: 'test-form-message',
    }),
  };
});

// Mock the useFormContext hook
vi.mock('react-hook-form', async () => {
  const actual = await vi.importActual('react-hook-form');
  return {
    ...actual,
    useFormContext: vi.fn().mockReturnValue({
      getFieldState: vi.fn(),
      formState: { errors: {} }
    }),
  };
});

const TestForm = () => {
  const formSchema = z.object({
    username: z.string().min(2).max(50),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      username: '',
    },
  });

  return (
    <Form {...form}>
      <form>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter username" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage>
                {form.formState.errors.username?.message}
              </FormMessage>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

// Wrapper component with FormProvider for individual component tests
const FormComponentWrapper = ({ children }: { children: React.ReactNode }) => {
  const mockForm = {
    getFieldState: vi.fn(),
    formState: { errors: {} }
  } as any; // Type assertion to avoid TypeScript errors
  
  return (
    <FormProvider {...mockForm}>
      {children}
    </FormProvider>
  );
};

describe('Form Components', () => {
  it('renders Form with all subcomponents', () => {
    render(<TestForm />);
    
    expect(screen.getByText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter username')).toBeInTheDocument();
    expect(screen.getByText('This is your public display name.')).toBeInTheDocument();
  });

  it('renders FormLabel with default props', () => {
    render(
      <FormComponentWrapper>
        <FormLabel>Test Label</FormLabel>
      </FormComponentWrapper>
    );
    const label = screen.getByText('Test Label');
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass('text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70');
  });

  it('renders FormLabel with custom className', () => {
    render(
      <FormComponentWrapper>
        <FormLabel className="custom-label">Test Label</FormLabel>
      </FormComponentWrapper>
    );
    const label = screen.getByText('Test Label');
    expect(label).toHaveClass('custom-label');
  });

  it('renders FormDescription with default props', () => {
    render(
      <FormComponentWrapper>
        <FormDescription>Test Description</FormDescription>
      </FormComponentWrapper>
    );
    const description = screen.getByText('Test Description');
    expect(description).toBeInTheDocument();
    expect(description).toHaveClass('text-[0.8rem] text-muted-foreground');
  });

  it('renders FormDescription with custom className', () => {
    render(
      <FormComponentWrapper>
        <FormDescription className="custom-desc">Test Description</FormDescription>
      </FormComponentWrapper>
    );
    const description = screen.getByText('Test Description');
    expect(description).toHaveClass('custom-desc');
  });

  it('renders FormMessage with default props', () => {
    render(
      <FormComponentWrapper>
        <FormMessage>Test Message</FormMessage>
      </FormComponentWrapper>
    );
    const message = screen.getByText('Test Message');
    expect(message).toBeInTheDocument();
    expect(message).toHaveClass('text-[0.8rem] font-medium text-destructive');
  });

  it('renders FormMessage with custom className', () => {
    render(
      <FormComponentWrapper>
        <FormMessage className="custom-message">Test Message</FormMessage>
      </FormComponentWrapper>
    );
    const message = screen.getByText('Test Message');
    expect(message).toHaveClass('custom-message');
  });

  it('renders FormControl with children', () => {
    render(
      <FormComponentWrapper>
        <FormControl>
          <input type="text" data-testid="test-input" />
        </FormControl>
      </FormComponentWrapper>
    );
    expect(screen.getByTestId('test-input')).toBeInTheDocument();
  });
}); 