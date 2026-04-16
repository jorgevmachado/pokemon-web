'use client';

import React from 'react';
import usePokedexList from './usePokedexList';
import { NewListPokemon } from '@/app/ui';

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
    <NewListPokemon
      meta={ meta }
      items={ items.map((item) => ({
        id: item.id ,
        pokemon: item.pokemon,
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

