import React from 'react';
import Link from 'next/link';
import { Container } from '../Container/Container';
import { TwitterXIcon } from '../Icons/TwitterXIcon';
import { PinterestIcon } from '../Icons/PinterestIcon';
import { FacebookIcon } from '../Icons/FacebookIcon';

export const Footer = () => (
  <footer className="mt-20 bg-tp-white-100">
    <Container>
      <div className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-1">
            <h3 className="font-primary font-semibold text-tp-primary text-lg mb-4">RouteTripper</h3>
            <p className="font-secondary text-tp-gray-300 text-sm mb-2">Premium trip planning for modern travelers.</p>
            <p className="font-secondary text-tp-gray-300 text-sm mb-4">
              Discover our curated collection of destinations.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-tp-gray-300 hover:text-tp-primary transition-colors">
                <TwitterXIcon />
              </Link>
              <Link href="#" className="text-tp-gray-300 hover:text-tp-primary transition-colors">
                <PinterestIcon />
              </Link>
              <Link href="#" className="text-tp-gray-300 hover:text-tp-primary transition-colors">
                <FacebookIcon />
              </Link>
            </div>
          </div>
          <div>
            <h3 className="font-primary font-semibold text-tp-primary text-lg mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/trips"
                  className="font-secondary text-tp-gray-300 hover:text-tp-primary transition-colors text-sm"
                >
                  My Trips
                </Link>
              </li>
              <li>
                <Link
                  href="/trip/planner"
                  className="font-secondary text-tp-gray-300 hover:text-tp-primary transition-colors text-sm"
                >
                  Trip Planner
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="font-secondary text-tp-gray-300 hover:text-tp-primary transition-colors text-sm"
                >
                  Popular Destinations
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="font-secondary text-tp-gray-300 hover:text-tp-primary transition-colors text-sm"
                >
                  Travel Guides
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-primary font-semibold text-tp-primary text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="font-secondary text-tp-gray-300 hover:text-tp-primary transition-colors text-sm"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="font-secondary text-tp-gray-300 hover:text-tp-primary transition-colors text-sm"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="font-secondary text-tp-gray-300 hover:text-tp-primary transition-colors text-sm"
                >
                  AI Chat Support
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="font-secondary text-tp-gray-300 hover:text-tp-primary transition-colors text-sm"
                >
                  Feedback
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-primary font-semibold text-tp-primary text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="font-secondary text-tp-gray-300 hover:text-tp-primary transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="font-secondary text-tp-gray-300 hover:text-tp-primary transition-colors text-sm"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="font-secondary text-tp-gray-300 hover:text-tp-primary transition-colors text-sm"
                >
                  Press
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="font-secondary text-tp-gray-300 hover:text-tp-primary transition-colors text-sm"
                >
                  Partners
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-primary font-semibold text-tp-primary text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="font-secondary text-tp-gray-300 hover:text-tp-primary transition-colors text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="font-secondary text-tp-gray-300 hover:text-tp-primary transition-colors text-sm"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="font-secondary text-tp-gray-300 hover:text-tp-primary transition-colors text-sm"
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="font-secondary text-tp-gray-300 hover:text-tp-primary transition-colors text-sm"
                >
                  Accessibility
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-tp-gray-200"></div>
      <div className="py-10 flex flex-col md:flex-row justify-between items-center">
        <div className="font-secondary text-tp-gray-300 text-sm mb-4 md:mb-0">
          © 2024 RouteTripper. All rights reserved.
        </div>
        <div className="flex space-x-6">
          <Link href="#" className="font-secondary text-tp-gray-300 hover:text-tp-primary transition-colors text-sm">
            Sitemap
          </Link>
          <Link href="#" className="font-secondary text-tp-gray-300 hover:text-tp-primary transition-colors text-sm">
            Affiliate Program
          </Link>
          <Link href="#" className="font-secondary text-tp-gray-300 hover:text-tp-primary transition-colors text-sm">
            Partner Portal
          </Link>
        </div>
      </div>
    </Container>
  </footer>
);
