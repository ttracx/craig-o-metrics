'use client'

import { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Activity, Users } from 'lucide-react'

interface RealTimeWidgetProps {
  siteId?: string
}

export function RealTimeWidget({ siteId }: RealTimeWidgetProps) {
  const [activeUsers, setActiveUsers] = useState(0)
  const [recentEvents, setRecentEvents] = useState<Array<{
    type: string
    path: string
    time: string
    country: string
  }>>([])

  useEffect(() => {
    // Simulate real-time data for demo
    const interval = setInterval(() => {
      setActiveUsers(Math.floor(Math.random() * 50) + 10)
      setRecentEvents([
        { type: 'pageview', path: '/dashboard', time: '2s ago', country: '🇺🇸' },
        { type: 'event', path: 'button_click', time: '5s ago', country: '🇬🇧' },
        { type: 'pageview', path: '/pricing', time: '8s ago', country: '🇩🇪' },
        { type: 'pageview', path: '/', time: '12s ago', country: '🇫🇷' },
        { type: 'event', path: 'signup_start', time: '15s ago', country: '🇨🇦' },
      ])
    }, 3000)

    // Initial load
    setActiveUsers(Math.floor(Math.random() * 50) + 10)
    setRecentEvents([
      { type: 'pageview', path: '/dashboard', time: '2s ago', country: '🇺🇸' },
      { type: 'event', path: 'button_click', time: '5s ago', country: '🇬🇧' },
      { type: 'pageview', path: '/pricing', time: '8s ago', country: '🇩🇪' },
      { type: 'pageview', path: '/', time: '12s ago', country: '🇫🇷' },
      { type: 'event', path: 'signup_start', time: '15s ago', country: '🇨🇦' },
    ])

    return () => clearInterval(interval)
  }, [siteId])

  return (
    <Card className="border-green-200 bg-green-50/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-700">
          <Activity className="w-5 h-5 animate-pulse" />
          Real-Time Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-green-600" />
            <span className="text-3xl font-bold text-green-700">{activeUsers}</span>
          </div>
          <span className="text-sm text-green-600">active users right now</span>
        </div>
        
        <div className="space-y-2">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Live Stream</p>
          {recentEvents.map((event, index) => (
            <div 
              key={index} 
              className="flex items-center gap-3 text-sm py-2 border-b border-green-100 last:border-0"
            >
              <span>{event.country}</span>
              <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                event.type === 'pageview' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-purple-100 text-purple-700'
              }`}>
                {event.type}
              </span>
              <code className="text-gray-700 font-mono text-xs flex-1 truncate">{event.path}</code>
              <span className="text-gray-400 text-xs">{event.time}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
