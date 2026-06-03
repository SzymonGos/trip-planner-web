import React from 'react';
import { Container } from '@/components/Container/Container';
import { BenefitCard } from './BenefitCard';
import { PRODUCT_BENEFITS_DATA } from './utils/homepageData';

export const ProductBenefits = () => (
  <Container className="mb-24">
    <div className="text-center mb-10">
      <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6 font-primary">Features that set us apart</h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
        Everything you need to plan perfect trips with confidence. Built for travelers, designed for adventure.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {PRODUCT_BENEFITS_DATA.map((benefit, index) => (
        <BenefitCard
          key={index}
          icon={benefit.icon}
          title={benefit.title}
          description={benefit.description}
          isNew={benefit.isNew}
        />
      ))}
    </div>
  </Container>
);
