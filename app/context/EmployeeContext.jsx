'use client'

import { createContext, useContext, useState } from 'react'

const EmployeeContext = createContext()

export const useEmployeeProfiles = () => useContext(EmployeeContext)

const departmentBios = {
  Engineering: 'Driven software engineer with a love for solving real-world problems using scalable systems.',
  Marketing: 'Creative marketer focused on growth strategies, brand storytelling, and data-backed campaigns.',
  HR: 'Empathetic HR leader committed to building inclusive workplaces and improving employee engagement.',
  Finance: 'Detail-oriented finance analyst with strong grasp of budgeting, forecasting, and data modeling.',
  Sales: 'Persuasive sales professional experienced in closing enterprise deals and relationship management.',
  Default: 'Highly motivated professional dedicated to performance and continuous improvement.',
}

const generateRating = () => Math.floor(Math.random() * 5) + 1

const generateHistory = (dept) => {
  const base = dept === 'Engineering' || dept === 'Sales' ? 4 : 3
  const currentYear = new Date().getFullYear()
  return Array.from({ length: 5 }, (_, i) => ({
    year: currentYear - i,
    rating: Math.max(1, Math.min(5, base + Math.floor(Math.random() * 2 - 1))),
  }))
}

export function EmployeeProvider({ children }) {
  const [profiles, setProfiles] = useState({})

  const getEmployeeProfile = async (id) => {
    if (profiles[id]) return profiles[id]

    const res = await fetch(`https://dummyjson.com/users/${id}`)
    const data = await res.json()
    const department = data.company?.department || 'Default'

    const profile = {
      ...data,
      department,
      bio: departmentBios[department] || departmentBios.Default,
      currentRating: generateRating(),
      history: generateHistory(department),
    }

    setProfiles(prev => ({ ...prev, [id]: profile }))
    return profile
  }

  return (
    <EmployeeContext.Provider value={{ getEmployeeProfile }}>
      {children}
    </EmployeeContext.Provider>
  )
}
