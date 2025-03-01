import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@/test/utils';
import Page from '../page';

// Mock the DATA object
vi.mock('@/data/resume', () => ({
  DATA: {
    name: 'Test User',
    description: 'Test description',
    location: 'Test Location',
    locationLink: 'https://maps.google.com',
    summary: 'Test summary',
    skills: [],
    work: [],
    education: [],
    otherWork: [],
  },
}));

// Mock the BlurFade component to render its children directly
vi.mock('@/components/magicui/blur-fade', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Mock other components that might be used in the page
vi.mock('@/components/resume-card', () => ({
  ResumeCard: () => <div data-testid="resume-card">Resume Card</div>,
}));

vi.mock('@/components/magicui/rainbow-button', () => ({
  RainbowButton: ({ children }: { children: React.ReactNode }) => (
    <button data-testid="rainbow-button">{children}</button>
  ),
}));

describe('CV Download Section', () => {
  it('renders the CV download section', () => {
    render(<Page />);
    
    // Check if the section heading exists
    expect(screen.getByText('Download my full CV')).toBeInTheDocument();
    
    // Check if the description text exists
    expect(
      screen.getByText(/Want a complete overview of my experience and qualifications/i)
    ).toBeInTheDocument();
    
    // Check if the download button exists
    const downloadButton = screen.getByRole('link', { name: /download cv/i });
    expect(downloadButton).toBeInTheDocument();
    expect(downloadButton).toHaveAttribute('href', '/cv.pdf');
    expect(downloadButton).toHaveAttribute('download', 'Steve McKinnon CV.pdf');
    expect(downloadButton).toHaveAttribute('target', '_blank');
  });
}); 