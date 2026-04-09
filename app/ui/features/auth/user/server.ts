import 'server-only';

import { clearAuthCookie } from '@/app/shared/lib/auth/server';
import { getAuthTokenExpiration } from '@/app/shared/lib/auth/token';
import type { ResponseError } from '@/app/shared/services/http';
import { authService } from '@/app/ui/features/auth/service';
import { TTrainer } from '@/app/ui/features/auth/types';

export const getAuthenticatedUser = async (token?: string): Promise<TTrainer | null> => {
  if (!token) {
    return null;
  }

  try {
    return await authService(token).me();
  } catch (error) {
    const responseError = error as ResponseError | undefined;

    if (responseError?.statusCode === 401) {
      await clearAuthCookie();
    }

    return null;
  }
};

export const getAuthenticatedUserBootstrap = async (
  isAuthenticated: boolean,
  token?: string,
): Promise<{ initialUser: TTrainer | null; tokenExpiresAt: number | null }> => {
  if (!isAuthenticated || !token) {
    return {
      initialUser: null,
      tokenExpiresAt: null,
    };
  }

  const initialUser = await getAuthenticatedUser(token);

  return {
    initialUser,
    tokenExpiresAt: getAuthTokenExpiration(token),
  };
};

