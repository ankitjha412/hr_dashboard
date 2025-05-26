'use client'

export default function EmployeeCard({ user, onView, onBookmark, onPromote, onAssign }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow space-y-2">
      <h2 className="text-lg font-semibold">{user.firstName} {user.lastName}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300">{user.email}</p>
      <p className="text-sm">Age: {user.age}</p>
      <p className="text-sm">Department: <strong>{user.department}</strong></p>
      <p className="text-sm">
        Rating: {'★'.repeat(user.rating)}{'☆'.repeat(5 - user.rating)}
      </p>

      {/* ✅ Status & Project (if available) */}
      {user.status && (
        <p className="text-sm text-green-600 dark:text-green-400">
          Status: <strong>{user.status}</strong>
        </p>
      )}

      {user.assignedProject && (
        <p className="text-sm text-blue-600 dark:text-blue-400">
          Assigned to: <strong>{user.assignedProject}</strong>
        </p>
      )}

      {/* 🔘 Action Buttons */}
      <div className="flex flex-wrap gap-2 mt-2">
        <button
          onClick={() => onView(user)}
          className="px-2 py-1 text-sm bg-blue-500 text-white rounded"
        >
          View
        </button>

        <button
          onClick={() => onBookmark(user)}
          className="px-2 py-1 text-sm bg-yellow-500 text-white rounded"
        >
          {onAssign ? 'Remove' : 'Bookmark'}
        </button>

        <button
          onClick={() => onPromote(user)}
          className="px-2 py-1 text-sm bg-green-600 text-white rounded"
        >
          Promote
        </button>

        {onAssign && (
          <button
            onClick={() => onAssign(user)}
            className="px-2 py-1 text-sm bg-purple-600 text-white rounded"
          >
            Assign
          </button>
        )}
      </div>
    </div>
  )
}
