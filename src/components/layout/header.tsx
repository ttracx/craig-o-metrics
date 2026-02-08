'use client'

import { useState } from 'react'
import { BarChart3, LogOut, Crown, Mail } from 'lucide-react'

interface HeaderProps {
  email: string | null
  onLogin: (email: string) => void
  onLogout: () => void
  plan: 'free' | 'pro'
  isDemo: boolean
}

export function Header({ email, onLogin, onLogout, plan, isDemo }: HeaderProps) {
  const [showLogin, setShowLogin] = useState(false)
  const [inputEmail, setInputEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputEmail.trim()) {
      onLogin(inputEmail.trim())
      setShowLogin(false)
      setInputEmail('')
    }
  }

  return (
    <header className="border-b border-gray-800 bg-[#0a0a0a]/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">CRAIG-O-METRICS</h1>
              <p className="text-xs text-gray-500">Business Metrics Dashboard</p>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {email ? (
              <>
                {/* Plan Badge */}
                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-sm ${
                  plan === 'pro' 
                    ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' 
                    : 'bg-gray-800 text-gray-400'
                }`}>
                  {plan === 'pro' && <Crown className="w-3.5 h-3.5" />}
                  <span className="capitalize">{plan}</span>
                </div>

                {/* Upgrade Button */}
                {plan === 'free' && (
                  <a
                    href="/pricing"
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg text-sm font-medium transition-all"
                  >
                    Upgrade to Pro
                  </a>
                )}

                {/* User Menu */}
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-400 hidden sm:block">{email}</span>
                  <button
                    onClick={onLogout}
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                    title="Sign out"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                {isDemo && (
                  <span className="text-sm text-gray-500 hidden sm:block">Demo Mode</span>
                )}
                <button
                  onClick={() => setShowLogin(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Get Started
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1a1a] rounded-xl p-6 w-full max-w-md border border-gray-800">
            <h2 className="text-xl font-semibold mb-4">Get Started</h2>
            <p className="text-gray-400 mb-6">
              Enter your email to start tracking your metrics. No password needed!
            </p>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                value={inputEmail}
                onChange={(e) => setInputEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 mb-4"
                autoFocus
              />
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowLogin(false)}
                  className="flex-1 px-4 py-3 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  )
}
