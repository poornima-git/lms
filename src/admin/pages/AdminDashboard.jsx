
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  getAdminDashboardAPI,
  getAllUsersAPI,
  getAdminCoursesAPI
} from '../../services/allAPI'

import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'

function AdminDashboard() {
  const [dashboard, setDashboard] = useState({})
  const [users, setUsers] = useState([])
  const [courses, setCourses] = useState([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Load dashboard information
  const getDashboardData = async () => {
    try {
      setLoading(true)
      setError('')

      const [dashboardResponse, usersResponse, coursesResponse] =
        await Promise.all([
          getAdminDashboardAPI(),
          getAllUsersAPI(),
          getAdminCoursesAPI()
        ])

      if (
        dashboardResponse?.response ||
        usersResponse?.response ||
        coursesResponse?.response
      ) {
        setError('Failed to load admin dashboard information.')
        return
      }

      setDashboard(dashboardResponse.data || {})

      setUsers(Array.isArray(usersResponse.data)
        ? usersResponse.data
        : [])

      setCourses(Array.isArray(coursesResponse.data)
        ? coursesResponse.data
        : [])

    } catch (error) {
      console.error('Admin dashboard error:', error)

      setError(
        error.response?.data?.message ||
        'Failed to load dashboard. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getDashboardData()
  }, [])

  // Dashboard statistics
  const totalUsers = dashboard.totalUsers ?? users.length

  const totalCourses = dashboard.totalCourses ?? courses.length

  const certificatesIssued =
    dashboard.totalCertificates ??
    dashboard.certificatesIssued ??
    0

  // Find pending courses
  const pendingCourses = courses.filter(
    course => course.status === 'pending'
  )

  const totalPendingCourses = dashboard.pendingCourses ??
    pendingCourses.length

  // Recent users
  const recentUsers = [...users]
    .sort((a, b) => {
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
    })
    .slice(0, 3)

  const dashboardStats = [
    {
      title: 'Total Users',
      value: totalUsers,
      description: 'Students and instructors',
      color: 'text-primary'
    },
    {
      title: 'Total Courses',
      value: totalCourses,
      description: 'Across all categories',
      color: 'text-primary'
    },
    {
      title: 'Pending Approvals',
      value: totalPendingCourses,
      description: 'Courses awaiting review',
      color: 'text-yellow-600'
    },
    {
      title: 'Certificates Issued',
      value: certificatesIssued,
      description: 'Successful completions',
      color: 'text-green-600'
    }
  ]

  return (
    <div>
      <AdminHeader />

      <div className="flex">
        <AdminSidebar />

        <main className="min-w-0 flex-1 bg-gray-50 p-8">
          <h1 className="text-3xl font-bold text-navy">
            Admin Dashboard
          </h1>

          <p className="mt-2 text-gray-500">
            Overview of your learning management platform.
          </p>

          {loading ? (
            <div className="mt-8 rounded-xl bg-white p-8 text-center shadow-sm">
              <p className="text-gray-500">
                Loading dashboard...
              </p>
            </div>
          ) : error ? (
            <div className="mt-8 rounded-xl bg-white p-8 text-center shadow-sm">
              <p className="text-red-500">{error}</p>

              <button
                onClick={getDashboardData}
                className="mt-3 font-semibold text-primary hover:underline"
              >
                Try Again
              </button>
            </div>
          ) : (
            <>
              {/* Dashboard Statistics */}
              <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {dashboardStats.map((stat, index) => (
                  <div
                    key={index}
                    className="rounded-xl bg-white p-6 shadow-sm"
                  >
                    <p className="text-sm text-gray-500">
                      {stat.title}
                    </p>

                    <h2 className={`mt-3 text-3xl font-bold ${stat.color}`}>
                      {stat.value}
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                      {stat.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Recent Users and Pending Courses */}
              <div className="mt-8 grid gap-6 lg:grid-cols-2">

                {/* Recent Users */}
                <section className="rounded-xl bg-white p-6 shadow-sm">
                  <h2 className="text-xl font-bold text-navy">
                    Recent Users
                  </h2>

                  <div className="mt-5 space-y-4">
                    {recentUsers.map(user => (
                      <div
                        key={user._id}
                        className="flex items-center justify-between gap-3 border-b pb-4 last:border-0 last:pb-0"
                      >
                        <div>
                          <p className="font-semibold">
                            {user.username}
                          </p>

                          <p className="text-sm text-gray-500 capitalize">
                            {user.role}
                          </p>
                        </div>

                        <span
                          className={`rounded-full px-3 py-1 text-sm ${
                            user.status === 'active'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {user.status}
                        </span>
                      </div>
                    ))}

                    {recentUsers.length === 0 && (
                      <p className="text-gray-500">
                        No users available.
                      </p>
                    )}
                  </div>

                  <Link
                    to="/admin/users"
                    className="mt-5 inline-block font-semibold text-primary hover:underline"
                  >
                    View all users →
                  </Link>
                </section>

                {/* Pending Courses */}
                <section className="rounded-xl bg-white p-6 shadow-sm">
                  <h2 className="text-xl font-bold text-navy">
                    Pending Courses
                  </h2>

                  <div className="mt-5 space-y-4">
                    {pendingCourses.slice(0, 3).map(course => (
                      <div
                        key={course._id}
                        className="border-b pb-4 last:border-0 last:pb-0"
                      >
                        <p className="font-semibold">
                          {course.title}
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                          Instructor: {
                            course.instructor?.username || 'Unknown'
                          }
                        </p>

                        <span className="mt-2 inline-block rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
                          Awaiting Approval
                        </span>
                      </div>
                    ))}

                    {pendingCourses.length === 0 && (
                      <p className="text-gray-500">
                        No courses are waiting for approval.
                      </p>
                    )}
                  </div>

                  <Link
                    to="/admin/courses"
                    className="mt-5 inline-block font-semibold text-primary hover:underline"
                  >
                    Review courses →
                  </Link>
                </section>

              </div>
            </>
          )}
        </main>
      </div>
    </div>
  )
}

export default AdminDashboard
