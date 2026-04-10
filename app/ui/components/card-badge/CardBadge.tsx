import { BadgeProps } from '@/app/ds';
import { Badge } from '@/app/ds';
import React from 'react';

type CardBadgeProps = {
  title: string;
  badges: Array<Omit<BadgeProps, 'children'> & { id: string; name: string; }>;
  randomColors?: boolean;
}

const CardBadge = ({
  title,
  badges,
  randomColors = false,
}: CardBadgeProps) => {
  return (
    <article className='rounded-2xl border border-slate-200/60 bg-white p-5 shadow-sm'>
      <h2 className='mb-3 text-sm font-bold uppercase tracking-widest text-slate-400'>
        {title}
      </h2>
      <div className='flex flex-wrap gap-2'>
        {badges.map((badge) => (
          <Badge
            key={badge.id}
            size="lg"
            random={randomColors}
            style={randomColors ? {} : badge.style}
          >
            {badge.name}
          </Badge>
        ))}
      </div>
    </article>
  );
};

export default CardBadge;