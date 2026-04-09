import React from 'react';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import type { TMyPokemon } from '@/app/ui/features/my-pokemon/types';
import type { TPokedex } from '@/app/ui/features/pokedex/types';
import type { TTrainer } from '@/app/ui/features/auth/types';
import { UserContext } from '@/app/ui/features/auth/user/UserContext';
import type { UserContextValue } from '@/app/ui/features/auth/user/types';

import HomeDashboard from './HomeDashboard';

const pushMock = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

type MockedResponse = {
  ok: boolean;
  json: () => Promise<unknown>;
};

const createResponse = (json: unknown, ok = true): MockedResponse => ({
  ok,
  json: async () => json,
});

const createCapturedPokemon = (params: {
  id: string;
  nickname: string;
  pokemonName: string;
  order: number;
  level: number;
}): TMyPokemon => {
  return {
    id: params.id,
    nickname: params.nickname,
    level: params.level,
    hp: 30,
    wins: 0,
    iv_hp: 0,
    ev_hp: 0,
    losses: 0,
    max_hp: 30,
    battles: 0,
    speed: 10,
    iv_speed: 0,
    ev_speed: 0,
    attack: 10,
    iv_attack: 0,
    ev_attack: 0,
    defense: 10,
    iv_defense: 0,
    ev_defense: 0,
    experience: 0,
    special_attack: 10,
    iv_special_attack: 0,
    ev_special_attack: 0,
    iv_special_defense: 0,
    special_defense: 10,
    ev_special_defense: 0,
    pokemon: {
      id: `pk-${params.id}`,
      name: params.pokemonName,
      order: params.order,
      external_image: '/icon.svg',
    },
  };
};

const createPokedexEntry = (params: {
  id: string;
  pokemonName: string;
  order: number;
  discovered: boolean;
}): TPokedex => {
  return {
    id: params.id,
    nickname: params.pokemonName,
    level: 1,
    hp: 10,
    wins: 0,
    iv_hp: 0,
    ev_hp: 0,
    losses: 0,
    max_hp: 10,
    battles: 0,
    speed: 10,
    iv_speed: 0,
    ev_speed: 0,
    attack: 10,
    iv_attack: 0,
    ev_attack: 0,
    defense: 10,
    iv_defense: 0,
    ev_defense: 0,
    experience: 0,
    special_attack: 10,
    iv_special_attack: 0,
    ev_special_attack: 0,
    iv_special_defense: 0,
    special_defense: 10,
    ev_special_defense: 0,
    discovered: params.discovered,
    pokemon: {
      id: `dex-${params.id}`,
      name: params.pokemonName,
      order: params.order,
      external_image: '/icon.svg',
    },
  };
};

const trainer: TTrainer = {
  id: 'trainer-1',
  role: 'USER',
  name: 'Ash Ketchum',
  email: 'ash@pokemon.com',
  gender: 'MALE',
  status: 'ACTIVE',
  pokeballs: 10,
  capture_rate: 51,
  date_of_birth: new Date('1990-07-20T00:00:00'),
  total_authentications: 288,
  last_authentication_at: Date.now(),
  authentication_success: 287,
  authentication_failures: 2,
  created_at: new Date('2026-03-27T18:11:07.825613'),
  updated_at: new Date('2026-04-09T16:47:49.125326'),
  deleted_at: undefined,
  pokedex: [
    createPokedexEntry({ id: '1', pokemonName: 'pikachu', order: 25, discovered: true }),
    createPokedexEntry({ id: '2', pokemonName: 'charizard', order: 6, discovered: true }),
    createPokedexEntry({ id: '3', pokemonName: 'mew', order: 151, discovered: false }),
  ],
  captured_pokemons: [
    createCapturedPokemon({ id: '1', nickname: 'Spark', pokemonName: 'pikachu', order: 25, level: 42 }),
    createCapturedPokemon({ id: '2', nickname: 'Blaze', pokemonName: 'charizard', order: 6, level: 55 }),
    createCapturedPokemon({ id: '3', nickname: 'Wave', pokemonName: 'blastoise', order: 9, level: 47 }),
    createCapturedPokemon({ id: '4', nickname: 'Leaf', pokemonName: 'venusaur', order: 3, level: 39 }),
  ],
};

