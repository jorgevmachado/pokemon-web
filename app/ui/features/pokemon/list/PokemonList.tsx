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
        pokemon: item ,
      })) }
      filters={ inputFilters }
      pageName="Pokémon"
      pageRoute="/pokemon"
      goToPage={ goToPage }
      isLoading={ isLoading }
      errorMessage={ errorMessage }
      clearFilters={ clearInputFilters }
      applyFilters={ applyInputFilters }
    />
  );
};

export default React.memo(PokemonList);

