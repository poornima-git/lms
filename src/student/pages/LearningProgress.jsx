
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import {
  FaBookOpen,
  FaCheckCircle,
  FaTrophy
} from 'react-icons/fa'

import {
  getMyCoursesAPI,
  getMyProgressAPI,
  getCourseLessonsAPI
} from '../../services/allAPI'

function LearningProgress() {

  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Load actual student progress
  const loadProgress = async () => {

    setLoading(true)
    setError('')

    try {

      const [coursesResponse, progressResponse] = await Promise.all([
        getMyCoursesAPI(),
        getMyProgressAPI()
      ])

      if (coursesResponse?.response) {
        setError(
          coursesResponse.response.data?.message ||
          'Unable to load enrolled courses.'
        )
        return
      }

      if (progressResponse?.response) {
        setError(
          progressResponse.response.data?.message ||
          'Unable to load learning progress.'
        )
        return
      }

      const enrollments = coursesResponse?.data || []
      const progressList = progressResponse?.data || []

      const courseDetails = await Promise.all(

        enrollments.map(async (enrollment) => {

          const course = enrollment.course

          if (!course) return null

          // Find progress belonging to this course
          const courseProgress = progressList.find((item) => {

            const progressCourseId =
              item.course?._id || item.course

            return String(progressCourseId) === String(course._id)

          })

          const completedLessons =
            courseProgress?.completedLessons || []

          const completedLessonIds = completedLessons.map(
            lesson => String(lesson?._id || lesson)
          )

          // Get published lessons for this course
          let lessons = []

          try {

            const lessonsResponse = await getCourseLessonsAPI(course._id)

            if (!lessonsResponse?.response) {
              lessons = lessonsResponse?.data || []
            }

          } catch (err) {
            console.log('Unable to load lessons:', err)
          }

          // Find next incomplete lesson
          const nextLesson = lessons.find((lesson) => {

            return !completedLessonIds.includes(String(lesson._id))

          })

          const completedCount = completedLessons.length

          const totalLessons =
            courseProgress?.totalLessons || lessons.length

          const progress = Number(
            courseProgress?.progressPercentage || 0
          )

          return {

            id: course._id,
            title: course.title,
            completedLessons: completedCount,
            totalLessons,
            progress,
            lessonId: nextLesson?._id || null,
            completedLessonNames: completedLessons.filter(
              lesson => lesson && lesson.title
            )

          }

        })

      )

      setCourses(courseDetails.filter(Boolean))

    } catch (err) {

      console.log(err)
      setError('Something went wrong while loading your progress.')

    } finally {

      setLoading(false)

    }

  }

  useEffect(() => {
    loadProgress()
  }, [])

  // Calculate progress statistics
  const coursesInProgress = courses.filter(
    course => course.progress < 100
  ).length

  const coursesCompleted = courses.filter(
    course => course.progress >= 100
  ).length

  const lessonsCompleted = courses.reduce(
    (total, course) => total + course.completedLessons,
    0
  )

  // Get completed lesson details
  const completedActivities = courses.flatMap(course =>

    course.completedLessonNames.map(lesson => ({
      id: `${course.id}-${lesson._id}`,
      title: lesson.title,
      course: course.title
    }))

  )

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-50 px-5 md:px-16 py-10">

        <h1 className="text-3xl font-extrabold text-deep">
          My Learning Progress
        </h1>

        <p className="text-gray-500 mt-2">
          Review your learning activity and achievements.
        </p>

        {loading ? (

          <div className="text-center py-20 text-gray-500">
            Loading your learning progress...
          </div>

        ) : error ? (

          <div className="bg-red-50 text-red-600 rounded-xl p-5 mt-9 text-center">
            {error}

            <button
              onClick={loadProgress}
              className="block mx-auto mt-4 underline"
            >
              Try Again
            </button>
          </div>

        ) : (

          <>

            {/* Progress Statistics */}
            <div className="grid sm:grid-cols-3 gap-5 mt-8">

              <div className="bg-white p-6 rounded-xl shadow-sm">

                <FaBookOpen className="text-primary text-2xl" />

                <p className="text-gray-500 mt-4">
                  Courses in Progress
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {coursesInProgress}
                </h2>

              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">

                <FaCheckCircle className="text-green-600 text-2xl" />

                <p className="text-gray-500 mt-4">
                  Lessons Completed
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {lessonsCompleted}
                </h2>

              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">

                <FaTrophy className="text-secondary text-2xl" />

                <p className="text-gray-500 mt-4">
                  Courses Completed
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {coursesCompleted}
                </h2>

              </div>

            </div>

            {/* Course Completion */}
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm mt-8">

              <h2 className="text-2xl font-bold">
                Course Completion
              </h2>

              {courses.length > 0 ? (

                courses.map((course, index) => (

                  <div key={course.id} className="mt-8">

                    <div className="flex justify-between gap-4">

                      <div>

                        <h3 className="font-bold">
                          {course.title}
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                          {course.completedLessons} of {course.totalLessons} lessons completed
                        </p>

                      </div>

                      <span className={`font-bold ${
                        course.progress >= 100
                          ? 'text-green-600'
                          : 'text-primary'
                      }`}>
                        {course.progress}%
                      </span>

                    </div>

                    <div className="bg-gray-200 h-3 rounded-full mt-3 overflow-hidden">

                      <div
                        className={`${
                          course.progress >= 100
                            ? 'bg-green-600'
                            : index % 2 === 0
                              ? 'bg-primary'
                              : 'bg-secondary'
                        } h-3 rounded-full`}
                        style={{
                          width: `${Math.min(course.progress, 100)}%`
                        }}
                      ></div>

                    </div>

                    {course.progress >= 100 ? (

                      <Link
                        to="/student/certificates"
                        className="inline-block text-primary font-semibold mt-3"
                      >
                        View certificate →
                      </Link>

                    ) : course.lessonId ? (

                      <Link
                        to={`/student/lessons/${course.lessonId}`}
                        className="inline-block text-primary font-semibold mt-3"
                      >
                        Continue course →
                      </Link>

                    ) : (

                      <Link
                        to={`/courses/${course.id}`}
                        className="inline-block text-primary font-semibold mt-3"
                      >
                        View course →
                      </Link>

                    )}

                  </div>

                ))

              ) : (

                <p className="text-gray-500 text-center py-10">
                  You haven't enrolled in any courses yet.
                </p>

              )}

            </div>

            {/* Completed Lessons */}
            <div className="bg-white rounded-xl shadow-sm p-6 mt-8">

              <h2 className="text-xl font-bold">
                Completed Lessons
              </h2>

              {completedActivities.length > 0 ? (

                completedActivities.slice(0, 8).map(activity => (

                  <div
                    key={activity.id}
                    className="border-b last:border-b-0 py-4"
                  >

                    <p className="font-semibold">
                      <FaCheckCircle className="inline text-green-600 mr-2" />
                      {activity.title}
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      {activity.course}
                    </p>

                  </div>

                ))

              ) : (

                <p className="text-gray-500 text-center py-8">
                  No completed lessons yet. Start learning to track your progress!
                </p>

              )}

            </div>

          </>

        )}

      </div>

      <Footer />
    </>
  )
}

export default LearningProgress
