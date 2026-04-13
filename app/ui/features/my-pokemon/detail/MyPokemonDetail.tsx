'use client';

import React from 'react';
import { useParams } from 'next/navigation';

import useMyPokemonDetail
  from '@/app/ui/features/my-pokemon/detail/useMyPokemonDetail';
import { DetailPokemon } from '@/app/ui/components';

const MyPokemonDetail = () => {
  const params = useParams();
  const myPokemonId = params.id as string;

  const { item ,isLoading ,errorMessage } = useMyPokemonDetail(myPokemonId);

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
      pageName="My Pokémon"
      nickname={ item?.nickname }
      isLoading={ isLoading }
      experience={ item?.experience }
      specialAttack={ item?.special_attack }
      specialDefense={ item?.special_defense }
      errorMessage={ errorMessage }
    />
  );
};

export default React.memo(MyPokemonDetail);

