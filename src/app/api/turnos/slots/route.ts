import { NextRequest, NextResponse } from 'next/server';
import { getAvailableSlots } from '@/lib/store';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const fecha = searchParams.get('fecha');
  const duracion = parseInt(searchParams.get('duracion') || '30', 10);

  if (!fecha) {
    return NextResponse.json(
      { error: 'Fecha requerida' },
      { status: 400 }
    );
  }

  const slots = getAvailableSlots(fecha, duracion);
  return NextResponse.json({ slots });
}
