/* Inquilino Premium — Admin: geografía, gestores, QR, registro RGPD, perfil. */
import { IP, FONT, DISPLAY } from '../lib/tokens.js'
import { Icon } from '../lib/icon.jsx'
import { Screen, Header, HeaderBtn, TabBar, Card, SectionLabel, SearchBar, Segmented, Chips, Row, Button, FAB, Avatar, Badge } from '../ui/index.jsx'
import { ZONES, FLATS } from '../lib/data.js'
import { Logo } from './auth.jsx'
import { useNav } from '../nav.jsx'

// ── Menú principal de admin ──
export function AdminMenuScreen() {
  const nav = useNav()
  const items = [
    { icon: 'layers', color: IP.gold, title: 'Zonas y geografía', sub: '4 zonas · 5 ciudades · 50 pisos', go: 'admin-zonas' },
    { icon: 'users', color: IP.green, title: 'Gestores', sub: '4 gestores · 3 administradores', go: 'admin-gestores' },
    { icon: 'qr', color: IP.blue, title: 'Códigos QR', sub: 'Genera e imprime QR por piso', go: 'admin-qr' },
    { icon: 'doc', color: IP.grey700, title: 'Registro de actividad', sub: 'Auditoría RGPD', go: 'admin-audit' },
  ]
  return (
    <Screen header={<Header title="Admin" eyebrow="Acceso total" subtitle="Gestiona la estructura, el equipo y el cumplimiento." />}
      tabbar={<TabBar active="admin" openCount={6} showAdmin />}>
      <div style={{ padding: '8px 16px 0' }}>
        <Card pad={0} style={{ padding: '4px 16px' }}>
          {items.map((it, i) => (
            <Row key={i} icon={it.icon} iconColor={it.color} title={it.title} sub={it.sub} chev last={i === items.length - 1}
              onClick={() => nav.push(it.go)} />
          ))}
        </Card>
      </div>
      <SectionLabel>Sesión</SectionLabel>
      <div style={{ padding: '0 16px' }}>
        <Card pad={0} style={{ padding: '4px 16px' }}>
          <Row icon="user" iconColor={IP.gold} title="Mi perfil" sub="Óscar Castro · admin + Valladolid" chev onClick={() => nav.push('admin-perfil')} />
          <Row icon="logout" iconColor={IP.red} title={<span style={{ color: IP.red }}>Cerrar sesión</span>} last onClick={() => nav.logout()} />
        </Card>
      </div>
    </Screen>
  )
}

