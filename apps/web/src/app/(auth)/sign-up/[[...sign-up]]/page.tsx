'use client';

import React from 'react';
import { SignUp } from '@clerk/nextjs';
import Image from 'next/image';

const SignUpPage = () => (
  <div className="w-full mt-20 max-w-5xl mx-auto rounded-md border-[0.5px] overflow-hidden min-h-[600px] grid lg:grid-cols-2">
    <div className="flex flex-col justify-center px-8 lg:px-12 py-12">
      <div className="w-full max-w-sm mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-primary font-bold text-gray-900 mb-2">Create Account</h1>
          <p className="text-gray-600 font-secondary">Join us and start planning your dream trips today</p>
        </div>

        <SignUp
          signInUrl="/sign-in"
          appearance={{
            elements: {
              cardBox: '!shadow-none !border-0 !bg-transparent',
              formButtonPrimary:
                'bg-tp-primary hover:bg-gray-800 text-white font-medium transition-colors rounded-md h-12 text-base',
              card: '!shadow-none !border-0 !bg-transparent',
              headerTitle: 'hidden',
              headerSubtitle: 'hidden',
              socialButtonsBlockButton: 'border-gray-200 hover:border-gray-300 transition-colors rounded-md h-12',
              formFieldInput: 'border-gray-200 focus:border-tp-primary focus:ring-tp-primary rounded-md h-12',
              footerActionLink: 'text-tp-primary hover:text-gray-800 transition-colors',
              formFieldLabel: 'text-gray-700 font-medium',
              identityPreviewText: 'text-gray-600',
              formResendCodeLink: 'text-tp-primary hover:text-gray-800',
            },
          }}
        />
      </div>
    </div>
    <div className="relative min-h-[600px] hidden lg:block">
      <Image
        src="/images/road-landscape.webp"
        alt="Beautiful road landscape for your next adventure"
        fill
        className="object-cover"
        priority
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
      <div className="absolute bottom-8 left-8 right-8 text-white">
        <h3 className="text-3xl font-primary font-bold mb-3">Welcome to RouteTripper</h3>
        <p className="text-white/90 font-secondary text-lg leading-relaxed">
          Plan your perfect journey with AI-powered trip recommendations
        </p>
      </div>
    </div>
  </div>
);

export default SignUpPage;
