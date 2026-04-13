'use client';

import React from 'react';

import { ListPokemon } from '@/app/ui/components';
import useMyPokemonList from './useMyPokemonList';

const MyPokemonList = () => {
  const {
    items ,
    meta ,
    isLoading ,
    errorMessage ,
    inputFilters ,
    goToPage ,
    applyInputFilters ,
    clearInputFilters ,
  } = useMyPokemonList();

  return (
    <ListPokemon
      meta={ meta }
      items={ items.map((item) => ({
        id: item.id ,
        name: item.pokemon.name ,
        types: item.pokemon.types ,
        order: item.pokemon.order ,
        image: item.pokemon.image ,
        showInfo: true ,
        nickname: item.nickname ,
        externalImage: item.pokemon.external_image ,
      })) }
      filters={ inputFilters }
      pageName="My Pokémon"
      pageRoute="/my-pokemon"
      goToPage={ goToPage }
      isLoading={ isLoading }
      errorMessage={ errorMessage }
      clearFilters={ clearInputFilters }
      applyFilters={ applyInputFilters }
    />
  );
};

export default React.memo(MyPokemonList);

