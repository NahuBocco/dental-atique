'use client';

import { useState, useEffect } from 'react';
import type { Turno, Prestacion, TurnoEstado } from '@/lib/types';
import { formatDate, getEstadoColor, getEstadoLabel } from '@/lib/utils';

export default function TurnosAdminPage() {
  const [turnos, setTurnos] = useState<Turno[]>([]);
  const [prestaciones, setPrestaciones] = useState<Prestacion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<TurnoEstado | 'todos'>('todos');

  useEffect(() => {
    Promise.all([
      fetch('/api/turnos').then(res => res.json()),
      fetch('/api/prestaciones').then(res => res.json()),
    ]).then(([turnosData, prestacionesData]) => {
      setTurnos(turnosData.turnos);
      setPrestaciones(prestacionesData.prestaciones);
      setIsLoading(false);
    });
  }, []);

  const handleStatusChange = async (turnoId: string, newStatus: TurnoEstado) => {
    try {
      const response = await fetch(`/api/turnos/${turnoId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado: newStatus }),
      });

      if (response.ok) {
        setTurnos(prev =>
          prev.map(t => (t.id === turnoId ? { ...t, estado: newStatus } : t))
        );
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDelete = async (turnoId: string) => {
    if (!confirm('¿Estás seguro de eliminar este turno?')) return;

    try {
      const response = await fetch(`/api/turnos/${turnoId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTurnos(prev => prev.filter(t => t.id !== turnoId));
      }
    } catch (error) {
      console.error('Error deleting turno:', error);
    }
  };

  const getPrestacionNombre = (id: string) => {
    return prestaciones.find(p => p.id === id)?.nombre || 'Desconocido';
  };

  const filteredTurnos = filter === 'todos' 
    ? turnos 
    : turnos.filter(t => t.estado === filter);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text">Gestión de Turnos</h1>
          <p className="text-gray-600 mt-1">Administrá los turnos de la clínica</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b flex flex-wrap gap-2">
          {(['todos', 'pendiente', 'confirmado', 'completado', 'cancelado'] as const).map((estado) => (
            <button
              key={estado}
              onClick={() => setFilter(estado)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === estado
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {estado === 'todos' ? 'Todos' : getEstadoLabel(estado)}
              {estado !== 'todos' && (
                <span className="ml-2 bg-white/20 px-2 py-0.5 rounded-full text-xs">
                  {turnos.filter(t => t.estado === estado).length}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Paciente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prestación
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha y Hora
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTurnos.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    No hay turnos para mostrar
                  </td>
                </tr>
              ) : (
                filteredTurnos.map((turno) => (
                  <tr key={turno.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-text">{turno.paciente.nombre}</p>
                        <p className="text-sm text-gray-500">{turno.paciente.telefono}</p>
                        <p className="text-sm text-gray-500">{turno.paciente.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-text">{getPrestacionNombre(turno.prestacionId)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-text">{formatDate(turno.fecha)}</p>
                      <p className="text-sm text-gray-500">{turno.hora} hs</p>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={turno.estado}
                        onChange={(e) => handleStatusChange(turno.id, e.target.value as TurnoEstado)}
                        className={`px-3 py-1 rounded-full text-sm font-medium border-0 cursor-pointer ${getEstadoColor(turno.estado)}`}
                      >
                        <option value="pendiente">Pendiente</option>
                        <option value="confirmado">Confirmado</option>
                        <option value="completado">Completado</option>
                        <option value="cancelado">Cancelado</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(turno.id)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
