import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServiceCard from '@/components/ServiceCard';
import { getPrestaciones, getClinica } from '@/lib/store';

export default function HomePage() {
  const prestaciones = getPrestaciones().slice(0, 4);
  const clinica = getClinica();

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="relative bg-gradient-to-br from-primary/10 via-white to-secondary/5 py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text leading-tight">
                  Tu sonrisa,
                  <span className="text-primary"> nuestra pasión</span>
                </h1>
                <p className="mt-6 text-xl text-gray-600 max-w-lg">
                  En <strong>{clinica.nombre}</strong> cuidamos tu salud bucal con profesionalismo,
                  tecnología de vanguardia y un trato personalizado. Ubicados en el corazón de {clinica.zona}.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/turnos"
                    className="inline-flex items-center justify-center bg-primary text-white px-8 py-4 rounded-full hover:bg-secondary transition-colors font-semibold text-lg"
                  >
                    Reservar Turno Online
                    <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <Link
                    href="/servicios"
                    className="inline-flex items-center justify-center border-2 border-primary text-primary px-8 py-4 rounded-full hover:bg-primary hover:text-white transition-colors font-semibold text-lg"
                  >
                    Ver Servicios
                  </Link>
                </div>
                <div className="mt-8 flex items-center gap-6 text-gray-600">
                  <div className="flex items-center gap-2">
                    <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>{clinica.telefono}</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary to-secondary p-1">
                  <div className="w-full h-full rounded-3xl bg-white flex items-center justify-center">
                    <Image
                      src="/logo.svg"
                      alt={clinica.nombre}
                      width={300}
                      height={300}
                      className="w-2/3 h-auto"
                      priority
                    />
                  </div>
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-text">Turnos Online</p>
                    <p className="text-sm text-gray-500">24/7 disponible</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">+10</div>
                <div className="text-gray-600 mt-1">Años de experiencia</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">+5000</div>
                <div className="text-gray-600 mt-1">Pacientes atendidos</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">8</div>
                <div className="text-gray-600 mt-1">Especialidades</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">100%</div>
                <div className="text-gray-600 mt-1">Compromiso</div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-text">
                Nuestros Servicios
              </h2>
              <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
                Ofrecemos una amplia gama de tratamientos dentales para cuidar tu sonrisa
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {prestaciones.map((prestacion) => (
                <ServiceCard key={prestacion.id} prestacion={prestacion} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Link
                href="/servicios"
                className="inline-flex items-center text-primary hover:text-secondary font-semibold text-lg transition-colors"
              >
                Ver todos los servicios
                <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 bg-primary text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold">
                  ¿Por qué elegirnos?
                </h2>
                <ul className="mt-8 space-y-6">
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Profesionales especializados</h3>
                      <p className="text-white/80">Equipo de odontólogos con amplia experiencia y formación continua.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Tecnología de vanguardia</h3>
                      <p className="text-white/80">Equipamiento moderno para diagnósticos precisos y tratamientos eficaces.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Ubicación céntrica</h3>
                      <p className="text-white/80">En pleno {clinica.zona}, fácil acceso en transporte público.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Turnos online</h3>
                      <p className="text-white/80">Reservá tu turno las 24 horas desde cualquier dispositivo.</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-3xl p-8 text-text">
                <h3 className="text-2xl font-bold mb-6">Reservá tu turno ahora</h3>
                <p className="text-gray-600 mb-6">
                  Completá el formulario online en minutos y elegí el horario que mejor te convenga.
                </p>
                <Link
                  href="/turnos"
                  className="block w-full bg-primary text-white text-center py-4 rounded-full hover:bg-secondary transition-colors font-semibold text-lg"
                >
                  Reservar Turno
                </Link>
                <p className="text-center text-gray-500 text-sm mt-4">
                  O llamanos al <a href={`tel:${clinica.telefono.replace(/\s/g, '')}`} className="text-primary font-medium">{clinica.telefono}</a>
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-text">
                Encontranos
              </h2>
              <p className="mt-4 text-xl text-gray-600">
                Visitanos en nuestra clínica
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-gray-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-text mb-6">Información de contacto</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4">
                    <svg className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <p className="font-medium text-text">Dirección</p>
                      <p className="text-gray-600">{clinica.direccion}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <svg className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div>
                      <p className="font-medium text-text">Teléfono</p>
                      <a href={`tel:${clinica.telefono.replace(/\s/g, '')}`} className="text-primary hover:text-secondary">
                        {clinica.telefono}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <svg className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    <div>
                      <p className="font-medium text-text">Instagram</p>
                      <a
                        href={`https://instagram.com/${clinica.instagram.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-secondary"
                      >
                        {clinica.instagram}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <svg className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    <div>
                      <p className="font-medium text-text">Facebook</p>
                      <a
                        href={`https://facebook.com/${clinica.facebook}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-secondary"
                      >
                        /{clinica.facebook}
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="bg-gray-200 rounded-2xl overflow-hidden min-h-[300px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.0167424295147!2d-58.3782694!3d-34.6037389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccacf47e56a3d%3A0x4a5c8c9c5f7e0f0!2sTucum%C3%A1n%20335%2C%20C1049%20San%20Nicol%C3%A1s%2C%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1692800000000!5m2!1ses!2sar"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '300px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación de Dental Atique"
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
