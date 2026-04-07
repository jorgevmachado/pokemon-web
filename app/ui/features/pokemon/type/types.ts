import { TListQuery } from '@/app/ui';

export type TPokemonType = {
  id: string;
  url: string;
  name: string;
  order: number;
  text_color: string;
  background_color: string;
}

export type PokemonTypeFilters = {
  name?: string;
}

export type PokemonTypeListQuery = TListQuery & PokemonTypeFilters;

export type PokemonTypeListViewState = {
  list: Array<TPokemonType>;
  isLoading: boolean;
  errorMessage: string | null;
}