/* Inquilino Premium — contexto de navegación de la demo.
   Pila simple por pestaña, sin router externo. App.jsx provee la implementación real;
   aquí van valores por defecto (no-op) para que los componentes compilen aislados. */
import { createContext, useContext } from 'react'

const noop = () => {}

export const NavContext = createContext({
  tab: 'inicio',
  role: 'admin',
  push: noop,        // push(routeKey, props)
  pop: noop,         // volver atrás
  setTab: noop,      // cambiar de pestaña
  replace: noop,     // reemplazar la pantalla actual
  openSheet: noop,   // abrir hoja/modal (routeKey, props)
  closeSheet: noop,
  setRole: noop,     // 'admin' | 'gestor'
  goPublic: noop,    // ir al formulario público (QR)
  exitPublic: noop,
  logout: noop,
})

export const useNav = () => useContext(NavContext)
