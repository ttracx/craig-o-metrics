'use client'

import { useState } from 'react'
import { Calendar } from 'lucide-react'

interface DateRangePickerProps {
  value: string
  onChange: (value: string) => void
}

const ranges = [
  { value: '24h', label: 'Last 24 hours' },
  { value: '7d', label: 'Last 7 days' },
  { value: '30d', label: 'Last 30 days' },
  { value: '90d', label: 'Last 90 days' },
]

export function DateRangePicker({ value, onChange }: DateRangePickerProps) {
  const [showDropdown, setShowDropdown] = useState(false)
  
  const currentRange = ranges.find(r => r.value === value)

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <Calendar className="w-4 h-4 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">{currentRange?.label}</span>
      </button>
      
      {showDropdown && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
          {ranges.map((range) => (
            <button
              key={range.value}
              onClick={() => {
                onChange(range.value)
                setShowDropdown(false)
              }}
              className={`w-full text-left px-4 py-2 text-sm ${
                value === range.value 
                  ? 'bg-blue-50 text-blue-700' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
