import React, { FC } from 'react';
import cx from 'classnames';

type TAiChatSheetMessageProps = {
  id: string;
  content: string;
  role: 'user' | 'assistant';
};

export const AiChatSheetMessage: FC<TAiChatSheetMessageProps> = ({ id, content, role }) => (
  <div
    key={id}
    className={cx('flex', {
      'justify-end': role === 'user',
      'justify-start': role === 'assistant',
    })}
  >
    <div
      className={cx('rounded-md py-2', {
        'px-4 bg-zinc-500 text-white': role === 'user',
      })}
    >
      <p className="text-sm whitespace-pre-wrap leading-6">{content}</p>
    </div>
  </div>
);
