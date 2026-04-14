import {
  PokedexViewDetailState ,TPokedex ,
  UsePokedexDetailResult ,
} from '@/app/ui/features/pokedex/types';
import { useCallback ,useEffect ,useRef ,useState } from 'react';
import { useLoading } from '@/app/ds';
import { useBreadcrumb } from '@/app/ds/breadcrumb';
import { normalizedName } from '@/app/utils';


const INITIAL_STATE: PokedexViewDetailState = {
  item: undefined,
  isLoading: true,
  errorMessage: undefined,
};

const GENERIC_FETCH_ERROR = 'Could not fetch Pokédex by id.';

const usePokedexDetail = (param: string): UsePokedexDetailResult => {
  const [ state, setState ] = useState<PokedexViewDetailState>(INITIAL_STATE);
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
      const response = await fetch(`/api/pokedex/${param}`, {
        method: 'GET',
        cache: 'no-store',
      });
      
      const json = (await response.json()) as TPokedex | { message?: string };
      
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
      
      const item = json as TPokedex;
      const pokemon = item.pokemon;
      const displayName = item.nickname || pokemon.name;
      if (displayName) {
        setCustomLabel(`/pokedex/${item.id}`, normalizedName(displayName));
      }
      
      
      setState({
        item: json as TPokedex,
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