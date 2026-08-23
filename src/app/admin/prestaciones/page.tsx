'use client';

import { useState, useEffect } from 'react';
import type { Prestacion } from '@/lib/types';
import { formatPrice } from '@/lib/utils';

export default function PrestacionesAdminPage() {
  const [prestaciones, setPrestaciones] = useState<Prestacion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    descripcionLarga: '',
    duracion: '',
    precio: '',
  });

  useEffect(() => {
    fetchPrestaciones();
  }, []);

  const fetchPrestaciones = async () => {
    const response = await fetch('/api/prestaciones');
    const data = await response.json();
    setPrestaciones(data.prestaciones);
    setIsLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const url = editingId ? `/api/prestaciones/${editingId}` : '/api/prestaciones';
    const method = editingId ? 'PATCH' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          duracion: parseInt(formData.duracion, 10),
          precio: parseInt(formData.precio, 10),
        }),
      });

      if (response.ok) {
        fetchPrestaciones();
        resetForm();
      }
    } catch (error) {
      console.error('Error saving prestacion:', error);
    }
  };

  const handleEdit = (prestacion: Prestacion) => {
    setEditingId(prestacion.id);
    setFormData({
      nombre: prestacion.nombre,
      descripcion: prestacion.descripcion,
      descripcionLarga: prestacion.descripcionLarga,
      duracion: prestacion.duracion.toString(),
      precio: prestacion.precio.toString(),
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar esta prestación?')) return;

    try {
      const response = await fetch(`/api/prestaciones/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setPrestaciones(prev => prev.filter(p => p.id !== id));
      }
    } catch (error) {
      console.error('Error deleting prestacion:', error);
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      nombre: '',
      descripcion: '',
      descripcionLarga: '',
      duracion: '',
      precio: '',
    });
  };

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
          <h1 className="text-3xl font-bold text-text">Gestión de Prestaciones</h1>
          <p className="text-gray-600 mt-1">Administrá los servicios de la clínica</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-primary text-white px-6 py-3 rounded-full hover:bg-secondary transition-colors font-medium"
        >
          + Nueva Prestación
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold text-text mb-6">
            {editingId ? 'Editar Prestación' : 'Nueva Prestación'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text mb-1">
                  Nombre *
                </label>
                <input
                  type="text"
                  required
                  value={formData.nombre}
                  onChange={(e) => setFormData(prev => ({ ...prev, nombre: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                  placeholder="Ej: Limpieza Dental"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text mb-1">
                    Duración (min) *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.duracion}
                    onChange={(e) => setFormData(prev => ({ ...prev, duracion: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                    placeholder="30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-1">
                    Precio (ARS) *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.precio}
                    onChange={(e) => setFormData(prev => ({ ...prev, precio: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                    placeholder="15000"
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Descripción corta *
              </label>
              <input
                type="text"
                required
                value={formData.descripcion}
                onChange={(e) => setFormData(prev => ({ ...prev, descripcion: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                placeholder="Descripción breve del servicio"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Descripción larga
              </label>
              <textarea
                value={formData.descripcionLarga}
                onChange={(e) => setFormData(prev => ({ ...prev, descripcionLarga: e.target.value }))}
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                placeholder="Descripción detallada del servicio"
              />
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-primary text-white px-6 py-3 rounded-full hover:bg-secondary transition-colors font-medium"
              >
                {editingId ? 'Guardar Cambios' : 'Crear Prestación'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-100 text-gray-600 px-6 py-3 rounded-full hover:bg-gray-200 transition-colors font-medium"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Servicio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duración
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Precio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {prestaciones.map((prestacion) => (
                <tr key={prestacion.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-text">{prestacion.nombre}</p>
                      <p className="text-sm text-gray-500 line-clamp-2">{prestacion.descripcion}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-text">{prestacion.duracion} min</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-primary">{formatPrice(prestacion.precio)}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-4">
                      <button
                        onClick={() => handleEdit(prestacion)}
                        className="text-primary hover:text-secondary text-sm font-medium"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(prestacion.id)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
