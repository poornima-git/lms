
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import InstructorHeader from '../components/InstructorHeader'
import InstructorSidebar from '../components/InstructorSidebar'

import {
  getInstructorCoursesAPI,
  getCourseLessonsAPI
} from '../../services/allAPI'

function InstructorCourses() {

  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadCourses()
  }, [])

  const loadCourses = async () => {
    setLoading(true)
    setError('')

    const response = await getInstructorCoursesAPI()

    if (response?.response) {
      setError(
        response.response.data?.message ||
        'Unable to load courses.'
      )
      setLoading(false)
      return
    }

    const courseData = response?.data || []

    // Fetch lesson counts for each course
    const coursesWithLessons = await Promise.all(
      courseData.map(async (course) => {

        const lessonResponse = await getCourseLessonsAPI(course._id)

        const lessons = lessonResponse?.response
          ? []
          : lessonResponse?.data || []

        return {
          ...course,
          lessons: lessons.length
        }
      })
    )

    setCourses(coursesWithLessons)
    setLoading(false)
  }

  const totalCourses = courses.length

  const publishedCourses = courses.filter(
    course => course.status === 'published'
  ).length

  const draftCourses = courses.filter(
    course => course.status === 'draft'
  ).length

  return (
    <div>

      {/* Header */}
      <InstructorHeader />

      <div className="flex">

        {/* Sidebar */}
        <InstructorSidebar />

        {/* Main Content */}
        <main className="min-w-0 flex-1 bg-[#F5F8FC] p-5 md:p-8">

          {/* Page Heading */}
          <div className="flex flex-wrap items-center justify-between gap-4">

            <div>
              <h1 className="text-3xl font-bold text-navy">
                My Courses
              </h1>

              <p className="mt-2 text-gray-500">
                View and manage your courses.
              </p>
            </div>

            <Link
              to="/instructor/create-course"
              className="rounded-lg bg-primary px-5 py-3 font-semibold text-white hover:bg-deep-blue"
            >
              + Create Course
            </Link>

          </div>

          {loading ? (

            <div className="mt-10 text-center">
              <p className="text-primary font-semibold">
                Loading courses...
              </p>
            </div>

          ) : error ? (

            <div className="mt-8 bg-white rounded-xl p-6 text-center">

              <p className="text-red-500">
                {error}
              </p>

              <button
                onClick={loadCourses}
                className="mt-4 bg-primary text-white px-5 py-2 rounded-lg"
              >
                Try Again
              </button>

            </div>

          ) : (

            <>

              {/* Course Statistics */}
              <div className="mt-6 grid gap-4 sm:grid-cols-3">

                <div className="rounded-xl bg-white p-5 shadow-sm">
                  <p className="text-sm text-gray-500">
                    Total Courses
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-primary">
                    {totalCourses}
                  </h2>
                </div>

                <div className="rounded-xl bg-white p-5 shadow-sm">
                  <p className="text-sm text-gray-500">
                    Published Courses
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-green-600">
                    {publishedCourses}
                  </h2>
                </div>

                <div className="rounded-xl bg-white p-5 shadow-sm">
                  <p className="text-sm text-gray-500">
                    Draft Courses
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-yellow-600">
                    {draftCourses}
                  </h2>
                </div>

              </div>

              {/* Courses Table */}
              <div className="mt-8 overflow-x-auto rounded-xl bg-white shadow-sm">

                <table className="w-full min-w-[750px] text-left">

                  <thead className="bg-blue-50 text-deep-blue">
                    <tr>
                      <th className="p-4">Course</th>
                      <th className="p-4">Students</th>
                      <th className="p-4">Lessons</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Action</th>
                    </tr>
                  </thead>

                  <tbody>

                    {courses.map((course) => (

                      <tr key={course._id} className="border-b last:border-b-0">

                        <td className="p-4 font-semibold">
                          {course.title}
                        </td>

                        <td className="p-4">
                          {course.studentCount || 0}
                        </td>

                        <td className="p-4">
                          {course.lessons}
                        </td>

                        <td className="p-4">

                          <span
                            className={`rounded-full px-3 py-1 text-sm capitalize ${
                              course.status === 'published'
                                ? 'bg-green-100 text-green-700'
                                : course.status === 'draft'
                                  ? 'bg-yellow-100 text-yellow-700'
                                  : 'bg-blue-100 text-blue-700'
                            }`}
                          >
                            {course.status}
                          </span>

                        </td>

                        <td className="p-4">

                          <div className="flex items-center gap-4">

                            <Link
                              to={`/instructor/lessons?courseId=${course._id}`}
                              className="font-semibold text-primary hover:underline"
                            >
                              Manage
                            </Link>

                            <Link
                              to={`/instructor/create-course?courseId=${course._id}`}
                              className="font-semibold text-green-600 hover:underline"
                            >
                              Edit
                            </Link>

                          </div>

                        </td>

                      </tr>

                    ))}

                    {courses.length === 0 && (
                      <tr>
                        <td colSpan="5" className="p-8 text-center text-gray-500">
                          No courses found. Create your first course!
                        </td>
                      </tr>
                    )}

                  </tbody>

                </table>

              </div>

            </>

          )}

        </main>

      </div>

    </div>
  )
}

export default InstructorCourses
