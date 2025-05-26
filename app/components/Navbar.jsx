'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function Navbar() {
  const [theme, setTheme] = useState('light')
  const [user, setUser] = useState(null) // Initialize as null for hydration
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme')
    const storedUser = localStorage.getItem('user')

    if (storedTheme) {
      setTheme(storedTheme)
      document.documentElement.classList.toggle('dark', storedTheme === 'dark')
    }

    if (storedUser) {
      setUser(storedUser)
    }

    setMounted(true)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  const handleLogout = () => {
    localStorage.clear()
    setUser('')
    toast.success('Logged out')
    setTimeout(() => {
      router.push('/login')
    }, 200)
  }

  // ⛔ Prevent hydration mismatch
  if (!mounted) return null

  return (
    <nav className="flex justify-between items-center px-6 py-3 shadow-md bg-white dark:bg-gray-900 dark:text-white">
      <div className="text-2xl font-bold">HR Dashboard</div>

      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          Dashboard
        </Link>
        <Link
          href="/bookmarks"
          className="px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          Bookmarks
        </Link>
        <Link
          href="/analytics"
          className="px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          Analytics
        </Link>

        <button
          onClick={toggleTheme}
          className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          Toggle Theme
        </button>

        {user && (
          <>
            <span className="text-sm font-medium bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded">
              Hi, {user}
            </span>
            <button
              onClick={handleLogout}
              className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 text-sm"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  )
}
