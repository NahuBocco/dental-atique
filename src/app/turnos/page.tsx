import type { Metadata } from 'next';
import { Suspense } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookingWizard from '@/components/BookingWizard';
import { getPrestaciones, getClinica } from '@/lib/store';

export const metadata: Metadata = {
  title: 'Reservar Turno Online',
  description: 'Reservá tu turno online de manera rápida y sencilla. Elegí el servicio, fecha y horario que más te convenga.',
};

function BookingWizardWrapper() {
  const prestaciones = getPrestaciones();
  return <BookingWizard prestaciones={prestaciones} />;
}

export default function TurnosPage() {
  const clinica = getClinica();

  return (
    <>
      <Header />
      <main className="flex-1 bg-gray-50">
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-text">
                Reservá tu Turno Online
              </h1>
              <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
                Elegí el servicio, fecha y horario que mejor te convenga. 
                Te confirmamos tu turno al instante.
              </p>
            </div>

            <Suspense fallback={
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            }>
              <BookingWizardWrapper />
            </Suspense>

            <div className="mt-16 text-center">
              <p className="text-gray-600">
                ¿Preferís llamar? Contactanos al{' '}
                <a
                  href={`tel:${clinica.telefono.replace(/\s/g, '')}`}
                  className="text-primary font-semibold hover:text-secondary"
                >
                  {clinica.telefono}
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
