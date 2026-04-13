'use client';

import React from 'react';
import { useParams } from 'next/navigation';

import usePokedexDetail
  from '@/app/ui/features/pokedex/detail/usePokedexDetail';
import { DetailPokemon } from '@/app/ui';

const PokedexDetail = () => {
  const params = useParams();
  const pokedexId = params.id as string;

  const { item ,isLoading ,errorMessage } = usePokedexDetail(pokedexId);

  return (
    <DetailPokemon
      hp={ item?.hp }
      wins={ item?.wins }
      maxHp={ item?.max_hp }
      level={ item?.level }
      speed={ item?.speed }
      losses={ item?.losses }
      attack={ item?.attack }
      defense={ item?.defense }
      battles={ item?.battles }
      pokemon={ item?.pokemon }
      pageName="Pokédex"
      nickname={ item?.nickname }
      isLoading={ isLoading }
      experience={ item?.experience }
      specialAttack={ item?.special_attack }
      specialDefense={ item?.special_defense }
      errorMessage={ errorMessage }
    />
  );
};

export default React.memo(PokedexDetail);

