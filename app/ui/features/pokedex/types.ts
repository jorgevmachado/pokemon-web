import { TPokemon } from '@/app/ui/features/pokemon';
import {
  TListQuery ,
  TPaginatedListResponse,
} from '@/app/ui/components/pagination/types';

export type PokedexViewState = {
  items: TPaginatedListResponse<TPokedex>['items'];
  meta: TPaginatedListResponse<TPokedex>['meta']
  isLoading: boolean;
  errorMessage: string | null;
};

export type UsePokedexListResult = {
  items: TPaginatedListResponse<TPokedex>['items'];
  meta: TPaginatedListResponse<TPokedex>['meta']
  isLoading: boolean;
  errorMessage: string | null;
  filters: PokedexFilters;
  goToPage: (page: number) => void;
  applyFilters: (nextFilters: PokedexFilters) => void;
  clearFilters: () => void;
  reload: () => void;
};

export type PokedexFilters = {
  type?: string;
  order?: string;
  nickname?: string;
};

export type PokedexListQuery = TListQuery & PokedexFilters;

export type TPokedex = {
  id: string
  nickname: string
  hp: number;
  wins: number;
  level: number;
  iv_hp: number;
  ev_hp: number;
  losses: number;
  max_hp: number;
  battles: number;
  speed: number;
  iv_speed: number;
  ev_speed: number;
  attack: number;
  iv_attack: number;
  ev_attack: number;
  defense: number;
  iv_defense: number;
  ev_defense: number;
  experience: number;
  special_attack: number;
  iv_special_attack: number;
  ev_special_attack: number;
  iv_special_defense: number;
  special_defense: number;
  ev_special_defense: number;
  discovered: boolean;
  discovered_at?: Date
  pokemon: TPokemon;
}