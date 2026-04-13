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
  
  const levelDescription = useMemo(() => {
    const result = {
      label: 'Level' ,
      value: 0,
      hasValue: false ,
    };
    
    if (level !== undefined) {
      result.value = level;
      result.hasValue = true;
    }
    return result;
  }, [level]);

  const hpDescription = useMemo(() => {
    const result = {
      label: 'CURRENT HP' ,
      value: 0,
      hasValue: false ,
      maxValue: maxHp ? 100 : undefined ,
      valueLabel: hpLabel ,
      compareValue: maxHp ,
    };

    if (hp !== undefined) {
      result.value = hp;
      result.hasValue = true;
    }
    return result;
  }, [hp, hpLabel, maxHp]);
  
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

      { levelDescription.hasValue && (
        <div
          className="mt-4 flex items-center gap-3  border-slate-100 pt-4 text-slate-600">
          <span
            className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            {levelDescription.label}
          </span>
          {levelDescription.value}
        </div>
      )}
      
      <div
        className={ `mt-4 flex items-center gap-3 border-slate-100 pt-4 text-slate-600 ${ nickname !== name ? 'border-t' : '' }` }>
        <span
          className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Gender
        </span>
        <MdMale size={ 22 } aria-label="Male"/>
        <MdFemale size={ 22 } aria-label="Female"/>
      </div>

      { hpDescription.hasValue && (
        <>
          <div className="mt-4 flex items-center gap-3 border-t border-slate-100 pt-4 text-slate-600">
            <span
              className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              { hpDescription.label }
            </span>
            { hpDescription.valueLabel }
          </div>
          <BarChart
            value={ hpDescription.value }
            showValue={ false }
            compareValue={ hpDescription.compareValue }
            maxValue={ hpDescription.maxValue }
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