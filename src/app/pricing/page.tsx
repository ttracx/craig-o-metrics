'use client'

import Link from 'next/link'
import { BarChart3, Check, ArrowLeft } from 'lucide-react'
import { useState } from 'react'

export default function Pricing() {
  const [loading, setLoading] = useState(false)

  const handleSubscribe = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID,
          email: 'demo@craig-o-metrics.com'
        })
      })
      const { url } = await response.json()
      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error('Checkout error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <BarChart3 className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">Craig-O-Metrics</span>
          </Link>
          <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </header>

      <section className="max-w-4xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600">
            One plan. All features. No surprises.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden max-w-lg mx-auto">
          <div className="p-8 text-center border-b border-gray-100">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
              Most Popular
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Pro Plan</h2>
            <p className="text-gray-500 mb-6">Perfect for growing businesses</p>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-5xl font-bold text-gray-900">$19</span>
              <span className="text-gray-500">/month</span>
            </div>
          </div>

          <div className="p-8">
            <ul className="space-y-4 mb-8">
              {[
                'Unlimited websites',
                'Unlimited pageviews',
                'Real-time dashboard',
                'Custom events tracking',
                'Geographic data',
                'Device breakdown',
                'Referrer tracking',
                'Retention metrics',
                'Data export (CSV/JSON)',
                'API access',
                'Email support',
                'GDPR compliant'
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={handleSubscribe}
              disabled={loading}
              className="w-full py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold text-lg disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Start 14-Day Free Trial'}
            </button>
            <p className="text-center text-sm text-gray-500 mt-4">
              No credit card required • Cancel anytime
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Need more?</h3>
          <p className="text-gray-600 mb-4">
            Contact us for enterprise pricing with custom features and dedicated support.
          </p>
          <a 
            href="mailto:support@craig-o-metrics.com"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Contact Sales →
          </a>
        </div>
      </section>
    </main>
  )
}
