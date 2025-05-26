'use client'

import { useRouter } from 'next/navigation'
import { useBookmarks } from '../../app/context/BookmarkContext'
import EmployeeCard from '../../app/components/Card/EmployeeCard'
import toast from 'react-hot-toast'

export default function BookmarksPage() {
  const router = useRouter()
  const {
    bookmarks,
    removeBookmark,
    promoteUser,
    assignProject
  } = useBookmarks()

  const handleView = (user) => {
    router.push(`/employee/${user.id}`)
  }

  const handlePromote = (user) => {
    promoteUser(user.id)
    toast.success(`${user.firstName} has been promoted!`)
  }

  const handleAssign = (user) => {
    const project = prompt(`Assign ${user.firstName} to which project?`)
    if (project) {
      assignProject(user.id, project)
      toast.success(`${user.firstName} assigned to "${project}"`)
    } else {
      toast.error('Assignment cancelled')
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* 🔙 Back Button */}
      <button
        onClick={() => router.back()}
        className="mb-6 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-600"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        📌 Bookmarked Employees
      </h1>

      {bookmarks.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-300">
          You haven’t bookmarked any employees yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {bookmarks.map(user => (
            <EmployeeCard
              key={user.id}
              user={user}
              onView={handleView}
              onBookmark={() => removeBookmark(user.id)}
              onPromote={handlePromote}
              onAssign={handleAssign}
            />
          ))}
        </div>
      )}
    </div>
  )
}
