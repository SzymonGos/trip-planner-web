import { Container } from '@/components/Container/Container';
import React from 'react';
import Link from 'next/link';
import { getTripPlannerUrl } from '../trip/helpers/getTripPlannerUrl';
import { HOW_IT_WORKS_DATA } from './utils/homepageData';
import { ArrowIcon } from '@/components/Icons/ArrowIcon';
import { ChevronIcon } from '@/components/Icons/ChevronIcon';

export const HowItWorks = () => (
  <Container className="mt-20 pb-20 bg-gray-50">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-primary font-bold text-black mb-4">How It Works</h2>
      <h3 className="text-xl text-gray-600 max-w-2xl mx-auto font-primary">
        Plan your perfect trip in just three simple steps with our <span className="whitespace-nowrap">AI-powered</span>
        travel assistant
      </h3>
    </div>

    <div className="grid md:grid-cols-3 gap-8">
      {HOW_IT_WORKS_DATA.map((step, index) => (
        <div key={index} className="relative">
          <div className="bg-white rounded-md p-8 shadow-lg border border-gray-100 h-full">
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-6 mx-auto">
              <div className="text-white text-2xl">{step.icon}</div>
            </div>

            <h3 className="text-xl font-semibold text-black mb-4 text-center">{step.title}</h3>
            <p className="text-gray-600 text-center leading-relaxed">{step.description}</p>
          </div>

          {index < HOW_IT_WORKS_DATA.length - 1 && (
            <div className="hidden md:block absolute top-1/2 -right-10 transform -translate-y-1/2 z-10">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                <ChevronIcon />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
    <div className="text-center mt-16">
      <Link
        href={getTripPlannerUrl()}
        className="w-fit px-8 py-4 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition-colors flex items-center gap-2 mx-auto"
      >
        Get Started Now
        <ArrowIcon className="w-4 h-4" />
      </Link>
    </div>
  </Container>
);