const wildPayload = {
  id: 'wild-1',
  nickname: 'Wild Opponent',
  hp: 20,
  wins: 0,
  level: 5,
  iv_hp: 0,
  ev_hp: 0,
  losses: 0,
  max_hp: 20,
  battles: 0,
  speed: 10,
  iv_speed: 0,
  ev_speed: 0,
  attack: 10,
  iv_attack: 0,
  ev_attack: 0,
  defense: 10,
  iv_defense: 0,
  ev_defense: 0,
  experience: 0,
  special_attack: 10,
  iv_special_attack: 0,
  ev_special_attack: 0,
  iv_special_defense: 0,
  special_defense: 10,
  ev_special_defense: 0,
  discovered: true,
  pokemon: {
    id: '25',
    name: 'pikachu',
    order: 25,
    image: '/icon.svg',
    external_image: '/icon.svg',
    evolutions: [],
    types: [],
    abilities: [],
    capture_rate: 0,
    height: 1,
    weight: 1,
    is_baby: false,
    is_legendary: false,
    is_mythical: false,
    habitat: 'forest',
  },
};

const renderWithUser = (user: TTrainer | null) => {
  const value: UserContextValue = {
    user,
    isAuthenticated: Boolean(user),
    isLoading: false,
    refreshUser: async () => user,
    clearUser: () => undefined,
  };

  return render(
    <UserContext.Provider value={value}>
      <HomeDashboard />
    </UserContext.Provider>,
  );
};

describe('<HomeDashboard />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders fake trainer fallback when authenticated user is unavailable', () => {
    renderWithUser(null);

    expect(screen.getByText('Jorge Machado')).toBeInTheDocument();
    expect(screen.getAllByText('jorge.vmachado@gmail.com').length).toBeGreaterThan(0);
    expect(screen.getByText('Demo profile loaded while authenticated trainer data is unavailable.')).toBeInTheDocument();
  });

  it('renders trainer data from useUser when available', () => {
    renderWithUser(trainer);

    const capturedMetric = screen.getByText('Captured Pokemons').closest('article');
    const discoveredMetric = screen.getByText('Discovered in Pokedex').closest('article');

    expect(screen.getByText('Ash Ketchum')).toBeInTheDocument();
    expect(screen.getAllByText('ash@pokemon.com').length).toBeGreaterThan(0);
    expect(screen.getByText('51%')).toBeInTheDocument();
    expect(capturedMetric).toHaveTextContent('4');
    expect(discoveredMetric).toHaveTextContent('2');
    expect(screen.getByText('Top 3 Highest Level Pokemons')).toBeInTheDocument();
    expect(screen.getByText('Charizard')).toBeInTheDocument();
    expect(screen.getByText('Blastoise')).toBeInTheDocument();
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
  });

  it('opens and closes the wild encounter modal', async () => {
    global.fetch = jest.fn(async () => createResponse(wildPayload) as Response);

    renderWithUser(trainer);

    fireEvent.click(screen.getByRole('button', { name: 'Find Wild Pokemon' }));

    expect(await screen.findByRole('dialog')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Flee' }));

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('navigates to battle after confirming the encounter', async () => {
    global.fetch = jest.fn(async () => createResponse(wildPayload) as Response);

    renderWithUser(trainer);

    fireEvent.click(screen.getByRole('button', { name: 'Find Wild Pokemon' }));
    fireEvent.click(await screen.findByRole('button', { name: 'Battle' }));

    expect(pushMock).toHaveBeenCalledWith('/battle?wildId=wild-1');
  });
});
