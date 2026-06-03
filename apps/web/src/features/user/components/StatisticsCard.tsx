import React, { FC, ReactNode } from 'react';

type StatisticsCardProps = {
  title: string;
  value: string;
  icon: ReactNode;
};

export const StatisticsCard: FC<StatisticsCardProps> = ({ title, value, icon }) => (
  <div className="flex items-center bg-tp-white-100 rounded-lg p-6 border">
    <div className="w-9 h-9 flex items-center justify-center bg-tp-gray-100/40 rounded-lg">{icon}</div>
    <div className="flex flex-col items-start ml-4">
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <div className="text-sm text-gray-600 mt-1">{title}</div>
    </div>
  </div>
);