// ── Geografía / zonas ──
export function ZonesScreen() {
  const nav = useNav()
  return (
    <Screen header={<Header back="Admin" title="Geografía" />}>
      <SearchBar placeholder="Buscar zona o ciudad" />
      <SectionLabel action="+ Zona">Zonas</SectionLabel>
      <div style={{ padding: '0 16px' }}>
        {ZONES.map((z) => (
          <Card key={z.id} pad={15} style={{ marginBottom: 10 }} onClick={() => nav.push('admin-piso')}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
              <div style={{ width: 42, height: 42, borderRadius: 12, background: z.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="pin" size={21} color={z.color} stroke={2} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: IP.black }}>{z.name}</div>
                <div style={{ fontSize: 12.5, color: IP.grey500, marginTop: 2 }}>Gestor: {z.gestor.trim()}</div>
              </div>
              <Icon name="chevR" size={18} color={IP.grey300} stroke={2.3} />
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 12, paddingTop: 12, borderTop: `1px solid ${IP.line}` }}>
              {[['Ciudades', z.cities], ['Pisos', z.flats], ['Habitaciones', z.rooms]].map(([l, v]) => (
                <div key={l} style={{ flex: 1, textAlign: 'center' }}>
                  <div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 18, color: IP.black }}>{v}</div>
                  <div style={{ fontSize: 10.5, color: IP.grey500, fontWeight: 600, marginTop: 1 }}>{l}</div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
      <FAB />
    </Screen>
  )
}

// ── Detalle de piso ──
export function FlatDetailScreen() {
  const f = FLATS[0]
  const rooms = [
    { code: 'H1', rent: 380, tenant: 'Carlos Méndez' }, { code: 'H2', rent: 360, tenant: 'Lucía Fernández' },
    { code: 'H3', rent: 410, tenant: 'David Romero' }, { code: 'H4', rent: 375, tenant: 'Elena Sanz' },
    { code: 'H5', rent: 350, tenant: null },
  ]
  const commons = [['Cocina'], ['Pasillo'], ['Baño común'], ['Garaje']]
  return (
    <Screen header={<Header back="Geografía" title={f.code} actions={<HeaderBtn icon="edit" />} subtitle={f.address} />}>
      <div style={{ padding: '4px 16px 0' }}>
        <Card pad={0} style={{ padding: '4px 16px' }}>
          <Row icon="pin" iconColor={IP.gold} title={f.address} sub={`${f.city} · Valladolid`} />
          <Row icon="building" iconColor={IP.blue} title="Garaje" sub="Plaza incluida" right={<Badge fg={IP.green} bg={IP.greenBg}>Sí</Badge>} />
          <Row icon="users" iconColor={IP.green} title="Ocupación" sub={`${f.occupied} de ${f.rooms} habitaciones`} right={`${Math.round(f.occupied / f.rooms * 100)}%`} last />
        </Card>

        <SectionLabel action="+ Añadir">Habitaciones</SectionLabel>
        <Card pad={0} style={{ padding: '4px 16px' }}>
          {rooms.map((r, i) => (
            <Row key={r.code} icon="door" iconColor={r.tenant ? IP.gold : IP.grey400}
              title={`Habitación ${r.code}`} sub={r.tenant || 'Libre'}
              right={`${r.rent} €`} rightSub="/ mes"
              last={i === rooms.length - 1} />
          ))}
        </Card>

        <SectionLabel action="+ Añadir">Zonas comunes</SectionLabel>
        <div style={{ padding: 0, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {commons.map(([l]) => (
            <span key={l} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '9px 13px', background: IP.card, border: `1px solid ${IP.line2}`, borderRadius: 999, fontSize: 13.5, fontWeight: 600, color: IP.grey700 }}>
              <span style={{ width: 7, height: 7, borderRadius: 999, background: IP.gold }} />{l}
            </span>
          ))}
        </div>
        <div style={{ height: 16 }} />
      </div>
    </Screen>
  )
}

// ── Gestores ──
export function GestoresScreen() {
  const nav = useNav()
  const people = [
    { name: 'Óscar Castro', email: 'oscar@castemi.es', zone: 'Valladolid', role: 'admin', active: true, init: 'ÓC' },
    { name: 'Director General', email: 'director@inquilinopremium.es', zone: null, role: 'admin', active: true, init: 'DG' },
    { name: 'Marta Ruiz', email: 'marta@inquilinopremium.es', zone: 'Zona Norte', role: 'gestor', active: true, init: 'MR' },
    { name: 'Javier León', email: 'javier@inquilinopremium.es', zone: 'Zona Centro', role: 'gestor', active: true, init: 'JL' },
    { name: 'Lucía Prados', email: 'lucia@inquilinopremium.es', zone: 'Zona Sur', role: 'gestor', active: false, init: 'LP' },
  ]
  return (
    <Screen header={<Header back="Admin" title="Gestores" count="7" />}>
      <SearchBar placeholder="Buscar gestor" />
      <div style={{ padding: '10px 16px 0' }}>
        {people.map((p, i) => (
          <Card key={i} pad={14} style={{ marginBottom: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Avatar initials={p.init} size={44} color={p.role === 'admin' ? IP.black : IP.gold} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <span style={{ fontSize: 15, fontWeight: 700, color: IP.black }}>{p.name}</span>
                  {p.role === 'admin'
                    ? <Badge fg={IP.black} bg={IP.grey100}>Admin</Badge>
                    : <Badge fg={IP.gold} bg={IP.gold10}>Gestor</Badge>}
                </div>
                <div style={{ fontSize: 12.5, color: IP.grey500, marginTop: 3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.email}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 7 }}>
                  {p.zone && <Badge fg={IP.gold} bg={IP.gold10} dot>{p.zone}</Badge>}
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11.5, fontWeight: 600, color: p.active ? IP.green : IP.grey400 }}>
                    <span style={{ width: 6, height: 6, borderRadius: 999, background: p.active ? IP.green : IP.grey400 }} />{p.active ? 'Activo' : 'Inactivo'}
                  </span>
                </div>
              </div>
              <Icon name="dots" size={20} color={IP.grey400} stroke={2.4} />
            </div>
          </Card>
        ))}
      </div>
      <FAB label="Gestor" onClick={() => nav.push('admin-gestor-nuevo')} />
    </Screen>
  )
}

// hoja: gestor creado → contraseña temporal
export function GestorCreatedSheet() {
  const nav = useNav()
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', fontFamily: FONT, background: 'rgba(29,29,27,0.32)' }}>
      <div style={{ flex: 1 }} onClick={() => nav.closeSheet()} />
      <div style={{ background: IP.surface, borderRadius: '28px 28px 0 0', paddingTop: 10 }}>
        <div style={{ width: 38, height: 5, borderRadius: 999, background: IP.grey300, margin: '0 auto 14px' }} />
        <div style={{ padding: '0 24px 30px', textAlign: 'center' }}>
          <div style={{ width: 64, height: 64, borderRadius: 999, background: IP.greenBg, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
            <Icon name="checkCircle" size={34} color={IP.green} stroke={2} />
          </div>
          <h2 style={{ margin: 0, fontFamily: DISPLAY, fontWeight: 800, fontSize: 21, color: IP.black }}>Gestor creado</h2>
          <p style={{ margin: '8px 0 18px', fontSize: 13.5, color: IP.grey700, lineHeight: 1.45 }}>Marta Ruiz ya puede acceder. Se ha enviado la contraseña por email.</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', background: IP.card, borderRadius: 14, border: `1px solid ${IP.line2}` }}>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.6, textTransform: 'uppercase', color: IP.grey500 }}>Contraseña temporal</div>
              <div style={{ fontFamily: 'ui-monospace, Menlo, monospace', fontWeight: 700, fontSize: 18, color: IP.black, letterSpacing: 1, marginTop: 4 }}>k7Pm2xQ9aR4t</div>
            </div>
            <div style={{ width: 40, height: 40, borderRadius: 11, background: IP.gold10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="copy" size={19} color={IP.gold} stroke={2} />
            </div>
          </div>
          <div style={{ marginTop: 18 }}><Button kind="dark" full onClick={() => nav.closeSheet()}>Entendido</Button></div>
        </div>
      </div>
    </div>
  )
}

// ── Generador de QR ──
function QRGlyph({ size = 150, fg = IP.black }) {
  const N = 21, cell = size / N
  const on = (r, c) => ((r * 13 + c * 7 + r * c) % 5) < 2
  const finder = (x, y) => (
    <g key={`f${x}${y}`}>
      <rect x={x * cell} y={y * cell} width={cell * 7} height={cell * 7} fill={fg} />
      <rect x={(x + 1) * cell} y={(y + 1) * cell} width={cell * 5} height={cell * 5} fill="#fff" />
      <rect x={(x + 2) * cell} y={(y + 2) * cell} width={cell * 3} height={cell * 3} fill={fg} />
    </g>
  )
  const mods = []
  for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) {
    const inFinder = (r < 8 && c < 8) || (r < 8 && c >= N - 8) || (r >= N - 8 && c < 8)
    if (!inFinder && on(r, c)) mods.push(<rect key={`${r}-${c}`} x={c * cell} y={r * cell} width={cell} height={cell} fill={fg} />)
  }
  return <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>{mods}{finder(0, 0)}{finder(N - 7, 0)}{finder(0, N - 7)}</svg>
}

function SelectFieldWrap() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 13px', minHeight: 50, background: IP.card, border: `1px solid ${IP.gold50}`, borderRadius: 12 }}>
      <Icon name="building" size={18} color={IP.gold} stroke={2} />
      <span style={{ flex: 1, fontSize: 15.5, color: IP.black, fontWeight: 600 }}>VLL-01 · C/ Santiago 14</span>
      <Icon name="chevD" size={18} color={IP.grey400} stroke={2.2} />
    </div>
  )
}

export function QRScreen() {
  const nav = useNav()
  return (
    <Screen header={<Header back="Admin" title="Códigos QR" />}>
      <Segmented active="piso" options={[{ key: 'gen', label: 'Genérico' }, { key: 'piso', label: 'Por piso' }, { key: 'todos', label: 'Todos' }]} />
      <div style={{ padding: '14px 16px 0' }}>
        <SelectFieldWrap />
        {/* vista previa imprimible */}
        <div style={{ marginTop: 14, borderRadius: 16, overflow: 'hidden', background: IP.card, border: `1px solid ${IP.line2}`, boxShadow: '0 10px 26px -14px rgba(29,29,27,0.2)' }}>
          <div style={{ height: 8, background: `linear-gradient(90deg, ${IP.gold70}, ${IP.gold})` }} />
          <div style={{ padding: '20px 20px 24px', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}><Logo size={0.62} stacked={false} /></div>
            <p style={{ margin: '0 0 16px', fontSize: 13.5, color: IP.ink, fontWeight: 600 }}>Reporta cualquier incidencia escaneando este código</p>
            <div style={{ display: 'inline-block', padding: 12, background: '#fff', borderRadius: 12, border: `1px solid ${IP.line}` }}>
              <QRGlyph size={150} />
            </div>
            <div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 18, color: IP.black, marginTop: 14, letterSpacing: 0.5 }}>VLL-01</div>
            <div style={{ fontSize: 11.5, color: IP.grey500, marginTop: 3 }}>Urgencias · 983 00 00 00</div>
          </div>
        </div>
        <div style={{ marginTop: 14 }}>
          <Button kind="ghost" full icon="eye" onClick={() => nav.goPublic()}>Previsualizar el formulario</Button>
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
          <Button kind="secondary" full icon="download" size="md">Tarjeta</Button>
          <Button kind="dark" full icon="doc" size="md">PDF A6</Button>
        </div>
      </div>
    </Screen>
  )
}

