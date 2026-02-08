'use client'

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { formatValue } from '@/lib/utils'
import { format, parseISO } from 'date-fns'

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
}

interface MetricChartProps {
  metric: Metric
}

export function MetricChart({ metric }: MetricChartProps) {
  const data = metric.values
    .map((v) => ({
      date: v.date,
      value: v.value,
      formattedDate: format(parseISO(v.date), 'MMM d'),
      formattedValue: formatValue(v.value, metric.type),
      notes: v.notes,
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: typeof data[number] }> }) => {
    if (!active || !payload?.length) return null
    const item = payload[0].payload
    return (
      <div className="bg-[#1a1a1a] border border-gray-700 rounded-lg p-3 shadow-xl">
        <p className="text-sm text-gray-400 mb-1">{format(parseISO(item.date), 'MMMM d, yyyy')}</p>
        <p className="text-lg font-bold" style={{ color: metric.color }}>
          {item.formattedValue}
        </p>
        {item.notes && (
          <p className="text-xs text-gray-500 mt-1">{item.notes}</p>
        )}
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center text-gray-500">
        No data yet. Add your first value to see the chart.
      </div>
    )
  }

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={`gradient-${metric.id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={metric.color} stopOpacity={0.3} />
              <stop offset="100%" stopColor={metric.color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
          <XAxis 
            dataKey="formattedDate" 
            stroke="#71717a" 
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            stroke="#71717a" 
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => formatValue(value, metric.type)}
            width={80}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="value"
            stroke={metric.color}
            strokeWidth={2}
            fill={`url(#gradient-${metric.id})`}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
