'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { format } from 'date-fns'

interface Metric {
  id: string
  name: string
  type: 'currency' | 'percentage' | 'number'
  color: string
}

interface AddValueModalProps {
  metric: Metric
  onClose: () => void
  onAdd: (value: { value: number; date: string; notes?: string }) => void
}

export function AddValueModal({ metric, onClose, onAdd }: AddValueModalProps) {
  const [value, setValue] = useState('')
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'))
  const [notes, setNotes] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const numValue = parseFloat(value)
    if (!isNaN(numValue)) {
      onAdd({
        value: numValue,
        date,
        notes: notes.trim() || undefined,
      })
    }
  }

  const getPlaceholder = () => {
    switch (metric.type) {
      case 'currency':
        return 'e.g., 5000'
      case 'percentage':
        return 'e.g., 12.5'
      default:
        return 'e.g., 100'
    }
  }

  const getPrefix = () => {
    switch (metric.type) {
      case 'currency':
        return '$'
      case 'percentage':
        return ''
      default:
        return ''
    }
  }

  const getSuffix = () => {
    switch (metric.type) {
      case 'percentage':
        return '%'
      default:
        return ''
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#1a1a1a] rounded-xl w-full max-w-md border border-gray-800 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div>
            <h2 className="text-xl font-semibold">Add Value</h2>
            <p className="text-sm text-gray-400">{metric.name}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-2">Value</label>
            <div className="relative">
              {getPrefix() && (
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  {getPrefix()}
                </span>
              )}
              <input
                type="number"
                step="any"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={getPlaceholder()}
                className={`w-full py-3 bg-[#0a0a0a] border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 ${
                  getPrefix() ? 'pl-8 pr-4' : 'px-4'
                } ${getSuffix() ? 'pr-10' : ''}`}
                autoFocus
              />
              {getSuffix() && (
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                  {getSuffix()}
                </span>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-2">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm text-gray-400 mb-2">Notes (optional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any context..."
              rows={2}
              className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 resize-none"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!value}
              className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-medium transition-colors"
            >
              Add Value
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
