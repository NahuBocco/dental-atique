export interface Prestacion {
  id: string;
  nombre: string;
  descripcion: string;
  descripcionLarga: string;
  duracion: number;
  precio: number;
  imagen: string;
}

export interface Horario {
  inicio: string;
  fin: string;
  activo: boolean;
}

export interface Horarios {
  lunes: Horario;
  martes: Horario;
  miercoles: Horario;
  jueves: Horario;
  viernes: Horario;
  sabado: Horario;
  domingo: Horario;
}

export interface Paciente {
  nombre: string;
  telefono: string;
  email: string;
}

export type TurnoEstado = 'pendiente' | 'confirmado' | 'cancelado' | 'completado';

export interface Turno {
  id: string;
  prestacionId: string;
  fecha: string;
  hora: string;
  paciente: Paciente;
  estado: TurnoEstado;
  createdAt: string;
}

export interface Clinica {
  nombre: string;
  direccion: string;
  telefono: string;
  instagram: string;
  facebook: string;
  zona: string;
}

export interface TimeSlot {
  hora: string;
  disponible: boolean;
}

export type DiaSemana = 'lunes' | 'martes' | 'miercoles' | 'jueves' | 'viernes' | 'sabado' | 'domingo';
