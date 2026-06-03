import { FC } from 'react';
import { Trip as TTrip } from 'tp-graphql-types';
import cx from 'classnames';

type TripCardStatusLabelProps = {
  status: TTrip['status'];
};

export const TripCardStatusLabel: FC<TripCardStatusLabelProps> = ({ status }) => (
  <div
    className={cx(
      'absolute top-2 right-2 p-2 text-tp-primary text-xs rounded-md backdrop-blur-sm group-hover:bg-white/90 transition-colors',
      {
        // 'bg-tp-gray-100': status === 'planning',
        'bg-green-50/20': status === 'completed',
      },
    )}
  >
    {status}
  </div>
);
