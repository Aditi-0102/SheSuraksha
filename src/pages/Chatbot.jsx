import { useState, useRef, useEffect } from 'react'
import { Send, Sparkles, User } from 'lucide-react'
import faceIcon from '../assets/face-icon.png'

const SUGGESTED_PROMPTS = [
  'How do I trigger the SOS alert?',
  'Is my current area safe right now?',
  'How does Connect Here work?',
]

// Mimics POST /chatbot/message response shape: { reply, intent }
function getMockReply(message) {
  const lower = message.toLowerCase()
  if (lower.includes('sos') || lower.includes('unsafe') || lower.includes('danger')) {
    return {
      reply:
        "If you're in immediate danger, use the SOS button to alert your emergency contacts now. Do you want me to guide you through it?",
      intent: 'emergency_guidance',
    }
  }
  if (lower.includes('area') || lower.includes('safe right now') || lower.includes('locality')) {
    return {
      reply:
        'I can pull up a live safety score for any locality — just tell me the area name and I\'ll check illumination, crowd density, and police response time.',
      intent: 'area_audit_help',
    }
  }
  if (lower.includes('route') || lower.includes('journey') || lower.includes('travel')) {
    return {
      reply:
        "I can suggest the safest route between two points, ranked by lighting, crowd presence, and CCTV coverage. Where are you headed?",
      intent: 'route_help',
    }
  }
  if (lower.includes('connect')) {
    return {
      reply:
        'Connect Here lets you build a trusted circle — you can only share travel plans with people who\'ve accepted your connection request, never random users.',
      intent: 'travel_circle_help',
    }
  }
  if (lower.includes('hi') || lower.includes('hello') || lower.includes('namaste')) {
    return {
      reply: 'Namaste! I am your SheSuraksha AI Safety Companion. How can I help you today?',
      intent: 'greeting',
    }
  }
  return {
    reply:
      "I'm not sure about that yet, but I can help with SOS alerts, area safety checks, route planning, or Connect Here. What would you like to know?",
    intent: 'unknown',
  }
}

function Chatbot() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: 'Namaste! I am your SheSuraksha AI Safety Companion.',
    },
  ])
  const [input, setInput] = useState('')
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = (text) => {
    if (!text.trim()) return
    setMessages((prev) => [...prev, { role: 'user', text }])
    // In the real app: POST /chatbot/message with { message: text }
    const { reply } = getMockReply(text)
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: 'assistant', text: reply }])
    }, 400)
    setInput('')
  }

  return (
    <div className="min-h-screen bg-cream px-4 py-10 flex justify-center">
      <div className="max-w-xl w-full bg-gradient-to-br from-burgundy-dark to-[#3a0d10] rounded-3xl shadow-2xl flex flex-col h-[600px] overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gold/10">
          <img src={faceIcon} alt="SheSuraksha" className="w-8 h-auto" />
          <div>
            <div className="text-cream font-semibold text-sm">SheSuraksha AI Companion</div>
            <div className="text-green-400 text-xs flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
              Active telemetry
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex items-end gap-2 ${
                msg.role === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                  msg.role === 'user' ? 'bg-gold/20' : 'bg-cream/10'
                }`}
              >
                {msg.role === 'user' ? (
                  <User size={14} className="text-gold" />
                ) : (
                  <Sparkles size={14} className="text-gold" />
                )}
              </div>
              <div
                className={`max-w-[75%] text-sm px-4 py-2.5 rounded-2xl ${
                  msg.role === 'user'
                    ? 'bg-gold text-burgundy-dark rounded-br-sm'
                    : 'bg-black/25 text-cream rounded-bl-sm'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {messages.length <= 1 && (
          <div className="px-5 pb-3 flex flex-wrap gap-2">
            {SUGGESTED_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                onClick={() => sendMessage(prompt)}
                className="text-xs bg-black/20 text-cream/80 border border-gold/20 px-3 py-1.5 rounded-full hover:border-gold/50 transition"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault()
            sendMessage(input)
          }}
          className="flex items-center gap-2 px-4 py-3 border-t border-gold/10"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about safety, routes, or SOS..."
            className="flex-1 bg-black/20 text-cream text-sm rounded-full px-4 py-2.5 outline-none placeholder:text-cream/30"
          />
          <button
            type="submit"
            className="w-10 h-10 rounded-full bg-gold flex items-center justify-center hover:bg-gold-light transition"
          >
            <Send size={16} className="text-burgundy-dark" />
          </button>
        </form>
      </div>
    </div>
  )
}

export default Chatbot