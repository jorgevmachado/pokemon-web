import React from 'react';
import type { TTrainer } from '../types';

export type UserProviderProps = {
  children: React.ReactNode;
  initialUser: TTrainer | null;
  isAuthenticated: boolean;
  tokenExpiresAt: number | null;
};

export type UserContextValue = {
  user: TTrainer | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  refreshUser: () => Promise<TTrainer | null>;
  clearUser: () => void;
};

