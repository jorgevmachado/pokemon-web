'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { TPaginatedListResponse, TPaginatedMeta } from '@/app/ds/pagination/types';
import { useLoading } from '@/app/ds/loading';

import {
  PokemonFilters as PokemonFiltersProps ,
  PokemonFilters ,PokemonViewState ,TPokemon ,UsePokemonListResult ,
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

const INITIAL_FILTERS: PokemonFilters = {
  name: '',
};

const INITIAL_INPUT_FILTERS: FiltersProps['filters'] = [
  {
    label: 'NAME',
    type: 'text',
    name: 'name',
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

const INITIAL_STATE: PokemonViewState = {
  items: [],
  meta: INITIAL_PAGINATION,
  isLoading: true,
  errorMessage: undefined,
};

const GENERIC_FETCH_ERROR = 'Could not fetch Pokédex entries.';

const clampPage = (page: number, totalPages: number): number => {
  return Math.min(Math.max(page, 1), Math.max(totalPages, 1));
};

const toQueryString = (page: number, filters: PokemonFilters): string => {
  const params = new URLSearchParams({
    page: String(page),
  });

  if (filters.name) {
    params.set('name', filters.name);
  }



  if (filters.order) {
    params.set('order', filters.order);
  }

  return params.toString();
};

const usePokemonList = (): UsePokemonListResult => {
  const [state, setState] = useState<PokemonViewState>(INITIAL_STATE);
  const [filters, setFilters] = useState<PokemonFilters>(INITIAL_FILTERS);
  const [inputFilters, setInputFilters] = useState<FiltersProps['filters']>(INITIAL_INPUT_FILTERS);
  const requestIdRef = useRef(0);
  const { startContentLoading, stopContentLoading } = useLoading();

  const fetchPage = useCallback(async (page: number, activeFilters: PokemonFilters): Promise<void> => {
    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;

    setState((previousState) => ({
      ...previousState,
      isLoading: true,
      errorMessage: undefined,
    }));
    startContentLoading();

    try {
      const queryString = toQueryString(page, activeFilters);
      const response = await fetch(`/api/pokemon?${queryString}`, {
        method: 'GET',
        cache: 'no-store',
      });

      const json = (await response.json()) as TPaginatedListResponse<TPokemon> | { message?: string };

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
        errorMessage: undefined,
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

  const applyFilters = useCallback((nextFilters: PokemonFilters) => {
    setFilters({
      name: nextFilters?.name?.trim(),
      order: nextFilters?.order?.trim(),
    });
  }, []);

  const applyInputFilters = useCallback((nextFilters: PokemonFilters) => {
    setInputFilters((prevState) => {
      return prevState.map((filter) => ({
        ...filter,
        value: nextFilters[filter.name as keyof PokemonFiltersProps] || '',
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

export default usePokemonList;
