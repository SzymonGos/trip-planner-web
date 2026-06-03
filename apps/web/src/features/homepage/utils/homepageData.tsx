import { BoltIcon } from '@/components/Icons/BoltIcon';
import { CloudIcon } from '@/components/Icons/CloudIcon';
import { MapPinIcon } from '@/components/Icons/MapPinIcon';
import { SendIcon } from '@/components/Icons/SendIcon';
import { ShieldCheck } from '@/components/Icons/ShieldCheck';

export const PRODUCT_BENEFITS_DATA = [
  {
    icon: <BoltIcon />,
    title: 'AI-Powered Planning',
    description: 'Let our smart algorithms craft personalized itineraries that match your travel style perfectly.',
    isNew: true,
  },
  {
    icon: <MapPinIcon />,
    title: 'Traveler First',
    description: 'Created by passionate travelers who understand what makes a journey truly memorable.',
  },
  {
    icon: <BoltIcon />,
    title: 'Lightning Fast',
    description: 'From idea to itinerary in minutes, with real-time updates that keep you ahead of the curve.',
  },
  {
    icon: <ShieldCheck />,
    title: 'Travel Security',
    description: 'Your personal information stays protected with enterprise-level encryption and privacy controls.',
  },
  {
    icon: <BoltIcon />,
    title: 'Scalable Platform',
    description: "Whether you're planning solo adventures or coordinating group expeditions, we've got you covered.",
  },
  {
    icon: <CloudIcon />,
    title: 'Cloud Native',
    description: 'Access your travel plans from anywhere in the world with our seamless cloud infrastructure.',
  },
];

export const PRODUCT_FEATURES = [
  'No credit card required',
  'AI travel advisor',
  'Cancel anytime',
  '24/7 customer support',
];

export const HOW_IT_WORKS_DATA = [
  {
    icon: <MapPinIcon />,
    title: 'Plan Your Trip',
    description:
      'Start by filling in your trip details: title, description, origin, and destination. Our intuitive form makes it easy to capture your travel vision in just a few clicks.',
    stepNumber: '01',
  },
  {
    icon: <SendIcon />,
    title: 'AI Chat Assistant',
    description:
      'Engage with our intelligent AI chat. Simply tell us your vision and our AI will help you plan, shape, and refine your perfect trip itinerary with personalized recommendations.',
    stepNumber: '02',
  },
  {
    icon: <BoltIcon />,
    title: 'Map & Manage',
    description:
      'Watch your route come to life on an interactive map. See your planned journey, track multiple trips, and manage everything from one dashboard.',
    stepNumber: '03',
  },
];

export const PRODUCT_STATS_DATA = [
  {
    title: 'Destinations',
    value: '156',
  },
  {
    title: 'Travelers',
    value: '2.4k',
  },
  {
    title: 'Total Distance',
    value: '15,4k km',
  },
];
