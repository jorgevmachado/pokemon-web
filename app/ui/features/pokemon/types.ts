import { TPokemonType } from '@/app/ui/features/pokemon/type/types';
import { TPokemonAbility } from '@/app/ui/features/pokemon/ability';
import { TPokemonMove } from '@/app/ui/features/pokemon/move';
import { FiltersProps ,TListQuery ,TPaginatedListResponse } from '@/app/ui';

export type TPokemonEvolution = {
  id: string;
  name?: string;
  order: number;
  image?: string;
  external_image: string;
  types?: Array<TPokemonType>;
  moves?: Array<TPokemonMove>;
};

export type TPokemon = {
  id: string;
  name?: string;
  order: number;
  types?: Array<TPokemonType>;
  image?: string;
  height?: number;
  weight?: number;
  habitat?: string;
  is_baby?: boolean;
  status: string;
  abilities?: Array<TPokemonAbility>
  evolutions?: Array<TPokemonEvolution>;
  is_mythical?: boolean;
  capture_rate?: number;
  is_legendary?: boolean;
  external_image: string;
}

export type PokemonFilters = {
  order?: string;
  name?: string;
}

export type PokemonListQuery = TListQuery & PokemonFilters;

export type PokemonViewState = {
  items: TPaginatedListResponse<TPokemon>['items'];
  meta: TPaginatedListResponse<TPokemon>['meta'];
  isLoading: boolean;
  errorMessage: string | null;
}

export type UsePokemonListResult = {
  items: TPaginatedListResponse<TPokemon>['items'];
  meta: TPaginatedListResponse<TPokemon>['meta'];
  isLoading: boolean;
  errorMessage: string | null;
  filters: PokemonFilters;
  inputFilters: FiltersProps['filters'];
  goToPage: (page: number) => void;
  applyFilters: (nextFilters: PokemonFilters) => void;
  applyInputFilters: (nextFilters: PokemonFilters) => void;
  clearFilters: () => void;
  clearInputFilters: () => void;
  updateInputFilters: (inputFilters: FiltersProps['filters']) => void;
  reload: () => void;
}