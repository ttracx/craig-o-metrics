'use client'

import { cn, formatNumber } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

interface StatCardProps {
  title: string
  value: number | string
  change?: number
  icon: LucideIcon
  color?: 'blue' | 'green' | 'purple' | 'orange'
}

const colorMap = {
  blue: 'bg-blue-50 text-blue-600',
  green: 'bg-green-50 text-green-600',
  purple: 'bg-purple-50 text-purple-600',
  orange: 'bg-orange-50 text-orange-600',
}

export function StatCard({ title, value, change, icon: Icon, color = 'blue' }: StatCardProps) {
  const formattedValue = typeof value === 'number' ? formatNumber(value) : value
  
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{formattedValue}</p>
          {change !== undefined && (
            <p className={cn(
              'text-sm mt-1',
              change >= 0 ? 'text-green-600' : 'text-red-600'
            )}>
              {change >= 0 ? '↑' : '↓'} {Math.abs(change)}% vs last period
            </p>
          )}
        </div>
        <div className={cn('p-3 rounded-lg', colorMap[color])}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  )
}
