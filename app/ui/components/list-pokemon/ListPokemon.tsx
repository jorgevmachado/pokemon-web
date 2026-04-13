import { useRouter } from 'next/navigation';
import { TPokemon ,usePokemonTypeList } from '@/app/ui/features/pokemon';
import React ,{ useCallback } from 'react';
import {
  CardProps ,
  CardTagProps ,
  FiltersProps ,
} from '@/app/ui';
import {
  Pagination
} from '@/app/ds';
import Filters from '@/app/ds/filters/Filters';
import Card from '@/app/ui/components/card';
import {
  ListPokemonItem ,
  ListPokemonProps ,TShowItem ,
} from '@/app/ui/components/list-pokemon/types';
import PageSummary from '@/app/ui/components/list-pokemon/page-summary';
import PageSkeleton from '@/app/ui/components/list-pokemon/page-skeleton';
import PageNotFound from '@/app/ui/components/list-pokemon/page-not-found';


const ListPokemon = ({
  meta ,
  items ,
  filters ,
  pageName ,
  pageRoute ,
  goToPage,
  showType = 'DISCOVERED',
  isLoading = false ,
  clearFilters ,
  errorMessage ,
  applyFilters,
}: ListPokemonProps) => {
  const router = useRouter();
  const { list ,isLoading: isLoadingTypes } = usePokemonTypeList();

  const tags = useCallback((
    show: boolean,
    types: TPokemon['types'],
    showType: TShowItem,
  ) => {
    if (!show) {
      const tagFallback: CardTagProps = {
        key: showType === 'DISCOVERED' ? 'not_discovered' : 'incomplete' ,
        tone: 'neutral' ,
        name: showType === 'DISCOVERED' ? 'NOT DISCOVERED' : 'INCOMPLETE' ,
      };
      return [tagFallback];
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
          value: type.name ,
        })) ,
        isLoading: isLoadingTypes ,
      };
    });
  } ,[isLoadingTypes ,list]);

  const buildCardProps = useCallback(({
    id,
    name,
    order,
    types,
    image,
    showInfo = false,
    nickname,
    externalImage
  }: ListPokemonItem) => {
    const cardProps: CardProps = {
      id,
      tags: tags( showInfo, types, showType ),
      type: 'LIST',
      name,
      order: order,
      image: {
        image,
        externalImage
      } ,
      onClick: !showInfo ? undefined :  () => {
        router.push(`${pageRoute}/${ showType === 'DISCOVERED' ? id : name }`);
      },
      nickname: nickname ,
      showInfo: showInfo ,
    };
    return cardProps;
  }, [pageRoute, router, showType, tags]);


  return (
    <section className="mx-auto w-full max-w-6xl space-y-6" aria-label={ `${ pageName } List` }>
      <Filters
        ariaLabel={ `${ pageName } Filters` }
        filters={ handleBuildFilters(filters) }
        onApply={ applyFilters }
        onClear={ clearFilters }
      />

      <PageSkeleton
        show={!errorMessage && isLoading && items.length === 0}
        pageName={ pageName }
      />

      <PageNotFound
        show={!errorMessage && !isLoading && items.length === 0}
        pageName={ pageName }
      />

      <PageSummary
        meta={ meta }
        show={items.length > 0}
        isLoading={ isLoading }
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        { items.map((item) => (
          <Card
            key={ item.id }
            {...buildCardProps(item) }
          />
        ))}
      </div>

      <Pagination
        className="pt-1"
        currentPage={ meta.current_page }
        totalPages={ meta.total_pages }
        isLoading={ isLoading }
        onPageChange={ goToPage }
        ariaLabel={`${pageName} pagination`}
      />

    </section>
  );
};
export default ListPokemon;