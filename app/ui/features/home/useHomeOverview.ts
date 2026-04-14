'use client';

import { useCallback, useState } from 'react';

import { TPokedex } from '@/app/ui/features/pokedex/types';

import { HOME_COPY } from './constants';
import {
  ApiErrorResponse ,
  FetchPokemonsParams ,
  HomeViewState ,
  UseHomeOverviewResult ,
} from './types';
import { useLoading } from '@/app/ds';
import { InitializeParams ,TPokemon ,TTrainer } from '@/app/ui';



const INITIAL_STATE: HomeViewState = {
  wildEncounter: undefined,
  isFindingWild: false,
  isEncounterOpen: false,
  errorMessage: undefined,
  initialPokemons: undefined,
  isFindingInitialPokemons: false,
  isInitializeAdventure: false,
};

const isWildEncounter = (value: unknown): value is TPokedex => {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const data = value as Record<string, unknown>;

  return typeof data.id === 'string' && typeof data.pokemon === 'object' && data.pokemon !== null;
};

const readApiMessage = (value: unknown, fallback: string): string => {
  if (!value || typeof value !== 'object') {
    return fallback;
  }

  const data = value as ApiErrorResponse;

  return data.message || fallback;
};

const useHomeOverview = (): UseHomeOverviewResult => {
  const [state, setState] = useState<HomeViewState>(INITIAL_STATE);
  const { startContentLoading, stopContentLoading } = useLoading();

  const findWildPokemon = useCallback(async (): Promise<void> => {
    setState((previousState) => ({
      ...previousState,
      isFindingWild: true,
      errorMessage: undefined,
    }));
    startContentLoading();
    try {
      const response = await fetch('/api/pokedex/wild', {
        method: 'POST',
        headers: {
          'content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({}),
      });

      const json = (await response.json()) as TPokedex | ApiErrorResponse;

      if (!response.ok || !isWildEncounter(json)) {
        const message = readApiMessage(json, HOME_COPY.genericWildError);

        setState((previousState) => ({
          ...previousState,
          isFindingWild: false,
          errorMessage: message,
        }));

        return;
      }

      setState((previousState) => ({
        ...previousState,
        wildEncounter: json,
        isFindingWild: false,
        isEncounterOpen: true,
      }));
    } catch (error) {
      const errorMessage = error instanceof Error && error.message
        ? error.message
        : HOME_COPY.genericWildError;

      setState((previousState) => ({
        ...previousState,
        isFindingWild: false,
        errorMessage,
      }));
    } finally {
      stopContentLoading();
    }
  }, [startContentLoading, stopContentLoading]);

  const fetchPokemons = useCallback(async (
    params?: FetchPokemonsParams
  ): Promise<Array<TPokemon>> => {
    const {
      captureRate = 45,
      fetchErrorMessage = 'Failed to fetch pokemons',
    } = params || {};
    setState((previousState) => ({
      ...previousState,
      isFindingInitialPokemons: true,
      errorMessage: undefined,
    }));

    startContentLoading();
    try {
      const response = await fetch('/api/pokemon?order_by=capture_rate&status=COMPLETE', {
        method: 'GET',
        cache: 'no-store',
      });

      const json = (await response.json()) as Array<TPokemon> | ApiErrorResponse;

      if (!response.ok) {
        const message = 'message' in json && json.message ? json.message : fetchErrorMessage;
        setState((previousState) => ({
          ...previousState,
          isFindingInitialPokemons: false,
          errorMessage: message,
        }));
        return [];
      }

      const pokemons = json as Array<TPokemon>;
      const filteredPokemons = pokemons.filter(pokemon => (pokemon.capture_rate || 0) <= captureRate);

      setState((previousState) => ({
        ...previousState,
        initialPokemons: filteredPokemons,
        isFindingInitialPokemons: true,
        errorMessage: undefined,
      }));
      return filteredPokemons;
    } catch (error) {
      const errorMessage = error instanceof Error && error.message
        ? error.message
        : fetchErrorMessage;

      setState((previousState) => ({
        ...previousState,
        isFindingInitialPokemons: false,
        errorMessage,
      }));
      return [];
    } finally {
      stopContentLoading();
    }
  }, [startContentLoading, stopContentLoading]);

  const initializeAdventure = useCallback(async (payload: InitializeParams): Promise<TTrainer | ApiErrorResponse> => {
    setState((previousState) => ({
      ...previousState,
      isInitializeAdventure: true,
      errorMessage: undefined,
    }));
    startContentLoading();
    try {
      const response = await fetch('/api/auth/initialize', {
        method: 'POST',
        headers: {
          'content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(payload),
      });

      const json = (await response.json()) as TTrainer | ApiErrorResponse;

      if (!response.ok || !isWildEncounter(json)) {
        const message = readApiMessage(json, HOME_COPY.genericWildError);

        setState((previousState) => ({
          ...previousState,
          isInitializeAdventure: false,
          errorMessage: message,
        }));

        return { message };
      }

      setState((previousState) => ({
        ...previousState,
        wildEncounter: json,
        isInitializeAdventure: true,
      }));
      return json;
    } catch (error) {
      const errorMessage = error instanceof Error && error.message
        ? error.message
        : HOME_COPY.genericWildError;

      setState((previousState) => ({
        ...previousState,
        isInitializeAdventure: false,
        errorMessage,
      }));
      return { message: errorMessage };
    } finally {
      stopContentLoading();
    }
  }, [startContentLoading, stopContentLoading]);

  const closeEncounter = useCallback(() => {
    setState((previousState) => ({
      ...previousState,
      isEncounterOpen: false,
      wildEncounter: undefined,
    }));
  }, []);

  return {
    wildEncounter: state.wildEncounter,
    isFindingWild: state.isFindingWild,
    isEncounterOpen: state.isEncounterOpen,
    isFindingInitialPokemons: state.isFindingInitialPokemons,
    initialPokemons: state.initialPokemons,
    errorMessage: state.errorMessage,
    isInitializeAdventure: state.isInitializeAdventure,
    findWildPokemon,
    fetchPokemons,
    closeEncounter,
    initializeAdventure
  };
};

export default useHomeOverview;

