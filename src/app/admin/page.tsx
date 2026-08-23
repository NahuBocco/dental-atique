import Link from 'next/link';
import { getTurnos, getPrestaciones, getHorarios } from '@/lib/store';
import { formatDate, getEstadoColor, getEstadoLabel } from '@/lib/utils';

export default function AdminDashboard() {
  const turnos = getTurnos();
  const prestaciones = getPrestaciones();
  const horarios = getHorarios();

  const turnosHoy = turnos.filter(t => {
    const today = new Date().toISOString().split('T')[0];
    return t.fecha === today;
  });

  const turnosPendientes = turnos.filter(t => t.estado === 'pendiente');
  const turnosConfirmados = turnos.filter(t => t.estado === 'confirmado');
  const proximosTurnos = turnos
    .filter(t => t.estado !== 'cancelado' && new Date(t.fecha) >= new Date())
    .slice(0, 5);

  const diasActivos = Object.values(horarios).filter(h => h.activo).length;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text">Dashboard</h1>
        <p className="text-gray-600 mt-1">Resumen general de la clínica</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Turnos Hoy</p>
              <p className="text-3xl font-bold text-text mt-1">{turnosHoy.length}</p>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Pendientes</p>
              <p className="text-3xl font-bold text-yellow-600 mt-1">{turnosPendientes.length}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Confirmados</p>
              <p className="text-3xl font-bold text-green-600 mt-1">{turnosConfirmados.length}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Prestaciones</p>
              <p className="text-3xl font-bold text-text mt-1">{prestaciones.length}</p>
            </div>
            <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
              <svg className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-text">Próximos Turnos</h2>
            <Link href="/admin/turnos" className="text-primary hover:text-secondary text-sm font-medium">
              Ver todos →
            </Link>
          </div>
          
          {proximosTurnos.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No hay turnos próximos</p>
          ) : (
            <div className="space-y-4">
              {proximosTurnos.map((turno) => {
                const prestacion = prestaciones.find(p => p.id === turno.prestacionId);
                return (
                  <div
                    key={turno.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                  >
                    <div>
                      <p className="font-medium text-text">{turno.paciente.nombre}</p>
                      <p className="text-sm text-gray-500">
                        {prestacion?.nombre} • {formatDate(turno.fecha)} • {turno.hora}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEstadoColor(turno.estado)}`}>
                      {getEstadoLabel(turno.estado)}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-text">Accesos Rápidos</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Link
              href="/admin/turnos"
              className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-center"
            >
              <svg className="h-8 w-8 text-primary mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="font-medium text-text">Gestionar Turnos</span>
            </Link>

            <Link
              href="/admin/prestaciones"
              className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-center"
            >
              <svg className="h-8 w-8 text-primary mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <span className="font-medium text-text">Prestaciones</span>
            </Link>

            <Link
              href="/admin/horarios"
              className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-center"
            >
              <svg className="h-8 w-8 text-primary mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium text-text">Horarios</span>
              <span className="block text-sm text-gray-500 mt-1">{diasActivos} días activos</span>
            </Link>

            <Link
              href="/turnos"
              target="_blank"
              className="p-6 bg-primary/10 rounded-xl hover:bg-primary/20 transition-colors text-center"
            >
              <svg className="h-8 w-8 text-primary mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span className="font-medium text-text">Ver Sitio Público</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
