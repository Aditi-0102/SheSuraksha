import { useState } from 'react'
import { Users, ShieldCheck, Search, UserPlus, Check, Clock, ArrowRight } from 'lucide-react'
import faceIcon from '../assets/face-icon.png'

// Your existing trusted circle — people you've already connected with
const MY_CIRCLE = [
  { userId: 'u_1', name: 'Priya Nair', verified: true, mutualTrips: 4 },
  { userId: 'u_2', name: 'Rhea Kapoor', verified: true, mutualTrips: 1 },
  { userId: 'u_3', name: 'Meena Verma', verified: true, mutualTrips: 12 },
]

// Search results — people NOT yet in your circle, need a request first
const SEARCH_RESULTS = [
  { userId: 'u_4', name: 'Simran Kaur', verified: false, mutualConnections: 2 },
  { userId: 'u_5', name: 'Anjali Rao', verified: true, mutualConnections: 5 },
]

// Trip posts — only ever visible from people already in your circle
const CIRCLE_TRIPS = [
  {
    requestId: 'req_9f2a1',
    userName: 'Priya Nair',
    userVerified: true,
    from: 'Koramangala',
    to: 'Whitefield',
    departureTime: '2026-09-14T18:45:00.000Z',
  },
  {
    requestId: 'req_7b3c8',
    userName: 'Meena Verma',
    userVerified: true,
    from: 'Koramangala',
    to: 'Indiranagar',
    departureTime: '2026-09-14T18:30:00.000Z',
  },
]

function formatTime(iso) {
  return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function CircleMember({ person }) {
  return (
    <div className="flex items-center justify-between bg-white rounded-xl border border-burgundy/10 p-3">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-burgundy/10 flex items-center justify-center text-burgundy font-semibold text-sm">
          {person.name.charAt(0)}
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-burgundy-dark font-medium text-sm">{person.name}</span>
            {person.verified && <ShieldCheck size={13} className="text-green-600" />}
          </div>
          <span className="text-burgundy-dark/40 text-xs">
            {person.mutualTrips} shared trips
          </span>
        </div>
      </div>
    </div>
  )
}

function SearchResult({ person, requested, onRequest }) {
  return (
    <div className="flex items-center justify-between bg-white rounded-xl border border-burgundy/10 p-3">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-burgundy/10 flex items-center justify-center text-burgundy font-semibold text-sm">
          {person.name.charAt(0)}
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-burgundy-dark font-medium text-sm">{person.name}</span>
            {person.verified && <ShieldCheck size={13} className="text-green-600" />}
          </div>
          <span className="text-burgundy-dark/40 text-xs">
            {person.mutualConnections} mutual connections
          </span>
        </div>
      </div>
      <button
        onClick={() => onRequest(person.userId)}
        disabled={requested}
        className={`flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full transition ${
          requested
            ? 'bg-green-600/10 text-green-700 cursor-default'
            : 'bg-burgundy text-cream hover:bg-burgundy-light'
        }`}
      >
        {requested ? <Check size={14} /> : <UserPlus size={14} />}
        {requested ? 'Requested' : 'Connect'}
      </button>
    </div>
  )
}

function TripCard({ trip }) {
  return (
    <div className="bg-white rounded-2xl border border-burgundy/10 shadow-sm p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-burgundy/10 flex items-center justify-center text-burgundy font-semibold">
          {trip.userName.charAt(0)}
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-burgundy-dark font-semibold text-sm">{trip.userName}</span>
            {trip.userVerified && <ShieldCheck size={14} className="text-green-600" />}
          </div>
          <div className="text-burgundy-dark/50 text-xs">
            {trip.from} → {trip.to}
          </div>
          <div className="text-burgundy-dark/40 text-xs flex items-center gap-1">
            <Clock size={11} />
            Departing {formatTime(trip.departureTime)}
          </div>
        </div>
      </div>
      <button className="text-burgundy text-sm font-medium flex items-center gap-1 hover:underline">
        Join
        <ArrowRight size={14} />
      </button>
    </div>
  )
}

function ConnectHere() {
  const [searchTerm, setSearchTerm] = useState('')
  const [requestedIds, setRequestedIds] = useState([])
  const [tab, setTab] = useState('circle') // 'circle' | 'find'

  const handleRequest = (userId) => {
    setRequestedIds((prev) => [...prev, userId])
  }

  const filteredResults = SEARCH_RESULTS.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-cream px-4 py-10 flex justify-center">
      <div className="max-w-2xl w-full">
        <div className="flex items-center gap-3 mb-6">
          <img src={faceIcon} alt="SheSuraksha" className="w-9 h-auto" />
        </div>

        <h1 className="font-display text-burgundy-dark text-3xl md:text-4xl font-bold mb-2 flex items-center gap-2">
          <Users size={28} className="text-burgundy" />
          Connect Here
        </h1>
        <p className="text-burgundy-dark/60 text-sm mb-6">
          Travel plans are only ever visible to people already in your
          trusted circle — never random strangers.
        </p>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setTab('circle')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              tab === 'circle'
                ? 'bg-burgundy text-cream'
                : 'bg-white text-burgundy-dark/60 border border-burgundy/10'
            }`}
          >
            My Circle ({MY_CIRCLE.length})
          </button>
          <button
            onClick={() => setTab('find')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              tab === 'find'
                ? 'bg-burgundy text-cream'
                : 'bg-white text-burgundy-dark/60 border border-burgundy/10'
            }`}
          >
            Find People
          </button>
        </div>

        {tab === 'find' && (
          <div className="mb-6">
            <div className="flex items-center gap-2 bg-white border border-burgundy/15 rounded-full px-4 py-2 mb-4">
              <Search size={16} className="text-burgundy-dark/40" />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name..."
                className="flex-1 outline-none text-sm text-burgundy-dark placeholder:text-burgundy-dark/30"
              />
            </div>
            <div className="flex flex-col gap-2">
              {filteredResults.map((person) => (
                <SearchResult
                  key={person.userId}
                  person={person}
                  requested={requestedIds.includes(person.userId)}
                  onRequest={handleRequest}
                />
              ))}
              {filteredResults.length === 0 && (
                <p className="text-burgundy-dark/40 text-sm text-center py-4">
                  No one found — connection requests need mutual acceptance
                  before you can share trips.
                </p>
              )}
            </div>
          </div>
        )}

        {tab === 'circle' && (
          <>
            <div className="flex flex-col gap-2 mb-8">
              {MY_CIRCLE.map((person) => (
                <CircleMember key={person.userId} person={person} />
              ))}
            </div>

            <h2 className="text-burgundy-dark font-semibold text-sm uppercase tracking-wide mb-3">
              Trips From Your Circle
            </h2>
            <div className="flex flex-col gap-3">
              {CIRCLE_TRIPS.map((trip) => (
                <TripCard key={trip.requestId} trip={trip} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ConnectHere