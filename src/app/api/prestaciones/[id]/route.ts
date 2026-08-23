import { NextRequest, NextResponse } from 'next/server';
import { getPrestacion, updatePrestacion, deletePrestacion } from '@/lib/store';

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(
  _request: NextRequest,
  context: RouteContext
) {
  const { id } = await context.params;
  const prestacion = getPrestacion(id);
  
  if (!prestacion) {
    return NextResponse.json(
      { error: 'Prestación no encontrada' },
      { status: 404 }
    );
  }
  
  return NextResponse.json({ prestacion });
}

export async function PATCH(
  request: NextRequest,
  context: RouteContext
) {
  const { id } = await context.params;
  
  try {
    const body = await request.json();
    const prestacion = updatePrestacion(id, body);
    
    if (!prestacion) {
      return NextResponse.json(
        { error: 'Prestación no encontrada' },
        { status: 404 }
      );
    }

    return NextResponse.json({ prestacion });
  } catch {
    return NextResponse.json(
      { error: 'Error procesando la solicitud' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  context: RouteContext
) {
  const { id } = await context.params;
  const deleted = deletePrestacion(id);
  
  if (!deleted) {
    return NextResponse.json(
      { error: 'Prestación no encontrada' },
      { status: 404 }
    );
  }
  
  return NextResponse.json({ success: true });
}
