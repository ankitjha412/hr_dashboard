'use client'

import { useEffect } from 'react'

export default function ScriptToggleTheme() {
  useEffect(() => {
    const theme = localStorage.getItem('theme') || 'light'
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [])

  return null
}
