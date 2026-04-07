import { TPokemonType } from '@/app/ui/features/pokemon/type/types';

export type TPokemon = {
  id: string;
  name?: string;
  order: number;
  image?: string;
  external_image: string;
  types?: Array<TPokemonType>;
}

export type PokemonListQuery = {
  name?: string;
}