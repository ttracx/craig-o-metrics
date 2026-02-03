'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

interface RetentionChartProps {
  data: Array<{
    cohort: string
    week0: number
    week1: number
    week2: number
    week3: number
    week4: number
  }>
}

export function RetentionChart({ data }: RetentionChartProps) {
  const getColor = (value: number) => {
    if (value >= 80) return 'bg-green-500'
    if (value >= 60) return 'bg-green-400'
    if (value >= 40) return 'bg-yellow-400'
    if (value >= 20) return 'bg-orange-400'
    return 'bg-red-400'
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Retention Cohorts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-500">
                <th className="text-left py-2 px-3 font-medium">Cohort</th>
                <th className="text-center py-2 px-3 font-medium">Week 0</th>
                <th className="text-center py-2 px-3 font-medium">Week 1</th>
                <th className="text-center py-2 px-3 font-medium">Week 2</th>
                <th className="text-center py-2 px-3 font-medium">Week 3</th>
                <th className="text-center py-2 px-3 font-medium">Week 4</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index} className="border-t border-gray-100">
                  <td className="py-2 px-3 font-medium text-gray-900">{row.cohort}</td>
                  {[row.week0, row.week1, row.week2, row.week3, row.week4].map((value, i) => (
                    <td key={i} className="py-2 px-3 text-center">
                      <span className={`inline-block px-3 py-1 rounded-md text-white ${getColor(value)}`}>
                        {value}%
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
