import React ,{ useMemo } from 'react';
import {
  StatsCardProps ,
  TStatEntry ,
} from '@/app/ui/components/stats-card/types';
import BarChart from '@/app/ui/components/bar-chart';

const StatsCard = ({
  hp ,
  speed ,
  title = 'STATS' ,
  attack ,
  defense ,
  special_attack ,
  special_defense ,
}: StatsCardProps) => {
  const statEntries: Array<TStatEntry> = useMemo(() => {
    return [
      { key: 'hp' ,label: 'HP' ,value: hp } ,
      { key: 'speed' ,label: 'Speed' ,value: speed } ,
      { key: 'attack' ,label: 'Attack' ,value: attack } ,
      { key: 'defense' ,label: 'Defense' ,value: defense } ,
      { key: 'sp-atk' ,label: 'Sp. Attack' ,value: special_attack } ,
      { key: 'sp-def' ,label: 'Sp. Defense' ,value: special_defense } ,
    ];
  } ,[attack ,defense ,hp ,special_attack ,special_defense ,speed]);
  return (
    <article
      className="rounded-2xl border border-slate-200/60 bg-white p-5 shadow-sm">
      <h2
        className="mb-4 text-sm font-bold uppercase tracking-widest text-slate-400">
        { title }
      </h2>
      <div className="space-y-3">
        { statEntries.map(({ key ,label ,value }) => (
          <BarChart key={ key } label={ label } value={ value }/>
        )) }
      </div>
    </article>
  );
};

export default React.memo(StatsCard);