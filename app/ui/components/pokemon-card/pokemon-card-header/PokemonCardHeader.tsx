import { TPokemon } from '@/app/ui';
import React ,{ useMemo } from 'react';
import { joinClass ,normalizedName } from '@/app/utils';
import { Text } from '@/app/ds';
import PokemonCardTypes from './pokemon-card-types';

import type { TAlign } from '../types';

type PokemonCardHeaderProps = { 
 name?: string;
 align: TAlign;
 types?: TPokemon['types'];
 displayName: string;
}

const PokemonCardHeader = ({
  name,
  align,
  types = [],
  displayName
}: PokemonCardHeaderProps ) => {

  const displaySubName = name && name !== displayName ?
    name :
    undefined;

  const headerClassName = useMemo(() => {
    const classNames = [
      'flex' ,
      'space-y-1' ,
    ];
    if (align === 'HORIZONTAL') {
      classNames.push('flex-col');
      classNames.push('gap-2');
    }
    if (align === 'VERTICAL') {
      classNames.push('items-center');
      classNames.push('justify-between');
    }
    return joinClass(classNames);
  } ,[align]);
  
  return (
    <div className={headerClassName}>
      <Text
        as="h3"
        size="3xl"
        tracking="tight"
        leading="none"
        className="font-black"
      >
        { normalizedName(displayName) }
        { displaySubName && (
          <Text
            as="p"
            size="sm"
            className="font-medium text-slate-500">
            ({ normalizedName(displaySubName) })
          </Text>
        ) }
      </Text>
      <PokemonCardTypes types={types}/>
    </div>
  );
};
export default PokemonCardHeader;