import seedData from '@/data/seed.json';
import type { Prestacion, Horarios, Turno, Clinica, DiaSemana, TimeSlot, TurnoEstado } from './types';

interface Store {
  prestaciones: Prestacion[];
  horarios: Horarios;
  turnos: Turno[];
  clinica: Clinica;
}

const store: Store = {
  prestaciones: seedData.prestaciones as Prestacion[],
  horarios: seedData.horarios as Horarios,
  turnos: seedData.turnos as Turno[],
  clinica: seedData.clinica as Clinica,
};

export function getPrestaciones(): Prestacion[] {
  return [...store.prestaciones];
}

export function getPrestacion(id: string): Prestacion | undefined {
  return store.prestaciones.find(p => p.id === id);
}

export function createPrestacion(prestacion: Omit<Prestacion, 'id'>): Prestacion {
  const id = prestacion.nombre.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const newPrestacion: Prestacion = { ...prestacion, id };
  store.prestaciones.push(newPrestacion);
  return newPrestacion;
}

export function updatePrestacion(id: string, data: Partial<Prestacion>): Prestacion | null {
  const index = store.prestaciones.findIndex(p => p.id === id);
  if (index === -1) return null;
  store.prestaciones[index] = { ...store.prestaciones[index], ...data };
  return store.prestaciones[index];
}

export function deletePrestacion(id: string): boolean {
  const index = store.prestaciones.findIndex(p => p.id === id);
  if (index === -1) return false;
  store.prestaciones.splice(index, 1);
  return true;
}

export function getHorarios(): Horarios {
  return { ...store.horarios };
}

export function updateHorarios(horarios: Horarios): Horarios {
  store.horarios = { ...horarios };
  return store.horarios;
}

export function getTurnos(): Turno[] {
  return [...store.turnos].sort((a, b) => {
    const dateA = new Date(`${a.fecha}T${a.hora}`);
    const dateB = new Date(`${b.fecha}T${b.hora}`);
    return dateA.getTime() - dateB.getTime();
  });
}

export function getTurno(id: string): Turno | undefined {
  return store.turnos.find(t => t.id === id);
}

export function getTurnosByDate(fecha: string): Turno[] {
  return store.turnos.filter(t => t.fecha === fecha && t.estado !== 'cancelado');
}

export function createTurno(turno: Omit<Turno, 'id' | 'createdAt'>): Turno | null {
  if (isSlotBooked(turno.fecha, turno.hora)) {
    return null;
  }
  
  const id = `turno-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const newTurno: Turno = {
    ...turno,
    id,
    createdAt: new Date().toISOString(),
  };
  store.turnos.push(newTurno);
  return newTurno;
}

export function updateTurnoEstado(id: string, estado: TurnoEstado): Turno | null {
  const turno = store.turnos.find(t => t.id === id);
  if (!turno) return null;
  turno.estado = estado;
  return turno;
}

export function deleteTurno(id: string): boolean {
  const index = store.turnos.findIndex(t => t.id === id);
  if (index === -1) return false;
  store.turnos.splice(index, 1);
  return true;
}

export function isSlotBooked(fecha: string, hora: string): boolean {
  return store.turnos.some(
    t => t.fecha === fecha && t.hora === hora && t.estado !== 'cancelado'
  );
}

export function getAvailableSlots(fecha: string, duracion: number = 30): TimeSlot[] {
  const date = new Date(fecha + 'T12:00:00');
  const dayIndex = date.getDay();
  const dias: DiaSemana[] = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
  const dia = dias[dayIndex];
  
  const horario = store.horarios[dia];
  if (!horario.activo) return [];
  
  const slots: TimeSlot[] = [];
  const [startHour, startMin] = horario.inicio.split(':').map(Number);
  const [endHour, endMin] = horario.fin.split(':').map(Number);
  
  let current = startHour * 60 + startMin;
  const end = endHour * 60 + endMin;
  
  while (current + duracion <= end) {
    const hour = Math.floor(current / 60);
    const min = current % 60;
    const hora = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
    
    slots.push({
      hora,
      disponible: !isSlotBooked(fecha, hora),
    });
    
    current += 30;
  }
  
  return slots;
}

export function getClinica(): Clinica {
  return { ...store.clinica };
}

export function getNextDays(count: number): string[] {
  const days: string[] = [];
  const today = new Date();
  
  for (let i = 0; i < count; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i + 1);
    days.push(date.toISOString().split('T')[0]);
  }
  
  return days;
}
