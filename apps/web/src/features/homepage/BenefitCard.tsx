import React, { FC } from 'react';

type TBenefitCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  isNew?: boolean;
};

export const BenefitCard: FC<TBenefitCardProps> = ({ icon, title, description, isNew = false }) => (
  <div className="rounded-md p-8 border-[0.5px] border-tp-gray-100">
    <div className="flex justify-between items-start mb-4">
      <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-tp-white-100">
        <div className="w-6 h-6">{icon}</div>
      </div>
      {isNew && <span className="px-3 py-1 bg-black text-white text-xs font-medium rounded-full">New</span>}
    </div>
    <h3 className="text-xl font-bold text-black mb-3">{title}</h3>
    <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>
  </div>
);
