import { useState } from 'react'
import { ShieldCheck, User, Phone, Lock, Users } from 'lucide-react'

function Onboarding() {
  const [formData, setFormData] = useState({
    name: '',
    mobileNumber: '',
    password: '',
    emergencyContact: {
      name: '',
      mobileNumber: '',
      relationship: '',
    },
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleContactChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      emergencyContact: { ...prev.emergencyContact, [field]: value },
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // This exact shape matches POST /auth/signup's request body
    console.log('Signup payload:', formData)
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-burgundy-dark flex items-center justify-center px-6 py-12">
      <div className="bg-cream rounded-2xl shadow-2xl max-w-lg w-full p-8">
        <div className="flex items-center gap-2 mb-1">
          <ShieldCheck className="text-burgundy" size={20} />
          <span className="text-burgundy text-xs font-semibold tracking-wide uppercase">
            Secure Onboarding Protocol
          </span>
        </div>
        <h1 className="font-display text-burgundy-dark text-3xl font-bold mb-2">
          Create your safety profile
        </h1>
        <p className="text-burgundy/70 text-sm mb-6">
          Set up your real-time trusted emergency circle, automated SOS alert
          broadcasts, and personalized night-lit navigation routes.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Field
            icon={User}
            label="Full Name / Preferred Alias"
            value={formData.name}
            onChange={(v) => handleChange('name', v)}
            placeholder="Aarohi Sen"
          />
          <Field
            icon={Phone}
            label="Mobile Number"
            value={formData.mobileNumber}
            onChange={(v) => handleChange('mobileNumber', v)}
            placeholder="+91 98765 43210"
          />
          <Field
            icon={Lock}
            label="Password"
            type="password"
            value={formData.password}
            onChange={(v) => handleChange('password', v)}
            placeholder="Create a password"
          />

          <div className="border-t border-burgundy/10 pt-4 mt-2">
            <p className="text-burgundy text-xs font-semibold uppercase tracking-wide mb-3">
              Primary Emergency Contact
            </p>
            <div className="flex flex-col gap-4">
              <Field
                icon={User}
                label="Contact Name"
                value={formData.emergencyContact.name}
                onChange={(v) => handleContactChange('name', v)}
                placeholder="Meena Verma"
              />
              <Field
                icon={Phone}
                label="Contact Mobile Number"
                value={formData.emergencyContact.mobileNumber}
                onChange={(v) => handleContactChange('mobileNumber', v)}
                placeholder="+91 98110 22334"
              />
              <Field
                icon={Users}
                label="Guardian Relationship"
                value={formData.emergencyContact.relationship}
                onChange={(v) => handleContactChange('relationship', v)}
                placeholder="Parent / Family"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 bg-burgundy text-cream font-semibold py-3 rounded-full hover:bg-burgundy-light transition"
          >
            Complete Registration & Enter SheSuraksha →
          </button>

          {submitted && (
            <p className="text-green-700 text-sm text-center">
              Profile created — check the console for the payload.
            </p>
          )}
        </form>
      </div>
    </div>
  )
}

function Field({ icon: Icon, label, value, onChange, placeholder, type = 'text' }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-burgundy/60 text-xs font-medium uppercase tracking-wide">
        {label}
      </span>
      <div className="flex items-center gap-2 border border-burgundy/20 rounded-lg px-3 py-2 focus-within:border-burgundy">
        <Icon size={16} className="text-burgundy/50" />
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 outline-none text-burgundy-dark text-sm placeholder:text-burgundy/30"
        />
      </div>
    </label>
  )
}

export default Onboarding