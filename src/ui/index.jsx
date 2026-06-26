/* Inquilino Premium — primitivos de UI estilo iOS (estilos inline).
   TabBar y Header son nav-aware: consumen el NavContext para navegar. */
import { IP, STATUS, PRIORITY, FONT, DISPLAY } from '../lib/tokens.js'
import { Icon } from '../lib/icon.jsx'
import { useNav } from '../nav.jsx'

export { FONT, DISPLAY }

// ── Andamiaje de pantalla: header fijo + cuerpo scrollable + tab bar opcional ──
export function Screen({ children, header, tabbar, bg }) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column',
      background: bg || IP.surface, fontFamily: FONT, color: IP.text, position: 'relative' }}>
      {header}
      <div style={{ flex: 1, overflow: 'auto', WebkitOverflowScrolling: 'touch' }}>
        {children}
        <div style={{ height: tabbar ? 8 : 28 }} />
      </div>
      {tabbar}
    </div>
  )
}

// ── Header con large-title (iOS). back/eyebrow/actions/count opcionales ──
export function Header({ title, eyebrow, back, actions, count, onWhite, subtitle, accent }) {
  const nav = useNav()
  return (
    <div style={{
      paddingTop: 56, paddingLeft: 20, paddingRight: 20, paddingBottom: 12,
      background: onWhite ? IP.card : IP.surface,
      borderBottom: `1px solid ${IP.line}`, position: 'relative', zIndex: 4,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: 30 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
          {back && (
            <div onClick={() => nav.pop()} role="button"
              style={{ display: 'flex', alignItems: 'center', gap: 2, color: IP.gold, marginLeft: -6, fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>
              <Icon name="chevL" size={20} color={IP.gold} stroke={2.4} />
              <span>{back}</span>
            </div>
          )}
          {eyebrow && !back && (
            <span style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase', color: accent || IP.gold }}>{eyebrow}</span>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>{actions}</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: back ? 8 : 4 }}>
        <h1 style={{ margin: 0, fontFamily: DISPLAY, fontWeight: 800, fontSize: 30, lineHeight: 1.05, letterSpacing: -0.6, color: IP.black }}>{title}</h1>
        {count != null && (
          <span style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 15, color: IP.gold, paddingBottom: 4 }}>{count}</span>
        )}
      </div>
      {subtitle && <p style={{ margin: '5px 0 0', fontSize: 13.5, color: IP.grey500, fontWeight: 500 }}>{subtitle}</p>}
    </div>
  )
}

// botón circular de acción en header
export function HeaderBtn({ icon, onGold, badge, onClick }) {
  return (
    <div onClick={onClick} style={{ position: 'relative', width: 36, height: 36, borderRadius: 999,
      background: onGold ? IP.gold : IP.grey100, display: 'flex', alignItems: 'center', justifyContent: 'center',
      border: `1px solid ${onGold ? 'transparent' : IP.line}`, cursor: onClick ? 'pointer' : 'default' }}>
      <Icon name={icon} size={19} color={onGold ? '#fff' : IP.grey700} stroke={2} />
      {badge != null && badge > 0 && (
        <span style={{ position: 'absolute', top: -4, right: -4, minWidth: 17, height: 17, padding: '0 4px',
          borderRadius: 999, background: IP.red, color: '#fff', fontSize: 10.5, fontWeight: 800,
          display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1.5px solid #fff' }}>{badge}</span>
      )}
    </div>
  )
}

// ── Tab bar inferior (nav-aware) ──
export const TABS = [
  { key: 'inicio', label: 'Inicio', icon: 'home' },
  { key: 'incidencias', label: 'Incidencias', icon: 'wrench' },
  { key: 'inquilinos', label: 'Inquilinos', icon: 'users' },
  { key: 'estadisticas', label: 'Datos', icon: 'chart' },
  { key: 'admin', label: 'Admin', icon: 'cog' },
]
export function TabBar({ active, openCount, showAdmin = true }) {
  const nav = useNav()
  const tabs = showAdmin ? TABS : TABS.filter(t => t.key !== 'admin')
  return (
    <div style={{ flexShrink: 0, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(14px)',
      WebkitBackdropFilter: 'blur(14px)', borderTop: `1px solid ${IP.line}`,
      paddingTop: 8, paddingBottom: 26, display: 'flex', justifyContent: 'space-around', position: 'relative', zIndex: 5 }}>
      {tabs.map(t => {
        const on = t.key === active
        return (
          <div key={t.key} onClick={() => nav.setTab(t.key)}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, flex: 1, position: 'relative', cursor: 'pointer' }}>
            <div style={{ position: 'relative' }}>
              <Icon name={t.icon} size={24} color={on ? IP.gold : IP.grey400} stroke={on ? 2.1 : 1.9} />
              {t.key === 'incidencias' && openCount > 0 && (
                <span style={{ position: 'absolute', top: -5, right: -8, minWidth: 16, height: 16, padding: '0 3px',
                  borderRadius: 999, background: IP.red, color: '#fff', fontSize: 10, fontWeight: 800,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1.5px solid #fff' }}>{openCount}</span>
              )}
            </div>
            <span style={{ fontSize: 10.5, fontWeight: on ? 700 : 600, color: on ? IP.gold : IP.grey500, letterSpacing: 0.1 }}>{t.label}</span>
          </div>
        )
      })}
    </div>
  )
}

// ── Bloques de construcción ──
export function Card({ children, style = {}, pad = 16, onLine, onClick }) {
  return (
    <div onClick={onClick} style={{ background: IP.card, borderRadius: 16, padding: pad,
      boxShadow: onLine ? 'none' : '0 1px 2px rgba(29,29,27,0.04), 0 6px 18px -10px rgba(29,29,27,0.12)',
      border: onLine ? `1px solid ${IP.line}` : 'none', cursor: onClick ? 'pointer' : undefined, ...style }}>{children}</div>
  )
}

export function SectionLabel({ children, action, onAction }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', padding: '20px 22px 9px' }}>
      <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 0.8, textTransform: 'uppercase', color: IP.grey500 }}>{children}</span>
      {action && <span onClick={onAction} style={{ fontSize: 13.5, fontWeight: 600, color: IP.gold, cursor: onAction ? 'pointer' : undefined }}>{action}</span>}
    </div>
  )
}

export function Badge({ children, fg, bg, dot, solid, style = {} }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: dot ? '4px 9px 4px 8px' : '4px 9px',
      borderRadius: 999, background: solid ? fg : bg, color: solid ? '#fff' : fg, fontSize: 11.5, fontWeight: 700,
      letterSpacing: 0.1, lineHeight: 1.2, ...style }}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: 999, background: solid ? '#fff' : fg }} />}
      {children}
    </span>
  )
}

