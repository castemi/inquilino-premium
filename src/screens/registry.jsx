/* Inquilino Premium — registro de rutas de la demo.
   Cada chunk reemplaza un Placeholder por la pantalla real. App.jsx resuelve routeKey→componente. */
import { IP, DISPLAY } from '../lib/tokens.js'
import { Icon } from '../lib/icon.jsx'
import { Screen, Header, TabBar } from '../ui/index.jsx'

// Pantallas reales ya portadas
import { LoginScreen, ChangePasswordScreen } from './auth.jsx'
import { HomeScreen } from './home.jsx'
import { IncidentsListScreen, IncidentDetailScreen } from './incidencias.jsx'
import { StatsScreen } from './estadisticas.jsx'
import { TenantsListScreen, TenantDetailScreen, NewTenantSheet } from './inquilinos.jsx'

// Raíz de cada pestaña del tab bar
export const TAB_ROOT = {
  inicio: 'home',
  incidencias: 'incidencias',
  inquilinos: 'inquilinos',
  estadisticas: 'estadisticas',
  admin: 'admin',
}

// Marcador para módulos aún no portados (se mantiene la navegación viva)
function Placeholder({ tab, title, role = 'admin' }) {
  const isAdmin = role === 'admin'
  const openCount = isAdmin ? 6 : 1
  return (
    <Screen header={<Header title={title} />} tabbar={<TabBar active={tab} openCount={openCount} showAdmin={isAdmin} />}>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, padding: 40, textAlign: 'center' }}>
        <div style={{ width: 64, height: 64, borderRadius: 18, background: IP.gold10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="layers" size={28} color={IP.gold} stroke={2} />
        </div>
        <div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 19, color: IP.black }}>Próximamente</div>
        <div style={{ fontSize: 13.5, color: IP.grey500, maxWidth: 240, lineHeight: 1.5 }}>
          El módulo «{title}» se incorpora en la siguiente entrega del prototipo.
        </div>
      </div>
    </Screen>
  )
}

// routeKey → componente. props (incl. role) se inyectan desde App.jsx.
export const ROUTES = {
  login: LoginScreen,
  'change-password': ChangePasswordScreen,
  home: HomeScreen,
  incidencias: IncidentsListScreen,
  'incidencia-detalle': IncidentDetailScreen,
  estadisticas: StatsScreen,
  inquilinos: TenantsListScreen,
  'inquilino-detalle': TenantDetailScreen,
  'inquilino-nuevo': NewTenantSheet,
  // pendiente (se sustituye en el chunk 5):
  admin: (p) => <Placeholder tab="admin" title="Administración" {...p} />,
  publico: (p) => <Placeholder tab={null} title="Formulario público" {...p} />,
}

// rutas que se muestran como hoja/modal sobre la pantalla anterior
export const SHEET_ROUTES = ['inquilino-nuevo', 'admin-gestor-nuevo']

export function getScreen(routeKey) {
  return ROUTES[routeKey] || ROUTES.home
}
