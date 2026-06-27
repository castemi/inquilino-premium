/* Inquilino Premium — Dashboard / Inicio (consciente del rol). */
import { IP, DISPLAY } from '../lib/tokens.js'
import { Icon } from '../lib/icon.jsx'
import { BrandMark } from '../lib/brand.jsx'
import { Screen, Header, HeaderBtn, TabBar, Card, SectionLabel, Badge, Avatar, Row } from '../ui/index.jsx'
import { ZONES, ZONE_STATS, ACTIVITY } from '../lib/data.js'
import { useNav } from '../nav.jsx'

function MiniStat({ icon, color, value, label }) {
  return (
    <Card pad={13} style={{ flex: 1 }}>
      <div style={{ width: 30, height: 30, borderRadius: 8, background: color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 9 }}>
        <Icon name={icon} size={17} color={color} stroke={2} />
      </div>
      <div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 21, letterSpacing: -0.4, color: IP.black, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 11.5, color: IP.grey500, marginTop: 3, fontWeight: 500 }}>{label}</div>
    </Card>
  )
}

function QuickAccess({ icon, label, color, onClick }) {
  return (
    <div onClick={onClick} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7, cursor: 'pointer' }}>
      <div style={{ width: 54, height: 54, borderRadius: 16, background: color + '16', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon name={icon} size={24} color={color} stroke={2} />
      </div>
      <span style={{ fontSize: 11.5, fontWeight: 600, color: IP.grey700 }}>{label}</span>
    </div>
  )
}

export function HomeScreen({ role = 'admin' }) {
  const nav = useNav()
  const isAdmin = role === 'admin'
  const openCount = isAdmin ? 6 : 1
  const header = (
    <Header
      eyebrow="Jueves · 29 de mayo"
      title="Inicio"
      actions={<>
        <HeaderBtn icon="bell" badge={openCount} onClick={() => nav.setTab('incidencias')} />
        <Avatar initials="ÓC" size={36} />
      </>}
    />
  )
  return (
    <Screen header={header} tabbar={<TabBar active="inicio" openCount={openCount} showAdmin={isAdmin} />}>
      <div style={{ padding: '14px 16px 0' }}>
        {/* saludo */}
        <div style={{ marginBottom: 14 }}>
          <h2 style={{ margin: 0, fontFamily: DISPLAY, fontWeight: 800, fontSize: 23, letterSpacing: -0.5, color: IP.black }}>Buenos días, Óscar</h2>
          <div style={{ marginTop: 6 }}>
            <Badge fg={IP.gold} bg={IP.gold10} dot>{isAdmin ? 'Administrador · Acceso global' : 'Gestor · Valladolid'}</Badge>
          </div>
        </div>

        {/* hero: incidencias abiertas */}
        <div onClick={() => nav.setTab('incidencias')} style={{ borderRadius: 18, padding: 18, background: `linear-gradient(145deg, ${IP.black}, ${IP.ink})`, color: '#fff',
          position: 'relative', overflow: 'hidden', boxShadow: '0 14px 30px -12px rgba(29,29,27,0.5)', cursor: 'pointer' }}>
          <div style={{ position: 'absolute', right: -20, top: -20, width: 120, height: 120, borderRadius: 999, background: 'rgba(198,155,60,0.16)' }} />
          <div style={{ position: 'absolute', right: 12, bottom: 8, opacity: 0.07 }}><BrandMark height={92} mono="#fff" /></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative' }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.65)' }}>Incidencias abiertas</div>
              <div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 52, lineHeight: 1, marginTop: 6, color: '#fff' }}>{openCount}</div>
              <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 6, fontSize: 12.5, color: IP.gold50, fontWeight: 600 }}>
                <Icon name="alert" size={14} color={IP.gold50} stroke={2} />
                {isAdmin ? '1 urgente · requiere atención' : '1 urgente en tu zona'}
              </div>
            </div>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="wrench" size={22} color={IP.gold50} stroke={2} />
            </div>
          </div>
          <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.12)' }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>Ver incidencias</span>
            <Icon name="chevR" size={18} color={IP.gold50} stroke={2.4} />
          </div>
        </div>

        {/* mini stats */}
        <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
          {isAdmin ? <>
            <MiniStat icon="building" color={IP.gold}  value="50" label="Pisos" />
            <MiniStat icon="users"    color={IP.green} value="231" label="Inquilinos" />
            <MiniStat icon="euro"     color={IP.blue}  value="3.8k" label="Coste mes" />
          </> : <>
            <MiniStat icon="building" color={IP.gold}  value="14" label="Pisos" />
            <MiniStat icon="users"    color={IP.green} value="68" label="Inquilinos" />
            <MiniStat icon="euro"     color={IP.blue}  value="1.3k" label="Coste mes" />
          </>}
        </div>
      </div>

      {/* accesos rápidos */}
      <SectionLabel>Accesos rápidos</SectionLabel>
      <div style={{ padding: '0 16px' }}>
        <Card pad={16}>
          <div style={{ display: 'flex', gap: 6 }}>
            <QuickAccess icon="wrench" label="Incidencias" color={IP.red} onClick={() => nav.setTab('incidencias')} />
            <QuickAccess icon="users" label="Inquilinos" color={IP.green} onClick={() => nav.setTab('inquilinos')} />
            <QuickAccess icon="chart" label="Datos" color={IP.blue} onClick={() => nav.setTab('estadisticas')} />
            <QuickAccess icon="qr" label="QR" color={IP.gold} onClick={() => isAdmin ? nav.openInTab('admin', 'admin-qr') : nav.goPublic()} />
          </div>
        </Card>
      </div>

      {/* solo admin: resumen global por zona */}
      {isAdmin && <>
        <SectionLabel action="Ver todo" onAction={() => nav.setTab('estadisticas')}>Resumen por zona</SectionLabel>
        <div style={{ padding: '0 16px' }}>
          <Card pad={0} style={{ padding: '4px 16px' }}>
            {ZONE_STATS.map((z, i) => (
              <Row key={z.zone} icon="pin" iconColor={ZONES[i].color} title={z.zone}
                onClick={() => nav.setTab('estadisticas')}
                sub={`${z.inc} incidencias · ${z.cost} € este año`}
                right={z.open > 0 ? <Badge fg={IP.red} bg={IP.redBg}>{z.open} abierta{z.open > 1 ? 's' : ''}</Badge> : <Badge fg={IP.green} bg={IP.greenBg}>Al día</Badge>}
                last={i === ZONE_STATS.length - 1} />
            ))}
          </Card>
        </div>
      </>}

      {/* actividad */}
      <SectionLabel>Última actividad</SectionLabel>
      <div style={{ padding: '0 16px' }}>
        <Card pad={0} style={{ padding: '4px 16px' }}>
          {ACTIVITY.map((a, i) => (
            <Row key={i} icon={a.icon} iconColor={a.color}
              title={<span><b style={{ fontWeight: 700 }}>{a.who}</b> {a.what}</span>}
              sub={a.target} rightSub={a.when} last={i === ACTIVITY.length - 1} />
          ))}
        </Card>
      </div>
    </Screen>
  )
}
