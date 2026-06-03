import { render, screen } from '@testing-library/react';
import { Navbar } from '../Navbar';
import { useUser } from '@clerk/nextjs';
import { useScrollY } from '@/hooks/useScrollY';
import { usePathname } from 'next/navigation';

jest.mock('@clerk/nextjs', () => ({
  useUser: jest.fn(),
  useAuth: jest.fn(() => ({ sessionId: 'session123' })),
  SignOutButton: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => (
    <button {...props}>{children}</button>
  ),
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
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));
jest.mock('@/components/ui/dropdown-menu', () => ({
  DropdownMenu: ({ children }: { children: React.ReactNode }) => <div data-testid="dropdown-menu">{children}</div>,
  DropdownMenuContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dropdown-content">{children}</div>
  ),
  DropdownMenuItem: ({
    children,
    asChild,
    ...props
  }: {
    children: React.ReactNode;
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
  DropdownMenuTrigger: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dropdown-trigger">{children}</div>
  ),
}));
jest.mock('next-cloudinary', () => ({
  CldImage: ({ src, alt, ...props }: { src: string; alt: string; [key: string]: unknown }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} {...props} />
  ),
}));
jest.mock('@apollo/client', () => ({
  useQuery: jest.fn(() => ({
    data: { user: { profileImage: { id: 'img123' } } },
    loading: false,
    error: null,
  })),
  gql: jest.fn((strings) => strings.join('')),
}));

const mockUseUser = useUser as jest.MockedFunction<typeof useUser>;
const mockUseScrollY = useScrollY as jest.MockedFunction<typeof useScrollY>;
const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;

describe('Navbar', () => {
  beforeEach(() => {
    mockUseScrollY.mockReturnValue(0);
    mockUsePathname.mockReturnValue('/');
  });

  test('renders navbar with logo', () => {
    mockUseUser.mockReturnValue({
      isLoaded: true,
      isSignedIn: false,
    } as ReturnType<typeof useUser>);

    render(<Navbar />);

    const navbar = screen.getByTestId('navbar');
    const logo = screen.getByTestId('navbar-logo');
    const logoImage = screen.getByAltText('route tripper logo');

    expect(navbar).toBeInTheDocument();
    expect(logo).toBeInTheDocument();
    expect(logoImage).toBeInTheDocument();
  });

  test('renders sign in link when user is not signed in', () => {
    mockUseUser.mockReturnValue({
      isLoaded: true,
      isSignedIn: false,
    } as ReturnType<typeof useUser>);

    render(<Navbar />);

    const signInSection = screen.getByTestId('navbar-sign-in');
    const signInLink = screen.getByText('Sign In');

    expect(signInSection).toBeInTheDocument();
    expect(signInLink).toBeInTheDocument();
  });

  test('renders user menu when user is signed in', () => {
    mockUseUser.mockReturnValue({
      isLoaded: true,
      isSignedIn: true,
    } as ReturnType<typeof useUser>);

    render(<Navbar userName="johndoe" clerkId="clerk123" />);

    const userSection = screen.getByTestId('navbar-user-section');
    const userName = screen.getByText('johndoe');

    expect(userSection).toBeInTheDocument();
    expect(userName).toBeInTheDocument();
  });

  test('shows loading skeleton when user data is not loaded', () => {
    mockUseUser.mockReturnValue({
      isLoaded: false,
      isSignedIn: false,
    } as ReturnType<typeof useUser>);

    render(<Navbar />);

    const skeleton = screen.getByTestId('navbar-loading-skeleton');
    expect(skeleton).toBeInTheDocument();
  });

  test('renders navigation links', () => {
    mockUseUser.mockReturnValue({
      isLoaded: true,
      isSignedIn: false,
    } as ReturnType<typeof useUser>);

    render(<Navbar />);

    const navigation = screen.getByTestId('navbar-navigation');
    const linksList = screen.getByTestId('navbar-links');
    const planTripLink = screen.getByTestId('navbar-link-plan_trip');
    const tripsLink = screen.getByTestId('navbar-link-trips');

    expect(navigation).toBeInTheDocument();
    expect(linksList).toBeInTheDocument();
    expect(planTripLink).toBeInTheDocument();
    expect(tripsLink).toBeInTheDocument();
    expect(planTripLink).toHaveTextContent('Plan trip');
    expect(tripsLink).toHaveTextContent('Trips');
  });

  test('applies scroll styles when scrolled', () => {
    mockUseUser.mockReturnValue({
      isLoaded: true,
      isSignedIn: false,
    } as ReturnType<typeof useUser>);
    mockUseScrollY.mockReturnValue(100);

    render(<Navbar />);

    const navbar = screen.getByTestId('navbar');
    expect(navbar).toHaveClass(
      'transition-colors',
      'duration-100',
      'bg-tp-white-100',
      'border-b-tp-gray-100',
      'shadow-md',
    );
  });

  test('applies trip page styles when on trip pages', () => {
    mockUseUser.mockReturnValue({
      isLoaded: true,
      isSignedIn: false,
    } as ReturnType<typeof useUser>);
    mockUsePathname.mockReturnValue('/trip/123');

    render(<Navbar />);

    const navbar = screen.getByTestId('navbar');
    expect(navbar).toHaveClass('border-b-tp-gray-100', 'bg-tp-white-100', 'shadow-md');
  });

  test('has correct data-testid attributes for all major sections', () => {
    mockUseUser.mockReturnValue({
      isLoaded: true,
      isSignedIn: false,
    } as ReturnType<typeof useUser>);

    render(<Navbar />);

    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('navbar-logo')).toBeInTheDocument();
    expect(screen.getByTestId('navbar-navigation')).toBeInTheDocument();
    expect(screen.getByTestId('navbar-links')).toBeInTheDocument();
    expect(screen.getByTestId('navbar-user-section')).toBeInTheDocument();
    expect(screen.getByTestId('navbar-sign-in')).toBeInTheDocument();
  });

  test('navigation links have correct href attributes', () => {
    mockUseUser.mockReturnValue({
      isLoaded: true,
      isSignedIn: false,
    } as ReturnType<typeof useUser>);

    render(<Navbar />);

    const planTripLink = screen.getByTestId('navbar-link-plan_trip');
    const tripsLink = screen.getByTestId('navbar-link-trips');

    expect(planTripLink).toHaveAttribute('href', '/trip/planner');
    expect(tripsLink).toHaveAttribute('href', '/trips');
  });
});