// ── Registro de auditoría ──
export function AuditScreen() {
  const logs = [
    { act: 'UPDATE', tbl: 'incidents', who: 'Óscar Castro', rec: '#b7e4a1c8', when: 'Hoy · 11:42', c: IP.orange },
    { act: 'INSERT', tbl: 'payments', who: 'Marta Ruiz', rec: 'Lucía F. · mayo', when: 'Hoy · 09:15', c: IP.green },
    { act: 'DELETE', tbl: 'tenants', who: 'Director General', rec: 'Pablo G.', when: 'Ayer · 18:30', c: IP.red },
    { act: 'UPDATE', tbl: 'profiles', who: 'Óscar Castro', rec: 'Lucía Prados', when: 'Ayer · 16:02', c: IP.blue },
    { act: 'INSERT', tbl: 'incidents', who: 'Formulario público', rec: '#a1f3c9d2', when: '28 may · 08:50', c: IP.green },
  ]
  return (
    <Screen header={<Header back="Admin" title="Registro" eyebrow="Auditoría RGPD" actions={<HeaderBtn icon="download" />} />}>
      <Chips items={[{ label: 'Todas las acciones', on: true }, { label: 'Tabla' }, { label: 'Usuario' }]} />
      <div style={{ padding: '10px 16px 0' }}>
        <Card pad={0} style={{ padding: '4px 16px' }}>
          {logs.map((l, i) => (
            <Row key={i} icon="doc" iconColor={l.c}
              title={<span><b style={{ fontWeight: 700, color: l.c }}>{l.act}</b> <span style={{ color: IP.grey700 }}>{l.tbl}</span></span>}
              sub={`${l.who} · ${l.rec}`} rightSub={l.when} last={i === logs.length - 1} />
          ))}
        </Card>
        <p style={{ margin: '14px 4px 0', fontSize: 11.5, color: IP.grey400, lineHeight: 1.4 }}>Se registran accesos y cambios sobre datos personales. Retención: 5 años.</p>
      </div>
    </Screen>
  )
}

