'use client';

import { useState, useEffect } from 'react';
import type { Horarios, DiaSemana } from '@/lib/types';
import { getDayNameSpanish } from '@/lib/utils';

const diasOrdenados: DiaSemana[] = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];

export default function HorariosAdminPage() {
  const [horarios, setHorarios] = useState<Horarios | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchHorarios();
  }, []);

  const fetchHorarios = async () => {
    const response = await fetch('/api/horarios');
    const data = await response.json();
    setHorarios(data.horarios);
    setIsLoading(false);
  };

  const handleToggleDay = (dia: DiaSemana) => {
    if (!horarios) return;
    setHorarios({
      ...horarios,
      [dia]: {
        ...horarios[dia],
        activo: !horarios[dia].activo,
      },
    });
  };

  const handleTimeChange = (dia: DiaSemana, field: 'inicio' | 'fin', value: string) => {
    if (!horarios) return;
    setHorarios({
      ...horarios,
      [dia]: {
        ...horarios[dia],
        [field]: value,
      },
    });
  };

  const handleSave = async () => {
    if (!horarios) return;
    setIsSaving(true);
    setMessage(null);

    try {
      const response = await fetch('/api/horarios', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(horarios),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Horarios guardados correctamente' });
      } else {
        throw new Error('Error al guardar');
      }
    } catch {
      setMessage({ type: 'error', text: 'Error al guardar los horarios' });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading || !horarios) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text">Gestión de Horarios</h1>
        <p className="text-gray-600 mt-1">Configurá los horarios de atención de la clínica</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        {message && (
          <div
            className={`mb-6 p-4 rounded-xl ${
              message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="space-y-4">
          {diasOrdenados.map((dia) => {
            const horario = horarios[dia];
            return (
              <div
                key={dia}
                className={`flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl ${
                  horario.activo ? 'bg-gray-50' : 'bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-4 min-w-[180px]">
                  <button
                    onClick={() => handleToggleDay(dia)}
                    className={`w-12 h-6 rounded-full transition-colors relative ${
                      horario.activo ? 'bg-primary' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        horario.activo ? 'left-7' : 'left-1'
                      }`}
                    />
                  </button>
                  <span className={`font-medium ${horario.activo ? 'text-text' : 'text-gray-400'}`}>
                    {getDayNameSpanish(dia)}
                  </span>
                </div>

                {horario.activo ? (
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex items-center gap-2">
                      <label className="text-sm text-gray-500">Desde:</label>
                      <input
                        type="time"
                        value={horario.inicio}
                        onChange={(e) => handleTimeChange(dia, 'inicio', e.target.value)}
                        className="px-3 py-2 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="text-sm text-gray-500">Hasta:</label>
                      <input
                        type="time"
                        value={horario.fin}
                        onChange={(e) => handleTimeChange(dia, 'fin', e.target.value)}
                        className="px-3 py-2 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                      />
                    </div>
                  </div>
                ) : (
                  <span className="text-gray-400 italic">Cerrado</span>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 pt-6 border-t">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-primary text-white px-8 py-3 rounded-full hover:bg-secondary transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? 'Guardando...' : 'Guardar Horarios'}
          </button>
        </div>
      </div>
    </div>
  );
}
