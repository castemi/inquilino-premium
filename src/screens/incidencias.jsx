/* Inquilino Premium — Incidencias: lista + detalle (módulo prioritario). */
import { useState } from 'react'
import { IP, STATUS, PRIORITY } from '../lib/tokens.js'
import { Icon } from '../lib/icon.jsx'
import { Screen, Header, HeaderBtn, TabBar, Card, Segmented, Chips, Row, Field, Button, StatusBadge, PriorityBadge } from '../ui/index.jsx'
import { INCIDENTS } from '../lib/data.js'
import { useNav } from '../nav.jsx'

// incidencias de otras zonas, solo visibles para admin
const INCIDENTS_OTHER = [
  { id: 'f5c1a8e2', status: 'abierta', priority: 'urgente', flat: 'NOR-07', city: 'Burgos', zone: 'Zona Norte', loc: 'Garaje', locType: 'Zona común', desc: 'La puerta del garaje no abre con el mando, varios inquilinos sin acceso.', reporter: 'Sergio Aliste', phone: '+34 633 11 90 42', date: '29 may', days: 0, cost: null, media: 2, comments: 0 },
  { id: 'a8d2f4b6', status: 'abierta', priority: 'alta', flat: 'SUR-03', city: 'Salamanca', zone: 'Zona Sur', loc: 'Habitación H2', locType: 'Habitación', desc: 'Persiana atascada, no sube. La habitación queda a oscuras.', reporter: 'Nora Vidal', phone: '+34 688 54 22 17', date: '27 may', days: 2, cost: null, media: 1, comments: 1 },
]

function IncidentCard({ inc, showZone, onClick }) {
  const s = STATUS[inc.status]
  return (
    <Card pad={0} style={{ overflow: 'hidden', marginBottom: 10 }} onClick={onClick}>
      <div style={{ display: 'flex' }}>
        <div style={{ width: 4, background: s.dot, flexShrink: 0 }} />
        <div style={{ flex: 1, padding: 15, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 9 }}>
            <div style={{ display: 'flex', gap: 6 }}>
              <StatusBadge status={inc.status} />
              <PriorityBadge priority={inc.priority} />
            </div>
            <span style={{ fontSize: 12, color: IP.grey500, fontWeight: 600 }}>{inc.date}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 4 }}>
            <Icon name="pin" size={15} color={IP.gold} stroke={2} />
            <span style={{ fontSize: 14.5, fontWeight: 700, color: IP.black }}>{inc.flat} · {inc.loc}</span>
          </div>
          <p style={{ margin: 0, fontSize: 13, color: IP.grey700, lineHeight: 1.42, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{inc.desc}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 11, paddingTop: 11, borderTop: `1px solid ${IP.line}`, fontSize: 12, color: IP.grey500, fontWeight: 600 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Icon name="clock" size={13} color={inc.status === 'abierta' ? IP.red : IP.grey400} stroke={2} />
              {inc.resolved ? `${inc.days} días` : `${inc.days} ${inc.days === 1 ? 'día' : 'días'} abierta`}
            </span>
            {inc.cost != null && <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Icon name="euro" size={13} color={IP.grey400} stroke={2} />{inc.cost} €</span>}
            {inc.media > 0 && <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Icon name="camera" size={13} color={IP.grey400} stroke={2} />{inc.media}</span>}
            {inc.comments > 0 && <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Icon name="msg" size={13} color={IP.grey400} stroke={2} />{inc.comments}</span>}
            {showZone && <span style={{ marginLeft: 'auto', color: IP.gold }}>{inc.zone}</span>}
          </div>
        </div>
      </div>
    </Card>
  )
}

const FILTERS = {
  todas: () => true,
  abiertas: (i) => i.status === 'abierta',
  curso: (i) => i.status === 'en_curso',
  resueltas: (i) => i.status === 'resuelta' || i.status === 'cerrada',
}

