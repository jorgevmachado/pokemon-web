import { TPokedex } from '@/app/ui/features/pokedex/types';

export type TrainerSummary = {
  trainerName: string;
  ownedPokemonCount: number;
  discoveredPokemonCount: number;
  pokeballCount: number;
};


export type HomeViewState = {
  wildEncounter?: TPokedex;
  isFindingWild: boolean;
  isEncounterOpen: boolean;
  errorMessage: string | null;
};

export type UseHomeOverviewResult = {
  wildEncounter?: TPokedex;
  isFindingWild: boolean;
  isEncounterOpen: boolean;
  errorMessage: string | null;
  closeEncounter: () => void;
  findWildPokemon: () => Promise<void>;
};
