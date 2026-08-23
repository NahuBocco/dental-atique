import type { DiaSemana } from './types';

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
  }).format(price);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString + 'T12:00:00');
  return new Intl.DateTimeFormat('es-AR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function formatDateShort(dateString: string): string {
  const date = new Date(dateString + 'T12:00:00');
  return new Intl.DateTimeFormat('es-AR', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  }).format(date);
}

export function getDayName(dateString: string): DiaSemana {
  const date = new Date(dateString + 'T12:00:00');
  const days: DiaSemana[] = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
  return days[date.getDay()];
}

export function getDayNameSpanish(day: DiaSemana): string {
  const names: Record<DiaSemana, string> = {
    lunes: 'Lunes',
    martes: 'Martes',
    miercoles: 'Miércoles',
    jueves: 'Jueves',
    viernes: 'Viernes',
    sabado: 'Sábado',
    domingo: 'Domingo',
  };
  return names[day];
}

export function getEstadoColor(estado: string): string {
  const colors: Record<string, string> = {
    pendiente: 'bg-yellow-100 text-yellow-800',
    confirmado: 'bg-green-100 text-green-800',
    cancelado: 'bg-red-100 text-red-800',
    completado: 'bg-blue-100 text-blue-800',
  };
  return colors[estado] || 'bg-gray-100 text-gray-800';
}

export function getEstadoLabel(estado: string): string {
  const labels: Record<string, string> = {
    pendiente: 'Pendiente',
    confirmado: 'Confirmado',
    cancelado: 'Cancelado',
    completado: 'Completado',
  };
  return labels[estado] || estado;
}
