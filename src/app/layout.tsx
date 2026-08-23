import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getClinica } from "@/lib/store";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const clinica = getClinica();

export const metadata: Metadata = {
  title: {
    default: `${clinica.nombre} | Clínica Dental en ${clinica.zona}`,
    template: `%s | ${clinica.nombre}`,
  },
  description: `${clinica.nombre} - Tu clínica dental de confianza en ${clinica.zona}, CABA. Turnos online, servicios de odontología general, estética y especialidades. ${clinica.direccion}`,
  keywords: ["dentista", "odontología", "turnos online", "clínica dental", "microcentro", "CABA", "Buenos Aires"],
  openGraph: {
    title: `${clinica.nombre} | Clínica Dental`,
    description: `Tu clínica dental de confianza en ${clinica.zona}. Reservá tu turno online.`,
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background">{children}</body>
    </html>
  );
}
