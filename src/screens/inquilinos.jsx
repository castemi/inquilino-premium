/* Inquilino Premium — Inquilinos: lista + detalle (pagos, entradas, salidas) + hoja nuevo. */
import { useState } from 'react'
import { IP, FONT, DISPLAY } from '../lib/tokens.js'
import { Icon } from '../lib/icon.jsx'
import { Screen, Header, HeaderBtn, TabBar, Card, Segmented, Chips, SearchBar, Row, Field, Button, FAB, Avatar, Badge } from '../ui/index.jsx'
import { TENANTS } from '../lib/data.js'
import { useNav } from '../nav.jsx'

function TenantCard({ t, onClick }) {
  const retraso = t.status === 'retraso'
  return (
    <Card pad={14} style={{ marginBottom: 10 }} onClick={onClick}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
        <Avatar initials={t.initials} size={46} color={retraso ? IP.orange : IP.gold} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 15.5, fontWeight: 700, color: IP.black }}>{t.name}</span>
            {retraso
              ? <Badge fg={IP.red} bg={IP.redBg} dot>Retraso {t.dueDays} d</Badge>
              : <Badge fg={IP.green} bg={IP.greenBg} dot>Al día</Badge>}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4, fontSize: 13, color: IP.grey500, fontWeight: 500 }}>
            <Icon name="door" size={14} color={IP.grey400} stroke={2} />
            {t.flat} · {t.room} · {t.city}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8, paddingTop: 8, borderTop: `1px solid ${IP.line}` }}>
            <span style={{ fontSize: 12.5, color: IP.grey500, fontWeight: 600 }}>Vence {t.due}</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: IP.black }}>{t.rent} € / mes</span>
          </div>
        </div>
      </div>
    </Card>
  )
}

export function TenantsListScreen({ role = 'admin' }) {
  const nav = useNav()
  const isAdmin = role === 'admin'
  return (
    <Screen
      header={<Header title="Inquilinos" eyebrow={isAdmin ? 'Todas las zonas' : 'Valladolid'} count="231 activos"
        actions={<HeaderBtn icon="search" />} />}
      tabbar={<TabBar active="inquilinos" openCount={isAdmin ? 6 : 1} showAdmin={isAdmin} />}>
      <Segmented active="activos" options={[
        { key: 'activos', label: 'Activos', count: 231 }, { key: 'inactivos', label: 'Inactivos' }, { key: 'todos', label: 'Todos' },
      ]} />
      <Chips items={[{ label: 'Con retraso', icon: 'alert', on: true }, { label: 'Ciudad' }, { label: 'Piso' }]} />
      <SearchBar placeholder="Buscar por nombre o teléfono" />
      <div style={{ padding: '10px 16px 0' }}>
        {TENANTS.map(t => <TenantCard key={t.id} t={t} onClick={() => nav.push('inquilino-detalle', { tenant: t })} />)}
      </div>
      <FAB label="Nuevo" onClick={() => nav.push('inquilino-nuevo')} />
    </Screen>
  )
}

// chip de mes de pago
function PayMonth({ m, amount, state }) {
  const map = {
    paid: { bg: IP.greenBg, fg: IP.green, icon: 'check', label: amount + ' €' },
    late: { bg: IP.redBg, fg: IP.red, icon: 'alert', label: 'Retraso' },
    pending: { bg: IP.grey100, fg: IP.grey500, icon: 'clock', label: 'Pendiente' },
  }
  const s = map[state]
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 13px', borderRadius: 12, background: s.bg, marginBottom: 7 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 28, height: 28, borderRadius: 8, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name={s.icon} size={15} color={s.fg} stroke={2.4} />
        </div>
        <span style={{ fontSize: 14.5, fontWeight: 700, color: IP.black }}>{m}</span>
      </div>
      <span style={{ fontSize: 13.5, fontWeight: 700, color: s.fg }}>{s.label}</span>
    </div>
  )
}

const SECLABEL = { fontSize: 12, fontWeight: 700, letterSpacing: 0.8, textTransform: 'uppercase', color: IP.grey500 }

// calendario de pagos según el estado del inquilino
function paymentsFor(t) {
  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio']
  if (t.status === 'retraso') {
    return months.map((m, i) => ({ m, amount: t.rent, state: i < 4 ? 'paid' : (i === 4 ? 'late' : 'pending') }))
  }
  return months.map((m, i) => ({ m, amount: t.rent, state: i < 5 ? 'paid' : 'pending' }))
}

