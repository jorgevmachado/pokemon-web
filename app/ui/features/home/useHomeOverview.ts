'use client';

import { useCallback, useState } from 'react';

import { TPokedex } from '@/app/ui/features/pokedex/types';

import { HOME_COPY } from './constants';
import { HomeViewState, UseHomeOverviewResult } from './types';
import { useLoading } from '@/app/ds';
import { TTrainer } from '@/app/ui';

type ApiErrorResponse = {
  message?: string;
};

const INITIAL_STATE: HomeViewState = {
  wildEncounter: undefined,
  isFindingWild: false,
  isEncounterOpen: false,
  errorMessage: null,
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
      errorMessage: null,
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

  const initializeAdventure = useCallback(async (): Promise<void> => {
    setState((previousState) => ({
      ...previousState,
      isFindingWild: true,
      errorMessage: null,
    }));
    startContentLoading();
    try {
      const response = await fetch('/api/auth/initialize', {
        method: 'POST',
        headers: {
          'content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({}),
      });

      const json = (await response.json()) as TTrainer | ApiErrorResponse;

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
    errorMessage: state.errorMessage,
    findWildPokemon,
    closeEncounter,
  };
};

export default useHomeOverview;

