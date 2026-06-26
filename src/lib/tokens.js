/* Inquilino Premium — design tokens (paleta de marca + mapas de estado/prioridad). */

// ── Paleta (del manual de identidad / plan de desarrollo) ──────────
export const IP = {
  black:    '#1d1d1b',
  ink:      '#2a2a27',
  gold:     '#c69b3c',
  gold70:   '#d4b170',
  gold50:   '#e2cc97',
  gold20:   '#f4ead4',
  gold10:   '#faf4e6',
  bg:       '#ffffff',
  text:     '#1d1d1b',
  // neutros (grises cálidos)
  grey900:  '#1d1d1b',
  grey700:  '#54534e',
  grey500:  '#86857d',
  grey400:  '#a9a89f',
  grey300:  '#d6d4c9',
  grey200:  '#e9e7dd',
  grey100:  '#f4f2ea',
  grey50:   '#faf9f4',
  surface:  '#f6f5ef',     // fondo agrupado iOS (cálido)
  card:     '#ffffff',
  // semánticos
  red:      '#c63a2f',
  redBg:    '#fbecea',
  orange:   '#d9802b',
  orangeBg: '#fbf0e2',
  green:    '#3f7d4e',
  greenBg:  '#eaf2ec',
  blue:     '#3a6ea5',
  blueBg:   '#eaf0f7',
  line:     'rgba(29,29,27,0.08)',
  line2:    'rgba(29,29,27,0.14)',
}

// mapas de color por estado + prioridad
export const STATUS = {
  abierta:   { label: 'Abierta',   fg: IP.red,    bg: IP.redBg,    dot: IP.red },
  en_curso:  { label: 'En curso',  fg: IP.orange, bg: IP.orangeBg, dot: IP.orange },
  resuelta:  { label: 'Resuelta',  fg: IP.green,  bg: IP.greenBg,  dot: IP.green },
  cerrada:   { label: 'Cerrada',   fg: IP.grey500, bg: IP.grey100, dot: IP.grey400 },
}

export const PRIORITY = {
  urgente: { label: 'Urgente', fg: IP.red,    bg: IP.redBg },
  alta:    { label: 'Alta',    fg: IP.orange, bg: IP.orangeBg },
  baja:    { label: 'Baja',    fg: IP.green,  bg: IP.greenBg },
}

export const FONT = '"Inter", -apple-system, system-ui, sans-serif'
// Cera Pro Black → Inter 800/900 como fallback
export const DISPLAY = '"Inter", -apple-system, system-ui, sans-serif'
