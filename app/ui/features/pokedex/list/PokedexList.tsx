'use client';

import React ,{ useMemo } from 'react';
import { MdCatchingPokemon } from 'react-icons/md';

import { InfoCard ,Pagination } from '@/app/ui/components';

import { POKEDEX_COPY } from '../constants';
import type { TPokedex } from '../types';
import usePokedexList from '../usePokedexList';
import { usePokemonTypeList } from '../../pokemon';
import PokedexCard from './card';
import PokedexFilters from './filter/PokedexFilters';

const PokedexList = () => {
  const {
    items ,
    meta ,
    isLoading ,
    errorMessage ,
    filters ,
    goToPage ,
    applyFilters ,
    clearFilters ,
  } = usePokedexList();
  const { list ,isLoading: isLoadingTypes } = usePokemonTypeList();

  const pageSummary = useMemo(() => {
    const currentStart = meta.offset + 1;
    const currentEnd = Math.min(meta.offset + meta.limit ,meta.total);

    if (meta.total === 0) {
      return `0 ${ POKEDEX_COPY.pageSummarySuffix }`;
    }

    return `${ currentStart }-${ currentEnd } of ${ meta.total } ${ POKEDEX_COPY.pageSummarySuffix }`;
  } ,[meta.limit ,meta.offset ,meta.total]);

  return (
    <section className="mx-auto w-full max-w-6xl space-y-6"
             aria-label="pokedex-list">
      <PokedexFilters
        filters={ filters }
        typeOptions={ list }
        isLoadingTypes={ isLoadingTypes }
        onApply={ applyFilters }
        onClear={ clearFilters }
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
              <PokedexCard key={ pokedex.id } pokedex={ pokedex }/>
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

