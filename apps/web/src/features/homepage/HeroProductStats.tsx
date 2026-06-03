import React from 'react';
import { PRODUCT_STATS_DATA } from './utils/homepageData';

export const HeroProductStats = () => (
  <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-6">
    <div className="grid grid-cols-3 gap-6 text-center">
      {PRODUCT_STATS_DATA.map((stat) => (
        <div key={stat.title}>
          <div className="text-sm md:text-2xl font-bold text-gray-900">{stat.value}</div>
          <div className="text-xs md:text-sm text-gray-600 mt-1">{stat.title}</div>
        </div>
      ))}
    </div>
  </div>
);
