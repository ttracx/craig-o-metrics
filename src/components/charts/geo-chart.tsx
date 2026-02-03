'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Globe } from 'lucide-react'

interface GeoChartProps {
  data: Array<{
    country: string
    visits: number
    percentage: number
  }>
}

export function GeoChart({ data }: GeoChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="w-5 h-5" />
          Geographic Distribution
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <span className="text-2xl">{getCountryFlag(item.country)}</span>
              <div className="flex-1">
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-900">{item.country}</span>
                  <span className="text-gray-500">{item.visits.toLocaleString()} ({item.percentage}%)</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function getCountryFlag(country: string): string {
  const flags: Record<string, string> = {
    'United States': '🇺🇸',
    'United Kingdom': '🇬🇧',
    'Germany': '🇩🇪',
    'France': '🇫🇷',
    'Canada': '🇨🇦',
    'Australia': '🇦🇺',
    'Japan': '🇯🇵',
    'India': '🇮🇳',
    'Brazil': '🇧🇷',
    'Netherlands': '🇳🇱',
  }
  return flags[country] || '🌍'
}
