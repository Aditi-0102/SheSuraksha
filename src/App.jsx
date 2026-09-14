import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Onboarding from './pages/Onboarding'
import AreaAudit from './pages/AreaAudit'
import RoutePlanner from './pages/RoutePlanner'
import OfflineSafety from './pages/OfflineSafety'
import EmergencySOS from './pages/EmergencySOS'
import ConnectHere from './pages/ConnectHere'
import Community from './pages/Community'
import Chatbot from './pages/Chatbot'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/area-audit" element={<AreaAudit />} />
      <Route path="/routes" element={<RoutePlanner />} />
      <Route path="/offline-safety" element={<OfflineSafety />} />
      <Route path="/emergency-sos" element={<EmergencySOS />} />
      <Route path="/connect" element={<ConnectHere />} />
      <Route path="/community" element={<Community />} />
      <Route path="/chatbot" element={<Chatbot />} />
    </Routes>
  )
}

export default App