// ── Perfil ──
export function ProfileScreen() {
  const nav = useNav()
  return (
    <Screen header={<Header back="Atrás" title="Mi perfil" />}>
      <div style={{ padding: '8px 16px 0', textAlign: 'center' }}>
        <Avatar initials="ÓC" size={84} color={IP.gold} />
        <h2 style={{ margin: '12px 0 4px', fontFamily: DISPLAY, fontWeight: 800, fontSize: 22, color: IP.black }}>Óscar Castro</h2>
        <div style={{ display: 'flex', gap: 7, justifyContent: 'center' }}>
          <Badge fg={IP.black} bg={IP.grey100}>Administrador</Badge>
          <Badge fg={IP.gold} bg={IP.gold10} dot>Gestor · Valladolid</Badge>
        </div>
      </div>
      <SectionLabel>Cuenta</SectionLabel>
      <div style={{ padding: '0 16px' }}>
        <Card pad={0} style={{ padding: '4px 16px' }}>
          <Row icon="mail" iconColor={IP.gold} title="Correo" right="oscar@castemi.es" />
          <Row icon="phone" iconColor={IP.green} title="Teléfono" right="+34 600 12 34 56" />
          <Row icon="lock" iconColor={IP.blue} title="Cambiar contraseña" chev last onClick={() => nav.push('change-password')} />
        </Card>
      </div>
      <SectionLabel>Permisos</SectionLabel>
      <div style={{ padding: '0 16px' }}>
        <Card pad={0} style={{ padding: '4px 16px' }}>
          <Row icon="shield" iconColor={IP.black} title="Rol" right="Admin" />
          <Row icon="pin" iconColor={IP.gold} title="Zona asignada" right="Valladolid" last />
        </Card>
      </div>
      <div style={{ padding: '20px 16px 0' }}>
        <Button kind="danger" full icon="logout" onClick={() => nav.logout()}>Cerrar sesión</Button>
      </div>
    </Screen>
  )
}
