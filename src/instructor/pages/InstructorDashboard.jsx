
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import InstructorHeader from '../components/InstructorHeader'
import InstructorSidebar from '../components/InstructorSidebar'

import {
  getInstructorCoursesAPI,
  getInstructorReviewsAPI
} from '../../services/allAPI'

function InstructorDashboard() {

  const [courses, setCourses] = useState([])
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const storedUser = JSON.parse(
    sessionStorage.getItem('user') || '{}'
  )

  const instructorName = storedUser.username || 'Instructor'

  useEffect(() => {
    loadDashboard()
  }, [])

  const loadDashboard = async () => {
    setLoading(true)
    setError('')

    const [courseResponse, reviewResponse] = await Promise.all([
      getInstructorCoursesAPI(),
      getInstructorReviewsAPI()
    ])

    if (courseResponse?.response) {
      setError(
        courseResponse.response.data?.message ||
        'Unable to load instructor courses.'
      )
      setLoading(false)
      return
    }

    if (reviewResponse?.response) {
      setError(
        reviewResponse.response.data?.message ||
        'Unable to load instructor reviews.'
      )
      setLoading(false)
      return
    }

    setCourses(courseResponse?.data || [])
    setReviews(reviewResponse?.data || [])

    setLoading(false)
  }

  // Dashboard statistics
  const totalCourses = courses.length

  const totalStudents = courses.reduce(
    (total, course) => total + (course.studentCount || 0),
    0
  )

  const publishedCourses = courses.filter(
    course => course.status === 'published'
  ).length

  const averageRating = reviews.length > 0
    ? (
        reviews.reduce(
          (total, review) => total + (review.rating || 0),
          0
        ) / reviews.length
      ).toFixed(1)
    : 'N/A'

  const statistics = [
    {
      title: 'Total Courses',
      value: totalCourses,
      color: 'text-primary'
    },
    {
      title: 'Total Students',
      value: totalStudents,
      color: 'text-primary'
    },
    {
      title: 'Published Courses',
      value: publishedCourses,
      color: 'text-green-600'
    },
    {
      title: 'Average Rating',
      value: averageRating,
      color: 'text-yellow-500'
    }
  ]

  // Display the latest three courses
  const recentCourses = [...courses]
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    .slice(0, 3)

  // Quick action links
  const quickActions = [
    {
      title: '+ Create a New Course',
      path: '/instructor/create-course',
      style: 'bg-primary text-white hover:bg-deep-blue'
    },
    {
      title: 'Manage Lessons',
      path: '/instructor/lessons',
      style: 'border border-light-blue text-deep-blue hover:bg-blue-50'
    },
    {
      title: 'Manage Quizzes',
      path: '/instructor/quizzes',
      style: 'border border-light-blue text-deep-blue hover:bg-blue-50'
    },
    {
      title: 'View Students',
      path: '/instructor/students',
      style: 'border border-light-blue text-deep-blue hover:bg-blue-50'
    }
  ]

  return (
    <div>

      {/* Header */}
      <InstructorHeader />

      <div className="flex">

        {/* Sidebar */}
        <InstructorSidebar />

        {/* Main Content */}
        <main className="min-w-0 flex-1 bg-[#F5F8FC] p-5 md:p-8">

          <h1 className="text-3xl font-bold text-navy">
            Instructor Dashboard
          </h1>

          <p className="mt-2 text-gray-500">
            Welcome back, {instructorName}! Here is an overview of your teaching activity.
          </p>

          {loading ? (

            <div className="mt-10 text-center">
              <p className="text-primary font-semibold">
                Loading dashboard...
              </p>
            </div>

          ) : error ? (

            <div className="mt-8 bg-white rounded-xl p-6 text-center">
              <p className="text-red-500">
                {error}
              </p>

              <button
                onClick={loadDashboard}
                className="mt-4 bg-primary text-white px-5 py-2 rounded-lg"
              >
                Try Again
              </button>
            </div>

          ) : (

            <>

              {/* Dashboard Statistics */}
              <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

                {statistics.map((item, index) => (
                  <div
                    key={index}
                    className="rounded-xl bg-white p-6 shadow-sm"
                  >
                    <p className="text-sm text-gray-500">
                      {item.title}
                    </p>

                    <h2 className={`mt-3 text-3xl font-bold ${item.color}`}>
                      {item.value}
                    </h2>
                  </div>
                ))}

              </div>

              {/* Recent Courses and Quick Actions */}
              <div className="mt-8 grid gap-6 lg:grid-cols-2">

                {/* Recent Courses */}
                <section className="rounded-xl bg-white p-6 shadow-sm">

                  <h2 className="text-xl font-bold text-navy">
                    Recent Courses
                  </h2>

                  <div className="mt-5 space-y-4">

                    {recentCourses.length > 0 ? (

                      recentCourses.map((course) => (

                        <div
                          key={course._id}
                          className="flex items-center justify-between gap-3 border-b pb-4 last:border-b-0 last:pb-0"
                        >

                          <div className="min-w-0">
                            <h3 className="font-semibold">
                              {course.title}
                            </h3>

                            <p className="text-sm text-gray-500">
                              {course.status === 'published'
                                ? `${course.studentCount || 0} students`
                                : 'Course content in progress'}
                            </p>
                          </div>

                          <span
                            className={`shrink-0 rounded-full px-3 py-1 text-xs capitalize ${
                              course.status === 'published'
                                ? 'bg-green-100 text-green-700'
                                : course.status === 'draft'
                                  ? 'bg-gray-100 text-gray-600'
                                  : 'bg-yellow-100 text-yellow-700'
                            }`}
                          >
                            {course.status}
                          </span>

                        </div>

                      ))

                    ) : (

                      <p className="text-gray-500 text-sm py-4">
                        You haven't created any courses yet.
                      </p>

                    )}

                  </div>

                  <Link
                    to="/instructor/courses"
                    className="mt-5 inline-block font-semibold text-primary hover:underline"
                  >
                    View all courses →
                  </Link>

                </section>

                {/* Quick Actions */}
                <section className="rounded-xl bg-white p-6 shadow-sm">

                  <h2 className="text-xl font-bold text-navy">
                    Quick Actions
                  </h2>

                  <div className="mt-5 space-y-3">

                    {quickActions.map((action, index) => (
                      <Link
                        key={index}
                        to={action.path}
                        className={`block rounded-lg px-5 py-4 font-semibold ${action.style}`}
                      >
                        {action.title}
                      </Link>
                    ))}

                  </div>

                </section>

              </div>

            </>

          )}

        </main>

      </div>

    </div>
  )
}

export default InstructorDashboard
