import { render, screen } from '@testing-library/react';
import { Navbar } from '../Navbar';
import { useUser } from '@clerk/nextjs';
import { useScrollY } from '@/hooks/useScrollY';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

jest.mock('@clerk/nextjs', () => ({
  useUser: jest.fn(),
  useAuth: jest.fn(() => ({ sessionId: 'session123' })),
  SignOutButton: ({ children }: { children: ReactNode }) => <button type="button">{children}</button>,
}));

jest.mock('@/hooks/useScrollY');
jest.mock('next/navigation');

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: { src: string; alt: string; [key: string]: unknown }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} {...props} />
  ),
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, ...props }: { children: ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

jest.mock('@/components/ui/dropdown-menu', () => ({
  DropdownMenu: ({ children }: { children: ReactNode }) => <div data-testid="dropdown-menu">{children}</div>,
  DropdownMenuContent: ({ children }: { children: ReactNode }) => <div data-testid="dropdown-content">{children}</div>,
  DropdownMenuItem: ({
    children,
    asChild,
    ...props
  }: {
    children: ReactNode;
    asChild?: boolean;
    [key: string]: unknown;
  }) =>
    asChild ? (
      children
    ) : (
      <div data-testid="dropdown-item" {...props}>
        {children}
      </div>
    ),
  DropdownMenuTrigger: ({ children }: { children: ReactNode }) => <div data-testid="dropdown-trigger">{children}</div>,
}));

jest.mock('next-cloudinary', () => ({
  CldImage: ({ src, alt, ...props }: { src: string; alt: string; [key: string]: unknown }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} {...props} />
  ),
}));

const mockUseUser = jest.mocked(useUser);
const mockUseScrollY = jest.mocked(useScrollY);
const mockUsePathname = jest.mocked(usePathname);

describe('Navbar', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockUseScrollY.mockReturnValue(0);
    mockUsePathname.mockReturnValue('/');

    mockUseUser.mockReturnValue({
      isLoaded: true,
      isSignedIn: false,
    } as ReturnType<typeof useUser>);
  });

  test('renders navbar with logo', () => {
    render(<Navbar />);

    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('navbar-logo')).toBeInTheDocument();
    expect(screen.getByAltText('route tripper logo')).toBeInTheDocument();
  });

  test('renders sign in link when user is not signed in', () => {
    render(<Navbar />);

    expect(screen.getByTestId('navbar-sign-in')).toBeInTheDocument();
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });

  test('renders user menu when user is signed in', () => {
    mockUseUser.mockReturnValue({
      isLoaded: true,
      isSignedIn: true,
    } as ReturnType<typeof useUser>);

    render(<Navbar userName="johndoe" />);

    expect(screen.getByTestId('navbar-user-section')).toBeInTheDocument();
    expect(screen.getByText('johndoe')).toBeInTheDocument();
  });

  test('shows loading skeleton when user data is not loaded', () => {
    mockUseUser.mockReturnValue({
      isLoaded: false,
      isSignedIn: false,
    } as ReturnType<typeof useUser>);

    render(<Navbar />);

    expect(screen.getByTestId('navbar-loading-skeleton')).toBeInTheDocument();
  });

  test('renders navigation links', () => {
    render(<Navbar />);

    expect(screen.getByTestId('navbar-navigation')).toBeInTheDocument();
    expect(screen.getByTestId('navbar-links')).toBeInTheDocument();

    expect(screen.getByTestId('navbar-link-plan_trip')).toHaveTextContent('Plan trip');

    expect(screen.getByTestId('navbar-link-trips')).toHaveTextContent('Trips');
  });

  test('applies scroll styles when scrolled', () => {
    mockUseScrollY.mockReturnValue(100);

    render(<Navbar />);

    expect(screen.getByTestId('navbar')).toHaveClass(
      'transition-colors',
      'duration-100',
      'bg-tp-white-100',
      'border-b-tp-gray-100',
      'shadow-md',
    );
  });

  test('applies trip page styles when on trip pages', () => {
    mockUsePathname.mockReturnValue('/trip/123');

    render(<Navbar />);

    expect(screen.getByTestId('navbar')).toHaveClass('border-b-tp-gray-100', 'bg-tp-white-100', 'shadow-md');
  });

  test('renders all major sections for signed-out users', () => {
    render(<Navbar />);

    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('navbar-logo')).toBeInTheDocument();
    expect(screen.getByTestId('navbar-navigation')).toBeInTheDocument();
    expect(screen.getByTestId('navbar-links')).toBeInTheDocument();
    expect(screen.getByTestId('navbar-sign-in')).toBeInTheDocument();
  });

  test('navigation links have correct href attributes', () => {
    render(<Navbar />);

    expect(screen.getByTestId('navbar-link-plan_trip')).toHaveAttribute('href', '/trip/planner');

    expect(screen.getByTestId('navbar-link-trips')).toHaveAttribute('href', '/trips');
  });
});
