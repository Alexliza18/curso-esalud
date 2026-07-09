# Quirófano del Futuro 2026

Plataforma del congreso "Quirófano del Futuro 2026", construida como base reutilizable para
futuros congresos y cursos académicos de salud (Next.js 16 App Router + Clean Architecture).

## Stack

- **Next.js 16** (App Router, Turbopack, React 19.2)
- **TypeScript**
- **Tailwind CSS v4** + **shadcn/ui** (Base UI primitives)
- **Framer Motion** — animaciones y scroll reveals
- **React Hook Form + Zod** — formulario de matrícula con validación estricta
- **TanStack React Query** — mutación de cliente para el envío del formulario (loading/error)
- **Supabase** — base de datos (`registrations`) + storage de comprobantes
- **Resend** — correo de confirmación al participante + notificación a administradores

## Arquitectura

El proyecto sigue Clean Architecture, adaptado a Next.js:

```
src/
  domain/           # Entidades y reglas de negocio puras (sin dependencias externas)
  application/       # Casos de uso, DTOs (Zod) e interfaces de repositorio
  infrastructure/     # Implementaciones concretas con Supabase (service role, solo servidor)
  config/            # event.config.ts — TODO lo que cambia entre congresos vive aquí
  components/         # ui/ (shadcn), layout/, shared/, sections/, forms/
  app/                # Rutas: landing pública + flujo de inscripción (/registro)
```

Para reutilizar la plataforma en un nuevo congreso: clona el repo, edita
`src/config/event.config.ts` (nombre, fechas, sede, tickets) y `src/data/*.ts` (ponentes,
sesiones, sponsors, FAQ), configura un nuevo proyecto de Supabase y despliega. No hace falta
tocar componentes ni lógica de negocio.

## Sistema de matrícula

`/registro` es un único formulario (RHF + Zod) con nombres, apellidos, DNI, correo, celular,
profesión, tipo de participante, ciudad, institución y comprobante de pago. Al enviarlo:

1. El cliente valida todo con Zod y sube los datos + el archivo como `FormData` a
   `POST /api/registrations` (vía una mutación de React Query, con estados de loading/error).
2. El Route Handler vuelve a validar con el mismo schema Zod, y el caso de uso
   (`create-registration`) hace lo siguiente en `src/application/use-cases/`:
   - Verifica que no exista ya una inscripción con ese **DNI** o **correo** (y la restricción
     `UNIQUE` en Postgres actúa como segunda barrera ante condiciones de carrera).
   - Verifica cupo disponible para el tipo de participante.
   - Sube el comprobante a Supabase Storage (bucket `vouchers`).
   - Inserta el registro en la tabla `registrations` con `estado = 'pendiente'`.
   - Envía por correo (Resend) la confirmación al participante y la notificación a los
     administradores — de forma best-effort: si el envío falla, la inscripción igual queda
     guardada (el error solo se registra en consola).
3. `/registro/[id]/exito` — página de éxito con el resumen de la inscripción.

No hay pasarela de pago: la validación del comprobante es manual, directamente en Supabase
(Table Editor, actualizando la columna `estado` a `aprobado`/`rechazado`), ya que esta primera
fase no incluye panel de administración.

## Configuración

1. Instala dependencias:

   ```bash
   npm install
   ```

