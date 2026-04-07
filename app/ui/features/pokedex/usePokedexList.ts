'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { TPaginatedListResponse, TPaginatedMeta } from '@/app/ui/components/pagination/types';
import { useLoading } from '@/app/ui/components/loading';

import type { PokedexFilters, PokedexViewState, TPokedex, UsePokedexListResult } from './types';

const INITIAL_PAGINATION: TPaginatedMeta = {
  total: 0,
  limit: 10,
  offset: 0,
  next_page: undefined,
  previous_page: undefined,
  total_pages: 0,
  current_page: 1,
};

const INITIAL_FILTERS: PokedexFilters = {
  type: '',
  nickname: '',
  order: '',
};

const INITIAL_STATE: PokedexViewState = {
  items: [],
  meta: INITIAL_PAGINATION,
  isLoading: true,
  errorMessage: null,
};

const GENERIC_FETCH_ERROR = 'Could not fetch Pokédex entries.';

const clampPage = (page: number, totalPages: number): number => {
  return Math.min(Math.max(page, 1), Math.max(totalPages, 1));
};

const toQueryString = (page: number, filters: PokedexFilters): string => {
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

const usePokedexList = (): UsePokedexListResult => {
  const [state, setState] = useState<PokedexViewState>(INITIAL_STATE);
  const [filters, setFilters] = useState<PokedexFilters>(INITIAL_FILTERS);
  const requestIdRef = useRef(0);
  const { startContentLoading, stopContentLoading } = useLoading();

  const fetchPage = useCallback(async (page: number, activeFilters: PokedexFilters): Promise<void> => {
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
      const response = await fetch(`/api/pokedex?${queryString}`, {
        method: 'GET',
        cache: 'no-store',
      });

      const json = (await response.json()) as TPaginatedListResponse<TPokedex> | { message?: string };

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

  const applyFilters = useCallback((nextFilters: PokedexFilters) => {
    setFilters({
      type: nextFilters?.type?.trim(),
      nickname: nextFilters?.nickname?.trim(),
      order: nextFilters?.order?.trim(),
    });
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(INITIAL_FILTERS);
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
    goToPage,
    applyFilters,
    clearFilters,
    reload,
  };
};

export default usePokedexList;
