import { NextRequest, NextResponse } from 'next/server';
import { getPrestaciones, createPrestacion } from '@/lib/store';

export async function GET() {
  const prestaciones = getPrestaciones();
  return NextResponse.json({ prestaciones });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nombre, descripcion, descripcionLarga, duracion, precio, imagen } = body;

    if (!nombre || !descripcion || !duracion || !precio) {
      return NextResponse.json(
        { error: 'Faltan datos requeridos' },
        { status: 400 }
      );
    }

    const prestacion = createPrestacion({
      nombre,
      descripcion,
      descripcionLarga: descripcionLarga || descripcion,
      duracion: parseInt(duracion, 10),
      precio: parseInt(precio, 10),
      imagen: imagen || '/servicios/default.jpg',
    });

    return NextResponse.json({ prestacion }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Error procesando la solicitud' },
      { status: 500 }
    );
  }
}
