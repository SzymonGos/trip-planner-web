import { FC } from 'react';
import { Trip as TTrip } from 'tp-graphql-types';

type TTripStatusProps = {
  status: TTrip['status'];
};

export const TripStatus: FC<TTripStatusProps> = ({ status }) => (
  <span className="inline-block px-2 py-1 capitalize rounded bg-zinc-200 text-gray-700 text-xs font-medium">
    {status}
  </span>
);
