'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Zap } from 'lucide-react'

interface EventsTableProps {
  data: Array<{
    name: string
    count: number
    lastTriggered: string
  }>
}

export function EventsTable({ data }: EventsTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="w-5 h-5" />
          Custom Events
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-500 border-b border-gray-100">
                <th className="text-left py-3 px-3 font-medium">Event Name</th>
                <th className="text-right py-3 px-3 font-medium">Count</th>
                <th className="text-right py-3 px-3 font-medium">Last Triggered</th>
              </tr>
            </thead>
            <tbody>
              {data.map((event, index) => (
                <tr key={index} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-3 px-3">
                    <span className="inline-flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                      <code className="text-gray-900 font-mono">{event.name}</code>
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right font-medium text-gray-900">
                    {event.count.toLocaleString()}
                  </td>
                  <td className="py-3 px-3 text-right text-gray-500">
                    {event.lastTriggered}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
