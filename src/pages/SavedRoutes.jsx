import { useState } from 'react'
import { Download, MapPin, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'

function SavedRoutes() {
  const [routes, setRoutes] = useState(() => JSON.parse(localStorage.getItem('sheSurakshaSavedRoutes') || '[]'))
  const removeRoute = (id) => { const next = routes.filter((route) => route.id !== id); setRoutes(next); localStorage.setItem('sheSurakshaSavedRoutes', JSON.stringify(next)) }
  const downloadRoute = (route) => {
    const blob = new Blob([JSON.stringify(route, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${route.routeName.toLowerCase().replaceAll(' ', '-')}-details.json`
    link.click()
    URL.revokeObjectURL(url)
  }
  return <main className="min-h-screen bg-[#f6eee0] px-5 py-10 text-burgundy-dark"><div className="mx-auto max-w-3xl"><Link to="/dashboard" className="text-sm font-semibold text-burgundy hover:underline">← Back to dashboard</Link><h1 className="mt-5 font-display text-5xl font-bold">Saved paths</h1><p className="mt-3 text-burgundy-dark/70">Your saved and downloaded route details are stored on this device.</p><div className="mt-8 space-y-4">{routes.length === 0 ? <div className="rounded-3xl border border-burgundy/15 bg-white p-8 text-center"><MapPin className="mx-auto text-gold" size={30} /><h2 className="mt-4 font-display text-2xl font-bold">No saved routes yet</h2><Link to="/safety-map" className="mt-5 inline-block rounded-full bg-burgundy px-5 py-3 text-sm font-semibold text-cream">Plan a safe route</Link></div> : routes.map((route) => <article key={route.id} className="rounded-3xl border border-burgundy/10 bg-white p-6 shadow-sm"><div className="flex flex-wrap items-start justify-between gap-4"><div><span className="rounded-full bg-[#e7f1e8] px-3 py-1 text-xs font-semibold text-[#356a47]">{route.safetyScore} safety</span><h2 className="mt-3 font-display text-3xl font-bold">{route.routeName}</h2><p className="mt-2 text-burgundy-dark/70">{route.origin} → {route.destination}</p><p className="mt-2 text-sm text-burgundy-dark/55">{route.duration} · {route.distance} · {route.risk}</p></div><div className="flex gap-2"><button onClick={() => downloadRoute(route)} className="rounded-full border border-burgundy/20 p-3 text-burgundy" aria-label="Download route details"><Download size={17} /></button><button onClick={() => removeRoute(route.id)} className="rounded-full border border-burgundy/20 p-3 text-burgundy" aria-label="Remove saved route"><Trash2 size={17} /></button></div></div></article>)}</div></div></main>
}
export default SavedRoutes
