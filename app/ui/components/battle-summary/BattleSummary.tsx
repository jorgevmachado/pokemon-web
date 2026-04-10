import React ,{ useMemo } from 'react';
import { BattleSummaryProps } from './types';
import { joinClass } from '@/app/utils';


const BattleSummary = ({
  wins ,
  title,
  losses ,
  battles ,
  withBorder = true,
  className,
}: BattleSummaryProps) => {
  
  const classNameList = useMemo(() => {
    const classNames= [
      'bg-white',
    ];
    if (withBorder) {
      classNames.push('rounded-2xl');
      classNames.push('border');
      classNames.push('border-slate-200/60');
      classNames.push('p-5');
      classNames.push('shadow-sm');
    }
    if (className) {
      classNames.push(className);
    }
    return joinClass(classNames);
  }, [className, withBorder]);
  return (
    <article
      className={classNameList}>
      {title && (
        <h2
          className="mb-4 text-sm font-bold uppercase tracking-widest text-slate-400">
          { title }
        </h2>
      )}
      <div className="grid grid-cols-3 gap-3">
        <div
          className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-3 text-center">
          <p
            className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
            BATTLES
          </p>
          <p className="mt-1 text-2xl font-bold text-slate-800">{ battles }</p>
        </div>
        <div
          className="rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-3 text-center">
          <p
            className="text-[11px] font-bold uppercase tracking-wide text-emerald-600">
            WINS
          </p>
          <p className="mt-1 text-2xl font-bold text-emerald-700">{ wins }</p>
        </div>
        <div
          className="rounded-xl border border-rose-100 bg-rose-50 px-3 py-3 text-center">
          <p
            className="text-[11px] font-bold uppercase tracking-wide text-rose-500">
            LOSSES
          </p>
          <p className="mt-1 text-2xl font-bold text-rose-700">{ losses }</p>
        </div>
      </div>
    </article>
  );
};

export default BattleSummary;