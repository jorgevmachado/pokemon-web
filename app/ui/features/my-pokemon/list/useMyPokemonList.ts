'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { TPaginatedListResponse, TPaginatedMeta } from '@/app/ui/components/pagination/types';
import { useLoading } from '@/app/ui/components/loading';

import type {
  MyPokemonFilters as MyPokemonFiltersProps ,
  MyPokemonFilters ,MyPokemonViewState ,TMyPokemon ,UseMyPokemonListResult,
} from '../types';
import { FiltersProps } from '@/app/ui';

const INITIAL_PAGINATION: TPaginatedMeta = {
  total: 0,
  limit: 10,
  offset: 0,
  next_page: undefined,
  previous_page: undefined,
  total_pages: 0,
  current_page: 1,
};

const INITIAL_FILTERS: MyPokemonFilters = {
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
  }
];

const INITIAL_STATE: MyPokemonViewState = {
  items: [],
  meta: INITIAL_PAGINATION,
  isLoading: true,
  errorMessage: null,
};

const GENERIC_FETCH_ERROR = 'Could not fetch My Pokemons entries.';

const clampPage = (page: number, totalPages: number): number => {
  return Math.min(Math.max(page, 1), Math.max(totalPages, 1));
};

const toQueryString = (page: number, filters: MyPokemonFilters): string => {
  const params = new URLSearchParams({
    page: String(page),
  });

  if (filters.type) {
    params.set('type', filters.type);
  }

  if (filters.nickname) {
    params.set('nickname', filters.nickname);
  }

  if (filters.order) {
    params.set('order', filters.order);
  }

  return params.toString();
};

const usePokedexList = (): UseMyPokemonListResult => {
  const [state, setState] = useState<MyPokemonViewState>(INITIAL_STATE);
  const [filters, setFilters] = useState<MyPokemonFilters>(INITIAL_FILTERS);
  const [inputFilters, setInputFilters] = useState<FiltersProps['filters']>(INITIAL_INPUT_FILTERS);
  const requestIdRef = useRef(0);
  const { startContentLoading, stopContentLoading } = useLoading();

  const fetchPage = useCallback(async (page: number, activeFilters: MyPokemonFilters): Promise<void> => {
    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;

    setState((previousState) => ({
      ...previousState,
      isLoading: true,
      errorMessage: null,
    }));
    startContentLoading();

    try {
      const queryString = toQueryString(page, activeFilters);
      const response = await fetch(`/api/my-pokemon?${queryString}`, {
        method: 'GET',
        cache: 'no-store',
      });

      const json = (await response.json()) as TPaginatedListResponse<TMyPokemon> | { message?: string };

      if (requestIdRef.current !== requestId) {
        return;
      }

      if (!response.ok || !('items' in json) || !('meta' in json)) {
        const message = 'message' in json && json.message ? json.message : GENERIC_FETCH_ERROR;

        setState((previousState) => ({
          ...previousState,
          isLoading: false,
          errorMessage: message,
        }));

        return;
      }

      const normalizedPage = clampPage(json.meta.current_page, json.meta.total_pages);

      setState({
        items: json.items,
        meta: {
          ...json.meta,
          current_page: normalizedPage,
        },
        isLoading: false,
        errorMessage: null,
      });
    } catch (error) {
      if (requestIdRef.current !== requestId) {
        return;
      }

      const errorMessage = error instanceof Error && error.message ? error.message : GENERIC_FETCH_ERROR;

      setState((previousState) => ({
        ...previousState,
        isLoading: false,
        errorMessage,
      }));
    } finally {
      stopContentLoading();
    }
  }, [startContentLoading, stopContentLoading]);

  useEffect(() => {
    void fetchPage(1, filters);
  }, [fetchPage, filters]);

  const goToPage = useCallback((page: number) => {
    const targetPage = clampPage(page, state.meta.total_pages);

    if (targetPage === state.meta.current_page || state.isLoading) {
      return;
    }

    void fetchPage(targetPage, filters);
  }, [fetchPage, filters, state.isLoading, state.meta.current_page, state.meta.total_pages]);

  const applyFilters = useCallback((nextFilters: MyPokemonFilters) => {
    setFilters({
      type: nextFilters?.type?.trim(),
      nickname: nextFilters?.nickname?.trim(),
      order: nextFilters?.order?.trim(),
    });
  }, []);

  const applyInputFilters = useCallback((nextFilters: MyPokemonFilters) => {
    setInputFilters((prevState) => {
      return prevState.map((filter) => ({
        ...filter,
        value: nextFilters[filter.name as keyof MyPokemonFiltersProps] || '',
      }));
    });
    applyFilters(nextFilters);
  }, [applyFilters]);

  const clearFilters = useCallback(() => {
    setFilters(INITIAL_FILTERS);
  }, []);

  const clearInputFilters = useCallback(() => {
    setInputFilters((prevState) => {
      return prevState.map((filter) => ({
        ...filter,
        value: '',
      }));
    });
    clearFilters();
  },[clearFilters]);

  const updateInputFilters = useCallback((inputFilters: FiltersProps['filters']) => {
    setInputFilters(inputFilters);
  }, []);

  const reload = useCallback(() => {
    void fetchPage(state.meta.current_page, filters);
  }, [fetchPage, filters, state.meta.current_page]);

  return {
    items: state.items,
    meta: state.meta,
    isLoading: state.isLoading,
    errorMessage: state.errorMessage,
    filters,
    inputFilters,
    goToPage,
    applyFilters,
    clearFilters,
    reload,
    applyInputFilters,
    clearInputFilters,
    updateInputFilters,
  };
};

export default usePokedexList;
