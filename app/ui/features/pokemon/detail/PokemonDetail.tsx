'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { DetailPokemon } from '@/app/ui/components';
import usePokemonDetail
  from '@/app/ui/features/pokemon/detail/usePokemonDetail';

const PokemonDetail = () => {
  const params = useParams();
  const pokemonId = params.id as string;

  const { item ,isLoading ,errorMessage } = usePokemonDetail(pokemonId);

  return (
    <DetailPokemon
      maxHp={item?.hp}
      pokemon={ item }
      pageName="Pokémon"
      isLoading={ isLoading }
      errorMessage={ errorMessage }
    />
  );
};

export default React.memo(PokemonDetail);