export function TenantDetailScreen({ tenant }) {
  const t = tenant || TENANTS[1]
  const [tab, setTab] = useState('pagos')
  const retraso = t.status === 'retraso'
  const pays = paymentsFor(t)
  return (
    <Screen header={<Header back="Inquilinos" title={t.name} actions={<HeaderBtn icon="dots" />} />}>
      <div style={{ padding: '4px 16px 0' }}>
        {/* tarjeta de identidad */}
        <Card pad={16}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <Avatar initials={t.initials} size={56} color={retraso ? IP.orange : IP.gold} />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13.5, color: IP.grey700, fontWeight: 600 }}>
                <Icon name="door" size={15} color={IP.gold} stroke={2} />{t.flat} · {t.room} · {t.city}
              </div>
              <div style={{ marginTop: 8, display: 'flex', gap: 7 }}>
                {retraso
                  ? <Badge fg={IP.red} bg={IP.redBg} dot>Retraso {t.dueDays} días</Badge>
                  : <Badge fg={IP.green} bg={IP.greenBg} dot>Al día</Badge>}
                <Badge fg={IP.gold} bg={IP.gold10}>{t.rent} €/mes</Badge>
              </div>
            </div>
          </div>
        </Card>

        {/* pestañas internas */}
        <Segmented active={tab} onChange={setTab} options={[
          { key: 'datos', label: 'Datos' }, { key: 'pagos', label: 'Pagos' }, { key: 'entradas', label: 'Entradas' }, { key: 'salidas', label: 'Salidas' },
        ]} />

        {tab === 'datos' && (
          <Card pad={16} style={{ marginTop: 14 }}>
            <Field label="Nombre completo" value={t.name} icon="user" />
            <Field label="Teléfono" value="+34 6XX XX XX XX" icon="phone" />
            <Field label="Correo electrónico" value="correo@ejemplo.com" icon="mail" />
            <Field label="DNI / NIE" value="00000000-X" icon="doc" />
            <Field label="Habitación" value={`${t.flat} · ${t.room}`} icon="door" />
          </Card>
        )}

        {tab === 'pagos' && <>
          <div style={{ margin: '14px 0 8px', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', padding: '0 4px' }}>
            <span style={SECLABEL}>Pagos · 2026</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: IP.gold }}>Generar año</span>
          </div>
          {pays.map(p => <PayMonth key={p.m} m={p.m} amount={p.amount} state={p.state} />)}
        </>}

        {tab === 'entradas' && <>
          <div style={{ margin: '14px 0 8px', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', padding: '0 4px' }}>
            <span style={SECLABEL}>Entrada</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: IP.gold }}>+ Nueva</span>
          </div>
          <Card pad={0} style={{ padding: '4px 16px' }}>
            <Row icon="calendar" iconColor={IP.green} title="12 ene 2026" sub="Fecha de entrada" right={<Badge fg={IP.green} bg={IP.greenBg}>Ingreso ✓</Badge>} />
            <Row icon="euro" iconColor={IP.gold} title="Fianza" sub="Mes de salida incluido" right={`${t.rent} €`} last />
          </Card>
        </>}

        {tab === 'salidas' && <>
          <div style={{ margin: '14px 0 8px', padding: '0 4px' }}><span style={SECLABEL}>Salida</span></div>
          <Card pad={20} style={{ textAlign: 'center' }} onLine>
            <Icon name="door" size={26} color={IP.grey300} stroke={1.8} style={{ margin: '0 auto 8px' }} />
            <div style={{ fontSize: 13.5, color: IP.grey500, fontWeight: 500 }}>Sin salida registrada · inquilino activo</div>
          </Card>
        </>}

        <div style={{ marginTop: 18 }}>
          <Button kind="secondary" full icon="edit">Editar inquilino</Button>
        </div>
      </div>
    </Screen>
  )
}

// hoja slide-up de nuevo inquilino
export function NewTenantSheet() {
  const nav = useNav()
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', fontFamily: FONT, background: 'rgba(29,29,27,0.32)' }}>
      <div style={{ flex: 1 }} onClick={() => nav.closeSheet()} />
      <div style={{ background: IP.surface, borderRadius: '28px 28px 0 0', paddingTop: 10, maxHeight: '90%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ width: 38, height: 5, borderRadius: 999, background: IP.grey300, margin: '0 auto 6px' }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 20px 12px', borderBottom: `1px solid ${IP.line}` }}>
          <span onClick={() => nav.closeSheet()} style={{ fontSize: 15, fontWeight: 600, color: IP.grey500, cursor: 'pointer' }}>Cancelar</span>
          <span style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 17, color: IP.black }}>Nuevo inquilino</span>
          <span onClick={() => nav.closeSheet()} style={{ fontSize: 15, fontWeight: 700, color: IP.gold, cursor: 'pointer' }}>Guardar</span>
        </div>
        <div style={{ overflow: 'auto', padding: '16px 20px 30px' }}>
          <Field label="Habitación" value="VLL-02 · H4 (libre)" icon="door" required />
          <Field label="Nombre completo" placeholder="Nombre y apellidos" icon="user" required />
          <Field label="Teléfono" placeholder="+34 6XX XX XX XX" icon="phone" required />
          <Field label="Correo electrónico" placeholder="correo@ejemplo.com" icon="mail" />
          <Field label="DNI / NIE" placeholder="00000000-X" icon="doc" />
          <Field label="Notas" placeholder="Observaciones internas…" multiline />
          <Button kind="primary" size="lg" full icon="plus" style={{ marginTop: 6 }} onClick={() => nav.closeSheet()}>Crear inquilino</Button>
        </div>
      </div>
    </div>
  )
}
