'use client';

import React from 'react';

import { POKEDEX_COPY } from '../../constants';
import type { TPokedex } from '../../types';
import PokedexCardImage from '@/app/ui/features/pokedex/list/card/image';
import { joinClass } from '@/app/utils';
import PokedexCardTag from '@/app/ui/features/pokedex/list/card/tags';

type PokedexCardProps = {
  pokedex: TPokedex;
};

const formatPokemonNumber = (order?: number): string => {
  const safeOrder = typeof order === 'number' && Number.isFinite(order) ?
    Math.max(0 ,order) :
    0;

  return `${ POKEDEX_COPY.numberPrefix } ${ safeOrder.toString().
    padStart(4 ,'0') }`;
};

const PokedexCard = ({ pokedex }: PokedexCardProps) => {
  const pokemon = pokedex.pokemon;
  const displayName = pokedex.nickname || pokemon.name ||
    POKEDEX_COPY.fallbackName;
  const speciesName = pokemon.name && pokemon.name !== displayName ?
    pokemon.name :
    null;

  return (
    <article
      className="group rounded-[1.75rem] border border-slate-200/80 bg-white/95 p-4 shadow-[0_18px_45px_-28px_rgba(15,23,42,0.34)] transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_24px_60px_-30px_rgba(37,99,235,0.28)]">
      <PokedexCardImage
        id={ pokemon.id }
        image={ pokemon.image }
        discovered={ pokedex.discovered }
        displayName={ displayName }
        external_image={ pokemon.external_image }
      />

      <div className="space-y-3 px-1 pb-1 pt-4">
        <p
          className="text-sm font-extrabold uppercase tracking-[0.16em] text-slate-400">
          { formatPokemonNumber(pokemon.order) }
        </p>

        <div className="space-y-1">
          <h3 className={ joinClass([
            'wrap-break-word' ,
            'text-[2rem]' ,
            'font-black' ,
            'leading-none' ,
            'tracking-tight' ,
            pokedex.discovered ? 'text-slate-800' : 'text-slate-400' ,
          ]) }>
            { displayName }
          </h3>
          { speciesName ?
            <p
              className="text-sm font-medium text-slate-500">{ speciesName }</p> :
            null }
        </div>

        <PokedexCardTag
          types={ pokemon.types }
          discovered={ pokedex.discovered }
        />
      </div>
    </article>
  );
};

export default React.memo(PokedexCard);

