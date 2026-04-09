import React from 'react';

import { act, render, screen, waitFor } from '@testing-library/react';

import UserProvider from './UserProvider';
import { useUser } from './useUser';

const pushMock = jest.fn();
const refreshMock = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
    refresh: refreshMock,
  }),
}));

type MockedResponse = {
  ok: boolean;
  status: number;
  json: () => Promise<unknown>;
};

const createResponse = (json: unknown, status = 200): MockedResponse => ({
  ok: status >= 200 && status < 300,
  status,
  json: async () => json,
});

const trainer = {
  id: 'trainer-1',
  role: 'trainer',
  name: 'Ash Ketchum',
  email: 'ash@pokemon.com',
  gender: 'male',
  status: 'active',
  pokeballs: 10,
  capture_rate: 25,
  date_of_birth: new Date('2000-01-01'),
  total_authentications: 288 as const,
  last_authentication_at: Date.now(),
  authentication_success: 10,
  authentication_failures: 0,
  created_at: new Date('2024-01-01'),
  updated_at: new Date('2024-01-01'),
  pokedex: [],
  captured_pokemons: [],
};

const UserConsumer = () => {
  const { user, isAuthenticated } = useUser();

  return (
    <div>
      <span>{user?.name || 'Guest'}</span>
      <span>{isAuthenticated ? 'authenticated' : 'anonymous'}</span>
    </div>
  );
};

describe('<UserProvider />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it('exposes the authenticated user through useUser', () => {
    render(
      <UserProvider
        initialUser={trainer}
        isAuthenticated={true}
        tokenExpiresAt={Date.now() + 60_000}
      >
        <UserConsumer />
      </UserProvider>,
    );

    expect(screen.getByText('Ash Ketchum')).toBeInTheDocument();
    expect(screen.getByText('authenticated')).toBeInTheDocument();
  });

  it('clears the user and redirects when the token expires', () => {
    jest.useFakeTimers();

    render(
      <UserProvider
        initialUser={trainer}
        isAuthenticated={true}
        tokenExpiresAt={Date.now() + 1000}
      >
        <UserConsumer />
      </UserProvider>,
    );

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(screen.getByText('Guest')).toBeInTheDocument();
    expect(screen.getByText('anonymous')).toBeInTheDocument();
    expect(pushMock).toHaveBeenCalledWith('/login');
    expect(refreshMock).toHaveBeenCalled();
  });

  it('clears the user when the session becomes invalid during refresh', async () => {
    global.fetch = jest.fn(async () => createResponse({ message: 'Not authenticated' }, 401) as Response);

    render(
      <UserProvider
        initialUser={trainer}
        isAuthenticated={true}
        tokenExpiresAt={Date.now() + 60_000}
      >
        <UserConsumer />
      </UserProvider>,
    );

    act(() => {
      window.dispatchEvent(new Event('focus'));
    });

    await waitFor(() => {
      expect(screen.getByText('Guest')).toBeInTheDocument();
    });

    expect(pushMock).toHaveBeenCalledWith('/login');
    expect(refreshMock).toHaveBeenCalled();
  });
});

