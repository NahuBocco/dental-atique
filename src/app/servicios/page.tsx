import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServiceCard from '@/components/ServiceCard';
import { getPrestaciones } from '@/lib/store';

export const metadata: Metadata = {
  title: 'Servicios',
  description: 'Conocé todos los servicios dentales que ofrecemos: limpieza dental, blanqueamiento, ortodoncia, implantes, endodoncia y más.',
};

export default function ServiciosPage() {
  const prestaciones = getPrestaciones();

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-to-br from-primary/10 via-white to-secondary/5 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-text">
                Nuestros Servicios
              </h1>
              <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
                Ofrecemos una amplia gama de tratamientos dentales con la más alta calidad
                y tecnología de vanguardia
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {prestaciones.map((prestacion) => (
                <ServiceCard key={prestacion.id} prestacion={prestacion} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-primary rounded-3xl p-8 md:p-12 text-white text-center">
              <h2 className="text-3xl font-bold mb-4">
                ¿Necesitás un turno?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Reservá tu consulta online en minutos y elegí el horario que mejor te convenga
              </p>
              <a
                href="/turnos"
                className="inline-block bg-white text-primary px-8 py-4 rounded-full hover:bg-gray-100 transition-colors font-semibold text-lg"
              >
                Reservar Turno Online
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