export function StatusBadge({ status }) {
  const s = STATUS[status]
  return <Badge fg={s.fg} bg={s.bg} dot>{s.label}</Badge>
}
export function PriorityBadge({ priority }) {
  const p = PRIORITY[priority]
  return <Badge fg={p.fg} bg={p.bg}>{p.label}</Badge>
}

export function SearchBar({ placeholder = 'Buscar' }) {
  return (
    <div style={{ margin: '6px 16px 2px', display: 'flex', alignItems: 'center', gap: 8, padding: '9px 12px',
      background: IP.grey100, borderRadius: 11, color: IP.grey400 }}>
      <Icon name="search" size={17} color={IP.grey400} stroke={2} />
      <span style={{ fontSize: 15, color: IP.grey400 }}>{placeholder}</span>
    </div>
  )
}

// control segmentado iOS
export function Segmented({ options, active, onChange }) {
  return (
    <div style={{ margin: '12px 16px 4px', display: 'flex', gap: 2, padding: 3, background: IP.grey100, borderRadius: 11 }}>
      {options.map(o => {
        const on = o.key === active
        return (
          <div key={o.key} onClick={() => onChange && onChange(o.key)} style={{ flex: 1, textAlign: 'center', padding: '7px 4px', borderRadius: 8.5,
            background: on ? IP.card : 'transparent', boxShadow: on ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
            fontSize: 13, fontWeight: on ? 700 : 600, color: on ? IP.black : IP.grey500, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
            {o.label}
            {o.count != null && <span style={{ fontSize: 11, fontWeight: 800, color: on ? IP.gold : IP.grey400 }}>{o.count}</span>}
          </div>
        )
      })}
    </div>
  )
}

// fila de chips de filtro
export function Chips({ items }) {
  return (
    <div style={{ display: 'flex', gap: 8, padding: '8px 16px 4px', overflow: 'hidden' }}>
      {items.map((c, i) => (
        <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '6px 12px', borderRadius: 999,
          fontSize: 12.5, fontWeight: 600, whiteSpace: 'nowrap',
          background: c.on ? IP.black : IP.card, color: c.on ? '#fff' : IP.grey700, border: `1px solid ${c.on ? IP.black : IP.line2}` }}>
          {c.icon && <Icon name={c.icon} size={13} color={c.on ? '#fff' : IP.grey500} stroke={2} />}
          {c.label}
        </span>
      ))}
    </div>
  )
}

