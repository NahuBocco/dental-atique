import { NextResponse } from 'next/server';
import { getNextDays } from '@/lib/store';

export async function GET() {
  const dates = getNextDays(14);
  return NextResponse.json({ dates });
}
