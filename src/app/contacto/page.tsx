import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getClinica, getHorarios } from '@/lib/store';
import { getDayNameSpanish } from '@/lib/utils';
import type { DiaSemana } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Contactanos para consultas o para reservar tu turno. Estamos ubicados en Microcentro, CABA.',
};

export default function ContactoPage() {
  const clinica = getClinica();
  const horarios = getHorarios();
  const diasOrdenados: DiaSemana[] = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-to-br from-primary/10 via-white to-secondary/5 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-text">
                Contacto
              </h1>
              <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
                Estamos para ayudarte. Contactanos por cualquier consulta o reservá tu turno online.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold text-text mb-8">
                  Información de Contacto
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-text">Dirección</h3>
                      <p className="text-gray-600 mt-1">{clinica.direccion}</p>
                      <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(clinica.direccion)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary text-sm hover:text-secondary mt-2 inline-block"
                      >
                        Ver en Google Maps →
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-text">Teléfono</h3>
                      <a
                        href={`tel:${clinica.telefono.replace(/\s/g, '')}`}
                        className="text-primary text-lg font-medium hover:text-secondary mt-1 inline-block"
                      >
                        {clinica.telefono}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="h-6 w-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-text">Instagram</h3>
                      <a
                        href={`https://instagram.com/${clinica.instagram.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-secondary mt-1 inline-block"
                      >
                        {clinica.instagram}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="h-6 w-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-text">Facebook</h3>
                      <a
                        href={`https://facebook.com/${clinica.facebook}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-secondary mt-1 inline-block"
                      >
                        /{clinica.facebook}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-12">
                  <h2 className="text-2xl font-bold text-text mb-6">
                    Horarios de Atención
                  </h2>
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <ul className="space-y-3">
                      {diasOrdenados.map((dia) => {
                        const horario = horarios[dia];
                        return (
                          <li
                            key={dia}
                            className={`flex justify-between items-center py-2 border-b border-gray-200 last:border-0 ${
                              !horario.activo ? 'text-gray-400' : ''
                            }`}
                          >
                            <span className="font-medium">{getDayNameSpanish(dia)}</span>
                            <span>
                              {horario.activo
                                ? `${horario.inicio} - ${horario.fin}`
                                : 'Cerrado'}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-gray-50 rounded-3xl p-8 mb-8">
                  <h2 className="text-2xl font-bold text-text mb-4">
                    Reservá tu turno online
                  </h2>
                  <p className="text-gray-600 mb-6">
                    La forma más rápida y cómoda de agendar tu consulta. 
                    Elegí el servicio, fecha y horario que prefieras.
                  </p>
                  <Link
                    href="/turnos"
                    className="block w-full bg-primary text-white text-center py-4 rounded-full hover:bg-secondary transition-colors font-semibold text-lg"
                  >
                    Reservar Turno Online
                  </Link>
                </div>

                <div className="bg-gray-200 rounded-3xl overflow-hidden h-[400px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.0167424295147!2d-58.3782694!3d-34.6037389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccacf47e56a3d%3A0x4a5c8c9c5f7e0f0!2sTucum%C3%A1n%20335%2C%20C1049%20San%20Nicol%C3%A1s%2C%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1692800000000!5m2!1ses!2sar"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ubicación de Dental Atique"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
