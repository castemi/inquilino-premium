/* Inquilino Premium — shell navegable de la demo.
   Maneja login, pestañas con pila de navegación, rol admin/gestor, formulario público
   y el frame de dispositivo (con bisel en escritorio, a pantalla completa en móvil). */
import { useState, useEffect, useMemo, useCallback } from 'react'
import { IP, DISPLAY } from './lib/tokens.js'
import { Icon } from './lib/icon.jsx'
import { IOSDevice } from './device/IOSDevice.jsx'
import { NavContext } from './nav.jsx'
import { getScreen, TAB_ROOT } from './screens/registry.jsx'

const TAB_KEYS = ['inicio', 'incidencias', 'inquilinos', 'estadisticas', 'admin']

function initialStacks() {
  const s = {}
  for (const t of TAB_KEYS) s[t] = [{ key: TAB_ROOT[t], props: {} }]
  return s
}

// hook: ¿viewport de móvil? → frame a pantalla completa
function useIsMobile() {
  const [m, setM] = useState(() => typeof window !== 'undefined' && window.matchMedia('(max-width: 480px)').matches)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 480px)')
    const fn = (e) => setM(e.matches)
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [])
  return m
}

export default function App() {
  const [authed, setAuthed] = useState(false)
  const [publicMode, setPublicMode] = useState(false)
  const [role, setRole] = useState('admin')
  const [activeTab, setActiveTab] = useState('inicio')
  const [stacks, setStacks] = useState(initialStacks)
  const [publicStack, setPublicStack] = useState([{ key: 'publico', props: {} }])
  const isMobile = useIsMobile()

  const nav = useMemo(() => {
    const replaceStack = (updater) => {
      if (publicMode) setPublicStack(updater)
      else setStacks(prev => ({ ...prev, [activeTab]: updater(prev[activeTab]) }))
    }
    return {
      tab: activeTab,
      role,
      login: () => { setAuthed(true); setPublicMode(false) },
      logout: () => { setAuthed(false); setPublicMode(false); setStacks(initialStacks()); setActiveTab('inicio') },
      setTab: (key) => { setPublicMode(false); setActiveTab(key) },
      push: (key, props = {}) => replaceStack(s => [...s, { key, props }]),
      pop: () => {
        if (publicMode) {
          setPublicStack(s => (s.length > 1 ? s.slice(0, -1) : s))
          if (publicStack.length <= 1) setPublicMode(false)
        } else {
          setStacks(prev => {
            const s = prev[activeTab]
            return s.length > 1 ? { ...prev, [activeTab]: s.slice(0, -1) } : prev
          })
        }
      },
      replace: (key, props = {}) => replaceStack(s => [...s.slice(0, -1), { key, props }]),
      openSheet: (key, props = {}) => replaceStack(s => [...s, { key, props }]),
      closeSheet: () => replaceStack(s => (s.length > 1 ? s.slice(0, -1) : s)),
      openInTab: (tab, key, props = {}) => {
        setPublicMode(false)
        setActiveTab(tab)
        setStacks(prev => ({ ...prev, [tab]: [{ key: TAB_ROOT[tab], props: {} }, { key, props }] }))
      },
      setRole: (r) => setRole(r),
      goPublic: () => { setPublicStack([{ key: 'publico', props: {} }]); setPublicMode(true) },
      exitPublic: () => setPublicMode(false),
    }
  }, [activeTab, role, publicMode, publicStack.length])

  // pantalla activa
  let current
  if (publicMode) current = publicStack[publicStack.length - 1]
  else if (!authed) current = { key: 'login', props: {} }
  else current = stacks[activeTab][stacks[activeTab].length - 1]

  const Comp = getScreen(current.key)
  const screen = <Comp role={role} {...current.props} />

  const device = <IOSDevice bare={isMobile}>{screen}</IOSDevice>

  return (
    <NavContext.Provider value={nav}>
      {isMobile ? (
        <div style={{ width: '100vw', height: '100dvh', overflow: 'hidden' }}>{device}</div>
      ) : (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: 18, padding: '28px 16px', background: 'radial-gradient(120% 80% at 50% 0%, #f3efe4 0%, #ece9e0 55%, #e4e0d4 100%)' }}>
          <DemoHeader />
          {device}
          <DemoControls nav={nav} role={role} authed={authed} publicMode={publicMode} />
        </div>
      )}
    </NavContext.Provider>
  )
}

function DemoHeader() {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 15, color: IP.black, letterSpacing: 0.2 }}>
        Inquilino Premium · <span style={{ color: IP.gold }}>prototipo navegable</span>
      </div>
      <div style={{ fontSize: 12, color: IP.grey500, marginTop: 2 }}>Demo de presentación — sin conexión a datos reales</div>
    </div>
  )
}

function DemoControls({ nav, role, authed, publicMode }) {
  const seg = (k, label) => {
    const on = role === k
    return (
      <div key={k} onClick={() => nav.setRole(k)} style={{ padding: '6px 14px', borderRadius: 999, cursor: 'pointer',
        background: on ? IP.black : 'transparent', color: on ? '#fff' : IP.grey700, fontSize: 12.5, fontWeight: 700 }}>{label}</div>
    )
  }
  const btn = (label, icon, onClick) => (
    <div onClick={onClick} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 13px', borderRadius: 999,
      background: IP.card, border: `1px solid ${IP.line2}`, cursor: 'pointer', fontSize: 12.5, fontWeight: 600, color: IP.grey700 }}>
      <Icon name={icon} size={14} color={IP.grey700} stroke={2} />{label}
    </div>
  )
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 2, padding: 3, background: IP.grey100, borderRadius: 999, border: `1px solid ${IP.line}` }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: IP.grey500, padding: '0 8px', letterSpacing: 0.3 }}>ROL</span>
        {seg('admin', 'Admin')}
        {seg('gestor', 'Gestor')}
      </div>
      {publicMode
        ? btn('Volver a la app', 'chevL', () => nav.exitPublic())
        : btn('Formulario público (QR)', 'qr', () => nav.goPublic())}
      {authed && !publicMode && btn('Cerrar sesión', 'logout', () => nav.logout())}
    </div>
  )
}
