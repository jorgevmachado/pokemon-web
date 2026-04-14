'use client';

import type { FiltersProps } from '@/app/ds';
import usePaginatedList from '@/app/ui/features/shared/list/usePaginatedList';

import type { PokedexFilters, TPokedex, UsePokedexListResult } from '../types';

const INITIAL_FILTERS: PokedexFilters = {
  type: '',
  nickname: '',
  order: '',
};

const INITIAL_INPUT_FILTERS: FiltersProps['filters'] = [
  {
    label: 'TYPE',
    type: 'autocomplete',
    name: 'type',
    value: '',
    placeholder: 'Select Type',
  },
  {
    label: 'NAME',
    type: 'text',
    name: 'nickname',
    value: '',
    placeholder: 'Search by name',
  },
  {
    label: 'ORDER',
    type: 'text',
    name: 'order',
    value: '',
    placeholder: 'Search by order',
  },
];

const usePokedexList = (): UsePokedexListResult => {
  return usePaginatedList<TPokedex, PokedexFilters>({
    endpoint: '/api/pokedex',
    initialFilters: INITIAL_FILTERS,
    initialInputFilters: INITIAL_INPUT_FILTERS,
    fetchErrorMessage: 'Could not fetch Pokédex entries.',
    normalizeFilters: (nextFilters) => ({
      type: nextFilters?.type?.trim(),
      nickname: nextFilters?.nickname?.trim(),
      order: nextFilters?.order?.trim(),
    }),
  });
};

export default usePokedexList;
