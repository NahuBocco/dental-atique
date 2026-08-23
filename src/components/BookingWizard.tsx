'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import type { Prestacion, TimeSlot } from '@/lib/types';
import { formatPrice, formatDate, formatDateShort } from '@/lib/utils';

interface BookingWizardProps {
  prestaciones: Prestacion[];
}

interface FormData {
  nombre: string;
  telefono: string;
  email: string;
}

type Step = 1 | 2 | 3 | 4 | 5;

export default function BookingWizard({ prestaciones }: BookingWizardProps) {
  const searchParams = useSearchParams();
  const initialPrestacion = searchParams.get('prestacion');

  const [step, setStep] = useState<Step>(initialPrestacion ? 2 : 1);
  const [selectedPrestacion, setSelectedPrestacion] = useState<string>(initialPrestacion || '');
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    telefono: '',
    email: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>('');
  const [confirmationData, setConfirmationData] = useState<{
    turno: { id: string; fecha: string; hora: string };
    prestacion: Prestacion;
  } | null>(null);

  useEffect(() => {
    fetch('/api/turnos/dates')
      .then(res => res.json())
      .then(data => setAvailableDates(data.dates))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (selectedDate && selectedPrestacion) {
      const prestacion = prestaciones.find(p => p.id === selectedPrestacion);
      const duracion = prestacion?.duracion || 30;
      fetch(`/api/turnos/slots?fecha=${selectedDate}&duracion=${duracion}`)
        .then(res => res.json())
        .then(data => setSlots(data.slots))
        .catch(console.error);
    }
  }, [selectedDate, selectedPrestacion, prestaciones]);

  const handlePrestacionSelect = (id: string) => {
    setSelectedPrestacion(id);
    setStep(2);
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedSlot('');
    setStep(3);
  };

  const handleSlotSelect = (hora: string) => {
    setSelectedSlot(hora);
    setStep(4);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/turnos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prestacionId: selectedPrestacion,
          fecha: selectedDate,
          hora: selectedSlot,
          paciente: formData,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al crear el turno');
      }

      const prestacion = prestaciones.find(p => p.id === selectedPrestacion)!;
      setConfirmationData({ turno: data.turno, prestacion });
      setStep(5);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPrestacion = () => prestaciones.find(p => p.id === selectedPrestacion);

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3, 4].map((s) => (
        <div key={s} className="flex items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
              step >= s ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
            }`}
          >
            {s}
          </div>
          {s < 4 && (
            <div
              className={`w-12 h-1 transition-colors ${
                step > s ? 'bg-primary' : 'bg-gray-200'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );

  if (step === 5 && confirmationData) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-text mb-4">¡Turno Confirmado!</h2>
          <p className="text-gray-600 mb-8">
            Tu turno ha sido registrado exitosamente. Te esperamos en nuestra clínica.
          </p>
          <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
            <h3 className="font-semibold text-text mb-4">Detalles del turno:</h3>
            <dl className="space-y-3">
              <div className="flex justify-between">
                <dt className="text-gray-600">Servicio:</dt>
                <dd className="font-medium text-text">{confirmationData.prestacion.nombre}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-600">Fecha:</dt>
                <dd className="font-medium text-text">{formatDate(confirmationData.turno.fecha)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-600">Hora:</dt>
                <dd className="font-medium text-text">{confirmationData.turno.hora} hs</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-600">Paciente:</dt>
                <dd className="font-medium text-text">{formData.nombre}</dd>
              </div>
              <div className="flex justify-between border-t pt-3 mt-3">
                <dt className="text-gray-600">Código de turno:</dt>
                <dd className="font-mono text-primary">{confirmationData.turno.id}</dd>
              </div>
            </dl>
          </div>
          <p className="text-sm text-gray-500 mb-6">
            Guardá el código de turno. Te contactaremos para confirmar.
          </p>
          <a
            href="/"
            className="inline-block bg-primary text-white px-8 py-3 rounded-full hover:bg-secondary transition-colors font-medium"
          >
            Volver al inicio
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {renderStepIndicator()}

      {step === 1 && (
        <div>
          <h2 className="text-2xl font-bold text-text mb-6 text-center">
            Seleccioná el servicio que necesitás
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {prestaciones.map((prestacion) => (
              <button
                key={prestacion.id}
                onClick={() => handlePrestacionSelect(prestacion.id)}
                className={`p-6 rounded-xl border-2 text-left transition-all hover:border-primary hover:shadow-md ${
                  selectedPrestacion === prestacion.id
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200'
                }`}
              >
                <h3 className="font-semibold text-text mb-2">{prestacion.nombre}</h3>
                <p className="text-sm text-gray-600 mb-3">{prestacion.descripcion}</p>
                <div className="flex items-center justify-between">
                  <span className="text-primary font-bold">{formatPrice(prestacion.precio)}</span>
                  <span className="text-gray-500 text-sm">{prestacion.duracion} min</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <button
            onClick={() => setStep(1)}
            className="flex items-center text-gray-600 hover:text-primary mb-6 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Cambiar servicio
          </button>
          
          <div className="bg-primary/5 rounded-xl p-4 mb-6">
            <p className="text-text">
              <span className="font-semibold">Servicio seleccionado:</span> {getPrestacion()?.nombre}
            </p>
          </div>

          <h2 className="text-2xl font-bold text-text mb-6 text-center">
            Elegí el día para tu turno
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {availableDates.map((date) => (
              <button
                key={date}
                onClick={() => handleDateSelect(date)}
                className={`p-4 rounded-xl border-2 text-center transition-all hover:border-primary ${
                  selectedDate === date
                    ? 'border-primary bg-primary text-white'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <span className="block text-sm font-medium">
                  {formatDateShort(date)}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <button
            onClick={() => setStep(2)}
            className="flex items-center text-gray-600 hover:text-primary mb-6 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Cambiar fecha
          </button>

          <div className="bg-primary/5 rounded-xl p-4 mb-6">
            <p className="text-text">
              <span className="font-semibold">Servicio:</span> {getPrestacion()?.nombre}
              <span className="mx-2">•</span>
              <span className="font-semibold">Fecha:</span> {formatDate(selectedDate)}
            </p>
          </div>

          <h2 className="text-2xl font-bold text-text mb-6 text-center">
            Seleccioná el horario
          </h2>
          
          {slots.length === 0 ? (
            <p className="text-center text-gray-600 py-8">
              No hay horarios disponibles para esta fecha. Por favor, seleccioná otra.
            </p>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {slots.map((slot) => (
                <button
                  key={slot.hora}
                  onClick={() => slot.disponible && handleSlotSelect(slot.hora)}
                  disabled={!slot.disponible}
                  className={`p-3 rounded-xl border-2 text-center transition-all ${
                    !slot.disponible
                      ? 'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed'
                      : selectedSlot === slot.hora
                      ? 'border-primary bg-primary text-white'
                      : 'border-gray-200 hover:border-primary hover:bg-gray-50'
                  }`}
                >
                  {slot.hora}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {step === 4 && (
        <div>
          <button
            onClick={() => setStep(3)}
            className="flex items-center text-gray-600 hover:text-primary mb-6 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Cambiar horario
          </button>

          <div className="bg-primary/5 rounded-xl p-4 mb-6">
            <p className="text-text">
              <span className="font-semibold">Servicio:</span> {getPrestacion()?.nombre}
              <span className="mx-2">•</span>
              <span className="font-semibold">Fecha:</span> {formatDate(selectedDate)}
              <span className="mx-2">•</span>
              <span className="font-semibold">Hora:</span> {selectedSlot} hs
            </p>
          </div>

          <h2 className="text-2xl font-bold text-text mb-6 text-center">
            Completá tus datos
          </h2>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-text mb-1">
                Nombre completo *
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                required
                value={formData.nombre}
                onChange={handleFormChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                placeholder="Juan Pérez"
              />
            </div>

            <div>
              <label htmlFor="telefono" className="block text-sm font-medium text-text mb-1">
                Teléfono *
              </label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                required
                value={formData.telefono}
                onChange={handleFormChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                placeholder="1155443322"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text mb-1">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleFormChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                placeholder="juan@email.com"
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-white py-4 rounded-full hover:bg-secondary transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Confirmando...' : 'Confirmar Turno'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
