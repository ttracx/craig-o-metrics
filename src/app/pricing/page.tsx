'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { Check, BarChart3, Zap, Crown, ArrowLeft, X, AlertCircle } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

const plans = [
  {
    name: 'Free',
    price: 0,
    description: 'For individuals getting started',
    features: [
      '3 metrics',
      'Basic charts',
      '30-day history',
      'Manual data entry',
      'Email support',
    ],
    limitations: [
      'No Stripe integration',
      'No email reports',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Pro',
    price: 14,
    description: 'For growing businesses',
    features: [
      'Unlimited metrics',
      'Advanced charts & trends',
      'Unlimited history',
      'Stripe integration',
      'Weekly email reports',
      'Priority support',
      'Export to CSV/PDF',
      'Custom date ranges',
    ],
    limitations: [],
    cta: 'Upgrade to Pro',
    popular: true,
  },
]

function PricingContent() {
  const [email, setEmail] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const searchParams = useSearchParams()
  const canceled = searchParams.get('canceled')

  useEffect(() => {
    const savedEmail = localStorage.getItem('craig-o-metrics-email')
    if (savedEmail) {
      setEmail(savedEmail)
    }
  }, [])

  const handleUpgrade = async () => {
    if (!email) {
      // Need to get email first
      const inputEmail = prompt('Enter your email to continue:')
      if (inputEmail) {
        localStorage.setItem('craig-o-metrics-email', inputEmail)
        setEmail(inputEmail)
        await checkout(inputEmail)
      }
    } else {
      await checkout(email)
    }
  }

  const checkout = async (userEmail: string) => {
    setLoading(true)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        alert('Failed to create checkout session')
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Failed to start checkout')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight">CRAIG-O-METRICS</h1>
              </div>
            </Link>
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Canceled Banner */}
        {canceled && (
          <div className="mb-8 bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
            <p className="text-yellow-400">Checkout was canceled. No charge was made.</p>
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-400">
            Start free, upgrade when you need more
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-[#1a1a1a] rounded-2xl p-8 border ${
                plan.popular
                  ? 'border-blue-500 ring-1 ring-blue-500/20'
                  : 'border-gray-800'
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-600 rounded-full text-sm font-medium">
                    <Zap className="w-3.5 h-3.5" />
                    Most Popular
                  </div>
                </div>
              )}

              {/* Plan header */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  {plan.popular ? (
                    <Crown className="w-5 h-5 text-yellow-500" />
                  ) : (
                    <BarChart3 className="w-5 h-5 text-gray-400" />
                  )}
                  <h2 className="text-xl font-bold">{plan.name}</h2>
                </div>
                <p className="text-gray-400">{plan.description}</p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  {plan.price > 0 && (
                    <span className="text-gray-400">/month</span>
                  )}
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
                {plan.limitations.map((limitation) => (
                  <li key={limitation} className="flex items-center gap-3 text-gray-500">
                    <X className="w-5 h-5 flex-shrink-0" />
                    <span>{limitation}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              {plan.price === 0 ? (
                <Link
                  href="/"
                  className="block w-full text-center py-3 px-4 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors font-medium"
                >
                  {plan.cta}
                </Link>
              ) : (
                <button
                  onClick={handleUpgrade}
                  disabled={loading}
                  className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg font-medium transition-all disabled:opacity-50"
                >
                  {loading ? 'Loading...' : plan.cta}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* FAQ or Trust signals */}
        <div className="mt-16 text-center">
          <p className="text-gray-400">
            Cancel anytime. No long-term commitments.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Payments securely processed by Stripe
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500">
          © 2026 CRAIG-O-METRICS powered by VibeCaaS.com a division of NeuralQuantum.ai LLC. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

export default function PricingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">Loading...</div>}>
      <PricingContent />
    </Suspense>
  )
}
