import Link from 'next/link';
import { SettingsIcon } from '@/components/Icons/SettingsIcon';
import { getTripPlannerEditUrl } from '../helpers/getTripPlannerEditUrl';
import { FC } from 'react';

type TSettingsLinkProps = {
  tripId: string;
};

export const SettingsLink: FC<TSettingsLinkProps> = ({ tripId }) => (
  <Link
    href={getTripPlannerEditUrl(tripId)}
    aria-label="Edit trip"
    tabIndex={0}
    className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2rounded"
    title="Edit trip"
  >
    <SettingsIcon className="w-5 h-5" />
  </Link>
);
