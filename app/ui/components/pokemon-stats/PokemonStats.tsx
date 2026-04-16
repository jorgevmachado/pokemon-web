import { PokemonStatsProps, TStatEntry } from './types';

import React ,{ useMemo } from 'react';
import { BarChart ,Card ,Text } from '@/app/ds';
import { joinClass } from '@/app/utils';

const PokemonStats = ({
  hp = 0,
  maxHp ,
  title ,
  speed = 0,
  attack = 0,
  defense = 0,
  withBorder ,
  specialAttack = 0,
  specialDefense = 0,
}: PokemonStatsProps) => {
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

  const barChartClassName = useMemo(() => {
    const classNames= [
      'space-y-3'
    ];
    if (title) {
      classNames.push('mt-6');
    }
    return joinClass(classNames);
  }, [title]);

  return (
    <Card variant={withBorder ? 'elevated' : 'none'} shadow={withBorder ? 'sm' : 'none'}>
      {title && (
        <Text
          size="sm"
          color="text-slate-400"
          weight="bold"
          tracking="widest"
          transform="uppercase"
          className="mb-4">
          { title }
        </Text>
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
    </Card>
  );
};
export default PokemonStats;