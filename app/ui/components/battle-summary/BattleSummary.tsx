import { POKEDEX_COPY } from '@/app/ui/features/pokedex/constants';
import React from 'react';

type BattleSummaryProps = {
  wins: number;
  title?: string;
  losses: number;
  battles: number;
}
const BattleSummary = ({
  wins,
  title = 'BATTLE SUMMARY',
  losses,
  battles,
}: BattleSummaryProps) => {
  return (
    <article className='rounded-2xl border border-slate-200/60 bg-white p-5 shadow-sm'>
      <h2 className='mb-4 text-sm font-bold uppercase tracking-widest text-slate-400'>
        {title}
      </h2>
      <div className='grid grid-cols-3 gap-3'>
        <div className='rounded-xl border border-slate-100 bg-slate-50 px-3 py-3 text-center'>
          <p className='text-[11px] font-bold uppercase tracking-wide text-slate-400'>
            BATTLES
          </p>
          <p className='mt-1 text-2xl font-bold text-slate-800'>{battles}</p>
        </div>
        <div className='rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-3 text-center'>
          <p className='text-[11px] font-bold uppercase tracking-wide text-emerald-600'>
            WINS
          </p>
          <p className='mt-1 text-2xl font-bold text-emerald-700'>{wins}</p>
        </div>
        <div className='rounded-xl border border-rose-100 bg-rose-50 px-3 py-3 text-center'>
          <p className='text-[11px] font-bold uppercase tracking-wide text-rose-500'>
            LOSSES
          </p>
          <p className='mt-1 text-2xl font-bold text-rose-700'>{losses}</p>
        </div>
      </div>
    </article>
  );
};

export default BattleSummary;