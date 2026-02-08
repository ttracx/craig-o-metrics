'use client'

import { BarChart3, Plus, TrendingUp, PieChart, LineChart } from 'lucide-react'

interface EmptyStateProps {
  onAddMetric: () => void
  canAdd: boolean
}

export function EmptyState({ onAddMetric, canAdd }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      {/* Animated icons */}
      <div className="relative w-32 h-32 mb-8">
        <div className="absolute inset-0 flex items-center justify-center">
          <BarChart3 className="w-16 h-16 text-blue-500/20" />
        </div>
        <div className="absolute top-0 left-0 animate-pulse">
          <TrendingUp className="w-8 h-8 text-green-500/40" />
        </div>
        <div className="absolute top-0 right-0 animate-pulse delay-100">
          <PieChart className="w-8 h-8 text-purple-500/40" />
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 animate-pulse delay-200">
          <LineChart className="w-8 h-8 text-amber-500/40" />
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-2">No metrics yet</h2>
      <p className="text-gray-400 text-center max-w-md mb-8">
        Start tracking your business KPIs by adding your first metric. 
        Track MRR, churn, growth, and more.
      </p>

      {canAdd ? (
        <button
          onClick={onAddMetric}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Your First Metric
        </button>
      ) : (
        <div className="text-center">
          <p className="text-amber-400 mb-4">
            You&apos;ve reached the limit for free accounts
          </p>
          <a
            href="/pricing"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg font-medium transition-all"
          >
            Upgrade to Pro for Unlimited Metrics
          </a>
        </div>
      )}

      {/* Feature hints */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 max-w-2xl">
        <div className="p-4 bg-[#1a1a1a] rounded-xl border border-gray-800">
          <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center mb-3">
            <TrendingUp className="w-5 h-5 text-blue-500" />
          </div>
          <h3 className="font-medium mb-1">Track KPIs</h3>
          <p className="text-sm text-gray-400">Monitor MRR, churn, growth, and custom metrics</p>
        </div>
        <div className="p-4 bg-[#1a1a1a] rounded-xl border border-gray-800">
          <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center mb-3">
            <BarChart3 className="w-5 h-5 text-purple-500" />
          </div>
          <h3 className="font-medium mb-1">Beautiful Charts</h3>
          <p className="text-sm text-gray-400">Visualize trends with interactive charts</p>
        </div>
        <div className="p-4 bg-[#1a1a1a] rounded-xl border border-gray-800">
          <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center mb-3">
            <LineChart className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="font-medium mb-1">Stripe Integration</h3>
          <p className="text-sm text-gray-400">Auto-sync revenue data from Stripe</p>
        </div>
      </div>
    </div>
  )
}
