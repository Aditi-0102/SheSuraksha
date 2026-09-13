import { useState } from 'react'
import { Sun, Users, MapPin, Clock } from 'lucide-react'
import faceIcon from '../assets/face-icon.png'

// Shaped exactly like GET /area-audit?locality= responses
const MOCK_LOCALITIES = {
  'Hauz Khas': {
    locality: 'Hauz Khas',
    illuminationPercent: 91,
    crowdDensityLevel: 'moderate',
    safeHavenCount: 12,
    policeResponseTimeMinutes: 4,
    safetyScore: 84,
    lastUpdated: '2026-09-13T10:15:30.000Z',
  },
  'Connaught Place': {
    locality: 'Connaught Place',
    illuminationPercent: 96,
    crowdDensityLevel: 'high',
    safeHavenCount: 19,
    policeResponseTimeMinutes: 3,
    safetyScore: 89,
    lastUpdated: '2026-09-13T10:15:30.000Z',
  },
  'Saket': {
    locality: 'Saket',
    illuminationPercent: 85,
    crowdDensityLevel: 'moderate',
    safeHavenCount: 14,
    policeResponseTimeMinutes: 5,
    safetyScore: 80,
    lastUpdated: '2026-09-13T10:15:30.000Z',
  },
  'Cyber Hub Gurgaon': {
    locality: 'Cyber Hub Gurgaon',
    illuminationPercent: 98,
    crowdDensityLevel: 'high',
    safeHavenCount: 19,
    policeResponseTimeMinutes: 2.5,
    safetyScore: 93,
    lastUpdated: '2026-09-13T10:15:30.000Z',
  },
  'Noida Sector 18': {
    locality: 'Noida Sector 18',
    illuminationPercent: 88,
    crowdDensityLevel: 'high',
    safeHavenCount: 16,
    policeResponseTimeMinutes: 4,
    safetyScore: 82,
    lastUpdated: '2026-09-13T10:15:30.000Z',
  },
  'Vasant Kunj': {
    locality: 'Vasant Kunj',
    illuminationPercent: 79,
    crowdDensityLevel: 'low',
    safeHavenCount: 9,
    policeResponseTimeMinutes: 7,
    safetyScore: 72,
    lastUpdated: '2026-09-13T10:15:30.000Z',
  },
}

const CROWD_LABELS = {
  low: 'Low',
  moderate: 'Moderate',
  high: 'High / Late-Night',
  'very high': 'Very High',
}

function scoreColor(score) {
  if (score >= 85) return 'text-green-400'
  if (score >= 70) return 'text-gold'
  return 'text-red-400'
}

function StatCard({ icon: Icon, label, value, sublabel }) {
  return (
    <div className="bg-black/25 border border-gold/20 rounded-xl p-4 flex flex-col gap-1">
      <div className="flex items-center gap-2 text-gold/70 text-xs uppercase tracking-wide">
        <Icon size={14} />
        {label}
      </div>
      <div className="text-cream text-2xl font-semibold">{value}</div>
      {sublabel && <div className="text-cream/50 text-xs">{sublabel}</div>}
    </div>
  )
}

function AreaAudit() {
  const localities = Object.keys(MOCK_LOCALITIES)
  const [selected, setSelected] = useState(localities[0])
  const data = MOCK_LOCALITIES[selected]

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4 py-10">
      <div className="max-w-4xl w-full bg-gradient-to-br from-burgundy-dark to-[#3a0d10] rounded-3xl shadow-2xl p-8 md:p-10 relative overflow-hidden">
                {/* Header row */}
        <div className="flex items-center gap-3 mb-4">
          <img src={faceIcon} alt="SheSuraksha" className="w-9 h-auto" />
        </div>

        <h1 className="font-display text-cream text-3xl md:text-4xl font-bold mb-6">
          Is {selected} safe right now?
        </h1>

        <div className="flex flex-wrap gap-2 mb-8">
          {localities.map((loc) => (
            <button
              key={loc}
              onClick={() => setSelected(loc)}
              className={`px-4 py-2 rounded-full text-sm border transition ${
                selected === loc
                  ? 'bg-gold text-burgundy-dark border-gold font-semibold'
                  : 'border-gold/30 text-cream/80 hover:border-gold/60'
              }`}
            >
              {loc}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={Sun}
            label="Avg. Illumination"
            value={`${data.illuminationPercent}%`}
            sublabel="LED coverage"
          />
          <StatCard
            icon={Users}
            label="Crowd Presence"
            value={CROWD_LABELS[data.crowdDensityLevel]}
            sublabel="Active footfall"
          />
          <StatCard
            icon={MapPin}
            label="Safe Haven Density"
            value={data.safeHavenCount}
            sublabel="Verified places"
          />
          <StatCard
            icon={Clock}
            label="Police Patrol Radius"
            value={`${data.policeResponseTimeMinutes} min`}
            sublabel="Avg. response"
          />
        </div>

        <div className="bg-black/25 border border-gold/20 rounded-2xl p-6 flex items-center justify-between">
          <div>
            <div className="text-cream/60 text-xs uppercase tracking-wide mb-1">
              Area Safety Score
            </div>
            <div className="text-cream/40 text-xs">
              Updated moments ago via community sensors
            </div>
          </div>
          <div className={`text-5xl font-bold ${scoreColor(data.safetyScore)}`}>
            {data.safetyScore}
            <span className="text-lg text-cream/40">/100</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AreaAudit