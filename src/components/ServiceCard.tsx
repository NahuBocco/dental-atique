import Link from 'next/link';
import type { Prestacion } from '@/lib/types';
import { formatPrice } from '@/lib/utils';

interface ServiceCardProps {
  prestacion: Prestacion;
}

export default function ServiceCard({ prestacion }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow overflow-hidden group">
      <div className="h-48 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
        <svg
          className="h-20 w-20 text-primary/40 group-hover:text-primary/60 transition-colors"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
          />
        </svg>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-text mb-2">{prestacion.nombre}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{prestacion.descripcion}</p>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-primary">{formatPrice(prestacion.precio)}</span>
            <span className="text-gray-500 text-sm ml-2">/ {prestacion.duracion} min</span>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <Link
            href={`/servicios/${prestacion.id}`}
            className="flex-1 text-center py-2 px-4 border-2 border-primary text-primary rounded-full hover:bg-primary hover:text-white transition-colors font-medium"
          >
            Ver más
          </Link>
          <Link
            href={`/turnos?prestacion=${prestacion.id}`}
            className="flex-1 text-center py-2 px-4 bg-primary text-white rounded-full hover:bg-secondary transition-colors font-medium"
          >
            Reservar
          </Link>
        </div>
      </div>
    </div>
  );
}
