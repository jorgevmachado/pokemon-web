import { MdFemale ,MdMale } from 'react-icons/md';
import React ,{ useMemo } from 'react';
import { BarChart } from '@/app/ds';

type CardDescriptionProps = {
  hp?: number;
  name?: string;
  level?: number;
  maxHp?: number;
  nickname?: string;
};
const CardDescription = ({
  hp ,
  name ,
  level ,
  maxHp ,
  nickname ,
}: CardDescriptionProps) => {
  
  const hpLabel = useMemo(() => {
    if (hp && maxHp) {
      return `${hp} / ${maxHp}`;
    }
    return hp;
  }, [hp, maxHp]);
  
  return (
    <article
      className="rounded-2xl border border-slate-200/60 bg-white p-5 shadow-sm">

      { nickname && nickname !== name && (
        <div
          className="mt-4 flex items-center gap-3  border-slate-100 pt-4 text-slate-600">
          <span
            className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Nickname
          </span>
          { nickname }
        </div>
      ) }
      { level && (
        <div
          className="mt-4 flex items-center gap-3  border-slate-100 pt-4 text-slate-600">
          <span
            className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Level
          </span>
          { level }
        </div>
      )}
      
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
      { hp && (
        <>
          <div className="mt-4 flex items-center gap-3 border-t border-slate-100 pt-4 text-slate-600">
            <span
              className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                CURRENT HP
            </span>
            { hpLabel }
          </div>
          <BarChart
            value={ hp }
            showValue={ false }
            compareValue={ maxHp }
            maxValue={ maxHp ? 100 : undefined }
            tone="auto"
            size="md"
            className="col-span-2 px-5 py-3"
          />
        </>
      )}
      
    </article>
  );
};
export default CardDescription;