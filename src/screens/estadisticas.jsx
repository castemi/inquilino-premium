/* Inquilino Premium — Estadísticas (módulo prioritario). Gráficos SVG inline, sin dependencias. */
import { IP, DISPLAY, FONT } from '../lib/tokens.js'
import { Icon } from '../lib/icon.jsx'
import { Screen, Header, HeaderBtn, TabBar, Card, SectionLabel, Chips, Row, Button } from '../ui/index.jsx'
import { ZONES, ZONE_STATS, MONTHS, INC_BY_MONTH, COST_BY_MONTH, PRIO_BY_MONTH } from '../lib/data.js'

function sparkPath(vals, w, h, pad = 2) {
  const min = Math.min(...vals), max = Math.max(...vals), rng = max - min || 1
  const step = (w - pad * 2) / (vals.length - 1)
  return vals.map((v, i) => `${pad + i * step},${pad + (h - pad * 2) * (1 - (v - min) / rng)}`)
}

function Spark({ vals, w = 90, h = 30, color = IP.gold }) {
  const pts = sparkPath(vals, w, h)
  const id = 'sg' + color.replace('#', '')
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display: 'block' }}>
      <defs><linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={color} stopOpacity="0.25" /><stop offset="100%" stopColor={color} stopOpacity="0" />
      </linearGradient></defs>
      <polygon points={`${pts.join(' ')} ${w - 2},${h} 2,${h}`} fill={`url(#${id})`} />
      <polyline points={pts.join(' ')} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={pts[pts.length - 1].split(',')[0]} cy={pts[pts.length - 1].split(',')[1]} r="2.6" fill={color} />
    </svg>
  )
}

function KPI({ label, value, unit, delta, up, good, vals, color }) {
  const deltaGood = good === undefined ? !up : good
  const dc = deltaGood ? IP.green : IP.red
  return (
    <Card pad={14} style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontSize: 12, color: IP.grey500, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 3, marginTop: 5 }}>
        <span style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 26, letterSpacing: -0.6, color: IP.black, lineHeight: 1 }}>{value}</span>
        {unit && <span style={{ fontSize: 13, fontWeight: 700, color: IP.grey500 }}>{unit}</span>}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 9 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2, fontSize: 11.5, fontWeight: 700, color: dc }}>
          <Icon name={up ? 'arrowUp' : 'arrowDown'} size={12} color={dc} stroke={2.6} />{delta}
        </span>
        <Spark vals={vals} w={70} h={24} color={color || IP.gold} />
      </div>
    </Card>
  )
}

function LineChart({ vals, labels, color = IP.gold, h = 130 }) {
  const w = 322, padL = 6, padR = 6, padT = 10, padB = 20
  const min = 0, max = Math.max(...vals) * 1.1, rng = max - min || 1
  const step = (w - padL - padR) / (vals.length - 1)
  const y = v => padT + (h - padT - padB) * (1 - (v - min) / rng)
  const pts = vals.map((v, i) => `${padL + i * step},${y(v)}`)
  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} style={{ display: 'block' }}>
      <defs><linearGradient id="lcg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={color} stopOpacity="0.22" /><stop offset="100%" stopColor={color} stopOpacity="0" />
      </linearGradient></defs>
      {[0.25, 0.5, 0.75, 1].map((g, i) => <line key={i} x1={padL} x2={w - padR} y1={padT + (h - padT - padB) * g} y2={padT + (h - padT - padB) * g} stroke={IP.line} strokeWidth="1" />)}
      <polygon points={`${pts.join(' ')} ${w - padR},${h - padB} ${padL},${h - padB}`} fill="url(#lcg)" />
      <polyline points={pts.join(' ')} fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      {vals.map((v, i) => i === vals.length - 1 && <circle key={i} cx={padL + i * step} cy={y(v)} r="3.5" fill={color} stroke="#fff" strokeWidth="1.6" />)}
      {labels.map((l, i) => (i % 2 === 0) && <text key={i} x={padL + i * step} y={h - 6} fontSize="9" fill={IP.grey400} textAnchor="middle" fontFamily={FONT} fontWeight="600">{l}</text>)}
    </svg>
  )
}