export function IncidentsListScreen({ role = 'admin' }) {
  const nav = useNav()
  const [filter, setFilter] = useState('todas')
  const isAdmin = role === 'admin'
  const all = isAdmin ? [...INCIDENTS_OTHER, ...INCIDENTS] : INCIDENTS
  const open = all.filter(i => i.status === 'abierta').length
  const list = all.filter(FILTERS[filter])
  const header = (
    <Header title="Incidencias" eyebrow={isAdmin ? 'Todas las zonas' : 'Valladolid'} count={`${open} abiertas`}
      actions={<HeaderBtn icon="sliders" />} />
  )
  return (
    <Screen header={header} tabbar={<TabBar active="incidencias" openCount={open} showAdmin={isAdmin} />}>
      <Segmented active={filter} onChange={setFilter} options={[
        { key: 'todas', label: 'Todas', count: all.length },
        { key: 'abiertas', label: 'Abiertas', count: open },
        { key: 'curso', label: 'En curso' },
        { key: 'resueltas', label: 'Resueltas' },
      ]} />
      <Chips items={[
        ...(isAdmin ? [{ label: 'Todas las zonas', icon: 'pin', on: true }] : []),
        { label: 'Prioridad', icon: 'filter' },
        { label: 'Ciudad' },
        { label: 'Este mes' },
      ]} />
      <div style={{ padding: '8px 16px 0' }}>
        {list.length
          ? list.map(inc => <IncidentCard key={inc.id} inc={inc} showZone={isAdmin} onClick={() => nav.push('incidencia-detalle', { incident: inc })} />)
          : <div style={{ textAlign: 'center', color: IP.grey500, fontSize: 14, padding: '40px 20px' }}>No hay incidencias en este filtro.</div>}
      </div>
    </Screen>
  )
}

// ── Detalle ──
function SecHeader({ children, action }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', margin: '20px 4px 9px' }}>
      <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 0.8, textTransform: 'uppercase', color: IP.grey500 }}>{children}</span>
      {action}
    </div>
  )
}

function PrioPick({ k, active }) {
  const p = PRIORITY[k]
  const on = k === active
  return (
    <div style={{ flex: 1, textAlign: 'center', padding: '9px 4px', borderRadius: 10, fontSize: 13, fontWeight: 700,
      background: on ? p.bg : IP.grey100, color: on ? p.fg : IP.grey500, border: `1.5px solid ${on ? p.fg : 'transparent'}` }}>
      {p.label}
    </div>
  )
}

// seguimiento de muestra (para incidencias con comentarios)
const SAMPLE_COMMENTS = [
  { who: 'Óscar Castro', when: '24 may · 11:20', txt: 'Aviso recibido. Contacto con fontanero para mañana por la mañana.' },
  { who: 'Óscar Castro', when: '25 may · 09:05', txt: 'Fontanero revisa la caldera: válvula de presión defectuosa. Pieza pedida.' },
]

