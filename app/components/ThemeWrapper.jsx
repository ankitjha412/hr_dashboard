'use client'

import { useEffect, useState } from 'react'

export default function ThemeWrapper({ children }) {
  const [theme, setTheme] = useState('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') || 'light'
    setTheme(storedTheme)
    setMounted(true)
  }, [])

  if (!mounted) return null // Prevents mismatch during hydration

  return (
    <html lang="en" className={theme === 'dark' ? 'dark' : ''}>
      {children}
    </html>
  )
}
