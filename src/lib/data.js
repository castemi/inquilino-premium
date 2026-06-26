/* Inquilino Premium — datos falsos realistas (4 zonas en operación). Solo para la demo. */
import { IP } from './tokens.js'

export const ZONES = [
  { id: 'z1', name: 'Valladolid', gestor: 'Óscar Castro', cities: 1, flats: 14, rooms: 71, color: IP.gold },
  { id: 'z2', name: 'Zona Norte', gestor: 'Marta  Ruiz', cities: 2, flats: 13, rooms: 64, color: IP.blue },
  { id: 'z3', name: 'Zona Centro', gestor: 'Javier León', cities: 1, flats: 12, rooms: 58, color: IP.green },
  { id: 'z4', name: 'Zona Sur', gestor: 'Lucía Prados', cities: 1, flats: 11, rooms: 57, color: IP.orange },
]

export const FLATS = [
  { id: 'f1', code: 'VLL-01', address: 'C/ Santiago 14, 3ºB', city: 'Valladolid', zone: 'Valladolid', rooms: 5, garage: true,  occupied: 5 },
  { id: 'f2', code: 'VLL-02', address: 'C/ Mantería 8, 1ºA', city: 'Valladolid', zone: 'Valladolid', rooms: 4, garage: false, occupied: 3 },
  { id: 'f3', code: 'VLL-03', address: 'Pº Zorrilla 102, 5ºC', city: 'Valladolid', zone: 'Valladolid', rooms: 6, garage: true,  occupied: 6 },
  { id: 'f4', code: 'VLL-04', address: 'C/ Gabilondo 21, 2ºD', city: 'Valladolid', zone: 'Valladolid', rooms: 5, garage: false, occupied: 4 },
]

export const TENANTS = [
  { id: 't1', name: 'Carlos Méndez',   room: 'H1', flat: 'VLL-01', city: 'Valladolid', rent: 380, status: 'al_dia',  due: '01 jun', initials: 'CM' },
  { id: 't2', name: 'Lucía Fernández', room: 'H2', flat: 'VLL-01', city: 'Valladolid', rent: 360, status: 'retraso', dueDays: 6, due: '24 may', initials: 'LF' },
  { id: 't3', name: 'David Romero',    room: 'H3', flat: 'VLL-01', city: 'Valladolid', rent: 410, status: 'al_dia',  due: '01 jun', initials: 'DR' },
  { id: 't4', name: 'Aisha Ndiaye',    room: 'H1', flat: 'VLL-02', city: 'Valladolid', rent: 350, status: 'al_dia',  due: '03 jun', initials: 'AN' },
  { id: 't5', name: 'Marco Bianchi',   room: 'H2', flat: 'VLL-02', city: 'Valladolid', rent: 340, status: 'retraso', dueDays: 12, due: '18 may', initials: 'MB' },
  { id: 't6', name: 'Elena Sanz',      room: 'H4', flat: 'VLL-03', city: 'Valladolid', rent: 395, status: 'al_dia',  due: '01 jun', initials: 'ES' },
]

export const INCIDENTS = [
  { id: 'a1f3c9d2', status: 'abierta',  priority: 'urgente', flat: 'VLL-01', city: 'Valladolid', zone: 'Valladolid', loc: 'Cocina',        locType: 'Zona común', desc: 'Fuga de agua bajo el fregadero, el armario está empapado y empieza a salir al pasillo.', reporter: 'Carlos Méndez', phone: '+34 655 21 09 88', date: '28 may', days: 1, cost: null, media: 3, comments: 0 },
  { id: 'b7e4a1c8', status: 'en_curso', priority: 'alta',    flat: 'VLL-03', city: 'Valladolid', zone: 'Valladolid', loc: 'Habitación H4', locType: 'Habitación', desc: 'La caldera no calienta el agua por las mañanas, se corta a los pocos minutos.', reporter: 'Elena Sanz', phone: '+34 622 87 13 40', date: '24 may', days: 5, cost: 145, media: 1, comments: 2 },
  { id: 'c2d8f6b3', status: 'en_curso', priority: 'baja',    flat: 'VLL-02', city: 'Valladolid', zone: 'Valladolid', loc: 'Pasillo',       locType: 'Zona común', desc: 'Bombilla del pasillo fundida, parpadea al encender.', reporter: 'Aisha Ndiaye', phone: '+34 611 45 78 23', date: '22 may', days: 7, cost: 12, media: 0, comments: 1 },
  { id: 'd9a3c5e7', status: 'resuelta', priority: 'alta',    flat: 'VLL-01', city: 'Valladolid', zone: 'Valladolid', loc: 'Baño común',    locType: 'Zona común', desc: 'Cisterna del baño pierde agua continuamente.', reporter: 'David Romero', phone: '+34 699 02 65 31', date: '14 may', days: 4, cost: 88, media: 2, comments: 3, resolved: '18 may' },
  { id: 'e1b6d4a9', status: 'cerrada',  priority: 'baja',    flat: 'VLL-04', city: 'Valladolid', zone: 'Valladolid', loc: 'General',       locType: 'General',    desc: 'Ruido de vecinos por la noche, solicitan mediación.', reporter: 'Inquilino anónimo', phone: '+34 644 33 21 10', date: '02 may', days: 9, cost: 0, media: 0, comments: 4, resolved: '11 may' },
]

export const ACTIVITY = [
  { who: 'Óscar Castro', what: 'cerró la incidencia', target: '#e1b6d4a9', when: 'hace 2 h', icon: 'checkCircle', color: IP.green },
  { who: 'Marta Ruiz',   what: 'añadió un pago de Lucía F.', target: 'Mayo · 360 €', when: 'hace 5 h', icon: 'euro', color: IP.gold },
  { who: 'Sistema',      what: 'nueva incidencia urgente', target: '#a1f3c9d2', when: 'ayer', icon: 'alert', color: IP.red },
  { who: 'Javier León',  what: 'registró entrada', target: 'Marco B. · VLL-02', when: 'hace 2 d', icon: 'door', color: IP.blue },
]

// estadísticas — incidencias por mes a lo largo de 12 meses (para gráficos)
export const MONTHS = ['Jun','Jul','Ago','Sep','Oct','Nov','Dic','Ene','Feb','Mar','Abr','May']
export const INC_BY_MONTH = [9, 7, 11, 8, 13, 10, 12, 9, 7, 14, 11, 16]
export const COST_BY_MONTH = [620, 410, 880, 540, 1120, 760, 980, 610, 430, 1290, 870, 1340]
export const PRIO_BY_MONTH = MONTHS.map((m, i) => ({
  m, urgente: [2,1,3,1,3,2,3,2,1,4,3,5][i], alta: [4,3,5,4,6,5,5,4,3,6,5,7][i], baja: [3,3,3,3,4,3,4,3,3,4,3,4][i],
}))
export const ZONE_STATS = [
  { zone: 'Valladolid', inc: 16, cost: 1340, days: 3.2, perRoom: 18.9, open: 1 },
  { zone: 'Zona Norte', inc: 12, cost: 980,  days: 4.6, perRoom: 15.3, open: 2 },
  { zone: 'Zona Centro',inc: 9,  cost: 610,  days: 2.8, perRoom: 10.5, open: 0 },
  { zone: 'Zona Sur',   inc: 11, cost: 870,  days: 5.1, perRoom: 15.3, open: 3 },
]
