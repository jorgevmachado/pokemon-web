import { NextResponse } from 'next/server';

import { getServerSession } from '@/app/shared/lib/auth/server';
import { buildTrainerSummary } from '@/app/ui/features/home/summary';
import { TrainerSummary } from '@/app/ui/features/home/types';

type ErrorResponse = {
  message: string;
};

export async function GET(): Promise<NextResponse<TrainerSummary | ErrorResponse>> {
  const session = await getServerSession();

  if (!session.isAuthenticated || !session.token) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  try {
    const summary = await buildTrainerSummary(session.token);

    return NextResponse.json(summary, { status: 200 });
  } catch {
    return NextResponse.json({ message: 'Could not load home summary.' }, { status: 500 });
  }
}
