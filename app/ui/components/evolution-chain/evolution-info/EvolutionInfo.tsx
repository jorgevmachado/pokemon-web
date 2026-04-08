import type {
  TPokemonEvolution ,
  TPokemonType,
} from '@/app/ui/features/pokemon';
import { POKEDEX_FALLBACK_IMAGE } from '@/app/ui/features/pokedex/constants';
import Image from 'next/image';
import { formatNumberPrefix ,normalizedName } from '@/app/utils';
import React from 'react';

type EvolutionInfoProps = {
  evolution: TPokemonEvolution;
}
const EvolutionInfo = ({
  evolution
}: EvolutionInfoProps) => {
  const name = normalizedName(evolution.name);
  const imageSource = evolution.external_image || evolution.image || POKEDEX_FALLBACK_IMAGE;

  return (
    <div className='flex flex-col items-center gap-2'>
      <div className='flex h-28 w-28 items-center justify-center rounded-full border-4 border-white/60 bg-white/20 p-2 shadow-lg sm:h-36 sm:w-36'>
        <Image
          src={imageSource}
          alt={`${name} artwork`}
          width={120}
          height={120}
          unoptimized
          className='h-full w-full object-contain'
        />
      </div>
      <p className='text-center text-sm font-bold text-white'>
        {name}{' '}
        <span className='font-normal text-slate-300'>
          {formatNumberPrefix({ value: evolution.order })}
        </span>
      </p>
      {evolution.types && evolution.types.length > 0 && (
        <div className='flex flex-wrap justify-center gap-1'>
          {evolution.types.map((type: TPokemonType) => (
            <span
              key={type.id}
              className='inline-flex rounded px-2 py-0.5 text-xs font-semibold'
              style={{ color: type.text_color, backgroundColor: type.background_color }}
            >
              {normalizedName(type.name)}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
export default EvolutionInfo;