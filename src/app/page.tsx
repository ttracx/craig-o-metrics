'use client'

import Link from 'next/link'
import { BarChart3, Users, Globe, Zap, Shield, Download, ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">Craig-O-Metrics</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
            <Link href="/pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link>
            <Link href="/docs" className="text-gray-600 hover:text-gray-900">Docs</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link 
              href="/dashboard"
              className="px-4 py-2 text-gray-700 hover:text-gray-900"
            >
              Sign In
            </Link>
            <Link 
              href="/dashboard"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-24 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full text-blue-700 text-sm font-medium mb-6">
          <Zap className="w-4 h-4" />
          Part of the Craig-O Suite
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Privacy-Focused Analytics<br />
          <span className="text-blue-600">Built for Modern Teams</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Get the insights you need without compromising user privacy. 
          Simple, fast, and GDPR-compliant analytics for your websites and apps.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link 
            href="/dashboard"
            className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold text-lg flex items-center gap-2"
          >
            Start Free Trial <ArrowRight className="w-5 h-5" />
          </Link>
          <Link 
            href="#demo"
            className="px-8 py-4 bg-white text-gray-700 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors font-semibold text-lg"
          >
            View Demo
          </Link>
        </div>
        <p className="mt-4 text-sm text-gray-500">No credit card required • 14-day free trial</p>
      </section>

      {/* Dashboard Preview */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
          <div className="bg-gray-100 px-4 py-3 flex items-center gap-2 border-b">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <div className="flex-1 text-center text-sm text-gray-500">
              dashboard.craig-o-metrics.com
            </div>
          </div>
          <div className="p-8 bg-gradient-to-br from-gray-50 to-blue-50/30">
            <div className="grid grid-cols-4 gap-4 mb-6">
              {[
                { label: 'Page Views', value: '24,853', change: '+12%' },
                { label: 'Visitors', value: '8,421', change: '+8%' },
                { label: 'Avg. Duration', value: '3m 24s', change: '+5%' },
                { label: 'Bounce Rate', value: '42%', change: '-3%' },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-4 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-green-600">{stat.change}</p>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-lg border border-gray-200 h-48 flex items-center justify-center">
              <div className="flex items-end gap-1">
                {[40, 65, 55, 80, 70, 90, 85].map((h, i) => (
                  <div 
                    key={i}
                    className="w-12 bg-blue-500 rounded-t transition-all"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Everything You Need
          </h2>
          <p className="text-gray-600 text-center mb-16 max-w-2xl mx-auto">
            Powerful analytics features without the complexity. Get started in minutes.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Users, title: 'Unique Visitors', desc: 'Track real users, not just pageviews. Understand your actual audience size.' },
              { icon: Globe, title: 'Geographic Data', desc: 'See where your visitors come from with detailed country and city breakdowns.' },
              { icon: BarChart3, title: 'Real-Time Dashboard', desc: 'Watch your traffic live. See visitors and events as they happen.' },
              { icon: Zap, title: 'Custom Events', desc: 'Track button clicks, form submissions, and any custom action.' },
              { icon: Shield, title: 'Privacy-First', desc: 'GDPR compliant. No cookies. No personal data collection.' },
              { icon: Download, title: 'Export Data', desc: 'Download your analytics data anytime in CSV or JSON format.' },
            ].map((feature, i) => (
              <div key={i} className="p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all">
                <feature.icon className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing CTA */}
      <section className="py-24 bg-blue-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            One plan. All features. No surprises.
          </p>
          <div className="bg-white rounded-2xl p-8 max-w-md mx-auto">
            <p className="text-gray-500 mb-2">Pro Plan</p>
            <p className="text-5xl font-bold text-gray-900 mb-2">
              $19<span className="text-lg font-normal text-gray-500">/month</span>
            </p>
            <ul className="text-left space-y-3 my-6">
              {['Unlimited websites', 'Unlimited pageviews', 'Real-time dashboard', 'Custom events', 'Data export', 'API access'].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-gray-600">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <Link 
              href="/pricing"
              className="block w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BarChart3 className="w-6 h-6 text-blue-400" />
            <span className="text-white font-semibold">Craig-O-Metrics</span>
          </div>
          <div className="border-t border-gray-800 mt-4 pt-8 text-sm text-center">
            © 2026 Craig-O-Metrics powered by{' '}
            <a href="https://vibecaas.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
              VibeCaaS.com
            </a>{' '}
            a division of{' '}
            <a href="https://neuralquantum.ai/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
              NeuralQuantum.ai
            </a>{' '}
            LLC. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  )
}
