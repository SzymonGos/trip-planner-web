import React, { FC } from 'react';

type TReadMoreButtonProps = {
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
};

export const ReadMoreButton: FC<TReadMoreButtonProps> = ({ expanded, setExpanded }) => (
  <button
    className="mt-2 text-sm text-primary font-medium hover:underline focus:outline-none"
    onClick={() => setExpanded(!expanded)}
  >
    {expanded ? 'Show less' : 'Read more'}
  </button>
);
