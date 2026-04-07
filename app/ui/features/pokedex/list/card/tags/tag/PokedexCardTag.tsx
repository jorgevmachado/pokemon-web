import React from 'react';
import { joinClass } from '@/app/utils';
import {
  CardTagTone ,
  PokedexCardTagProps ,
} from '@/app/ui/features/pokedex/list/card/tags/tag/types';

const badgeToneClassNameByTone: Record<CardTagTone ,string> = {
  primary: 'bg-emerald-400 text-white' ,
  secondary: 'bg-violet-400 text-white' ,
  info: 'bg-sky-400 text-white' ,
  warning: 'bg-amber-400 text-slate-900' ,
  neutral: 'bg-slate-200 text-slate-700' ,
};

const PokedexCardTag = ({
  name ,
  tone ,
  style,
}: PokedexCardTagProps) => {

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

export default React.memo(PokedexCardTag);