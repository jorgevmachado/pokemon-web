import { TPokemonType } from '@/app/ui/features/pokemon/type/types';
import { TPokemonAbility } from '@/app/ui/features/pokemon/ability';

export type TPokemonEvolution = {
  id: string;
  name?: string;
  order: number;
  image?: string;
  external_image: string;
  types?: Array<TPokemonType>;
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
  abilities?: Array<TPokemonAbility>
  evolutions?: Array<TPokemonEvolution>;
  is_mythical?: boolean;
  capture_rate?: number;
  is_legendary?: boolean;
  external_image: string;
}

export type PokemonListQuery = {
  name?: string;
}