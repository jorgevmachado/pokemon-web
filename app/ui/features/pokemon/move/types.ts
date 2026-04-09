import { TListQuery } from '@/app/ui';

export type TPokemonMove = {
  id: string;
  pp: number;
  url: string;
  type: string;
  name: string;
  order: number;
  power: number;
  target: string;
  effect: string;
  priority: number;
  accuracy: number;
  short_effect: string;
  damage_class: string;
  effect_chance?: number;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}

export type PokemonMoveFilters = {
  name?: string;
}

export type PokemonMoveListQuery = TListQuery & PokemonMoveFilters;