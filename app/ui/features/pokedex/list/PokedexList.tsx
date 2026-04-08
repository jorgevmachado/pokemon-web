'use client';

import React ,{ useCallback ,useMemo } from 'react';
import { MdCatchingPokemon } from 'react-icons/md';
import { useRouter } from 'next/navigation';

import { FiltersProps ,InfoCard ,Pagination } from '@/app/ui/components';

import { POKEDEX_COPY } from '../constants';
import type { PokedexFilters as PokedexFiltersProps ,TPokedex } from '../types';
import usePokedexList from '../usePokedexList';
import { TPokemon ,usePokemonTypeList } from '../../pokemon';
import Card from '@/app/ui/components/card';
import { CardTagProps } from '@/app/ui/components/card/tag';
import Filters from '@/app/ui/components/filters';

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
  const router = useRouter();
  const { list ,isLoading: isLoadingTypes } = usePokemonTypeList();

  const pageSummary = useMemo(() => {
    const currentStart = meta.offset + 1;
    const currentEnd = Math.min(meta.offset + meta.limit ,meta.total);

    if (meta.total === 0) {
      return `0 ${ POKEDEX_COPY.pageSummarySuffix }`;
    }

    return `${ currentStart }-${ currentEnd } of ${ meta.total } ${ POKEDEX_COPY.pageSummarySuffix }`;
  } ,[meta.limit ,meta.offset ,meta.total]);

  const tags = useCallback((types: TPokemon['types'] ,discovered: boolean) => {
    if (!discovered) {
      const fallback: CardTagProps = {
        key: 'not_discovered' ,
        tone: 'neutral' ,
        name: 'NOT DISCOVERED' ,
      };
      return [fallback];
    }
    if (types && types.length > 0) {
      return types.map((type) => ({
        key: type.id ,
        name: type.name ,
        style: {
          color: type.text_color ,
          backgroundColor: type.background_color ,
        } ,
      }));
    }
    return [];
  } ,[]);

  const handleBuildFilters = useCallback((filters: FiltersProps['filters']) => {
    return filters.map((filter) => {
      if (filter.type !== 'autocomplete') {
        return filter;
      }
      return {
        ...filter ,
        options: list.map((type) => ({
          key: type.id ,
          value: type.name,
        })) ,
        isLoading: isLoadingTypes ,
      };
    });
  } ,[isLoadingTypes ,list]);

  return (
    <section className="mx-auto w-full max-w-6xl space-y-6"
      aria-label="pokedex-list">
      <Filters
        ariaLabel="Pokedex Filters"
        filters={ handleBuildFilters(inputFilters) }
        onApply={ (item) => applyInputFilters(item as PokedexFiltersProps) }
        onClear={ clearInputFilters }
      />

      { !errorMessage && isLoading && items.length === 0 ? (
        <div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          { Array.from({ length: 8 } ,(_ ,index) => (
            <div
              key={ `pokedex-skeleton-${ index }` }
              className="h-84 animate-pulse rounded-[1.75rem] border border-slate-200/80 bg-white/80"
            />
          )) }
        </div>
      ) : null }

      { !errorMessage && !isLoading && items.length === 0 ? (
        <InfoCard
          icon={ <MdCatchingPokemon size={ 22 }/> }
          variant="yellow"
          title={ POKEDEX_COPY.emptyTitle }
          description={ POKEDEX_COPY.emptyDescription }
        />
      ) : null }

      { items.length > 0 ? (
        <>
          <div className="flex items-center justify-between gap-3">
            <p
              className="text-sm font-medium text-slate-500">{ pageSummary }</p>
            { isLoading ? (
              <p
                className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                { POKEDEX_COPY.updatingLabel }
              </p>
            ) : null }
          </div>

          <div
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            { items.map((pokedex: TPokedex) => (
              <Card
                key={ pokedex.id }
                id={ pokedex.id }
                tags={ tags(pokedex.pokemon.types ,pokedex.discovered) }
                name={ pokedex.pokemon.name }
                order={ pokedex.pokemon.order }
                nickname={ pokedex.nickname }
                image={ {
                  image: pokedex.pokemon.image ,
                  externalImage: pokedex.pokemon.external_image,
                } }
                showInfo={ pokedex.discovered }
                onClick={ !pokedex.discovered ? undefined : (item) => {
                  router.push(`/pokedex/${ item.id }`);
                } }
              />
            )) }
          </div>

          <Pagination
            className="pt-1"
            currentPage={ meta.current_page }
            totalPages={ meta.total_pages }
            isLoading={ isLoading }
            onPageChange={ goToPage }
            ariaLabel="Pokédex pagination"
          />
        </>
      ) : null }
    </section>
  );
};

export default React.memo(PokedexList);

