
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

import axiosInstance from '../../api/axiosInstance'

import {
  getMyCoursesAPI,
  getMyProgressAPI,
  getCourseLessonsAPI
} from '../../services/allAPI'

function MyCourses() {

  const [myCourses, setMyCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Convert backend image path into a complete URL
  const getImageUrl = (image) => {

    if (!image) return ''

    if (image.startsWith('http')) {
      return image
    }

    return `${axiosInstance.defaults.baseURL}/${image.replace(/\\/g, '/').replace(/^\/+/, '')}`
  }

  // Load enrolled courses and progress
  const loadMyCourses = async () => {

    setLoading(true)
    setError('')

    try {

      const [coursesResponse, progressResponse] = await Promise.all([
        getMyCoursesAPI(),
        getMyProgressAPI()
      ])

      if (coursesResponse?.response) {
        setError(coursesResponse.response.data?.message || 'Unable to load enrolled courses.')
        return
      }

      if (progressResponse?.response) {
        setError(progressResponse.response.data?.message || 'Unable to load course progress.')
        return
      }

      const enrollments = coursesResponse?.data || []
      const progressList = progressResponse?.data || []

      // Process every enrolled course
      const courseDetails = await Promise.all(

        enrollments.map(async (enrollment) => {

          const course = enrollment.course

          if (!course) return null

          // Find progress for this course
          const courseProgress = progressList.find((item) => {

            const progressCourseId =
              item.course?._id || item.course

            return String(progressCourseId) === String(course._id)

          })

          const completedLessonIds = (
            courseProgress?.completedLessons || []
          ).map((lesson) => String(lesson?._id || lesson))

          // Get actual lessons of this course
          let lessons = []

          try {

            const lessonsResponse = await getCourseLessonsAPI(course._id)

            if (!lessonsResponse?.response) {
              lessons = lessonsResponse?.data || []
            }

          } catch (err) {
            console.log('Unable to load course lessons:', err)
          }

          // Find the first lesson that is not completed
          const nextLesson = lessons.find((lesson) => {

            return !completedLessonIds.includes(String(lesson._id))

          })

          const completedCount = completedLessonIds.length

          const totalLessons = courseProgress?.totalLessons || lessons.length

          const progress = courseProgress?.progressPercentage || 0

          return {

            id: course._id,
            title: course.title,
            instructor: course.instructor?.username || 'Instructor',
            lessons: totalLessons,
            completedLessons: completedCount,
            progress: Number(progress),
            image: getImageUrl(course.image),
            lessonId: nextLesson?._id || null

          }

        })

      )

      setMyCourses(courseDetails.filter(Boolean))

    } catch (err) {

      console.log(err)
      setError('Something went wrong while loading your courses.')

    } finally {

      setLoading(false)

    }

  }

  useEffect(() => {
    loadMyCourses()
  }, [])

  // Get course status
  const getCourseStatus = (progress) => {

    if (progress >= 100) {
      return 'Completed'
    }

    return 'In Progress'

  }

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-50 px-5 md:px-16 py-10">

        {/* Page Heading */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">

          <div>
            <h1 className="text-3xl font-extrabold text-deep">
              My Courses
            </h1>

            <p className="text-gray-500 mt-2">
              Courses you have enrolled in.
            </p>
          </div>

          <Link
            to="/courses"
            className="bg-primary text-white px-5 py-3 rounded-lg text-center h-fit"
          >
            Browse Courses
          </Link>

        </div>

        {/* Loading */}
        {loading ? (

          <div className="text-center py-20 text-gray-500">
            Loading your courses...
          </div>

        ) : error ? (

          <div className="bg-red-50 text-red-600 rounded-xl p-5 mt-9 text-center">
            {error}
            <button
              onClick={loadMyCourses}
              className="block mx-auto mt-4 underline"
            >
              Try Again
            </button>
          </div>

        ) : myCourses.length > 0 ? (

          /* Course List */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-9">

            {myCourses.map(course => (

              <div
                key={course.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >

                {course.image ? (

                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />

                ) : (

                  <div className="w-full h-48 bg-lavender flex items-center justify-center">
                    <span className="text-primary text-5xl">📚</span>
                  </div>

                )}

                <div className="p-5">

                  {/* Course Status */}
                  <span
                    className={`text-xs px-3 py-1 rounded-full ${
                      course.progress >= 100
                        ? 'bg-green-100 text-green-700'
                        : 'bg-blue-100 text-primary'
                    }`}
                  >
                    {getCourseStatus(course.progress)}
                  </span>

                  {/* Course Details */}
                  <h2 className="text-xl font-bold mt-4">
                    {course.title}
                  </h2>

                  <p className="text-sm text-gray-500 mt-2">
                    {course.instructor} · {course.lessons} lessons
                  </p>

                  {/* Progress Bar */}
                  <div className="bg-gray-200 h-2 rounded-full mt-5">

                    <div
                      className={`h-2 rounded-full ${
                        course.progress >= 100
                          ? 'bg-green-600'
                          : 'bg-primary'
                      }`}
                      style={{
                        width: `${Math.min(course.progress, 100)}%`
                      }}
                    ></div>

                  </div>

                  <p className="text-sm text-gray-500 mt-2">
                    {course.progress}% completed
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    {course.completedLessons} of {course.lessons} lessons completed
                  </p>

                  {/* Course Action */}
                  {course.progress >= 100 ? (

                    <Link
                      to="/student/certificates"
                      className="block text-center border border-primary text-primary p-3 rounded-lg mt-5"
                    >
                      View Certificate
                    </Link>

                  ) : course.lessonId ? (

                    <Link
                      to={`/student/lessons/${course.lessonId}`}
                      className="block text-center bg-primary text-white p-3 rounded-lg mt-5"
                    >
                      Resume Learning
                    </Link>

                  ) : (

                    <Link
                      to={`/courses/${course.id}`}
                      className="block text-center bg-primary text-white p-3 rounded-lg mt-5"
                    >
                      View Course
                    </Link>

                  )}

                </div>

              </div>

            ))}

          </div>

        ) : (

          /* Empty Course List */
          <div className="bg-white rounded-xl shadow-sm text-center py-16 mt-9">

            <h2 className="text-2xl font-bold text-gray-700">
              No Enrolled Courses
            </h2>

            <p className="text-gray-500 mt-3">
              You haven't enrolled in any courses yet.
            </p>

            <Link
              to="/courses"
              className="inline-block bg-primary text-white px-6 py-3 rounded-lg mt-6"
            >
              Explore Courses
            </Link>

          </div>

        )}

      </div>

      <Footer />
    </>
  )
}

export default MyCourses
