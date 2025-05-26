'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useEmployeeProfiles } from '../../context/EmployeeContext'

const TABS = ['Overview', 'Projects', 'Feedback']

export default function EmployeeDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const { getEmployeeProfile } = useEmployeeProfiles()
  const [employee, setEmployee] = useState(null)
  const [activeTab, setActiveTab] = useState('Overview')

  useEffect(() => {
    getEmployeeProfile(id).then(setEmployee)
  }, [id])

  if (!employee) return <p className="p-4">Loading...</p>

  const renderStars = (count) => '★'.repeat(count) + '☆'.repeat(5 - count)

  const getBadge = (rating) => {
    if (rating >= 4) return { label: 'High Performer', color: 'bg-green-500' }
    if (rating === 3) return { label: 'Average Performer', color: 'bg-yellow-500' }
    return { label: 'Needs Improvement', color: 'bg-red-500' }
  }

  const badge = getBadge(employee.currentRating)

  const mockProjects = [
    { name: 'HR Management System', role: 'Team Lead', duration: '6 months' },
    { name: 'Payroll Automation', role: 'Backend Dev', duration: '4 months' },
    { name: 'Employee Wellness App', role: 'Full Stack', duration: '3 months' },
  ]

  const mockFeedback = [
    { from: 'Manager', comment: 'Excellent leadership in Q1 project delivery.' },
    { from: 'Colleague', comment: 'Always ready to help and share knowledge.' },
    { from: 'HR', comment: 'Great onboarding support for new joiners.' },
  ]

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded shadow">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="mb-4 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-600"
      >
        ← Back
      </button>

      {/* Employee Info Header */}
      <h1 className="text-2xl font-bold mb-2">{employee.firstName} {employee.lastName}</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-2"><strong>Email:</strong> {employee.email}</p>
      <p className="text-gray-600 dark:text-gray-300 mb-2"><strong>Phone:</strong> {employee.phone}</p>
      <p className="text-gray-600 dark:text-gray-300 mb-2"><strong>Department:</strong> {employee.department}</p>

      {/* Tab Buttons */}
      <div className="flex gap-4 mt-6 border-b dark:border-gray-700">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 px-3 font-medium ${
              activeTab === tab
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 dark:text-gray-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-6 space-y-4 text-gray-700 dark:text-gray-200">
        {activeTab === 'Overview' && (
          <>
            <div>
              <h3 className="text-lg font-semibold">Bio</h3>
              <p>{employee.bio}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Current Performance</h3>
              <p className="text-yellow-400 text-xl">{renderStars(employee.currentRating)}</p>
              <span className={`inline-block mt-2 px-3 py-1 text-sm text-white rounded ${badge.color}`}>
                {badge.label}
              </span>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Performance History</h3>
              <ul className="mt-2 space-y-1">
                {employee.history.map((entry) => (
                  <li key={entry.year}><strong>{entry.year}:</strong> {renderStars(entry.rating)}</li>
                ))}
              </ul>
            </div>
          </>
        )}

        {activeTab === 'Projects' && (
          <div>
            <h3 className="text-lg font-semibold">Projects</h3>
            <ul className="mt-2 space-y-2">
              {mockProjects.map((proj, index) => (
                <li key={index}>
                  <strong>{proj.name}</strong> — {proj.role} ({proj.duration})
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'Feedback' && (
          <div>
            <h3 className="text-lg font-semibold">Feedback</h3>
            <ul className="mt-2 space-y-2">
              {mockFeedback.map((item, index) => (
                <li key={index}>
                  <strong>{item.from}:</strong> {item.comment}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
