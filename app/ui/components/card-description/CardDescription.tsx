import { MdFemale ,MdMale } from 'react-icons/md';
import React from 'react';
import { clampPercentage } from '@/app/utils';

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
  nickname,
}: CardDescriptionProps) => {
  const hpPct = clampPercentage(hp ,maxHp);
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
      <div className="col-span-2  px-5 py-3">
        <div className="h-2.5 overflow-hidden rounded-full bg-white/30">
          <div
            className="h-full rounded-full bg-amber-300 transition-all duration-700"
            style={ { width: `${ hpPct }%` } }
          />
        </div>
      </div>
    </article>
  );
};
export default CardDescription;