2. Crea un proyecto en [Supabase](https://supabase.com) y ejecuta `supabase/schema.sql` en el
   SQL Editor. Esto crea la tabla `registrations` (con los índices únicos por `dni` y `correo`),
   los tipos `tipo_participante`/`estado_registro` y el bucket de storage `vouchers`.

3. Crea una cuenta en [Resend](https://resend.com) y genera un API key (Settings → API Keys).
   Para producción, verifica tu dominio en Resend; en desarrollo puedes usar el remitente de
   pruebas `onboarding@resend.dev`.

4. Copia `.env.example` a `.env.local` y completa las variables:

   ```bash
   cp .env.example .env.local
   ```

   - `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`: desde Project Settings > API.
   - `SUPABASE_SERVICE_ROLE_KEY`: **solo servidor**, nunca la expongas al cliente. Se usa en
     el Route Handler de inscripción para escribir en la base de datos sin políticas RLS.
   - `NEXT_PUBLIC_SITE_URL`: dominio final del sitio (usado en metadata, sitemap y OG image).
   - `RESEND_API_KEY` / `EMAIL_FROM`: credenciales para el envío de correos.
   - `ADMIN_NOTIFICATION_EMAILS`: correos (separados por coma) que reciben cada nueva inscripción.
   - `NEXT_PUBLIC_GA_ID` / `NEXT_PUBLIC_FB_PIXEL_ID` / `NEXT_PUBLIC_HOTJAR_ID`: opcionales. Cada
     script de analítica solo se carga si su variable está definida (ver "Plataforma premium").

5. Levanta el entorno de desarrollo:

   ```bash
   npm run dev
   ```

## Scripts

```bash
npm run dev     # servidor de desarrollo (Turbopack)
npm run build   # build de producción
npm run start   # sirve el build de producción
npm run lint    # ESLint
```

## Deploy en Vercel

1. Sube el repositorio a GitHub/GitLab/Bitbucket.
2. Importa el proyecto en [Vercel](https://vercel.com/new).
3. Configura las mismas variables de entorno de `.env.example` en el proyecto de Vercel
   (Settings → Environment Variables).
4. Deploy. No se requiere configuración adicional: Next.js se detecta automáticamente.

## Plataforma premium

- **Motion**: reveals con scroll (`Reveal`/`StaggerGroup`), parallax en el hero (`useParallax`),
  microinteracciones (countdown animado, cards con spring en hover) y transición de página al
  navegar entre rutas. Todo respeta `prefers-reduced-motion` de forma global vía
  `MotionConfig(reducedMotion="user")` en `src/components/providers/motion-provider.tsx`.
- **Performance**: la Galería se carga de forma diferida (`next/dynamic` + `ssr:false`) con un
  esqueleto de carga (`GallerySkeleton`) mientras se descarga su chunk. El `<h1>` del hero no usa
  animación de entrada a propósito: es el candidato a LCP y debe pintarse de inmediato.
- **SEO**: JSON-LD de `Event`, `Organization` y `FAQPage` (`src/components/shared/seo-jsonld.tsx`),
  `alternates.canonical` en cada página, Open Graph y Twitter Cards con imagen dinámica
  (`next/og`), sitemap y robots dinámicos.
- **PWA**: `app/icon.tsx`/`app/apple-icon.tsx` generan los íconos con `next/og`; `app/manifest.ts`
  los referencia. `public/sw.js` cachea estáticos y sirve `/offline` cuando no hay red (el
  service worker solo se registra en producción, ver `src/components/pwa/sw-register.tsx`).
- **Analítica**: Google Analytics, Meta Pixel y Hotjar se cargan de forma condicional
  (`src/components/analytics/analytics-scripts.tsx`) solo si su variable de entorno está
  configurada, con `strategy` de `next/script` ajustada para no bloquear el render.
- **Conversión**: botón flotante de WhatsApp (`whatsapp-float.tsx`, número configurable en
  `event.config.ts`), "Agregar al calendario" (Google Calendar + `.ics`) y botones de compartir
  (Web Share API con fallback a WhatsApp/X/LinkedIn/copiar enlace) en el footer y la página de
  éxito.
- **Accesibilidad**: enlace "Saltar al contenido", verificado con una auditoría real de
  Lighthouse (accesibilidad 100/100 tras corregir contrastes por debajo de AA en textos con
  opacidad reducida).

## Contenido editorial

Los datos de ponentes, cronograma, sponsors, FAQ y galería viven en `src/data/*.ts` como
contenido estático tipado (no requieren base de datos, ya que son contenido de marketing, no
datos de usuarios). Las imágenes de la galería en `public/images/` son placeholders SVG —
reemplázalas por fotografías reales del evento cuando estén disponibles.
