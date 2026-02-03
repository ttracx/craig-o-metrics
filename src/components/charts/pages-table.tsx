'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { FileText } from 'lucide-react'

interface PagesTableProps {
  data: Array<{
    path: string
    views: number
    uniqueVisitors: number
    avgTime: string
  }>
}

export function PagesTable({ data }: PagesTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Top Pages
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-500 border-b border-gray-100">
                <th className="text-left py-3 px-3 font-medium">Page</th>
                <th className="text-right py-3 px-3 font-medium">Views</th>
                <th className="text-right py-3 px-3 font-medium">Visitors</th>
                <th className="text-right py-3 px-3 font-medium">Avg. Time</th>
              </tr>
            </thead>
            <tbody>
              {data.map((page, index) => (
                <tr key={index} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-3 px-3">
                    <code className="text-gray-900 font-mono text-sm">{page.path}</code>
                  </td>
                  <td className="py-3 px-3 text-right font-medium text-gray-900">
                    {page.views.toLocaleString()}
                  </td>
                  <td className="py-3 px-3 text-right text-gray-600">
                    {page.uniqueVisitors.toLocaleString()}
                  </td>
                  <td className="py-3 px-3 text-right text-gray-500">
                    {page.avgTime}
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
