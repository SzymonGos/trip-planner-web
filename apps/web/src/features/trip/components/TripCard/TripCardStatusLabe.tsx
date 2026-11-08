import { FC } from 'react';
import cx from 'classnames';
import type { TripStatus } from '../../types/types';

type TripCardStatusLabelProps = {
  status: TripStatus;
};

export const TripCardStatusLabel: FC<TripCardStatusLabelProps> = ({ status }) => (
  <div
    className={cx(
      'absolute top-2 right-2 p-2 text-tp-primary text-xs rounded-md backdrop-blur-sm group-hover:bg-white/90 transition-colors',
      {
        'bg-green-50/20': status === 'COMPLETED',
      },
    )}
  >
    {status}
  </div>
);
