'use client'

import { createContext, useContext, useEffect, useState } from 'react'

const BookmarkContext = createContext()

export const useBookmarks = () => useContext(BookmarkContext)

export function BookmarkProvider({ children }) {
  const [bookmarks, setBookmarks] = useState([])

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('bookmarks')
    if (stored) setBookmarks(JSON.parse(stored))
  }, [])

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
  }, [bookmarks])

  // Add new bookmark (with default fields)
  const addBookmark = (user) => {
    if (!bookmarks.some(b => b.id === user.id)) {
      const enrichedUser = {
        ...user,
        bookmarkedAt: new Date().toISOString(),
        status: 'Active',
        assignedProject: null,
      }
      setBookmarks([...bookmarks, enrichedUser])
    }
  }

  // Remove bookmark by ID
  const removeBookmark = (id) => {
    setBookmarks(bookmarks.filter(b => b.id !== id))
  }

  // Promote a user by ID
  const promoteUser = (id) => {
    setBookmarks(prev =>
      prev.map(user =>
        user.id === id ? { ...user, status: 'Promoted' } : user
      )
    )
  }

  // Assign a project to a user by ID
  const assignProject = (id, projectName) => {
    setBookmarks(prev =>
      prev.map(user =>
        user.id === id ? { ...user, assignedProject: projectName } : user
      )
    )
  }

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        addBookmark,
        removeBookmark,
        promoteUser,
        assignProject,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  )
}
