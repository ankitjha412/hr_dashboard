'use client'

import { useState, useEffect } from 'react'
import { departments } from '../utils/random'

const ratings = [1, 2, 3, 4, 5]

export default function SearchFilter({ onSearch }) {
  const [query, setQuery] = useState('')
  const [selectedDepartments, setSelectedDepartments] = useState([])
  const [selectedRatings, setSelectedRatings] = useState([])

  // 🔁 Apply filters automatically when values change
  useEffect(() => {
    onSearch({ query, selectedDepartments, selectedRatings })
  }, [query, selectedDepartments, selectedRatings])

  const toggleSelection = (value, setFn, current) => {
    if (current.includes(value)) {
      setFn(current.filter(item => item !== value))
    } else {
      setFn([...current, value])
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-6">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by name, email, or department"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full sm:w-1/3 px-4 py-2 border rounded dark:bg-gray-700"
        />

        {/* Department Filters */}
        <div className="flex flex-wrap gap-2">
          {departments.map(dep => (
            <button
              key={dep}
              onClick={() => toggleSelection(dep, setSelectedDepartments, selectedDepartments)}
              className={`px-3 py-1 rounded border text-sm ${
                selectedDepartments.includes(dep)
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700'
              }`}
            >
              {dep}
            </button>
          ))}
        </div>

        {/* Rating Filters */}
        <div className="flex flex-wrap gap-2">
          {ratings.map(r => (
            <button
              key={r}
              onClick={() => toggleSelection(r, setSelectedRatings, selectedRatings)}
              className={`px-3 py-1 rounded border text-sm ${
                selectedRatings.includes(r)
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700'
              }`}
            >
              {r}★
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
