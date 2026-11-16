
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

import {
  FaBookOpen,
  FaGraduationCap,
  FaClock,
  FaTrophy
} from 'react-icons/fa'

import axiosInstance from '../../api/axiosInstance'

import {
  getUserProfileAPI,
  getMyCoursesAPI,
  getMyProgressAPI,
  getMyCertificatesAPI,
  getCourseQuizzesAPI
} from '../../services/allAPI'

function StudentDashboard() {

  // State
  const [student, setStudent] = useState(null)
  const [courses, setCourses] = useState([])
  const [certificates, setCertificates] = useState([])
  const [upcomingQuiz, setUpcomingQuiz] = useState(null)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Get image URL
  const getImageUrl = (image) => {

    if (!image) return ''

    if (image.startsWith('http')) {
      return image
    }

    const imagePath = image
      .replace(/\\/g, '/')
      .replace('./', '/')

    return `${axiosInstance.defaults.baseURL}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`
  }

  // Load dashboard data
  const loadDashboardData = async () => {

    try {

      setLoading(true)
      setError('')

      // Call backend APIs
      const [
        profileResponse,
        coursesResponse,
        progressResponse,
        certificatesResponse
      ] = await Promise.all([
        getUserProfileAPI(),
        getMyCoursesAPI(),
        getMyProgressAPI(),
        getMyCertificatesAPI()
      ])

      // Check API errors
      const responses = [
        profileResponse,
        coursesResponse,
        progressResponse,
        certificatesResponse
      ]

      const failedResponse = responses.find(
        response => response?.response
      )

      if (failedResponse) {
        throw new Error(
          failedResponse.response.data?.message ||
          'Unable to load dashboard data.'
        )
      }

      // Extract response data
      const profile = profileResponse?.data
      const enrolledData = coursesResponse?.data || []
      const progressData = progressResponse?.data || []
      const certificateData = certificatesResponse?.data || []

      setStudent(profile)
      setCertificates(
        Array.isArray(certificateData) ? certificateData : []
      )

      // Match enrollment courses with progress
      const formattedCourses = enrolledData.map(enrollment => {

        const course = enrollment.course

        if (!course) return null

        const courseProgress = progressData.find(progress => {

          const progressCourseId =
            progress.course?._id || progress.course

          return String(progressCourseId) === String(course._id)

        })

        const completedLessons =
          courseProgress?.completedLessons?.length || 0

        const totalLessons =
          courseProgress?.totalLessons || 0

        const progressPercentage =
          courseProgress?.progressPercentage || 0

        return {

          id: course._id,

          title: course.title,

          category: course.category,

          instructor:
            course.instructor?.username || 'Instructor',

          progress: progressPercentage,

          completedLessons,

          totalLessons,

          image: getImageUrl(course.image),

          status: enrollment.status,

          color: progressPercentage === 100
            ? 'bg-green-600'
            : 'bg-primary'

        }

      }).filter(Boolean)

      setCourses(formattedCourses)

      // Find the first available quiz from enrolled courses
      let foundQuiz = null

      for (const course of formattedCourses) {

        try {

          const quizResponse = await getCourseQuizzesAPI(course.id)

          if (!quizResponse?.response) {

            const quizzes = quizResponse?.data || []

            if (Array.isArray(quizzes) && quizzes.length > 0) {

              foundQuiz = {
                ...quizzes[0],
                courseTitle: course.title
              }

              break

            }

          }

        }
        catch (quizError) {

          console.log('Quiz loading error:', quizError)

        }

      }

      setUpcomingQuiz(foundQuiz)

    }
    catch (err) {

      console.log('Dashboard Error:', err)

      setError(
        err.response?.data?.message ||
        err.message ||
        'Unable to load dashboard data.'
      )

    }
    finally {

      setLoading(false)

    }

  }

  // Load dashboard when component mounts
  useEffect(() => {

    loadDashboardData()

  }, [])

  // Dashboard statistics
  const enrolledCourses = courses.length

  const completedCourses = courses.filter(
    course => course.progress >= 100
  ).length

  const completedLessons = courses.reduce(
    (total, course) => total + course.completedLessons,
    0
  )

  const certificateCount = certificates.length

  // Ongoing courses
  const ongoingCourses = courses.filter(
    course => course.progress < 100
  )

  // Overall progress
  const overallProgress = enrolledCourses > 0
    ? Math.round(
        courses.reduce(
          (total, course) => total + course.progress,
          0
        ) / enrolledCourses
      )
    : 0

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-50 px-5 md:px-16 py-10">

        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row justify-between gap-5">

          <div>

            <p className="text-primary font-semibold">
              STUDENT DASHBOARD
            </p>

            <h1 className="text-3xl font-extrabold text-deep mt-2">
              Welcome back, {student?.username || 'Student'}!
            </h1>

            <p className="text-gray-500 mt-2">
              Continue learning and achieve your goals.
            </p>

          </div>

          <Link
            to="/courses"
            className="bg-primary text-white px-5 py-3 rounded-lg h-fit text-center"
          >
            Explore Courses
          </Link>

        </div>

        {/* Loading */}
        {loading && (

          <div className="bg-white p-8 rounded-xl mt-8 text-center">

            <p className="text-primary font-semibold">
              Loading your dashboard...
            </p>

          </div>

        )}

        {/* Error */}
        {!loading && error && (

          <div className="bg-red-50 text-red-600 p-5 rounded-xl mt-8">

            <p>{error}</p>

            <button
              onClick={loadDashboardData}
              className="mt-3 bg-primary text-white px-4 py-2 rounded-lg"
            >
              Try Again
            </button>

          </div>

        )}

        {!loading && !error && (

          <>

            {/* Dashboard Statistics */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">

              <div className="bg-white p-6 rounded-xl shadow-sm">

                <FaBookOpen className="text-primary text-2xl" />

                <p className="text-gray-500 mt-4">
                  Enrolled Courses
                </p>

                <h2 className="text-3xl font-bold mt-1">
                  {enrolledCourses}
                </h2>

              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">

                <FaGraduationCap className="text-secondary text-2xl" />

                <p className="text-gray-500 mt-4">
                  Completed Courses
                </p>

                <h2 className="text-3xl font-bold mt-1">
                  {completedCourses}
                </h2>

              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">

                <FaClock className="text-primary text-2xl" />

                <p className="text-gray-500 mt-4">
                  Completed Lessons
                </p>

                <h2 className="text-3xl font-bold mt-1">
                  {completedLessons}
                </h2>

              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">

                <FaTrophy className="text-yellow-500 text-2xl" />

                <p className="text-gray-500 mt-4">
                  Certificates
                </p>

                <h2 className="text-3xl font-bold mt-1">
                  {certificateCount}
                </h2>

              </div>

            </div>

            {/* Main Dashboard Content */}
            <div className="grid lg:grid-cols-3 gap-8 mt-10">

              {/* Continue Learning */}
              <div className="lg:col-span-2">

                <h2 className="text-2xl font-bold text-deep">
                  Continue Learning
                </h2>

                {ongoingCourses.length > 0 ? (

                  ongoingCourses.map(course => (

                    <div
                      key={course.id}
                      className="bg-white rounded-xl p-5 mt-5 shadow-sm md:flex gap-5"
                    >

                      {course.image ? (

                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-full md:w-48 h-40 object-cover rounded-lg"
                        />

                      ) : (

                        <div className="w-full md:w-48 h-40 bg-lavender rounded-lg flex items-center justify-center">

                          <FaBookOpen className="text-5xl text-secondary" />

                        </div>

                      )}

                      <div className="flex-1 mt-4 md:mt-0">

                        <span className="text-xs bg-blue-100 text-primary px-3 py-1 rounded-full">
                          {course.category}
                        </span>

                        <h3 className="text-xl font-bold mt-3">
                          {course.title}
                        </h3>

                        <p className="text-sm text-gray-500 mt-2">
                          Instructor: {course.instructor}
                        </p>

                        <div className="bg-gray-200 h-2 rounded-full mt-4 overflow-hidden">

                          <div
                            className={`${course.color} h-2 rounded-full`}
                            style={{
                              width: `${course.progress}%`
                            }}
                          ></div>

                        </div>

                        <p className="text-sm text-gray-500 mt-2">

                          {course.progress}% completed

                          <span className="ml-2">
                            ({course.completedLessons} / {course.totalLessons} lessons)
                          </span>

                        </p>

                        <Link
                          to={`/courses/${course.id}`}
                          className="inline-block bg-primary text-white px-4 py-2 rounded-lg mt-4"
                        >
                          Continue Learning
                        </Link>

                      </div>

                    </div>

                  ))

                ) : (

                  <div className="bg-white rounded-xl p-8 mt-5 text-center">

                    <p className="text-gray-500">
                      {courses.length > 0
                        ? 'You have completed all your enrolled courses!'
                        : 'You have not enrolled in any courses yet.'}
                    </p>

                    <Link
                      to="/courses"
                      className="inline-block bg-primary text-white px-5 py-2 rounded-lg mt-4"
                    >
                      Explore Courses
                    </Link>

                  </div>

                )}

              </div>

              {/* Upcoming Activities */}
              <div>

                <h2 className="text-2xl font-bold text-deep">
                  Upcoming Activities
                </h2>

                {/* Quiz */}
                <div className="bg-white rounded-xl p-5 mt-5 shadow-sm">

                  <p className="text-sm text-primary font-semibold">
                    AVAILABLE QUIZ
                  </p>

                  {upcomingQuiz ? (

                    <>

                      <h3 className="font-bold mt-2">
                        {upcomingQuiz.title}
                      </h3>

                      <p className="text-sm text-gray-500 mt-2">
                        {upcomingQuiz.courseTitle}
                      </p>

                      <Link
                        to={`/student/quizzes/${upcomingQuiz._id}`}
                        className="text-primary font-semibold text-sm inline-block mt-4"
                      >
                        Take Quiz →
                      </Link>

                    </>

                  ) : (

                    <p className="text-sm text-gray-500 mt-3">
                      No published quizzes are currently available.
                    </p>

                  )}

                </div>

                {/* Overall Course Progress */}
                <div className="bg-white rounded-xl p-5 mt-5 shadow-sm">

                  <p className="text-sm text-secondary font-semibold">
                    COURSE PROGRESS
                  </p>

                  <h3 className="font-bold mt-2">
                    Overall Learning Progress
                  </h3>

                  <p className="text-sm text-gray-500 mt-2">
                    {overallProgress}% of your enrolled courses completed on average.
                  </p>

                  <div className="bg-gray-200 h-2 rounded-full mt-4 overflow-hidden">

                    <div
                      className="bg-secondary h-2 rounded-full"
                      style={{
                        width: `${overallProgress}%`
                      }}
                    ></div>

                  </div>

                  <p className="text-sm text-gray-500 mt-2">
                    {overallProgress}% completed
                  </p>

                </div>

                {/* Certificates */}
                <Link
                  to="/student/certificates"
                  className="block bg-deep text-white p-5 rounded-xl mt-5"
                >

                  <FaTrophy className="text-2xl text-yellow-400" />

                  <h3 className="font-bold mt-3">
                    My Certificates
                  </h3>

                  <p className="text-sm text-gray-300 mt-1">
                    View your achievements.
                  </p>

                </Link>

                {/* Learning Progress */}
                <Link
                  to="/student/progress"
                  className="block bg-white shadow-sm p-5 rounded-xl mt-5"
                >

                  <FaBookOpen className="text-2xl text-primary" />

                  <h3 className="font-bold mt-3 text-deep">
                    My Learning Progress
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Track your course completion.
                  </p>

                </Link>

              </div>

            </div>

          </>

        )}

      </div>

      <Footer />
    </>
  )
}

export default StudentDashboard
