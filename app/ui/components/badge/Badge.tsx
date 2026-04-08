import React ,{ useMemo } from 'react';
import { joinClass ,normalizedName } from '@/app/utils';
import { CardTagTone } from '@/app/ui/components/card/tag';
import { BadgeProps } from '@/app/ui/components/badge/types';

const badgeToneClassNameByTone: Record<CardTagTone ,string> = {
  primary: 'bg-emerald-400 text-white' ,
  secondary: 'bg-violet-400 text-white' ,
  info: 'bg-sky-400 text-white' ,
  warning: 'bg-amber-400 text-slate-900' ,
  neutral: 'bg-slate-200 text-slate-700' ,
};

const badgeTones = Object.keys(badgeToneClassNameByTone) as Array<CardTagTone>;
let availableBadgeTones: Array<CardTagTone> = [];

const shuffle = <T ,>(items: Array<T>): Array<T> => {
  const shuffledItems = [...items];

  for (let index = shuffledItems.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    const currentItem = shuffledItems[index];

    shuffledItems[index] = shuffledItems[randomIndex];
    shuffledItems[randomIndex] = currentItem;
  }

  return shuffledItems;
};

const getNextRandomTone = (): CardTagTone => {
  if (availableBadgeTones.length === 0) {
    availableBadgeTones = shuffle(badgeTones);
  }

  return availableBadgeTones.pop() as CardTagTone;
};

const Badge = ({
  name,
  textColor,
  backgroundColor
}: BadgeProps) => {
  const hasStyle = textColor || backgroundColor;
  
  const style = useMemo(() => {
    if (!hasStyle) {
      return {};
    }
    return {
      color: textColor,
      backgroundColor: backgroundColor,
    };
  }, [hasStyle, textColor, backgroundColor]);

  const randomBadgeTone = (): string => {
    const randomTone = getNextRandomTone();
    return badgeToneClassNameByTone[randomTone];
  };

  const randomToneClassName = useMemo(() => {
    if (hasStyle) {
      return '';
    }

    return randomBadgeTone();
  }, [hasStyle]);

  const className = joinClass([
    'inline-flex' ,
    'min-w-24' ,
    'items-center' ,
    'justify-center' ,
    'rounded-lg' ,
    'px-4' ,
    'py-1.5' ,
    'text-sm' ,
    'font-semibold' ,
    'shadow-sm' ,
    !hasStyle && randomToneClassName,
  ]);
  
  return (
    <span
      className={ className }
      style={style}
    >
      {normalizedName(name)}
    </span>
  );
};

export default Badge;