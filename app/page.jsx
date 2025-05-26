'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import EmployeeCard from '../app/components/Card/EmployeeCard'
import SearchFilter from '../app/components/SearchFilter'
import { getRandomDepartment, getRandomRating } from '../app/utils/random'
import { useBookmarks } from '../app/context/BookmarkContext'
import toast from 'react-hot-toast'

export default function DashboardPage() {
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [userName, setUserName] = useState('')
  const router = useRouter()
  const { addBookmark } = useBookmarks()

  // ✅ Redirect if not logged in
  useEffect(() => {
    const user = localStorage.getItem('user')
    if (!user) {
      toast.error('Please log in first')
      router.push('/')
    } else {
      setUserName(user)
    }
  }, [])

  // ✅ Fetch and enrich users
  useEffect(() => {
    fetch('https://dummyjson.com/users?limit=20')
      .then(res => res.json())
      .then(data => {
        const enriched = data.users.map(user => ({
          ...user,
          department: getRandomDepartment(),
          rating: getRandomRating(),
        }))
        setUsers(enriched)
        setFilteredUsers(enriched)
        setLoading(false)
      })
  }, [])

  // ✅ Action handlers
  const handleView = (user) => {
    router.push(`/employee/${user.id}`)
  }

  const handleBookmark = (user) => {
    addBookmark(user)
    toast.success(`${user.firstName} bookmarked!`)
    router.push('/bookmarks')
  }

  const handlePromote = (user) => {
    toast.success(`${user.firstName} has been promoted!`)
    // Optional: update status if needed
  }

  // ✅ Filter logic
  const handleFilter = ({ query, selectedDepartments, selectedRatings }) => {
    const q = query.toLowerCase()

    const result = users.filter(user => {
      const matchesSearch =
        user.firstName.toLowerCase().includes(q) ||
        user.lastName.toLowerCase().includes(q) ||
        user.email.toLowerCase().includes(q) ||
        user.department.toLowerCase().includes(q)

      const matchesDept =
        selectedDepartments.length === 0 || selectedDepartments.includes(user.department)

      const matchesRating =
        selectedRatings.length === 0 || selectedRatings.includes(user.rating)

      return matchesSearch && matchesDept && matchesRating
    })

    setFilteredUsers(result)
  }

  // ✅ Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading users...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
          Welcome, {userName} 👋
        </h1>

        {/* 🔍 Search and Filter */}
        <SearchFilter onSearch={handleFilter} />

        {/* 👥 Scrollable Cards */}
        <div className="h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredUsers.map(user => (
              <EmployeeCard
                key={user.id}
                user={user}
                onView={handleView}
                onBookmark={handleBookmark}
                onPromote={handlePromote}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
