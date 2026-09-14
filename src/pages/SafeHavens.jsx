import { Building2, ChevronLeft, Clock3, MapPin, Phone, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'

const HAVENS = [
  { name: 'Hauz Khas Police Station', area: 'Hauz Khas', distance: '0.6 km', type: 'Police assistance', hours: '24 hours', phone: '112' },
  { name: 'Saket Metro Security Desk', area: 'Saket', distance: '1.1 km', type: 'Transit safe point', hours: '05:00–23:30', phone: '155370' },
  { name: 'Lajpat Nagar Women Help Desk', area: 'Lajpat Nagar', distance: '1.4 km', type: 'Women support desk', hours: '09:00–18:00', phone: '1091' },
  { name: 'Connaught Place Police Booth', area: 'Connaught Place', distance: '1.8 km', type: 'Police assistance', hours: '24 hours', phone: '112' },
  { name: 'Cyber Hub Security Office', area: 'Cyber Hub Gurgaon', distance: '2.3 km', type: 'Verified public safe point', hours: '08:00–23:00', phone: '112' },
  { name: 'Mayur Vihar Police Station', area: 'Mayur Vihar', distance: '2.6 km', type: 'Police assistance', hours: '24 hours', phone: '112' },
]

function SafeHavens() {
  return <main className="min-h-screen bg-[#f8f4ec] px-5 py-7 text-burgundy-dark md:px-10"><div className="mx-auto max-w-6xl"><Link to="/dashboard" className="inline-flex items-center gap-2 text-sm font-semibold text-burgundy hover:underline"><ChevronLeft size={17} />Dashboard</Link><section className="mt-5 rounded-[2rem] bg-gradient-to-br from-[#4c1728] to-[#22050e] p-7 text-cream shadow-xl md:p-10"><span className="inline-flex items-center gap-2 rounded-full border border-gold/35 bg-gold/10 px-3 py-1 text-xs font-semibold tracking-wider text-gold"><ShieldCheck size={14} />SAFE HAVENS</span><h1 className="mt-4 font-display text-4xl font-bold md:text-5xl">Find a safe place, quickly.</h1><p className="mt-3 max-w-2xl text-cream/70">Verified support points, transit desks, and police assistance locations around your selected areas.</p></section><section className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{HAVENS.map((haven) => <article key={haven.name} className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-burgundy/10"><div className="flex items-start justify-between gap-3"><span className="rounded-2xl bg-[#f7e4e7] p-3 text-burgundy"><Building2 size={21} /></span><span className="rounded-full bg-[#e9f4ec] px-2.5 py-1 text-xs font-semibold text-[#37764a]">{haven.distance}</span></div><h2 className="mt-5 font-display text-2xl font-bold">{haven.name}</h2><p className="mt-2 text-sm text-burgundy-dark/65">{haven.type}</p><div className="mt-5 space-y-2 text-sm text-burgundy-dark/70"><p className="flex items-center gap-2"><MapPin size={15} className="text-burgundy" />{haven.area}</p><p className="flex items-center gap-2"><Clock3 size={15} className="text-burgundy" />{haven.hours}</p><p className="flex items-center gap-2"><Phone size={15} className="text-burgundy" />{haven.phone}</p></div><Link to={`/area-audit?locality=${encodeURIComponent(haven.area)}`} className="mt-5 inline-block rounded-full bg-burgundy px-4 py-2 text-sm font-semibold text-cream">Open area audit</Link></article>)}</section><p className="mt-7 text-center text-xs text-burgundy-dark/55">In an emergency, call 112 or use the SheSuraksha SOS action. Confirm service hours before travelling.</p></div></main>
}

export default SafeHavens
