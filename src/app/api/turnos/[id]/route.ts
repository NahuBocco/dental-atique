import { NextRequest, NextResponse } from 'next/server';
import { getTurno, updateTurnoEstado, deleteTurno } from '@/lib/store';
import type { TurnoEstado } from '@/lib/types';

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(
  _request: NextRequest,
  context: RouteContext
) {
  const { id } = await context.params;
  const turno = getTurno(id);
  
  if (!turno) {
    return NextResponse.json(
      { error: 'Turno no encontrado' },
      { status: 404 }
    );
  }
  
  return NextResponse.json({ turno });
}

export async function PATCH(
  request: NextRequest,
  context: RouteContext
) {
  const { id } = await context.params;
  
  try {
    const body = await request.json();
    const { estado } = body;

    if (!estado) {
      return NextResponse.json(
        { error: 'Estado requerido' },
        { status: 400 }
      );
    }

    const validEstados: TurnoEstado[] = ['pendiente', 'confirmado', 'cancelado', 'completado'];
    if (!validEstados.includes(estado)) {
      return NextResponse.json(
        { error: 'Estado inválido' },
        { status: 400 }
      );
    }

    const turno = updateTurnoEstado(id, estado);
    
    if (!turno) {
      return NextResponse.json(
        { error: 'Turno no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({ turno });
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
  const deleted = deleteTurno(id);
  
  if (!deleted) {
    return NextResponse.json(
      { error: 'Turno no encontrado' },
      { status: 404 }
    );
  }
  
  return NextResponse.json({ success: true });
}
