/* Inquilino Premium — Formulario público de incidencia (QR) + confirmación.
   Flujo sin login: el inquilino escanea el QR del piso y reporta. */
import { IP, FONT, DISPLAY } from '../lib/tokens.js'
import { Icon } from '../lib/icon.jsx'
import { Screen, Field, Button } from '../ui/index.jsx'
import { Logo } from './auth.jsx'
import { useNav } from '../nav.jsx'

function PublicHeader({ title, sub }) {
  const nav = useNav()
  return (
    <div style={{ background: IP.card, borderBottom: `1px solid ${IP.line}`, paddingTop: 52, paddingBottom: 18, textAlign: 'center', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, background: `linear-gradient(90deg, ${IP.gold70}, ${IP.gold})` }} />
      <div onClick={() => nav.exitPublic()} style={{ position: 'absolute', top: 50, left: 16, display: 'flex', alignItems: 'center', gap: 2, color: IP.gold, fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
        <Icon name="chevL" size={18} color={IP.gold} stroke={2.4} />Salir
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}><Logo size={0.72} stacked={false} /></div>
      <h1 style={{ margin: '0 24px', fontFamily: DISPLAY, fontWeight: 800, fontSize: 23, letterSpacing: -0.5, color: IP.black }}>{title}</h1>
      {sub && <p style={{ margin: '7px 28px 0', fontSize: 13.5, color: IP.grey500, lineHeight: 1.45, fontWeight: 500 }}>{sub}</p>}
    </div>
  )
}

function SelectField({ label, value, placeholder, required }) {
  const filled = value != null
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: IP.grey700, marginBottom: 6 }}>{label}{required && <span style={{ color: IP.gold }}> *</span>}</label>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 13px', minHeight: 50, background: IP.card, border: `1px solid ${filled ? IP.gold50 : IP.line2}`, borderRadius: 12 }}>
        <span style={{ flex: 1, fontSize: 15.5, color: filled ? IP.black : IP.grey400, fontWeight: filled ? 600 : 400 }}>{filled || placeholder}</span>
        <Icon name="chevD" size={18} color={IP.grey400} stroke={2.2} />
      </div>
    </div>
  )
}

export function PublicFormScreen() {
  const nav = useNav()
  return (
    <Screen bg={IP.surface} header={<PublicHeader title="Reportar una incidencia" sub="Rellena el formulario y un gestor se pondrá en contacto contigo lo antes posible." />}>
      <div style={{ padding: '18px 20px 0' }}>
        <SelectField label="Ciudad" value="Valladolid" required />
        <SelectField label="Piso" value="VLL-01 · C/ Santiago 14, 3ºB" required />
        <SelectField label="¿Dónde está la incidencia?" value="Cocina (zona común)" required />
        <Field label="Nombre completo" value="Carlos Méndez" icon="user" valid required />
        <Field label="Teléfono" value="+34 655 21 09 88" icon="phone" valid required hint="Te llamaremos a este número." />
        <Field label="Describe la incidencia" multiline required
          value="Fuga de agua bajo el fregadero. El armario está empapado y empieza a salir agua al pasillo." />

        {/* media */}
        <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: IP.grey700, marginBottom: 6 }}>Fotos o vídeos <span style={{ color: IP.grey400, fontWeight: 500 }}>(opcional)</span></label>
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          {[IP.gold20, IP.grey200].map((c, i) => (
            <div key={i} style={{ width: 70, height: 70, borderRadius: 12, background: `linear-gradient(135deg, ${c}, ${IP.grey100})`, position: 'relative', border: `1px solid ${IP.line}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="camera" size={20} color={IP.grey400} stroke={1.8} />
              <div style={{ position: 'absolute', top: -6, right: -6, width: 20, height: 20, borderRadius: 999, background: IP.black, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="x" size={12} color="#fff" stroke={2.6} />
              </div>
            </div>
          ))}
          <div style={{ width: 70, height: 70, borderRadius: 12, border: `1.5px dashed ${IP.grey300}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3, color: IP.grey500 }}>
            <Icon name="plus" size={20} color={IP.grey500} stroke={2.2} />
            <span style={{ fontSize: 10, fontWeight: 600 }}>Añadir</span>
          </div>
        </div>
        <p style={{ margin: '-8px 2px 16px', fontSize: 11.5, color: IP.grey400 }}>Máximo 5 archivos · 10 MB cada uno.</p>

        {/* consentimiento */}
        <div style={{ display: 'flex', gap: 11, alignItems: 'flex-start', padding: 13, background: IP.card, borderRadius: 12, border: `1px solid ${IP.line2}` }}>
          <div style={{ width: 22, height: 22, borderRadius: 6, background: IP.gold, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
            <Icon name="check" size={14} color="#fff" stroke={3} />
          </div>
          <span style={{ fontSize: 12.5, color: IP.grey700, lineHeight: 1.45 }}>He leído y acepto la <span style={{ color: IP.gold, fontWeight: 600 }}>Política de Privacidad</span> y el tratamiento de mis datos.</span>
        </div>

        <div style={{ marginTop: 18 }}>
          <Button kind="primary" size="lg" full icon="send" onClick={() => nav.push('publico-enviado')}>Enviar incidencia</Button>
        </div>
        <p style={{ margin: '16px 0 8px', fontSize: 11, color: IP.grey400, textAlign: 'center' }}>Inquilino Premium · Aviso legal · Política de privacidad</p>
        <div style={{ height: 24 }} />
      </div>
    </Screen>
  )
}

export function PublicSentScreen() {
  const nav = useNav()
  return (
    <div style={{ height: '100%', overflow: 'auto', display: 'flex', flexDirection: 'column', fontFamily: FONT,
      background: `linear-gradient(180deg, ${IP.gold10}, ${IP.bg} 45%)`, padding: '0 28px', textAlign: 'center' }}>
      <div style={{ height: 110 }} />
      <div style={{ width: 92, height: 92, borderRadius: 999, background: IP.greenBg, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', border: `2px solid ${IP.green}22` }}>
        <Icon name="checkCircle" size={48} color={IP.green} stroke={2} />
      </div>
      <h1 style={{ margin: 0, fontFamily: DISPLAY, fontWeight: 800, fontSize: 26, letterSpacing: -0.5, color: IP.black }}>Incidencia enviada</h1>
      <p style={{ margin: '12px 0 0', fontSize: 14.5, color: IP.grey700, lineHeight: 1.5 }}>
        Gracias, Carlos. Un gestor revisará tu incidencia y se pondrá en contacto contigo lo antes posible.
      </p>
      <div style={{ margin: '24px 0', padding: 18, background: IP.card, borderRadius: 16, border: `1px solid ${IP.line}`, boxShadow: '0 6px 18px -10px rgba(29,29,27,0.14)' }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 0.8, textTransform: 'uppercase', color: IP.grey500 }}>Número de referencia</div>
        <div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 30, letterSpacing: 1, color: IP.gold, marginTop: 6 }}>#a1f3c9d2</div>
        <div style={{ fontSize: 12.5, color: IP.grey500, marginTop: 6 }}>Guárdalo para futuras consultas.</div>
      </div>
      <Button kind="secondary" full icon="plus" onClick={() => nav.pop()}>Reportar otra incidencia</Button>
      <div style={{ marginTop: 12 }}>
        <Button kind="ghost" full onClick={() => nav.exitPublic()}>Salir</Button>
      </div>
      <div style={{ flex: 1, minHeight: 20 }} />
      <div style={{ marginBottom: 30, display: 'flex', justifyContent: 'center' }}><Logo size={0.6} stacked={false} /></div>
    </div>
  )
}
