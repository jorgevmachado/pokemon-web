import { TPokedex } from '@/app/ui/features/pokedex/types';
import { InitializeParams ,TPokemon ,TTrainer } from '@/app/ui';

export type TrainerSummary = {
  trainerName: string;
  ownedPokemonCount: number;
  discoveredPokemonCount: number;
  pokeballCount: number;
};


export type HomeViewState = {
  wildEncounter?: TPokedex;
  isFindingWild: boolean;
  isInitializeAdventure: boolean;
  initialPokemons?: Array<TPokemon>;
  isFindingInitialPokemons: boolean;
  isEncounterOpen: boolean;
  errorMessage?: string;
};

export type FetchPokemonsParams = {
  captureRate?: number;
  fetchErrorMessage?: string;
}

export type UseHomeOverviewResult = {
  wildEncounter?: TPokedex;
  initialPokemons?: Array<TPokemon>;
  fetchPokemons: (params?: FetchPokemonsParams) => Promise<Array<TPokemon>>;
  initializeAdventure: (payload: InitializeParams) => Promise<TTrainer | ApiErrorResponse>;
  isFindingWild: boolean;
  isFindingInitialPokemons: boolean;
  isInitializeAdventure: boolean;
  isEncounterOpen: boolean;
  errorMessage?: string;
  closeEncounter: () => void;
  findWildPokemon: () => Promise<void>;
};

export type ApiErrorResponse = {
  message?: string;
};