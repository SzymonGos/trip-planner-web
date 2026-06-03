import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isFullWidthNavbar = (pathname: string): boolean =>
  pathname.startsWith('/trip/planner') || pathname.startsWith('/trip/') || pathname.startsWith('/trip/planner/edit/');
