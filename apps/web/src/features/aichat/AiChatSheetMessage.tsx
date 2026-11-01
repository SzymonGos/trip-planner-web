import React, { FC } from 'react';
import cx from 'classnames';
import ReactMarkdown from 'react-markdown';

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
      <ReactMarkdown
        components={{
          p: ({ children }) => <p className="text-sm whitespace-pre-wrap first:pt-0 pt-4">{children}</p>,
          ul: ({ children }) => <ul className="my-2 list-disc pl-5">{children}</ul>,
          li: ({ children }) => <li className="my-1 leading-6">{children}</li>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  </div>
);
