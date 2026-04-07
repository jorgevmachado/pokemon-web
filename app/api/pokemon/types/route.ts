import { NextResponse } from 'next/server';

import { getServerSession } from '@/app/shared/lib/auth/server';
import { pokemonService ,TPokemonType } from '@/app/ui/features/pokemon';

export async function GET(): Promise<NextResponse<Array<TPokemonType> | {
  message: string
}>> {
  const session = await getServerSession();

  if (!session.isAuthenticated || !session.token) {
    return NextResponse.json({ message: 'Not authenticated' } ,{ status: 401 });
  }

  try {
    const service = pokemonService(session.token);
    const response = await service.type.list() as Array<TPokemonType>;

    return NextResponse.json(response ,{ status: 200 });
  } catch {
    return NextResponse.json({ message: 'Unable to fetch Pokemon types.' } ,
      { status: 500 });
  }
}