function StackedBars({ data, h = 140 }) {
  const w = 322, padB = 18, padT = 6, gap = 5
  const max = Math.max(...data.map(d => d.urgente + d.alta + d.baja)) || 1
  const bw = (w - gap * (data.length - 1)) / data.length
  const sc = (h - padT - padB) / max
  const segs = [['baja', IP.green], ['alta', IP.orange], ['urgente', IP.red]]
  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} style={{ display: 'block' }}>
      {data.map((d, i) => {
        const x = i * (bw + gap); let yy = h - padB
        return <g key={i}>{segs.map(([k, c], j) => {
          const seg = d[k] * sc; yy -= seg
          return <rect key={j} x={x} y={yy} width={bw} height={Math.max(seg, 0)} fill={c} rx="1.5"
            style={{ opacity: i === data.length - 1 ? 1 : 0.82 }} />
        })}
          {i % 2 === 0 && <text x={x + bw / 2} y={h - 5} fontSize="9" fill={IP.grey400} textAnchor="middle" fontFamily={FONT} fontWeight="600">{d.m}</text>}
        </g>
      })}
    </svg>
  )
}

export function StatsScreen({ role = 'admin' }) {
  const isAdmin = role === 'admin'
  const myZone = ZONE_STATS[0] // Valladolid
  const globalAvg = { inc: 12, cost: 950, days: 3.9, perRoom: 15.0 }
  const openCount = isAdmin ? 6 : 1
  return (
    <Screen
      header={<Header title="Estadísticas" eyebrow={isAdmin ? 'Visión global' : 'Valladolid vs global'} count="Mayo 2026"
        actions={<HeaderBtn icon="download" />} />}
      tabbar={<TabBar active="estadisticas" openCount={openCount} showAdmin={isAdmin} />}>
      {/* filtro de rango */}
      <Chips items={[
        { label: 'Este mes', on: true }, { label: '3 meses' }, { label: '12 meses' },
        ...(isAdmin ? [{ label: 'Todas las zonas', icon: 'pin' }] : []),
      ]} />

      <div style={{ padding: '4px 16px 0' }}>
        {/* rejilla de KPIs */}
        <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
          <KPI label="Incidencias" value="16" delta="+33%" up good={false} vals={INC_BY_MONTH.slice(-6)} color={IP.gold} />
          <KPI label="Coste total" value="1.340" unit="€" delta="+41%" up good={false} vals={COST_BY_MONTH.slice(-6)} color={IP.blue} />
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
          <KPI label="Resolución media" value="3,2" unit="d" delta="−18%" up={false} good vals={[5.1,4.6,4.2,3.8,3.5,3.2]} color={IP.green} />
          <KPI label="Abiertas ahora" value={isAdmin ? '6' : '1'} unit="" delta="hoy" up good vals={[2,3,4,5,4,isAdmin?6:1]} color={IP.red} />
        </div>
        <p style={{ margin: '10px 4px 0', fontSize: 11.5, color: IP.grey500 }}>Comparado con la media de los últimos 12 meses.</p>
      </div>

      {/* evolución */}
      <SectionLabel>Evolución · incidencias / mes</SectionLabel>
      <div style={{ padding: '0 16px' }}>
        <Card pad={14}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 8 }}>
            <span style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 22, color: IP.black }}>128</span>
            <span style={{ fontSize: 12.5, color: IP.grey500, fontWeight: 600 }}>incidencias · últimos 12 meses</span>
          </div>
          <LineChart vals={INC_BY_MONTH} labels={MONTHS} color={IP.gold} />
        </Card>
      </div>

      {/* prioridades */}
      <SectionLabel>Prioridades por mes</SectionLabel>
      <div style={{ padding: '0 16px' }}>
        <Card pad={14}>
          <div style={{ display: 'flex', gap: 16, marginBottom: 10 }}>
            {[['Urgente', IP.red], ['Alta', IP.orange], ['Baja', IP.green]].map(([l, c]) => (
              <span key={l} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11.5, fontWeight: 600, color: IP.grey700 }}>
                <span style={{ width: 9, height: 9, borderRadius: 3, background: c }} />{l}
              </span>
            ))}
          </div>
          <StackedBars data={PRIO_BY_MONTH} />
        </Card>
      </div>

      {/* coste */}
      <SectionLabel>Coste mensual (€)</SectionLabel>
      <div style={{ padding: '0 16px' }}>
        <Card pad={14}><LineChart vals={COST_BY_MONTH} labels={MONTHS} color={IP.blue} h={120} /></Card>
      </div>

      {/* comparativa por zona */}
      <SectionLabel>{isAdmin ? 'Comparativa por zona' : 'Tu zona vs media global'}</SectionLabel>
      <div style={{ padding: '0 16px' }}>
        {isAdmin ? (
          <Card pad={0} style={{ padding: '4px 16px' }}>
            {ZONE_STATS.map((z, i) => (
              <Row key={z.zone} icon="pin" iconColor={ZONES[i].color} title={z.zone}
                sub={`${z.inc} inc · ${z.days} d media · ${z.open} abierta${z.open !== 1 ? 's' : ''}`}
                right={`${z.cost} €`} rightSub={`${z.perRoom} €/hab`} last={i === ZONE_STATS.length - 1} />
            ))}
          </Card>
        ) : (
          <Card pad={16}>
            {[['Incidencias', myZone.inc, globalAvg.inc, ''], ['Coste', myZone.cost, globalAvg.cost, '€'], ['Resolución', myZone.days, globalAvg.days, 'd'], ['€/habitación', myZone.perRoom, globalAvg.perRoom, '€']].map(([l, mine, glob, u], i) => {
              const max = Math.max(mine, glob)
              return (
                <div key={i} style={{ marginBottom: i === 3 ? 0 : 15 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, fontWeight: 600, color: IP.grey700, marginBottom: 6 }}>
                    <span>{l}</span><span style={{ color: IP.gold }}>{mine}{u} <span style={{ color: IP.grey400 }}>· global {glob}{u}</span></span>
                  </div>
                  <div style={{ position: 'relative', height: 8, background: IP.grey100, borderRadius: 999 }}>
                    <div style={{ position: 'absolute', height: 8, width: `${(glob / max) * 100}%`, background: IP.grey300, borderRadius: 999 }} />
                    <div style={{ position: 'absolute', height: 8, width: `${(mine / max) * 100}%`, background: IP.gold, borderRadius: 999 }} />
                  </div>
                </div>
              )
            })}
          </Card>
        )}
      </div>

      {/* KPIs específicos */}
      <SectionLabel>Indicadores clave</SectionLabel>
      <div style={{ padding: '0 16px', display: 'flex', gap: 10 }}>
        <Card pad={15} style={{ flex: 1 }}>
          <div style={{ fontSize: 12, color: IP.grey500, fontWeight: 600 }}>Coste medio / habitación</div>
          <div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 28, color: IP.black, marginTop: 6 }}>18,9 €</div>
          <div style={{ fontSize: 11.5, color: IP.grey500, marginTop: 4 }}>últimos 12 meses · global 15,0 €</div>
        </Card>
      </div>
      <div style={{ padding: '10px 16px 0' }}>
        <Card pad={16}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', color: IP.grey500, marginBottom: 10 }}>Resolución media por prioridad</div>
          {[['Urgente', IP.red, '1,4 d', 22], ['Alta', IP.orange, '3,1 d', 48], ['Baja', IP.green, '6,8 d', 100]].map(([l, c, d, pct], i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: i === 2 ? 0 : 11 }}>
              <span style={{ width: 58, fontSize: 13, fontWeight: 600, color: IP.grey700 }}>{l}</span>
              <div style={{ flex: 1, height: 8, background: IP.grey100, borderRadius: 999 }}>
                <div style={{ height: 8, width: `${pct}%`, background: c, borderRadius: 999 }} />
              </div>
              <span style={{ width: 38, textAlign: 'right', fontSize: 13, fontWeight: 700, color: IP.black }}>{d}</span>
            </div>
          ))}
        </Card>
      </div>

      {/* top problemas */}
      <SectionLabel>Pisos con más incidencias · 3 meses</SectionLabel>
      <div style={{ padding: '0 16px' }}>
        <Card pad={0} style={{ padding: '4px 16px' }}>
          {[['VLL-01', 'Valladolid', 7, 540], ['SUR-03', 'Salamanca', 5, 410], ['NOR-07', 'Burgos', 4, 880], ['VLL-03', 'Valladolid', 3, 145]].map((r, i, arr) => (
            <Row key={i} title={<span><b style={{ fontWeight: 700 }}>{r[0]}</b> <span style={{ color: IP.grey500, fontWeight: 500 }}>· {r[1]}</span></span>}
              right={`${r[2]} inc`} rightSub={`${r[3]} €`}
              icon="building" iconColor={i === 0 ? IP.red : IP.grey500} last={i === arr.length - 1} />
          ))}
        </Card>
      </div>

      {/* exportar */}
      <div style={{ padding: '20px 16px 0', display: 'flex', gap: 10 }}>
        <Button kind="secondary" full icon="download" size="md">CSV</Button>
        <Button kind="dark" full icon="doc" size="md">PDF</Button>
      </div>
    </Screen>
  )
}
