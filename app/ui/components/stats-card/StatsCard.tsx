import React ,{ useMemo } from 'react';
import {
  StatsCardProps ,
  TStatEntry ,
} from '@/app/ui/components/stats-card/types';
import { BarChart } from '@/app/ds';
import { joinClass } from '@/app/utils';

const StatsCard = ({
  hp ,
  speed ,
  maxHp ,
  title,
  attack ,
  defense ,
  withBorder = true,
  specialAttack ,
  specialDefense ,
}: StatsCardProps) => {
  const statEntries: Array<TStatEntry> = useMemo(() => {
    return [
      {
        key: 'hp' ,
        label: 'HP' ,
        value: hp ,
        compareValue: maxHp ,
        maxValue: 100,
      } ,
      { key: 'speed' ,label: 'Speed' ,value: speed } ,
      { key: 'attack' ,label: 'Attack' ,value: attack } ,
      { key: 'defense' ,label: 'Defense' ,value: defense } ,
      { key: 'sp-atk' ,label: 'Sp. Attack' ,value: specialAttack } ,
      { key: 'sp-def' ,label: 'Sp. Defense' ,value: specialDefense } ,
    ];
  } ,[attack ,defense ,hp ,maxHp ,specialAttack ,specialDefense ,speed]);
  
  const className = useMemo(() => {
    const classNames= [
      'bg-white',
    ];
    if (withBorder) {
      classNames.push('p-5');
      classNames.push('rounded-2xl');
      classNames.push('border');
      classNames.push('border-slate-200/60');
      classNames.push('shadow-sm');
    }
    return joinClass(classNames);
  }, [withBorder]);
  
  
  const barChartClassName = useMemo(() => {
    const classNames= [
      'space-y-3'
    ];
    if (!title) {
      classNames.push('mt-6');
    }
    return joinClass(classNames);
  }, [title]);
  
  return (
    <article
      className={className}>
      {title && (
        <h2
          className="mb-4 text-sm font-bold uppercase tracking-widest text-slate-400">
          { title }
        </h2>
      )}
      <div className={ barChartClassName }>
        { statEntries.map(({ key ,label ,value ,maxValue ,compareValue }) => (
          <BarChart
            key={key}
            label={ label }
            value={ value }
            compareValue={compareValue}
            maxValue={maxValue}
            tone='auto'
            size='md'
            formatValue={(v) => v}
          />
        )) }
      </div>
    </article>
  );
};

export default React.memo(StatsCard);