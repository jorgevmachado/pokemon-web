'use client';

import React from 'react';

import { ListPokemon } from '@/app/ui/components';
import usePokemonList from './usePokemonList';

const PokemonList = () => {
  const {
    items ,
    meta ,
    isLoading ,
    errorMessage ,
    inputFilters ,
    goToPage ,
    applyInputFilters ,
    clearInputFilters ,
  } = usePokemonList();

  return (
    <ListPokemon
      meta={ meta }
      items={ items.map((item) => ({
        id: item.id ,
        name: item.name ,
        types: item.types ,
        order: item.order ,
        image: item.image ,
        showInfo: item.status === 'COMPLETE' ,
        nickname: item.name ,
        externalImage: item.external_image ,
      })) }
      filters={ inputFilters }
      pageName="Pokémon"
      pageRoute="/pokemon"
      goToPage={ goToPage }
      showType="STATUS"
      isLoading={ isLoading }
      errorMessage={ errorMessage }
      clearFilters={ clearInputFilters }
      applyFilters={ applyInputFilters }
    />
  );
};

export default React.memo(PokemonList);

