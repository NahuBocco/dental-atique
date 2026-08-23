'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.svg"
                alt="Dental Atique"
                width={48}
                height={48}
                className="h-12 w-auto"
              />
              <span className="text-2xl font-bold text-primary">Dental Atique</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-text hover:text-primary transition-colors font-medium">
              Inicio
            </Link>
            <Link href="/servicios" className="text-text hover:text-primary transition-colors font-medium">
              Servicios
            </Link>
            <Link href="/turnos" className="text-text hover:text-primary transition-colors font-medium">
              Turnos
            </Link>
            <Link href="/contacto" className="text-text hover:text-primary transition-colors font-medium">
              Contacto
            </Link>
            <Link
              href="/turnos"
              className="bg-primary text-white px-6 py-2.5 rounded-full hover:bg-secondary transition-colors font-medium"
            >
              Reservar Turno
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-text hover:text-primary p-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-text hover:text-primary transition-colors font-medium px-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link
                href="/servicios"
                className="text-text hover:text-primary transition-colors font-medium px-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Servicios
              </Link>
              <Link
                href="/turnos"
                className="text-text hover:text-primary transition-colors font-medium px-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Turnos
              </Link>
              <Link
                href="/contacto"
                className="text-text hover:text-primary transition-colors font-medium px-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contacto
              </Link>
              <Link
                href="/turnos"
                className="bg-primary text-white px-6 py-2.5 rounded-full hover:bg-secondary transition-colors font-medium text-center mx-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Reservar Turno
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
