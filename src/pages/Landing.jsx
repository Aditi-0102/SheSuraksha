import faceIcon from '../assets/face-icon.png'
import { Siren, WifiOff, MessageCircle, Users, Globe, ChevronDown, ArrowRight } from 'lucide-react'

function FaceIcon() {
  return (
    <svg width="130" height="140" viewBox="0 0 130 140" fill="none" className="mx-auto">
      <defs>
        <linearGradient id="faceGradient" x1="0" y1="0" x2="130" y2="140">
          <stop offset="0%" stopColor="#f3dcae" />
          <stop offset="100%" stopColor="#d4a24c" />
        </linearGradient>
      </defs>
      {/* Flowing hair strands */}
      <path
        d="M75 10 C55 15, 38 28, 34 45 C31 58, 38 66, 48 70"
        stroke="url(#faceGradient)" strokeWidth="2" strokeLinecap="round" fill="none"
      />
      <path
        d="M68 18 C52 24, 42 35, 40 48 C38 58, 44 64, 52 67"
        stroke="url(#faceGradient)" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.7"
      />
      <path
        d="M60 28 C50 33, 44 40, 44 48"
        stroke="url(#faceGradient)" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.5"
      />
      {/* Face profile: forehead -> brow -> nose -> lips -> chin -> neck */}
      <path
        d="M48 70 C46 60, 50 48, 58 40 C64 34, 72 32, 75 26
           C77 22, 74 18, 70 19
           C74 24, 73 30, 68 34
           C72 36, 74 40, 71 44
           L66 47
           C69 50, 68 54, 64 55
           L59 56
           C61 60, 59 64, 55 65
           C58 72, 56 80, 50 86
           C46 90, 44 96, 46 102"
        stroke="url(#faceGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"
      />
    </svg>
  )
}

function Diamond({ size, top, left, right, bottom, filled, dashed, opacity = 1 }) {
  return (
    <div
      className={`absolute border ${filled ? 'bg-gold border-gold/60' : 'border-gold/40'} ${
        dashed ? 'border-dashed' : 'border-solid'
      }`}
      style={{
        width: size,
        height: size,
        top,
        left,
        right,
        bottom,
        transform: 'rotate(45deg)',
        opacity,
      }}
    />
  )
}

function BackgroundDecoration() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Top-left small cluster */}
      <Diamond size={55} top={-10} left={-10} dashed />
      <Diamond size={30} top={40} left={10} filled opacity={0.25} />
      <Diamond size={16} top={85} left={65} />
      <Diamond size={22} top={5} left={95} opacity={0.6} />

      {/* Bottom-left dense cluster */}
      <Diamond size={70} bottom={-20} left={-15} filled opacity={0.2} />
      <Diamond size={45} bottom={30} left={20} dashed />
      <Diamond size={90} bottom={-30} left={60} filled opacity={0.15} />
      <Diamond size={28} bottom={90} left={100} />
      <Diamond size={20} bottom={130} left={40} filled opacity={0.3} />
      <Diamond size={14} bottom={180} left={140} />

      {/* Bottom-right dense cluster (mirrored) */}
      <Diamond size={70} bottom={-20} right={-15} filled opacity={0.2} />
      <Diamond size={45} bottom={30} right={20} dashed />
      <Diamond size={90} bottom={-30} right={60} filled opacity={0.15} />
      <Diamond size={28} bottom={90} right={100} />
      <Diamond size={20} bottom={130} right={40} filled opacity={0.3} />
      <Diamond size={14} bottom={180} right={140} />

      {/* Lone scattered diamonds along edges */}
      <Diamond size={14} top="60%" left={20} />
      <Diamond size={14} top="63%" right={30} />
      <Diamond size={18} top="80%" right={110} filled opacity={0.2} />
    </div>
  )
}

function NavPill({ icon: Icon, label, color }) {
  return (
    <div className="flex items-center gap-3 bg-black/30 border border-gold/20 rounded-full pl-2 pr-5 py-2 cursor-pointer hover:border-gold/50 transition">
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center"
        style={{ backgroundColor: color }}
      >
        <Icon size={16} className="text-white" />
      </div>
      <span className="text-cream text-sm font-medium">{label}</span>
      <ArrowRight size={14} className="text-cream/50" />
    </div>
  )
}

function Landing() {
  const navPills = [
    { label: 'Emergency SOS', icon: Siren, color: '#c93a2e' },
    { label: 'Offline Safety', icon: WifiOff, color: '#e8c68a' },
    { label: 'Chatbot', icon: MessageCircle, color: '#c05a7a' },
    { label: 'Connect Here', icon: Users, color: '#8a5a8a' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-burgundy-dark via-[#3a0d0d] to-burgundy-dark relative overflow-hidden flex flex-col">
      <BackgroundDecoration />

      {/* Language selector */}
      <div className="flex justify-end p-6 relative z-10">
        <div className="flex items-center gap-2 border border-gold/30 rounded-full px-4 py-2 text-cream text-sm cursor-pointer">
          <Globe size={14} />
          English
          <ChevronDown size={14} />
        </div>
      </div>

      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6 gap-4 relative z-10">
        <img src={faceIcon} alt="SheSuraksha" className="w-28 h-auto mx-auto" />
        <h1 className="font-display text-cream text-6xl md:text-7xl font-bold drop-shadow-[0_0_35px_rgba(212,162,76,0.35)] flex items-center gap-2 -mt-2">
          SheSuraksha
          <span className="text-gold text-4xl">✦</span>
        </h1>
        <p className="font-display italic text-cream/90 text-lg md:text-xl">
          Not just where to go—but which journey fits the moment
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-6">
          {navPills.map((pill) => (
            <NavPill key={pill.label} {...pill} />
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div className="flex flex-col items-center gap-2 pb-10 text-cream/60 text-xs tracking-widest uppercase relative z-10">
        Scroll to begin your journey
        <ChevronDown size={16} className="animate-bounce" />
      </div>
    </div>
  )
}

export default Landing