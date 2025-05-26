'use client'

import { createContext, useContext, useEffect, useState } from 'react'

const UserContext = createContext()

export const useUser = () => useContext(UserContext)

export function UserProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    setUser(storedUser || '')
  }, [])

  const login = (username) => {
    localStorage.setItem('user', username)
    setUser(username)
  }

  const logout = () => {
    localStorage.clear()
    setUser('')
  }

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}
