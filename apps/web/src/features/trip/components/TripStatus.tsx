import { FC } from 'react';
import type { TripStatus as TTripStatus } from '../types/types';

type TTripStatusProps = {
  status: TTripStatus;
};

export const TripStatus: FC<TTripStatusProps> = ({ status }) => (
  <span className="inline-block px-2 py-1 capitalize rounded bg-zinc-200 text-gray-700 text-xs font-medium">
    {status}
  </span>
);
