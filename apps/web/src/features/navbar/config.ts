import { getTripPlannerUrl } from '@/features/trip/helpers/getTripPlannerUrl';
import { getTripsUrl } from '@/features/trip/helpers/getTripsUrl';

export const navbarLinks = [
  {
    id: 'plan_trip',
    name: 'Plan trip',
    url: getTripPlannerUrl(),
    mobile: true,
  },
  {
    id: 'trips',
    name: 'Trips',
    url: getTripsUrl(),
    mobile: false,
  },
];
