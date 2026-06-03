'use client';

import React from 'react';
import Image from 'next/image';
import { Container } from '@/components/Container/Container';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getTripPlannerUrl } from '../trip/helpers/getTripPlannerUrl';
import { PRODUCT_FEATURES } from './utils/homepageData';
import { ArrowIcon } from '@/components/Icons/ArrowIcon';
import { HeroProductStats } from './HeroProductStats';

export const HeroSection = () => (
  <Container className="pt-16 mb-24">
    <div className="px-4">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 self-start">
          <h1 className="text-5xl lg:text-5xl font-bold text-black leading-tight font-primary">
            Plan your perfect trip
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Our all-in-one solution helps travelers discover destinations, plan itineraries, and create unforgettable
            journeys with ease.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href={getTripPlannerUrl()} passHref>
              <Button
                className="p-7 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition-colors flex items-center gap-2"
                variant="default"
              >
                Start planning
                <ArrowIcon className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {PRODUCT_FEATURES.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-zinc-100 rounded-full"></div>
                </div>
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="relative rounded-md bg-tp-gray-100 p-1 overflow-hidden">
            <Image
              src="/images/road-landscape.webp"
              alt="Scenic road landscape for travel inspiration"
              width={600}
              height={400}
              className="w-full h-auto object-cover rounded-md"
            />

            <HeroProductStats />
          </div>
        </div>
      </div>
    </div>
  </Container>
);
