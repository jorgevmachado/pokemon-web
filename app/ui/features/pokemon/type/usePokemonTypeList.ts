'use client';

import { useLoading } from '@/app/ui';
import { TPokemonType } from './types';
import { useCallback ,useEffect ,useRef ,useState } from 'react';
import {
  PokemonTypeListViewState ,
} from '@/app/ui/features/pokemon/type/types';

type UsePokemonTypeListResult = {
  list: Array<TPokemonType>;
  isLoading: boolean;
  errorMessage: string | null;
  reload: () => void;
}

const INITIAL_STATE: PokemonTypeListViewState = {
  list: [] ,
  isLoading: true ,
  errorMessage: null ,
};

const GENERIC_FETCH_ERROR = 'Could not fetch Pokemon Type entries.';

export const usePokemonTypeList = (): UsePokemonTypeListResult => {
  const [state ,setState] = useState<PokemonTypeListViewState>(INITIAL_STATE);
  const requestIdRef = useRef(0);
  const { startContentLoading ,stopContentLoading } = useLoading();

  const fetchList = useCallback(async (): Promise<void> => {
    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;

    setState((previousState) => ({
      ...previousState ,
      isLoading: true ,
      errorMessage: null ,
    }));
    startContentLoading();
    try {
      const response = await fetch('/api/pokemon/types' ,{
        method: 'GET' ,
        cache: 'no-store' ,
      });

      const json = (await response.json()) as Array<TPokemonType> | {
        message?: string
      };

      if (requestIdRef.current !== requestId) {
        return;
      }

      if (!response.ok || !json) {
        const message = 'message' in json && json.message ?
          json.message :
          GENERIC_FETCH_ERROR;

        setState((previousState) => ({
          ...previousState ,
          isLoading: false ,
          errorMessage: message ,
        }));

        return;
      }

      const list: Array<TPokemonType> = Array.isArray(json) ? json : [];
      setState((previousState) => ({
        ...previousState ,
        list ,
        isLoading: false ,
        errorMessage: null ,
      }));
    } catch (error) {
      if (requestIdRef.current !== requestId) {
        return;
      }

      const errorMessage = error instanceof Error && error.message ?
        error.message :
        GENERIC_FETCH_ERROR;

      setState((previousState) => ({
        ...previousState ,
        isLoading: false ,
        errorMessage ,
      }));
    } finally {
      stopContentLoading();
    }
  } ,[startContentLoading ,stopContentLoading]);

  useEffect(() => {
    void fetchList();
  } ,[]);

  const reload = useCallback(() => {
    void fetchList();
  } ,[fetchList]);

  return {
    reload ,
    list: state.list ,
    isLoading: state.isLoading ,
    errorMessage: state.errorMessage,
  };
};