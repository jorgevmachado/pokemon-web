import { NextResponse } from 'next/server';

import { getServerSession } from '@/app/shared/lib/auth/server';
import { pokedexService } from '@/app/ui/features/pokedex/service';
import { TPokedex, WildPokemon } from '@/app/ui/features/pokedex/types';

type ErrorResponse = {
  message: string;
};

const toWildParams = async (request: Request): Promise<WildPokemon> => {
  try {
    const payload = (await request.json()) as WildPokemon;

    if (!payload || typeof payload !== 'object') {
      return {};
    }

    if (!payload.habitat) {
      return {};
    }

    return { habitat: payload.habitat.trim() || undefined };
  } catch {
    return {};
  }
};

export async function POST(request: Request): Promise<NextResponse<TPokedex | ErrorResponse>> {
  const session = await getServerSession();

  if (!session.isAuthenticated || !session.token) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  try {
    const params = await toWildParams(request);
    const service = pokedexService(session.token);
    const response = await service.wild(params);

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    const message = error instanceof Error && error.message
      ? error.message
      : 'Could not find a wild Pokemon now.';

    return NextResponse.json({ message }, { status: 500 });
  }
}