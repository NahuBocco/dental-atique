import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getPrestacion, getPrestaciones } from '@/lib/store';
import { formatPrice } from '@/lib/utils';

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const prestacion = getPrestacion(id);

  if (!prestacion) {
    return {
      title: 'Servicio no encontrado',
    };
  }

  return {
    title: prestacion.nombre,
    description: prestacion.descripcion,
  };
}

export async function generateStaticParams() {
  const prestaciones = getPrestaciones();
  return prestaciones.map((p) => ({ id: p.id }));
}

export default async function ServicioPage({ params }: PageProps) {
  const { id } = await params;
  const prestacion = getPrestacion(id);

  if (!prestacion) {
    notFound();
  }

  const otrosPrestaciones = getPrestaciones()
    .filter((p) => p.id !== id)
    .slice(0, 3);

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-to-br from-primary/10 via-white to-secondary/5 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="mb-8">
              <ol className="flex items-center space-x-2 text-sm">
                <li>
                  <Link href="/" className="text-gray-500 hover:text-primary">
                    Inicio
                  </Link>
                </li>
                <li className="text-gray-400">/</li>
                <li>
                  <Link href="/servicios" className="text-gray-500 hover:text-primary">
                    Servicios
                  </Link>
                </li>
                <li className="text-gray-400">/</li>
                <li className="text-text font-medium">{prestacion.nombre}</li>
              </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl aspect-video lg:aspect-square flex items-center justify-center">
                <svg
                  className="h-32 w-32 text-primary/40"
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

              <div>
                <h1 className="text-4xl font-bold text-text mb-4">
                  {prestacion.nombre}
                </h1>
                <p className="text-xl text-gray-600 mb-6">
                  {prestacion.descripcion}
                </p>

                <div className="flex items-center gap-6 mb-8">
                  <div>
                    <span className="text-4xl font-bold text-primary">
                      {formatPrice(prestacion.precio)}
                    </span>
                  </div>
                  <div className="h-12 w-px bg-gray-200"></div>
                  <div>
                    <span className="text-gray-500">Duración aprox.</span>
                    <p className="text-xl font-semibold text-text">
                      {prestacion.duracion} minutos
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                  <h2 className="font-semibold text-text mb-4">
                    Sobre este tratamiento
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    {prestacion.descripcionLarga}
                  </p>
                </div>

                <Link
                  href={`/turnos?prestacion=${prestacion.id}`}
                  className="inline-block w-full sm:w-auto bg-primary text-white text-center px-8 py-4 rounded-full hover:bg-secondary transition-colors font-semibold text-lg"
                >
                  Reservar Turno para {prestacion.nombre}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {otrosPrestaciones.length > 0 && (
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-text mb-8">
                Otros servicios que podrían interesarte
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {otrosPrestaciones.map((p) => (
                  <Link
                    key={p.id}
                    href={`/servicios/${p.id}`}
                    className="block bg-gray-50 rounded-2xl p-6 hover:shadow-md transition-shadow"
                  >
                    <h3 className="font-semibold text-text mb-2">{p.nombre}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {p.descripcion}
                    </p>
                    <span className="text-primary font-bold">
                      {formatPrice(p.precio)}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
