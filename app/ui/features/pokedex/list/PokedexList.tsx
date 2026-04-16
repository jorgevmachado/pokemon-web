'use client';

import React from 'react';
import usePokedexList from './usePokedexList';
import { ListPokemon } from '@/app/ui';

const PokedexList = () => {
  const {
    items ,
    meta ,
    isLoading ,
    errorMessage ,
    inputFilters ,
    goToPage ,
    applyInputFilters ,
    clearInputFilters ,
  } = usePokedexList();

  return (
    <ListPokemon
      meta={ meta }
      items={ items.map((item) => ({
        id: item.id ,
        registry: item,
      })) }
      filters={ inputFilters }
      pageName="Pokédex"
      pageRoute="/pokedex"
      goToPage={ goToPage }
      isLoading={ isLoading }
      errorMessage={ errorMessage }
      clearFilters={ clearInputFilters }
      applyFilters={ applyInputFilters }
    />
  );
};

export default React.memo(PokedexList);

