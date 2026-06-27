# Inquilino Premium — Demo navegable (prototipo)

Prototipo **clickable** de la PWA de gestión interna de **Inquilino Premium**
(rent-to-rent). Pensado para que el cliente **navegue la app en su teléfono** y
sienta cómo será el producto final, **antes** de desarrollarlo.

> ⚠️ **Es una demo de presentación.** No tiene base de datos, autenticación real
> ni lógica de negocio. Todos los datos son ficticios y las acciones (enviar,
> guardar, exportar…) no persisten nada. Sirve además como **base técnica** para
> arrancar el proyecto real (Fase F1 del plan de desarrollo).

## Qué incluye

Navegación real entre todas las pantallas, estilo iOS, con rol **admin/gestor**:

- **Acceso** — login (con selector de rol para la demo) y cambio de contraseña.
- **Inicio** — dashboard con incidencias abiertas, accesos rápidos y actividad.
- **Incidencias** ★ — lista con filtros + detalle (gestión, seguimiento, media).
- **Estadísticas** ★ — KPIs, gráficos de evolución y comparativa por zona.
- **Inquilinos** — lista + detalle (pagos, entradas, salidas) + alta de inquilino.
- **Administración** — geografía, gestores, generador de QR, registro RGPD, perfil.
- **Formulario público (QR)** — reporte de incidencia sin login + confirmación.

El **rol** (admin / gestor) se cambia desde el selector del login, desde el panel
de demo (en escritorio) o desde el perfil. Cambia lo que se ve: el admin accede a
todas las zonas y a Administración; el gestor solo ve su zona (Valladolid).

## Cómo ejecutarla

```bash
npm install
npm run dev        # servidor de desarrollo (http://localhost:5173)
npm run build      # build de producción en dist/
npm run preview    # sirve el build de producción
```

En el teléfono: abre la URL desplegada y usa **«Añadir a pantalla de inicio»**
para instalarla como app (PWA, pantalla completa, con icono de marca).

## Desplegar en Vercel

Es un proyecto Vite estático; Vercel lo detecta automáticamente
(build `npm run build`, salida `dist/`). Dos caminos:

1. **Integración con GitHub (recomendado):** en [vercel.com/new](https://vercel.com/new)
   importa el repo `castemi/inquilino-premium`, elige la rama, y Vercel publica
   en cada push. Sin configuración extra.
2. **CLI:** `npm i -g vercel && vercel` desde la raíz del proyecto y sigue el
   asistente (la primera vez pide login).

## Stack y arquitectura

- **Vite + React 18** (sin router externo).
- **Sin dependencias de UI**: componentes propios estilo iOS con estilos inline
  y el sistema de marca (color, tipografía, isologo, iconos).
- **PWA** instalable (`vite-plugin-pwa`): manifest + iconos del isologo.

```
src/
  lib/        tokens (marca), iconos, datos mock, isologo (BrandMark)
  ui/         primitivos iOS (Screen, Header, TabBar, Card, Button, Field…)
  device/     IOSDevice — frame de iPhone (escritorio) / pantalla completa (móvil)
  screens/    una pantalla por módulo + registry.jsx (mapa de rutas)
  nav.jsx     contexto de navegación (pila por pestaña, rol, modo público)
  App.jsx     shell: login, pestañas, rol, frame y panel de demo
```

La navegación es una **pila por pestaña** gestionada en `App.jsx` y expuesta vía
`NavContext`. `TabBar` y el botón «atrás» del `Header` consumen ese contexto, de
modo que toda la app es navegable con cambios mínimos en cada pantalla.

## Fuera de alcance (se hará en el proyecto real)

Supabase (Postgres + Auth + Storage + RLS), edge functions, emails (Resend),
lógica de formularios y subida de medios, migración de Google Sheets, y la
migración del sistema de diseño a Tailwind + shadcn/ui.

---

Prototipo desarrollado por **CasTemi Real Estate SL** para Inquilino Premium.
