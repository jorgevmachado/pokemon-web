import React from 'react';
import { CardTagProps ,CardTagTone } from '@/app/ui/components/card/tag/types';
import { joinClass } from '@/app/utils';


const badgeToneClassNameByTone: Record<CardTagTone ,string> = {
  primary: 'bg-emerald-400 text-white' ,
  secondary: 'bg-violet-400 text-white' ,
  info: 'bg-sky-400 text-white' ,
  warning: 'bg-amber-400 text-slate-900' ,
  neutral: 'bg-slate-200 text-slate-700' ,
};

const CardTag = ({
  name,
  tone,
  style,
}: CardTagProps) => {

  const classNameList = joinClass([
    'inline-flex' ,
    'min-w-20' ,
    'items-center' ,
    'justify-center' ,
    'rounded-md' ,
    'px-3' ,
    'py-1' ,
    'text-xs' ,
    'font-semibold' ,
    tone && badgeToneClassNameByTone[tone] ,
  ]);

  return (
    <span
      style={ style }
      className={ classNameList }
    >
      { name }
    </span>
  );
};

export default React.memo(CardTag);