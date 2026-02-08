'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/layout/header'
import { MetricCard } from '@/components/dashboard/metric-card'
import { MetricChart } from '@/components/dashboard/metric-chart'
import { AddMetricModal } from '@/components/dashboard/add-metric-modal'
import { AddValueModal } from '@/components/dashboard/add-value-modal'
import { EmptyState } from '@/components/dashboard/empty-state'
import { Plus, TrendingUp, DollarSign, Users, Percent } from 'lucide-react'

interface MetricValue {
  id: string
  value: number
  date: string
  notes?: string
}

interface Metric {
  id: string
  name: string
  type: 'currency' | 'percentage' | 'number'
  source: string
  color: string
  values: MetricValue[]
  currentValue?: number
  previousValue?: number
  growth?: number
}

// Demo data for showcase
const DEMO_METRICS: Metric[] = [
  {
    id: 'mrr',
    name: 'Monthly Recurring Revenue',
    type: 'currency',
    source: 'stripe',
    color: '#10B981',
    currentValue: 24850,
    previousValue: 22100,
    growth: 12.4,
    values: [
      { id: '1', value: 18500, date: '2024-10-01' },
      { id: '2', value: 19200, date: '2024-11-01' },
      { id: '3', value: 20800, date: '2024-12-01' },
      { id: '4', value: 22100, date: '2025-01-01' },
      { id: '5', value: 24850, date: '2025-02-01' },
    ],
  },
  {
    id: 'customers',
    name: 'Active Customers',
    type: 'number',
    source: 'stripe',
    color: '#3B82F6',
    currentValue: 347,
    previousValue: 312,
    growth: 11.2,
    values: [
      { id: '1', value: 245, date: '2024-10-01' },
      { id: '2', value: 268, date: '2024-11-01' },
      { id: '3', value: 289, date: '2024-12-01' },
      { id: '4', value: 312, date: '2025-01-01' },
      { id: '5', value: 347, date: '2025-02-01' },
    ],
  },
  {
    id: 'churn',
    name: 'Monthly Churn Rate',
    type: 'percentage',
    source: 'manual',
    color: '#EF4444',
    currentValue: 2.3,
    previousValue: 2.8,
    growth: -17.9,
    values: [
      { id: '1', value: 3.5, date: '2024-10-01' },
      { id: '2', value: 3.1, date: '2024-11-01' },
      { id: '3', value: 2.9, date: '2024-12-01' },
      { id: '4', value: 2.8, date: '2025-01-01' },
      { id: '5', value: 2.3, date: '2025-02-01' },
    ],
  },
]

