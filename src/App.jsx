import { Navigate, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Onboarding from './pages/Onboarding'
import AreaAudit from './pages/AreaAudit'
import OfflineSafety from './pages/OfflineSafety'
import ConnectHere from './pages/ConnectHere'
import Community from './pages/Community'
import Chatbot from './pages/Chatbot'
import Dashboard from './pages/Dashboard'
import SafetyMap from './pages/SafetyMap'
import SavedRoutes from './pages/SavedRoutes'
import SafeHavens from './pages/SafeHavens'
import MetroTransit from './pages/MetroTransit'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/safety-map" element={<SafetyMap />} />
      <Route path="/saved-routes" element={<SavedRoutes />} />
      <Route path="/safe-havens" element={<SafeHavens />} />
      <Route path="/public-transport" element={<MetroTransit />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/area-audit" element={<AreaAudit />} />
      <Route path="/routes" element={<Navigate to="/safety-map" replace />} />
      <Route path="/offline-safety" element={<OfflineSafety />} />
      <Route path="/emergency-sos" element={<Navigate to="/community" replace />} />
      <Route path="/connect" element={<ConnectHere />} />
      <Route path="/community" element={<Community />} />
      <Route path="/chatbot" element={<Chatbot />} />
    </Routes>
  )
}

export default App
