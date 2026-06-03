import React from 'react';

export const TripCardMaskWave = () => (
  <div className="absolute -bottom-2 left-0 w-full h-[30px]">
    <svg className="w-full h-full" viewBox="0 0 1440 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fill="rgb(243 244 246)"
        className="fill-zinc-100 group-hover:fill-white duration-200 ease-out"
        d="M0,0 C480,100 960,100 1440,0 L1440,100 L0,100 Z"
      />
    </svg>
  </div>
);
