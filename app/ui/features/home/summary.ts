import 'server-only';

import { TPaginatedListResponse } from '@/app/ds/pagination/types';
import { capturedPokemonsService } from '@/app/ui/features/my-pokemon';
import { TMyPokemon } from '@/app/ui/features/my-pokemon/types';
import { pokedexService } from '@/app/ui/features/pokedex';
import { TPokedex } from '@/app/ui/features/pokedex/types';

import { TrainerSummary } from './types';

type TokenPayload = {
  name?: string;
  username?: string;
  preferred_username?: string;
  email?: string;
  pokeballs?: number;
  pokeball_count?: number;
};

export const FALLBACK_SUMMARY: TrainerSummary = {
  trainerName: 'Trainer',
  ownedPokemonCount: 0,
  discoveredPokemonCount: 0,
  pokeballCount: 10,
};

const parseTokenPayload = (token: string): TokenPayload | null => {
  const tokenParts = token.split('.');

  if (tokenParts.length !== 3) {
    return null;
  }

  try {
    const payloadAsString = Buffer.from(tokenParts[1], 'base64url').toString('utf-8');

    return JSON.parse(payloadAsString) as TokenPayload;
  } catch {
    return null;
  }
};

const getTrainerName = (payload: TokenPayload | null): string => {
  if (!payload) {
    return FALLBACK_SUMMARY.trainerName;
  }

  if (payload.name?.trim()) {
    return payload.name.trim();
  }

  if (payload.username?.trim()) {
    return payload.username.trim();
  }

  if (payload.preferred_username?.trim()) {
    return payload.preferred_username.trim();
  }

  if (payload.email?.trim()) {
    return payload.email.split('@')[0] || FALLBACK_SUMMARY.trainerName;
  }

  return FALLBACK_SUMMARY.trainerName;
};

const getPokeballCount = (payload: TokenPayload | null): number => {
  if (!payload) {
    return FALLBACK_SUMMARY.pokeballCount;
  }

  if (typeof payload.pokeballs === 'number') {
    return payload.pokeballs;
  }

  if (typeof payload.pokeball_count === 'number') {
    return payload.pokeball_count;
  }

  return FALLBACK_SUMMARY.pokeballCount;
};

const getPaginatedTotal = <T,>(value: TPaginatedListResponse<T> | Array<T>): number => {
  if (Array.isArray(value)) {
    return value.length;
  }

  return value.meta.total;
};

const getDiscoveredCount = (value: TPaginatedListResponse<TPokedex> | Array<TPokedex>): number => {
  const items = Array.isArray(value) ? value : value.items;

  return items.filter((item) => item.discovered).length;
};

export const buildTrainerSummary = async (token: string): Promise<TrainerSummary> => {
  const tokenPayload = parseTokenPayload(token);

  const [ownedResponse, discoveredResponse] = await Promise.all([
    capturedPokemonsService(token).list({ page: 1, limit: 1 }) as Promise<TPaginatedListResponse<TMyPokemon> | Array<TMyPokemon>>,
    pokedexService(token).list({ page: 1, limit: 1000 }) as Promise<TPaginatedListResponse<TPokedex> | Array<TPokedex>>,
  ]);

  return {
    trainerName: getTrainerName(tokenPayload),
    ownedPokemonCount: getPaginatedTotal(ownedResponse),
    discoveredPokemonCount: getDiscoveredCount(discoveredResponse),
    pokeballCount: getPokeballCount(tokenPayload),
  };
};

