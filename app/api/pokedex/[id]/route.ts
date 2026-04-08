import { NextResponse } from 'next/server';

import { getServerSession } from '@/app/shared/lib/auth/server';
import { pokedexService } from '@/app/ui/features/pokedex/service';
import { TPokedex } from '@/app/ui/features/pokedex/types';

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, { params }: RouteContext): Promise<NextResponse<TPokedex | {
  message: string
}>> {
  const session = await getServerSession();

  if (!session.isAuthenticated || !session.token) {
    return NextResponse.json({ message: 'Not authenticated' } ,{ status: 401 });
  }

  try {
    const { id } = await params;
    const service = pokedexService(session.token);
    const response = await service.getById(id) as TPokedex;
    return NextResponse.json(response ,{ status: 200 });
  } catch {
    return NextResponse.json({ message: 'Invalid parameters.' } ,
      { status: 500 });
  }
}