# Dental Atique

Sitio web y sistema de turnos online para **Dental Atique**, clínica dental ubicada en Microcentro, CABA.

## Características

### Sitio Público
- **Página de inicio** (`/`) - Presentación de la clínica, servicios destacados y llamados a la acción
- **Servicios** (`/servicios`) - Listado completo de prestaciones dentales
- **Detalle de servicio** (`/servicios/[id]`) - Información detallada de cada prestación
- **Turnos online** (`/turnos`) - Wizard de reserva de turnos en 4 pasos:
  1. Selección de prestación
  2. Selección de fecha (próximos 14 días)
  3. Selección de horario disponible
  4. Formulario de datos del paciente
- **Contacto** (`/contacto`) - Información de contacto, horarios y mapa

### Panel de Administración (`/admin`)
- **Dashboard** - Resumen de turnos y accesos rápidos
- **Gestión de turnos** - CRUD completo con filtros por estado (pendiente, confirmado, completado, cancelado)
- **Gestión de prestaciones** - CRUD de servicios dentales
- **Configuración de horarios** - Horarios de atención por día de la semana

### Características Técnicas
- Validación de slots para evitar reservas duplicadas
- Almacenamiento en memoria (datos iniciales desde `seed.json`)
- Autenticación por cookie para el panel de administración
- Diseño responsive
- UI en español

## Stack Tecnológico

- **Framework**: Next.js 16 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS 4
- **Estado**: In-memory store (sin base de datos)

## Instalación

```bash
# Instalar dependencias
npm install

# Iniciar en modo desarrollo
npm run dev

# Construir para producción
npm run build

# Iniciar servidor de producción
npm start
```

## Configuración

### Variables de Entorno

| Variable | Descripción | Valor por defecto |
|----------|-------------|-------------------|
| `ADMIN_PASSWORD` | Contraseña del panel de administración | `admin123` |

### Acceso al Panel de Administración

1. Navegar a `/admin/login`
2. Ingresar la contraseña (por defecto: `admin123`)
3. La sesión se mantiene mediante cookie `ADMIN_PASSWORD`

## Datos de la Clínica

- **Nombre**: Dental Atique
- **Dirección**: Tucumán 335, C1049 San Nicolás, CABA
- **Teléfono**: 011 3504-5339
- **Instagram**: @dentalatique
- **Facebook**: /dentalatique
- **Zona**: Microcentro

## Paleta de Colores

| Color | Código | Uso |
|-------|--------|-----|
| Primary | `#00C2CB` | Color principal, botones, enlaces |
| Secondary | `#0089A3` | Hover states, acentos |
| Accent | `#4A90A4` | Elementos secundarios |
| Text | `#004B5C` | Texto principal |
| Background | `#FFFFFF` | Fondo |

## Estructura del Proyecto

```
src/
├── app/
│   ├── admin/              # Panel de administración
│   │   ├── components/     # Componentes del admin
│   │   ├── horarios/       # Gestión de horarios
│   │   ├── login/          # Página de login
│   │   ├── prestaciones/   # Gestión de prestaciones
│   │   ├── turnos/         # Gestión de turnos
│   │   ├── layout.tsx      # Layout con auth
│   │   └── page.tsx        # Dashboard
│   ├── api/                # API routes
│   │   ├── auth/           # Autenticación
│   │   ├── horarios/       # CRUD horarios
│   │   ├── prestaciones/   # CRUD prestaciones
│   │   └── turnos/         # CRUD turnos
│   ├── contacto/           # Página de contacto
│   ├── servicios/          # Listado y detalle de servicios
│   ├── turnos/             # Wizard de reserva
│   ├── globals.css         # Estilos globales
│   ├── layout.tsx          # Layout principal
│   └── page.tsx            # Página de inicio
├── components/             # Componentes compartidos
├── data/
│   └── seed.json           # Datos iniciales
└── lib/
    ├── auth.ts             # Funciones de autenticación
    ├── store.ts            # Store en memoria
    ├── types.ts            # Tipos TypeScript
    └── utils.ts            # Utilidades
```

## API Endpoints

### Turnos
- `GET /api/turnos` - Listar todos los turnos
- `POST /api/turnos` - Crear nuevo turno
- `GET /api/turnos/[id]` - Obtener turno por ID
- `PATCH /api/turnos/[id]` - Actualizar estado del turno
- `DELETE /api/turnos/[id]` - Eliminar turno
- `GET /api/turnos/dates` - Obtener próximos 14 días
- `GET /api/turnos/slots?fecha=YYYY-MM-DD&duracion=30` - Obtener slots disponibles

### Prestaciones
- `GET /api/prestaciones` - Listar todas las prestaciones
- `POST /api/prestaciones` - Crear nueva prestación
- `GET /api/prestaciones/[id]` - Obtener prestación por ID
- `PATCH /api/prestaciones/[id]` - Actualizar prestación
- `DELETE /api/prestaciones/[id]` - Eliminar prestación

### Horarios
- `GET /api/horarios` - Obtener horarios
- `PUT /api/horarios` - Actualizar horarios

### Autenticación
- `POST /api/auth` - Login (set cookie)
- `DELETE /api/auth` - Logout (clear cookie)

## Licencia

Proyecto privado - Todos los derechos reservados.
