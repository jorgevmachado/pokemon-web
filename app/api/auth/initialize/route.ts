import { NextResponse } from 'next/server';

import { getServerSession } from '@/app/shared/lib/auth/server';
import { authService, type InitializeParams, type TTrainer } from '@/app/ui';

type ErrorResponse = {
  message: string;
};

const toInitializeParams = async (request: Request): Promise<InitializeParams> => {
  try {
    const payload = (await request.json()) as InitializeParams;

    if (!payload || typeof payload !== 'object') {
      return {};
    }

    if (!payload.pokemon_name) {
      return {};
    }

    return {
      pokeballs: payload.pokeballs,
      capture_rate: payload.capture_rate,
      pokemon_name: payload.pokemon_name.trim() || undefined
    };
  } catch {
    return {};
  }
};

export async function POST(request: Request): Promise<NextResponse<TTrainer | ErrorResponse>> {
  const session = await getServerSession();

  if (!session.isAuthenticated || !session.token) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  try {
    const params = await toInitializeParams(request);
    const service = authService(session.token);
    const response = await service.initialize(params);

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    const message = error instanceof Error && error.message
      ? error.message
      : 'Could not initialize now.';

    return NextResponse.json({ message }, { status: 500 });
  }
}