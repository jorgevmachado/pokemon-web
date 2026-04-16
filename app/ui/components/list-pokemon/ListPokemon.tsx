'use client';
import { useRouter } from 'next/navigation';
import { usePokemonTypeList } from '@/app/ui/features/pokemon';
import React ,{ useCallback } from 'react';
import { FiltersProps ,Pagination } from '@/app/ds';
import Filters from '@/app/ds/filters/Filters';

import { ListPokemonProps } from './types';
import PageSummary from './page-summary';
import PageSkeleton from './page-skeleton';
import PageNotFound from './page-not-found';
import PokemonCard from '@/app/ui/components/pokemon-card';

const ListPokemon = ({
  meta ,
  items ,
  filters ,
  pageName ,
  pageRoute ,
  goToPage ,
  isLoading = false ,
  clearFilters ,
  errorMessage ,
  applyFilters ,
}: ListPokemonProps) => {
  const router = useRouter();
  const { list ,isLoading: isLoadingTypes } = usePokemonTypeList();

  const handleBuildFilters = useCallback((filters: FiltersProps['filters']) => {
    return filters.map((filter) => {
      if (filter.type !== 'autocomplete') {
        return filter;
      }
      return {
        ...filter ,
        options: list.map((type) => ({
          key: type.id ,
          value: type.name ,
        })) ,
        isLoading: isLoadingTypes ,
      };
    });
  } ,[isLoadingTypes ,list]);

  return (
    <section className="mx-auto w-full max-w-6xl space-y-6" aria-label={ `${ pageName } List` }>
      <Filters
        ariaLabel={ `${ pageName } Filters` }
        filters={ handleBuildFilters(filters) }
        onApply={ applyFilters }
        onClear={ clearFilters }
      />

      <PageSkeleton
        show={ !errorMessage && isLoading && items.length === 0 }
        pageName={ pageName }
      />

      <PageNotFound
        show={ !errorMessage && !isLoading && items.length === 0 }
        pageName={ pageName }
      />

      <PageSummary
        meta={ meta }
        show={ items.length > 0 }
        isLoading={ isLoading }
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        { items.map((item) => (
          <PokemonCard
            key={ item.id }
            pokemon={ item.pokemon }
            registry={ item.registry }
            onClick={ () => router.push(`${ pageRoute }/${ item.id }`) }
          />
        )) }
      </div>


      <Pagination
        className="pt-1"
        currentPage={ meta.current_page }
        totalPages={ meta.total_pages }
        isLoading={ isLoading }
        onPageChange={ goToPage }
        ariaLabel={ `${ pageName } pagination` }
      />

    </section>
  );
};
export default ListPokemon;