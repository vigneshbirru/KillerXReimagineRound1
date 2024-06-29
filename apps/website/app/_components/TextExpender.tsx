'use client';
import { FC } from 'react';
import { useState } from 'react';

interface TextExpenderProps {
  children: string;
}

const TextExpender: FC<TextExpenderProps> = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const displayText = isExpanded
    ? children
    : children.split(' ').slice(0, 40).join(' ') + '...';

  return (
    <span>
      {displayText}{' '}
      <button
        className="text-primary-700 border-b border-primary-700 leading-3 pb-1"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? 'Show less' : 'Show more'}
      </button>
    </span>
  );
};

export default TextExpender;
