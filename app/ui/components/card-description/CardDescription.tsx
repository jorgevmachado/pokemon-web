import { MdFemale ,MdMale } from 'react-icons/md';
import React from 'react';
import { BarChart } from '@/app/ds';

type CardDescriptionProps = {
  hp: number;
  name?: string;
  level: number;
  maxHp: number;
  nickname: string;
};
const CardDescription = ({
  hp ,
  name ,
  level ,
  maxHp ,
  nickname ,
}: CardDescriptionProps) => {
  return (
    <article
      className="rounded-2xl border border-slate-200/60 bg-white p-5 shadow-sm">

      { nickname !== name && (
        <div
          className="mt-4 flex items-center gap-3  border-slate-100 pt-4 text-slate-600">
          <span
            className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Nickname
          </span>
          { nickname }
        </div>
      ) }
      <div
        className="mt-4 flex items-center gap-3  border-slate-100 pt-4 text-slate-600">
        <span
          className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Level
        </span>
        { level }
      </div>
      <div
        className={ `mt-4 flex items-center gap-3 border-slate-100 pt-4 text-slate-600 ${ nickname !==
        name ? 'border-t' : '' }` }>
        <span
          className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Gender
        </span>
        <MdMale size={ 22 } aria-label="Male"/>
        <MdFemale size={ 22 } aria-label="Female"/>
      </div>
      <div
        className="mt-4 flex items-center gap-3 border-t border-slate-100 pt-4 text-slate-600">
        <span
          className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                CURRENT HP
        </span>
        { hp } / { maxHp }
      </div>
      <BarChart
        value={ hp }
        showValue={ false }
        compareValue={ maxHp }
        maxValue={ 100 }
        tone="auto"
        size="md"
        className="col-span-2 px-5 py-3"
      />
    </article>
  );
};
export default CardDescription;