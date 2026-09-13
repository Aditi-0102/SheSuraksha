import { Heart, ShieldAlert, Sparkles, HandHeart } from 'lucide-react'
import faceIcon from '../assets/face-icon.png'

const STORIES = [
  {
    title: 'Real Stories, Real Strength',
    caption: 'Survivors sharing how community vigilance changed their journey home.',
    icon: Heart,
    gradient: 'from-[#8f1e10] to-[#3a0d08]',
  },
  {
    title: "Not Just Where to Go",
    caption: "But which journey fits the moment — community-mapped safe routes.",
    icon: Sparkles,
    gradient: 'from-[#b8321e] to-[#6b1f2e]',
  },
  {
    title: 'Women Empowerment',
    caption: 'Local collectives building verified safe-haven networks block by block.',
    icon: HandHeart,
    gradient: 'from-[#4a1420] to-[#2a0e14]',
  },
  {
    title: 'Stop Violence Against Women',
    caption: 'Reporting tools and helpline access, built into every screen.',
    icon: ShieldAlert,
    gradient: 'from-[#3a0d08] to-[#8f1e10]',
  },
]

function StoryCard({ story }) {
  const Icon = story.icon
  return (
    <div
      className={`rounded-2xl p-6 flex flex-col justify-between h-48 bg-gradient-to-br ${story.gradient} shadow-sm`}
    >
      <Icon size={22} className="text-gold" />
      <div>
        <h3 className="font-display text-cream text-lg font-bold mb-1">{story.title}</h3>
        <p className="text-cream/70 text-xs">{story.caption}</p>
      </div>
    </div>
  )
}

function Community() {
  return (
    <div className="min-h-screen bg-cream px-4 py-10 flex justify-center">
      <div className="max-w-3xl w-full">
        <div className="flex items-center gap-3 mb-6">
          <img src={faceIcon} alt="SheSuraksha" className="w-9 h-auto" />
        </div>

        <h1 className="font-display text-burgundy-dark text-3xl md:text-4xl font-bold mb-8">
          Community & Awareness
        </h1>

        <div className="grid sm:grid-cols-2 gap-5">
          {STORIES.map((story) => (
            <StoryCard key={story.title} story={story} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Community