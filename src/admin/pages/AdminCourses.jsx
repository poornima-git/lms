
import React, { useEffect, useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'

import {
  getAdminCoursesAPI,
  updateAdminCourseStatusAPI
} from '../../services/allAPI'

function AdminCourses() {

  const [courses, setCourses] = useState([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [actionLoading, setActionLoading] = useState(false)

  const [searchKey, setSearchKey] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [selectedCourse, setSelectedCourse] = useState(null)

  // Load all courses
  const getCourses = async () => {
    try {
      setLoading(true)
      setError('')

      const response = await getAdminCoursesAPI()

      if (response?.response) {
        setError(
          response.response.data?.message ||
          'Failed to load courses.'
        )
        return
      }

      setCourses(
        Array.isArray(response.data) ? response.data : []
      )

    } catch (error) {
      console.error('Get admin courses error:', error)

      setError(
        error.response?.data?.message ||
        'Failed to load courses. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getCourses()
  }, [])

  // Calculate statistics
  const totalCourses = courses.length

  const publishedCourses = courses.filter(
    course => course.status === 'published'
  ).length

  const pendingCourses = courses.filter(
    course => course.status === 'pending'
  ).length

  // Search and filter courses
  const filteredCourses = courses.filter(course => {

    const instructorName =
      course.instructor?.username || ''

    const category =
      course.category || ''

    const matchesSearch =
      (course.title || '').toLowerCase().includes(searchKey.toLowerCase()) ||
      instructorName.toLowerCase().includes(searchKey.toLowerCase()) ||
      category.toLowerCase().includes(searchKey.toLowerCase())

    const matchesStatus =
      statusFilter === 'All' || course.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Update course status
  const handleStatusChange = async (courseId, status) => {

    if (status === 'rejected') {
      const confirmReject = window.confirm(
        'Are you sure you want to reject this course?'
      )

      if (!confirmReject) return
    }

    try {
      setActionLoading(true)

      const response = await updateAdminCourseStatusAPI(
        courseId,
        status
      )

      if (response?.response) {
        alert(
          response.response.data?.message ||
          'Failed to update course status.'
        )
        return
      }

      alert(
        status === 'published'
          ? 'Course approved successfully.'
          : 'Course rejected successfully.'
      )

      await getCourses()
      setSelectedCourse(null)

    } catch (error) {
      console.error('Update course status error:', error)

      alert(
        error.response?.data?.message ||
        'Failed to update course status.'
      )
    } finally {
      setActionLoading(false)
    }
  }

  const getStatusStyle = (status) => {
    if (status === 'published') {
      return 'bg-green-100 text-green-700'
    }

    if (status === 'pending') {
      return 'bg-yellow-100 text-yellow-700'
    }

    if (status === 'rejected') {
      return 'bg-red-100 text-red-700'
    }

    return 'bg-gray-100 text-gray-700'
  }

  return (
    <div>
      <AdminHeader />

      <div className="flex">
        <AdminSidebar />

        <main className="min-w-0 flex-1 p-8">

          {/* Page Heading */}
          <h1 className="text-3xl font-bold text-navy">
            Manage Courses
          </h1>

          <p className="mt-2 text-gray-500">
            Review courses submitted by instructors and monitor publication status.
          </p>

          {/* Statistics */}
          <div className="mt-8 grid gap-5 sm:grid-cols-3">

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <p className="text-gray-500">All Courses</p>
              <h2 className="mt-2 text-3xl font-bold text-primary">
                {totalCourses}
              </h2>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <p className="text-gray-500">Published</p>
              <h2 className="mt-2 text-3xl font-bold text-green-600">
                {publishedCourses}
              </h2>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <p className="text-gray-500">Pending Review</p>
              <h2 className="mt-2 text-3xl font-bold text-yellow-600">
                {pendingCourses}
              </h2>
            </div>

          </div>

          {/* Search and Filter */}
          <div className="mt-8 flex flex-wrap gap-4">

            <input
              type="text"
              placeholder="Search course, instructor or category..."
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              className="min-w-[220px] flex-1 rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-primary"
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg border border-gray-300 px-4 py-3 outline-none"
            >
              <option value="All">All Status</option>
              <option value="published">Published</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
              <option value="draft">Draft</option>
            </select>

            <button
              type="button"
              onClick={() => {
                setSearchKey('')
                setStatusFilter('All')
              }}
              className="rounded-lg border border-primary px-4 py-3 font-semibold text-primary hover:bg-blue-50"
            >
              Clear Filters
            </button>

          </div>

          {/* Courses Table */}
          <div className="mt-8 overflow-x-auto rounded-xl bg-white shadow-sm">

            {loading ? (
              <p className="p-8 text-center text-gray-500">
                Loading courses...
              </p>
            ) : error ? (
              <div className="p-8 text-center">
                <p className="text-red-500">{error}</p>

                <button
                  type="button"
                  onClick={getCourses}
                  className="mt-3 font-semibold text-primary hover:underline"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <table className="w-full min-w-[850px] text-left">

                <thead className="bg-blue-50 text-deep-blue">
                  <tr>
                    <th className="p-4">Course</th>
                    <th className="p-4">Instructor</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>

                <tbody>

                  {filteredCourses.length > 0 ? (
                    filteredCourses.map(course => (

                      <tr key={course._id} className="border-b">

                        <td className="p-4 font-semibold">
                          {course.title}
                        </td>

                        <td className="p-4">
                          {course.instructor?.username || 'Unknown'}
                        </td>

                        <td className="p-4">
                          {course.category || 'Not specified'}
                        </td>

                        <td className="p-4">
                          <span className={`rounded-full px-3 py-1 text-sm capitalize ${getStatusStyle(course.status)}`}>
                            {course.status}
                          </span>
                        </td>

                        <td className="p-4">
                          <div className="flex flex-wrap gap-3">

                            <button
                              type="button"
                              onClick={() => setSelectedCourse(course)}
                              className="font-semibold text-primary"
                            >
                              View
                            </button>

                            {course.status === 'pending' && (
                              <>
                                <button
                                  type="button"
                                  disabled={actionLoading}
                                  onClick={() =>
                                    handleStatusChange(course._id, 'published')
                                  }
                                  className="font-semibold text-green-600 disabled:opacity-50"
                                >
                                  Approve
                                </button>

                                <button
                                  type="button"
                                  disabled={actionLoading}
                                  onClick={() =>
                                    handleStatusChange(course._id, 'rejected')
                                  }
                                  className="font-semibold text-red-500 disabled:opacity-50"
                                >
                                  Reject
                                </button>
                              </>
                            )}

                          </div>
                        </td>

                      </tr>

                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="p-8 text-center text-gray-500"
                      >
                        No courses found.
                      </td>
                    </tr>
                  )}

                </tbody>

              </table>
            )}

          </div>

          <p className="mt-4 text-sm text-gray-500">
            Showing {filteredCourses.length} of {totalCourses} courses
          </p>

          {/* Selected Course Details */}
          {selectedCourse && (
            <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">

              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-navy">
                  Course Details
                </h2>

                <button
                  type="button"
                  onClick={() => setSelectedCourse(null)}
                  className="font-semibold text-red-500"
                >
                  Close
                </button>
              </div>

              <div className="mt-5 space-y-3 text-gray-600">

                <p>
                  <strong>Course:</strong> {selectedCourse.title}
                </p>

                <p>
                  <strong>Instructor:</strong> {
                    selectedCourse.instructor?.username || 'Unknown'
                  }
                </p>

                <p>
                  <strong>Category:</strong> {
                    selectedCourse.category || 'Not specified'
                  }
                </p>

                <p>
                  <strong>Description:</strong> {
                    selectedCourse.description || 'No description available'
                  }
                </p>

                <p>
                  <strong>Level:</strong> {
                    selectedCourse.level || 'Not specified'
                  }
                </p>

                <p>
                  <strong>Status:</strong>
                  <span className="ml-2 capitalize">
                    {selectedCourse.status}
                  </span>
                </p>

              </div>

              {selectedCourse.status === 'pending' && (
                <div className="mt-5 flex flex-wrap gap-3">

                  <button
                    type="button"
                    disabled={actionLoading}
                    onClick={() =>
                      handleStatusChange(selectedCourse._id, 'published')
                    }
                    className="rounded-lg bg-green-600 px-5 py-2 font-semibold text-white hover:bg-green-700 disabled:opacity-50"
                  >
                    Approve Course
                  </button>

                  <button
                    type="button"
                    disabled={actionLoading}
                    onClick={() =>
                      handleStatusChange(selectedCourse._id, 'rejected')
                    }
                    className="rounded-lg bg-red-500 px-5 py-2 font-semibold text-white hover:bg-red-600 disabled:opacity-50"
                  >
                    Reject Course
                  </button>

                </div>
              )}

            </div>
          )}

        </main>
      </div>
    </div>
  )
}

export default AdminCourses
