import { NextRequest, NextResponse } from 'next/server';
import { getTurnos, createTurno, isSlotBooked } from '@/lib/store';
import type { TurnoEstado } from '@/lib/types';

export async function GET() {
  const turnos = getTurnos();
  return NextResponse.json({ turnos });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prestacionId, fecha, hora, paciente } = body;

    if (!prestacionId || !fecha || !hora || !paciente) {
      return NextResponse.json(
        { error: 'Faltan datos requeridos' },
        { status: 400 }
      );
    }

    if (!paciente.nombre || !paciente.telefono || !paciente.email) {
      return NextResponse.json(
        { error: 'Datos del paciente incompletos' },
        { status: 400 }
      );
    }

    if (isSlotBooked(fecha, hora)) {
      return NextResponse.json(
        { error: 'Este horario ya está reservado. Por favor, elegí otro.' },
        { status: 409 }
      );
    }

    const turno = createTurno({
      prestacionId,
      fecha,
      hora,
      paciente,
      estado: 'pendiente' as TurnoEstado,
    });

    if (!turno) {
      return NextResponse.json(
        { error: 'No se pudo crear el turno' },
        { status: 500 }
      );
    }

    return NextResponse.json({ turno }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Error procesando la solicitud' },
      { status: 500 }
    );
  }
}
