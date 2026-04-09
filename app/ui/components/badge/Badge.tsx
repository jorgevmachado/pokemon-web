import React ,{ useMemo } from 'react';
import { joinClass } from '@/app/utils';
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
  name ,
  icon ,
  type = 'style' ,
  font = 'semibold' ,
  shadow ,
  rounded = 'lg' ,
  textColor ,
  backgroundColor,
}: BadgeProps) => {
  const isTypeStyle = type === 'style';
  const hasColors = textColor || backgroundColor;

  const style = useMemo(() => {
    if (!hasColors && !isTypeStyle) {
      return {};
    }
    return {
      color: textColor ,
      backgroundColor: backgroundColor ,
    };
  } ,[hasColors ,isTypeStyle ,textColor ,backgroundColor]);

  const randomBadgeTone = (): string => {
    const randomTone = getNextRandomTone();
    return badgeToneClassNameByTone[randomTone];
  };

  const randomToneClassName = useMemo(() => {
    if (hasColors) {
      return '';
    }

    return randomBadgeTone();
  } ,[hasColors]);

  const className = useMemo(() => {
    const classNames: Array<string> = [
      'inline-flex' ,
      'items-center' ,
      'py-1.5' ,
      'px-3' ,
      `font-${ font }` ,
      `rounded-${ rounded }`,
    ];

    if (type === 'class' && backgroundColor) {
      classNames.push(backgroundColor);
    }

    if (type === 'class' && textColor) {
      classNames.push(textColor);
    }

    if (!backgroundColor && !textColor) {
      classNames.push(randomToneClassName);
    }

    if (icon) {
      classNames.push('gap-2');
    }

    if (shadow) {
      classNames.push(`shadow-${ shadow }`);
    }

    return joinClass(classNames);
  } ,[
    font ,
    rounded ,
    type ,
    backgroundColor ,
    textColor ,
    icon ,
    shadow ,
    randomToneClassName]);

  return (
    <span
      className={ className }
      style={ style }
    >
      { icon }
      { name }
    </span>
  );
};

export default Badge;