export function IncidentDetailScreen({ incident }) {
  const inc = incident || INCIDENTS[1]
  const comments = inc.comments > 0 ? SAMPLE_COMMENTS.slice(0, Math.min(inc.comments, 2)) : []
  return (
    <Screen
      header={<Header back="Incidencias" title={`#${inc.id}`}
        actions={<><HeaderBtn icon="phone" /><HeaderBtn icon="dots" /></>} />}>
      <div style={{ padding: '4px 16px 0' }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
          <StatusBadge status={inc.status} />
          <PriorityBadge priority={inc.priority} />
          <span style={{ marginLeft: 'auto', alignSelf: 'center', fontSize: 12.5, color: IP.grey500, fontWeight: 600 }}>Entrada {inc.date}</span>
        </div>

        <SecHeader>Datos de la incidencia</SecHeader>
        <Card pad={0} style={{ padding: '4px 16px' }}>
          <Row icon="user" iconColor={IP.gold} title={inc.reporter} sub="Persona que reporta" />
          <Row icon="phone" iconColor={IP.green} title={inc.phone} sub="Toca para llamar" right={<Icon name="phone" size={18} color={IP.green} stroke={2} />} />
          <Row icon="pin" iconColor={IP.blue} title={`${inc.flat} · ${inc.loc}`} sub={`${inc.city} · ${inc.locType}`} last />
        </Card>
        <Card style={{ marginTop: 10 }} pad={16}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', color: IP.grey500, marginBottom: 7 }}>Descripción</div>
          <p style={{ margin: 0, fontSize: 14.5, color: IP.ink, lineHeight: 1.5 }}>{inc.desc}</p>
        </Card>

        {inc.media > 0 && <>
          <SecHeader>Fotos y vídeos</SecHeader>
          <div style={{ display: 'flex', gap: 8 }}>
            {[IP.gold20, IP.grey200, IP.gold50, IP.gold10, IP.blueBg].slice(0, inc.media).map((c, i) => (
              <div key={i} style={{ flex: 1, aspectRatio: '1', borderRadius: 12, background: `linear-gradient(135deg, ${c}, ${IP.grey100})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${IP.line}` }}>
                <Icon name="camera" size={22} color={IP.grey400} stroke={1.8} />
              </div>
            ))}
          </div>
        </>}

        <SecHeader>Gestión</SecHeader>
        <Card pad={16}>
          <div style={{ fontSize: 13, fontWeight: 600, color: IP.grey700, marginBottom: 8 }}>Prioridad</div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            <PrioPick k="urgente" active={inc.priority} /><PrioPick k="alta" active={inc.priority} /><PrioPick k="baja" active={inc.priority} />
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ flex: 1 }}><Field label="Coste (€)" value={inc.cost != null ? String(inc.cost) : ''} placeholder="—" icon="euro" /></div>
            <div style={{ flex: 1 }}><Field label="Días" value={`${inc.days} ${inc.days === 1 ? 'día' : 'días'}`} icon="clock" /></div>
          </div>
          <Field label="Estado" value={STATUS[inc.status].label} icon="refresh" />
          <Field label="Fecha de resolución" value={inc.resolved || ''} placeholder="Pendiente" icon="calendar" hint="Obligatoria al marcar como resuelta." />
        </Card>

        <SecHeader>Seguimiento</SecHeader>
        <Card pad={16}>
          {comments.length ? comments.map((c, i, arr) => (
            <div key={i} style={{ display: 'flex', gap: 11, paddingBottom: i === arr.length - 1 ? 4 : 16 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: 9, height: 9, borderRadius: 999, background: IP.gold, marginTop: 4 }} />
                {i < arr.length - 1 && <div style={{ width: 2, flex: 1, background: IP.line2, marginTop: 4 }} />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontSize: 13.5, fontWeight: 700, color: IP.black }}>{c.who}</span>
                  <span style={{ fontSize: 11.5, color: IP.grey500 }}>{c.when}</span>
                </div>
                <p style={{ margin: '3px 0 0', fontSize: 13.5, color: IP.grey700, lineHeight: 1.45 }}>{c.txt}</p>
              </div>
            </div>
          )) : <p style={{ margin: '2px 0 10px', fontSize: 13.5, color: IP.grey500 }}>Sin seguimiento todavía.</p>}
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginTop: 6, padding: '10px 12px', background: IP.grey100, borderRadius: 12 }}>
            <span style={{ flex: 1, fontSize: 14.5, color: IP.grey400 }}>Añadir seguimiento…</span>
            <div style={{ width: 32, height: 32, borderRadius: 999, background: IP.gold, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="send" size={16} color="#fff" stroke={2.2} />
            </div>
          </div>
        </Card>

        <div style={{ marginTop: 18 }}>
          <Button kind="primary" size="lg" full icon="check">Guardar cambios</Button>
        </div>
      </div>
    </Screen>
  )
}
