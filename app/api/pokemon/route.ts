import { NextResponse } from 'next/server';

import { getServerSession } from '@/app/shared/lib/auth/server';
import { pokemonService } from '@/app/ui/features/pokemon/service';

import { toPositiveInteger } from '@/app/utils/number';
import { TPaginatedListResponse } from '@/app/ui/components/pagination/types';
import { PokemonListQuery ,TPokemon } from '@/app/ui/features/pokemon/types';

const getSanitizedParam = (value: string | null): string | undefined => {
  if (!value) {
    return undefined;
  }

  const trimmedValue = value.trim();

  return trimmedValue || undefined;
};

export async function GET(request: Request): Promise<NextResponse<TPaginatedListResponse<TPokemon> | {
  message: string
}>> {
  const { searchParams } = new URL(request.url);

  const session = await getServerSession();

  if (!session.isAuthenticated || !session.token) {
    return NextResponse.json({ message: 'Not authenticated' } ,{ status: 401 });
  }

  try {
    const page = toPositiveInteger(searchParams.get('page') ,1);
    const limit = toPositiveInteger(searchParams.get('limit') ,12);
    const name = getSanitizedParam(searchParams.get('name'));
    const order = getSanitizedParam(searchParams.get('order'));
    const listQuery: PokemonListQuery = {
      limit ,
      page ,
      name ,
      order ,
    };
    const service = pokemonService(session.token);
    const response = await service.list(
      listQuery) as TPaginatedListResponse<TPokemon>;
    return NextResponse.json(response ,{ status: 200 });

  } catch {
    return NextResponse.json({ message: 'Invalid pagination parameters.' } ,
      { status: 500 });
  }

}