export function Button({ children, kind = 'primary', icon, full, size = 'md', style = {}, onClick }) {
  const base = { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    fontFamily: FONT, fontWeight: 700, borderRadius: 12, border: '1px solid transparent', cursor: 'pointer',
    width: full ? '100%' : undefined, letterSpacing: 0.1 }
  const sizes = { sm: { padding: '8px 14px', fontSize: 13.5 }, md: { padding: '13px 18px', fontSize: 15.5 }, lg: { padding: '15px 20px', fontSize: 16 } }
  const kinds = {
    primary:   { background: IP.gold, color: '#fff', boxShadow: '0 6px 16px -6px rgba(198,155,60,0.7)' },
    dark:      { background: IP.black, color: '#fff' },
    secondary: { background: IP.card, color: IP.black, border: `1px solid ${IP.line2}` },
    ghost:     { background: 'transparent', color: IP.gold },
    danger:    { background: IP.redBg, color: IP.red },
  }
  return (
    <button onClick={onClick} style={{ ...base, ...sizes[size], ...kinds[kind], ...style }}>
      {icon && <Icon name={icon} size={size === 'sm' ? 16 : 18} color={kinds[kind].color} stroke={2.1} />}
      {children}
    </button>
  )
}

// botón de acción flotante
export function FAB({ icon = 'plus', label, onClick }) {
  return (
    <div onClick={onClick} style={{ position: 'absolute', right: 18, bottom: 100, zIndex: 8,
      display: 'flex', alignItems: 'center', gap: 8, padding: label ? '0 18px 0 16px' : 0,
      height: 54, width: label ? 'auto' : 54, borderRadius: 999, background: IP.gold,
      boxShadow: '0 10px 24px -6px rgba(198,155,60,0.75)', color: '#fff', cursor: 'pointer' }}>
      <Icon name={icon} size={26} color="#fff" stroke={2.4} />
      {label && <span style={{ fontWeight: 700, fontSize: 15.5 }}>{label}</span>}
    </div>
  )
}

export function Avatar({ initials, size = 44, color = IP.gold, img }) {
  return (
    <div style={{ width: size, height: size, borderRadius: 999, flexShrink: 0,
      background: img ? `center/cover url(${img})` : color + '22', color,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontWeight: 800, fontSize: size * 0.34, fontFamily: DISPLAY,
      border: `1px solid ${color}33` }}>
      {!img && initials}
    </div>
  )
}

// fila de lista dentro de un grupo Card
export function Row({ icon, iconColor, title, sub, right, rightSub, last, chev, onTint, onClick }) {
  return (
    <div onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', minHeight: 44,
      borderBottom: last ? 'none' : `1px solid ${IP.line}`, cursor: onClick ? 'pointer' : undefined }}>
      {icon && (
        <div style={{ width: 34, height: 34, borderRadius: 9, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: onTint || (iconColor || IP.gold) + '18' }}>
          <Icon name={icon} size={18} color={iconColor || IP.gold} stroke={2} />
        </div>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: IP.black, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</div>
        {sub && <div style={{ fontSize: 12.5, color: IP.grey500, marginTop: 2 }}>{sub}</div>}
      </div>
      {(right || rightSub) && (
        <div style={{ textAlign: 'right' }}>
          {right && <div style={{ fontSize: 14.5, fontWeight: 600, color: IP.black }}>{right}</div>}
          {rightSub && <div style={{ fontSize: 12, color: IP.grey500, marginTop: 1 }}>{rightSub}</div>}
        </div>
      )}
      {chev && <Icon name="chevR" size={17} color={IP.grey300} stroke={2.3} />}
    </div>
  )
}

// campo de formulario (estático)
export function Field({ label, value, placeholder, icon, multiline, valid, hint, required }) {
  const filled = value != null && value !== ''
  return (
    <div style={{ marginBottom: 14 }}>
      {label && <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: IP.grey700, marginBottom: 6 }}>{label}{required && <span style={{ color: IP.gold }}> *</span>}</label>}
      <div style={{ display: 'flex', alignItems: multiline ? 'flex-start' : 'center', gap: 10, padding: multiline ? '12px 13px' : '0 13px',
        minHeight: multiline ? 76 : 48, background: IP.card, border: `1px solid ${valid ? IP.green : IP.line2}`, borderRadius: 12 }}>
        {icon && <Icon name={icon} size={18} color={IP.grey400} stroke={2} style={{ marginTop: multiline ? 2 : 0 }} />}
        <span style={{ flex: 1, fontSize: 15.5, color: filled ? IP.black : IP.grey400, lineHeight: multiline ? 1.45 : 1 }}>{filled ? value : placeholder}</span>
        {valid && <Icon name="check" size={17} color={IP.green} stroke={2.6} />}
      </div>
      {hint && <p style={{ margin: '6px 2px 0', fontSize: 12, color: IP.grey500 }}>{hint}</p>}
    </div>
  )
}