export default function Dashboard() {
  const [metrics, setMetrics] = useState<Metric[]>([])
  const [selectedMetric, setSelectedMetric] = useState<Metric | null>(null)
  const [showAddMetric, setShowAddMetric] = useState(false)
  const [showAddValue, setShowAddValue] = useState(false)
  const [isDemo, setIsDemo] = useState(true)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [plan, setPlan] = useState<'free' | 'pro'>('free')

  useEffect(() => {
    // Check for saved email in localStorage
    const savedEmail = localStorage.getItem('craig-o-metrics-email')
    if (savedEmail) {
      setUserEmail(savedEmail)
      setIsDemo(false)
      fetchMetrics(savedEmail)
    } else {
      setMetrics(DEMO_METRICS)
      setSelectedMetric(DEMO_METRICS[0])
    }
  }, [])

  const fetchMetrics = async (email: string) => {
    try {
      const res = await fetch(`/api/metrics?email=${encodeURIComponent(email)}`)
      if (res.ok) {
        const data = await res.json()
        if (data.metrics.length > 0) {
          setMetrics(data.metrics)
          setSelectedMetric(data.metrics[0])
        } else {
          setMetrics([])
          setSelectedMetric(null)
        }
        setPlan(data.plan || 'free')
      }
    } catch (error) {
      console.error('Failed to fetch metrics:', error)
    }
  }

  const handleLogin = (email: string) => {
    localStorage.setItem('craig-o-metrics-email', email)
    setUserEmail(email)
    setIsDemo(false)
    fetchMetrics(email)
  }

  const handleLogout = () => {
    localStorage.removeItem('craig-o-metrics-email')
    setUserEmail(null)
    setIsDemo(true)
    setMetrics(DEMO_METRICS)
    setSelectedMetric(DEMO_METRICS[0])
    setPlan('free')
  }

  const handleAddMetric = async (metric: { name: string; type: string; color: string }) => {
    if (!userEmail) return

    try {
      const res = await fetch('/api/metrics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...metric, email: userEmail }),
      })
      if (res.ok) {
        fetchMetrics(userEmail)
        setShowAddMetric(false)
      }
    } catch (error) {
      console.error('Failed to add metric:', error)
    }
  }

  const handleAddValue = async (value: { value: number; date: string; notes?: string }) => {
    if (!userEmail || !selectedMetric) return

    try {
      const res = await fetch('/api/metrics/values', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...value, 
          metricId: selectedMetric.id,
          email: userEmail 
        }),
      })
      if (res.ok) {
        fetchMetrics(userEmail)
        setShowAddValue(false)
      }
    } catch (error) {
      console.error('Failed to add value:', error)
    }
  }

  const maxMetrics = plan === 'pro' ? Infinity : 3
  const canAddMetric = metrics.length < maxMetrics

  return (
    <div className="min-h-screen">
      <Header 
        email={userEmail} 
        onLogin={handleLogin} 
        onLogout={handleLogout}
        plan={plan}
        isDemo={isDemo}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Demo Banner */}
        {isDemo && (
          <div className="mb-6 bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 flex items-center justify-between">
            <div>
              <p className="text-blue-400 font-medium">👋 You&apos;re viewing demo data</p>
              <p className="text-sm text-gray-400">Enter your email to start tracking your own metrics</p>
            </div>
          </div>
        )}

        {/* Metric Cards */}
        {metrics.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {metrics.map((metric) => (
                <MetricCard
                  key={metric.id}
                  metric={metric}
                  isSelected={selectedMetric?.id === metric.id}
                  onClick={() => setSelectedMetric(metric)}
                />
              ))}
              {!isDemo && canAddMetric && (
                <button
                  onClick={() => setShowAddMetric(true)}
                  className="flex flex-col items-center justify-center p-6 bg-[#1a1a1a] border-2 border-dashed border-gray-700 rounded-xl hover:border-blue-500 hover:bg-blue-500/5 transition-all group"
                >
                  <Plus className="w-8 h-8 text-gray-600 group-hover:text-blue-500 mb-2" />
                  <span className="text-gray-500 group-hover:text-blue-400">Add Metric</span>
                </button>
              )}
            </div>

            {/* Chart Section */}
            {selectedMetric && (
              <div className="bg-[#1a1a1a] rounded-xl p-6 border border-gray-800">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-semibold">{selectedMetric.name}</h2>
                    <p className="text-sm text-gray-400 capitalize">
                      Source: {selectedMetric.source} • {selectedMetric.type}
                    </p>
                  </div>
                  {!isDemo && (
                    <button
                      onClick={() => setShowAddValue(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Add Value
                    </button>
                  )}
                </div>
                <MetricChart metric={selectedMetric} />
              </div>
            )}
          </>
        ) : (
          !isDemo && (
            <EmptyState 
              onAddMetric={() => setShowAddMetric(true)}
              canAdd={canAddMetric}
            />
          )
        )}

        {/* Quick Stats */}
        {metrics.length > 0 && (
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-[#1a1a1a] rounded-xl p-4 border border-gray-800">
              <div className="flex items-center gap-2 text-gray-400 mb-2">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">Total Metrics</span>
              </div>
              <p className="text-2xl font-bold">{metrics.length}</p>
            </div>
            <div className="bg-[#1a1a1a] rounded-xl p-4 border border-gray-800">
              <div className="flex items-center gap-2 text-gray-400 mb-2">
                <DollarSign className="w-4 h-4" />
                <span className="text-sm">Revenue Metrics</span>
              </div>
              <p className="text-2xl font-bold">{metrics.filter(m => m.type === 'currency').length}</p>
            </div>
            <div className="bg-[#1a1a1a] rounded-xl p-4 border border-gray-800">
              <div className="flex items-center gap-2 text-gray-400 mb-2">
                <Users className="w-4 h-4" />
                <span className="text-sm">Data Points</span>
              </div>
              <p className="text-2xl font-bold">{metrics.reduce((acc, m) => acc + (m.values?.length || 0), 0)}</p>
            </div>
            <div className="bg-[#1a1a1a] rounded-xl p-4 border border-gray-800">
              <div className="flex items-center gap-2 text-gray-400 mb-2">
                <Percent className="w-4 h-4" />
                <span className="text-sm">Avg Growth</span>
              </div>
              <p className="text-2xl font-bold">
                {(metrics.reduce((acc, m) => acc + (m.growth || 0), 0) / metrics.length).toFixed(1)}%
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Modals */}
      {showAddMetric && (
        <AddMetricModal
          onClose={() => setShowAddMetric(false)}
          onAdd={handleAddMetric}
        />
      )}
      {showAddValue && selectedMetric && (
        <AddValueModal
          metric={selectedMetric}
          onClose={() => setShowAddValue(false)}
          onAdd={handleAddValue}
        />
      )}
    </div>
  )
}
