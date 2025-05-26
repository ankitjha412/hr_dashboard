'use client'

import { Bar, Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from 'chart.js'
import { useBookmarks } from '../../app/context/BookmarkContext'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Tooltip, Legend)

export default function AnalyticsPage() {
  const { bookmarks } = useBookmarks()
  const router = useRouter()
  const [departmentData, setDepartmentData] = useState({})
  const [trendData, setTrendData] = useState([])

  useEffect(() => {
    const deptMap = {}
    const monthlyMap = Array(12).fill(0)

    bookmarks.forEach(user => {
      const dept = user.department
      if (!deptMap[dept]) deptMap[dept] = []
      deptMap[dept].push(user.rating)

      const date = new Date(user.bookmarkedAt)
      const monthIndex = date.getMonth()
      monthlyMap[monthIndex]++
    })

    const avgRatings = {}
    Object.keys(deptMap).forEach(dept => {
      const ratings = deptMap[dept]
      const avg = ratings.reduce((a, b) => a + b, 0) / ratings.length
      avgRatings[dept] = avg.toFixed(2)
    })

    setDepartmentData(avgRatings)
    setTrendData(monthlyMap)
  }, [bookmarks])

  const barData = {
    labels: Object.keys(departmentData),
    datasets: [
      {
        label: 'Avg Ratings by Department',
        data: Object.values(departmentData),
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderRadius: 8,
      },
    ],
  }

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const lineData = {
    labels: months,
    datasets: [
      {
        label: 'Bookmarks This Year',
        data: trendData,
        borderColor: 'rgba(34,197,94,1)',
        backgroundColor: 'rgba(34,197,94,0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white p-6 overflow-hidden">
      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="mb-6 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-600"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold mb-8 text-center">📊 Analytics Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Bar Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-center">Average Ratings by Department</h2>
          <Bar data={barData} />
        </div>

        {/* Line Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-center">Monthly Bookmark Trends</h2>
          <Line data={lineData} />
        </div>
      </div>
    </div>
  )
}
