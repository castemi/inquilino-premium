/* Inquilino Premium — Acceso (Login, cambio de contraseña) + Logo de marca. */
import { IP, FONT, DISPLAY } from '../lib/tokens.js'
import { Icon } from '../lib/icon.jsx'
import { BrandMark } from '../lib/brand.jsx'
import { Screen, Header, Card, Field, Button } from '../ui/index.jsx'
import { useNav } from '../nav.jsx'

// Logotipo / wordmark — usado en login, formulario público y QR
export function Logo({ size = 1, light = false, stacked = true }) {
  const txt = light ? '#fff' : IP.black
  return (
    <div style={{ display: 'flex', flexDirection: stacked ? 'column' : 'row', alignItems: 'center', gap: stacked ? 12 * size : 13 * size }}>
      <BrandMark height={(stacked ? 58 : 48) * size} mono={light ? '#fff' : undefined} />
      <div style={{ textAlign: stacked ? 'center' : 'left', lineHeight: 1 }}>
        <div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 22 * size, letterSpacing: 0.5, color: txt, textTransform: 'uppercase' }}>Inquilino</div>
        <div style={{ fontFamily: '"Yesteryear", cursive', fontSize: 27 * size, color: IP.gold, lineHeight: 0.9, marginTop: 2 }}>Premium</div>
      </div>
    </div>
  )
}

export function LoginScreen() {
  const nav = useNav()
  const role = nav.role
  const email = role === 'gestor' ? 'gestor.norte@inquilinopremium.es' : 'oscar@castemi.es'
  // selector de rol (solo para la demo, permite probar ambas vistas)
  const RolePick = () => (
    <div style={{ display: 'flex', gap: 2, padding: 3, background: IP.grey100, borderRadius: 11, marginBottom: 16 }}>
      {[['admin', 'Administrador'], ['gestor', 'Gestor']].map(([k, label]) => {
        const on = role === k
        return (
          <div key={k} onClick={() => nav.setRole(k)} style={{ flex: 1, textAlign: 'center', padding: '8px 4px', borderRadius: 8.5,
            background: on ? IP.card : 'transparent', boxShadow: on ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
            fontSize: 13, fontWeight: on ? 700 : 600, color: on ? IP.black : IP.grey500, cursor: 'pointer' }}>{label}</div>
        )
      })}
    </div>
  )
  return (
    <div style={{ height: '100%', overflow: 'auto', display: 'flex', flexDirection: 'column', fontFamily: FONT,
      background: `linear-gradient(180deg, ${IP.gold20} 0%, ${IP.gold10} 30%, ${IP.bg} 60%)`, padding: '0 24px' }}>
      <div style={{ height: 96 }} />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Logo size={1.15} />
        <p style={{ margin: '20px 0 0', fontSize: 14.5, color: IP.grey700, textAlign: 'center', fontWeight: 500, maxWidth: 260, lineHeight: 1.45 }}>
          Gestión interna de pisos, inquilinos e incidencias
        </p>
      </div>

      <div style={{ flex: 1, minHeight: 24 }} />

      <div style={{ background: IP.card, borderRadius: 24, padding: 22, boxShadow: '0 20px 48px -16px rgba(29,29,27,0.18)', border: `1px solid ${IP.line}` }}>
        <h2 style={{ margin: '2px 0 14px', fontFamily: DISPLAY, fontWeight: 800, fontSize: 21, letterSpacing: -0.4, color: IP.black }}>Iniciar sesión</h2>
        <RolePick />
        <Field label="Correo electrónico" icon="mail" value={email} />
        <Field label="Contraseña" icon="lock" value="••••••••••" />
        <div style={{ textAlign: 'right', marginTop: -4, marginBottom: 16 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: IP.gold }}>¿Olvidaste tu contraseña?</span>
        </div>
        <Button kind="primary" size="lg" full onClick={() => nav.login()}>Entrar</Button>
      </div>

      <div onClick={() => nav.goPublic()} style={{ margin: '16px 0 6px', textAlign: 'center', cursor: 'pointer' }}>
        <span style={{ fontSize: 13.5, fontWeight: 600, color: IP.gold }}>Reportar una incidencia (formulario QR) →</span>
      </div>

      <p style={{ margin: '6px 0 8px', fontSize: 11.5, color: IP.grey500, textAlign: 'center', lineHeight: 1.5 }}>
        Al acceder, aceptas nuestra <span style={{ color: IP.gold, fontWeight: 600 }}>Política de Privacidad</span>.<br/>
        Plataforma desarrollada por CasTemi Real Estate
      </p>
      <div style={{ height: 30 }} />
    </div>
  )
}

export function ChangePasswordScreen() {
  const nav = useNav()
  return (
    <Screen header={<Header title="Nueva contraseña" eyebrow="Primer acceso" subtitle="Por seguridad, define una contraseña personal antes de continuar." />}>
      <div style={{ padding: '18px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 14, background: IP.gold10, border: `1px solid ${IP.gold50}`, borderRadius: 14, marginBottom: 18 }}>
          <Icon name="shield" size={22} color={IP.gold} stroke={2} />
          <span style={{ fontSize: 13, color: IP.ink, lineHeight: 1.4, fontWeight: 500 }}>Tu cuenta usa una contraseña temporal. Cámbiala para activar tu acceso.</span>
        </div>
        <Card pad={18}>
          <Field label="Contraseña actual" icon="lock" value="••••••••••" />
          <Field label="Nueva contraseña" icon="key" value="••••••••••••" valid hint="Mínimo 8 caracteres, incluye un número." />
          <Field label="Repite la nueva contraseña" icon="key" value="••••••••••••" valid />
        </Card>
        <div style={{ marginTop: 18 }}>
          <Button kind="primary" size="lg" full icon="check" onClick={() => nav.login()}>Guardar y continuar</Button>
        </div>
      </div>
    </Screen>
  )
}
