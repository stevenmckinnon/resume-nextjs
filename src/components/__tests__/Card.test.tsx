import { describe, it, expect } from 'vitest';
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { render, screen } from '@/test/utils';

describe('Card Component', () => {
  it('renders Card with default props', () => {
    render(<Card data-testid="card">Card Content</Card>);
    const card = screen.getByTestId('card');
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass('rounded-lg bg-card text-card-foreground');
  });

  it('renders Card with custom className', () => {
    render(<Card data-testid="card" className="custom-class">Card Content</Card>);
    const card = screen.getByTestId('card');
    expect(card).toHaveClass('custom-class');
  });

  it('renders CardHeader with default props', () => {
    render(<CardHeader data-testid="card-header">Header Content</CardHeader>);
    const header = screen.getByTestId('card-header');
    expect(header).toHaveClass('flex flex-col');
  });

  it('renders CardHeader with custom className', () => {
    render(<CardHeader data-testid="card-header" className="custom-header">Header Content</CardHeader>);
    const header = screen.getByTestId('card-header');
    expect(header).toHaveClass('custom-header');
  });

  it('renders CardTitle with default props', () => {
    render(<CardTitle>Card Title</CardTitle>);
    const title = screen.getByText('Card Title');
    expect(title).toHaveClass('text-2xl font-semibold leading-none tracking-tight');
  });

  it('renders CardTitle with custom className', () => {
    render(<CardTitle className="custom-title">Card Title</CardTitle>);
    const title = screen.getByText('Card Title');
    expect(title).toHaveClass('custom-title');
  });

  it('renders CardDescription with default props', () => {
    render(<CardDescription>Card Description</CardDescription>);
    const description = screen.getByText('Card Description');
    expect(description).toHaveClass('text-sm text-muted-foreground');
  });

  it('renders CardDescription with custom className', () => {
    render(<CardDescription className="custom-desc">Card Description</CardDescription>);
    const description = screen.getByText('Card Description');
    expect(description).toHaveClass('custom-desc');
  });

  it('renders CardContent with default props', () => {
    render(<CardContent data-testid="card-content">Content</CardContent>);
    const content = screen.getByTestId('card-content');
    expect(content).toHaveClass('text-pretty font-sans text-sm text-muted-foreground');
  });

  it('renders CardContent with custom className', () => {
    render(<CardContent data-testid="card-content" className="custom-content">Content</CardContent>);
    const content = screen.getByTestId('card-content');
    expect(content).toHaveClass('custom-content');
  });

  it('renders CardFooter with default props', () => {
    render(<CardFooter data-testid="card-footer">Footer</CardFooter>);
    const footer = screen.getByTestId('card-footer');
    expect(footer).toHaveClass('flex items-center pt-2');
  });

  it('renders CardFooter with custom className', () => {
    render(<CardFooter data-testid="card-footer" className="custom-footer">Footer</CardFooter>);
    const footer = screen.getByTestId('card-footer');
    expect(footer).toHaveClass('custom-footer');
  });

  it('renders a complete Card with all subcomponents', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Complete Card</CardTitle>
          <CardDescription>This is a complete card example</CardDescription>
        </CardHeader>
        <CardContent>Card content goes here</CardContent>
        <CardFooter>Card footer</CardFooter>
      </Card>
    );
    
    expect(screen.getByText('Complete Card')).toBeInTheDocument();
    expect(screen.getByText('This is a complete card example')).toBeInTheDocument();
    expect(screen.getByText('Card content goes here')).toBeInTheDocument();
    expect(screen.getByText('Card footer')).toBeInTheDocument();
  });
}); 