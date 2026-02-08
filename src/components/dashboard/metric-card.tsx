'use client'

import { TrendingUp, TrendingDown, Minus, DollarSign, Percent, Hash } from 'lucide-react'
import { formatValue } from '@/lib/utils'

interface MetricValue {
  id: string
  value: number
  date: string
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

interface MetricCardProps {
  metric: Metric
  isSelected: boolean
  onClick: () => void
}

const typeIcons = {
  currency: DollarSign,
  percentage: Percent,
  number: Hash,
}

export function MetricCard({ metric, isSelected, onClick }: MetricCardProps) {
  const Icon = typeIcons[metric.type] || Hash
  const currentValue = metric.currentValue ?? metric.values?.[metric.values.length - 1]?.value ?? 0
  const previousValue = metric.previousValue ?? metric.values?.[metric.values.length - 2]?.value ?? 0
  const growth = metric.growth ?? (previousValue ? ((currentValue - previousValue) / previousValue) * 100 : 0)

  const isPositive = growth > 0
  const isNegative = growth < 0
  // For churn, negative growth is good
  const isChurnMetric = metric.name.toLowerCase().includes('churn')
  const isGoodGrowth = isChurnMetric ? isNegative : isPositive

  return (
    <button
      onClick={onClick}
      className={`relative text-left w-full p-6 bg-[#1a1a1a] rounded-xl border transition-all ${
        isSelected 
          ? 'border-blue-500 ring-1 ring-blue-500/20' 
          : 'border-gray-800 hover:border-gray-700'
      }`}
    >
      {/* Color indicator */}
      <div 
        className="absolute top-0 left-0 right-0 h-1 rounded-t-xl"
        style={{ backgroundColor: metric.color }}
      />

      <div className="flex items-start justify-between mb-4">
        <div 
          className="p-2 rounded-lg"
          style={{ backgroundColor: `${metric.color}20` }}
        >
          <Icon className="w-5 h-5" style={{ color: metric.color }} />
        </div>
        <span className="text-xs text-gray-500 capitalize">{metric.source}</span>
      </div>

      <p className="text-sm text-gray-400 mb-1">{metric.name}</p>
      <p className="text-2xl font-bold mb-2">{formatValue(currentValue, metric.type)}</p>

      <div className={`flex items-center gap-1 text-sm ${
        isGoodGrowth ? 'text-green-500' : growth === 0 ? 'text-gray-500' : 'text-red-500'
      }`}>
        {isPositive ? (
          <TrendingUp className="w-4 h-4" />
        ) : isNegative ? (
          <TrendingDown className="w-4 h-4" />
        ) : (
          <Minus className="w-4 h-4" />
        )}
        <span>{Math.abs(growth).toFixed(1)}%</span>
        <span className="text-gray-500">vs last period</span>
      </div>
    </button>
  )
}
