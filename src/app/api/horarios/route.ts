import { NextRequest, NextResponse } from 'next/server';
import { getHorarios, updateHorarios } from '@/lib/store';

export async function GET() {
  const horarios = getHorarios();
  return NextResponse.json({ horarios });
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const horarios = updateHorarios(body);
    return NextResponse.json({ horarios });
  } catch {
    return NextResponse.json(
      { error: 'Error procesando la solicitud' },
      { status: 500 }
    );
  }
}
