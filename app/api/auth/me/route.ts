import { NextResponse } from 'next/server';

import { clearAuthCookie, getServerSession } from '@/app/shared/lib/auth/server';
import type { ResponseError } from '@/app/shared/services/http';
import { authService } from '@/app/ui/features/auth/service';
import { TTrainer } from '@/app/ui/features/auth/types';

type ErrorResponse = {
  message: string;
};

const toResponseMessage = (error: unknown): string => {
  const responseError = error as ResponseError | undefined;

  return responseError?.message || 'Could not load authenticated user.';
};

export async function GET(): Promise<NextResponse<TTrainer | ErrorResponse>> {
  const session = await getServerSession();

  if (!session.isAuthenticated || !session.token) {
    if (session.token) {
      await clearAuthCookie();
    }

    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  try {
    const user = await authService(session.token).me();

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    const responseError = error as ResponseError | undefined;

    if (responseError?.statusCode === 401) {
      await clearAuthCookie();

      return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }

    return NextResponse.json({ message: toResponseMessage(error) }, { status: 500 });
  }
}

