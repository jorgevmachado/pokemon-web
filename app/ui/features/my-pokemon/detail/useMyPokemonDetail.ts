import {
  MyPokemonViewDetailState ,TMyPokemon , 
  UseMyPokemonDetailResult ,
} from '@/app/ui/features/my-pokemon/types';
import { useCallback ,useEffect ,useRef ,useState } from 'react';
import { useLoading } from '@/app/ui';
import { useBreadcrumb } from '@/app/ui/components/breadcrumb';
import { normalizedName } from '@/app/utils';


const INITIAL_STATE: MyPokemonViewDetailState = {
  item: undefined,
  isLoading: true,
  errorMessage: null,
};

const GENERIC_FETCH_ERROR = 'Could not fetch My Pokémon by id.';

const usePokedexDetail = (param: string): UseMyPokemonDetailResult => {
  const [ state, setState ] = useState<MyPokemonViewDetailState>(INITIAL_STATE);
  const { setCustomLabel } = useBreadcrumb();

  const requestIdRef = useRef(0);
  const { startContentLoading, stopContentLoading } = useLoading();
  
  const fetchDetail = useCallback(async (param: string): Promise<void> => {
    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;

    setState((previousState) => ({
      ...previousState,
      isLoading: true,
      errorMessage: null,
    }));
    startContentLoading();
    try {
      const response = await fetch(`/api/my-pokemon/${param}`, {
        method: 'GET',
        cache: 'no-store',
      });
      
      const json = (await response.json()) as TMyPokemon | { message?: string };
      
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
      
      const item = json as TMyPokemon;
      const pokemon = item.pokemon;
      const displayName = item.nickname || pokemon.name;
      if (displayName) {
        setCustomLabel(`/my-pokemon/${item.id}`, normalizedName(displayName));
      }
      
      
      setState({
        item: json as TMyPokemon,
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
    void fetchDetail(param);
  } ,[fetchDetail, param]);
  
  return {
    item: state.item,
    isLoading: state.isLoading,
    errorMessage: state.errorMessage,
  };
};

export default usePokedexDetail;