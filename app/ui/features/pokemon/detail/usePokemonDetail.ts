import { useCallback ,useEffect ,useRef ,useState } from 'react';
import { useLoading } from '@/app/ds';
import { useBreadcrumb } from '@/app/ds/breadcrumb';
import { normalizedName } from '@/app/utils';
import {
  PokemonViewDetailState ,TPokemon ,
  UsePokemonDetailResult ,
} from '@/app/ui/features/pokemon/types';


const INITIAL_STATE: PokemonViewDetailState = {
  item: undefined,
  isLoading: true,
  errorMessage: undefined,
};

const GENERIC_FETCH_ERROR = 'Could not fetch Pokémon by id.';

const usePokedexDetail = (param: string): UsePokemonDetailResult => {
  const [ state, setState ] = useState<PokemonViewDetailState>(INITIAL_STATE);
  const { setCustomLabel } = useBreadcrumb();

  const requestIdRef = useRef(0);
  const { startContentLoading, stopContentLoading } = useLoading();
  
  const fetchDetail = useCallback(async (param: string): Promise<void> => {
    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;

    setState((previousState) => ({
      ...previousState,
      isLoading: true,
      errorMessage: undefined,
    }));
    startContentLoading();
    try {
      const response = await fetch(`/api/pokemon/${param}`, {
        method: 'GET',
        cache: 'no-store',
      });
      
      const json = (await response.json()) as TPokemon | { message?: string };
      
      if (requestIdRef.current !== requestId) {
        return;
      }
      
      if (!response.ok || !json) {
        const message = 'message' in json && json.message ? json.message : GENERIC_FETCH_ERROR;

        setState((previousState) => ({
          ...previousState,
          isLoading: false,
          errorMessage: message,
        }));

        return;
      }
      
      const item = json as TPokemon;
      const displayName = item.name;
      if (displayName) {
        setCustomLabel(`/my-pokemon/${item.id}`, normalizedName(displayName));
      }
      
      
      setState({
        item: json as TPokemon,
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
    void fetchDetail(param);
  } ,[fetchDetail, param]);
  
  return {
    item: state.item,
    isLoading: state.isLoading,
    errorMessage: state.errorMessage,
  };
};

export default usePokedexDetail;