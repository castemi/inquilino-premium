/* App.jsx temporal (Chunk 0) — verifica que los fundamentos compilan.
   El shell navegable real se construye en el Chunk 1. */
import { IP } from './lib/tokens.js'
import { Icon } from './lib/icon.jsx'
import { BrandMark } from './lib/brand.jsx'
import { IOSDevice } from './device/IOSDevice.jsx'
import { Button, Card, Badge } from './ui/index.jsx'

export default function App() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#ece9e0', padding: 24 }}>
      <IOSDevice>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18, background: IP.surface }}>
          <BrandMark height={84} />
          <div style={{ fontFamily: 'Inter', fontWeight: 800, fontSize: 22, color: IP.black }}>Inquilino Premium</div>
          <Badge fg={IP.gold} bg={IP.gold10} dot>Fundamentos listos · Chunk 0</Badge>
          <Card style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <Icon name="check" color={IP.green} /> <span style={{ color: IP.grey700, fontSize: 14 }}>Tokens · iconos · datos · UI</span>
          </Card>
          <Button kind="primary" icon="key">Continuar</Button>
        </div>
      </IOSDevice>
    </div>
  )
}
