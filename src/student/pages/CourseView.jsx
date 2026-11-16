
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Reviews from './Reviews'

import {
  FaStar,
  FaClock,
  FaBook,
  FaGraduationCap,
  FaPlayCircle,
  FaLock
} from 'react-icons/fa'

import {
  Link,
  useParams,
  useNavigate
} from 'react-router-dom'

import {
  viewCourseAPI,
  getCourseLessonsAPI,
  getCourseReviewsAPI,
  checkEnrollmentAPI,
  enrollCourseAPI
} from '../../services/allAPI'

import axiosInstance from '../../api/axiosInstance'

function CourseView() {

  const { courseId } = useParams()
  const navigate = useNavigate()

  const [course, setCourse] = useState(null)
  const [lessons, setLessons] = useState([])
  const [reviews, setReviews] = useState([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [isEnrolled, setIsEnrolled] = useState(false)
  const [checkingEnrollment, setCheckingEnrollment] = useState(false)
  const [enrolling, setEnrolling] = useState(false)
  const [enrollError, setEnrollError] = useState('')

  // Check API error
  const hasError = (response) => {
    return !response || !!response.response
  }

  // Get logged-in user
  const getLoggedUser = () => {
    try {
      return JSON.parse(sessionStorage.getItem('user') || 'null')
    } catch (err) {
      return null
    }
  }

  // Extract array data
  const getArrayData = (response, key) => {

    const data = response?.data

    if (Array.isArray(data)) {
      return data
    }

    if (Array.isArray(data?.[key])) {
      return data[key]
    }

    return []
  }

  // Get enrollment status
  // Backend response: { enrolled: true/false, enrollment: {...} }
  const getEnrollmentStatus = (response) => {
    return response?.data?.enrolled === true
  }

  // Fetch course lessons
  const fetchLessons = async () => {

    try {

      const response = await getCourseLessonsAPI(courseId)

      if (hasError(response)) {

        console.log(
          'Lesson API error:',
          response?.response?.data || response
        )

        setLessons([])
        return false
      }

      const lessonData = getArrayData(response, 'lessons')

      // Sort lessons by order
      lessonData.sort((a, b) => {
        return (a.order || 0) - (b.order || 0)
      })

      setLessons(lessonData)

      return true

    } catch (err) {

      console.log('Fetch lessons error:', err)

      setLessons([])
      return false
    }
  }

  // Check student enrollment
  const checkStudentEnrollment = async () => {

    const token = sessionStorage.getItem('token')
    const loggedUser = getLoggedUser()

    if (!token || !loggedUser || loggedUser.role !== 'student') {

      setIsEnrolled(false)
      setLessons([])

      return
    }

    setCheckingEnrollment(true)

    try {

      const response = await checkEnrollmentAPI(courseId)

      if (hasError(response)) {

        console.log(
          'Enrollment check error:',
          response?.response?.data || response
        )

        setIsEnrolled(false)
        setLessons([])

        return
      }

      const enrolled = getEnrollmentStatus(response)

      setIsEnrolled(enrolled)

      if (enrolled) {
        await fetchLessons()
      } else {
        setLessons([])
      }

    } catch (err) {

      console.log('Enrollment check failed:', err)

      setIsEnrolled(false)
      setLessons([])

    } finally {
      setCheckingEnrollment(false)
    }
  }

  // Fetch course details and reviews
  const fetchCourseDetails = async () => {

    setLoading(true)
    setError('')
    setEnrollError('')

    try {

      const [courseResponse, reviewResponse] = await Promise.all([
        viewCourseAPI(courseId),
        getCourseReviewsAPI(courseId)
      ])

      // Check course response
      if (hasError(courseResponse)) {

        setError(
          courseResponse?.response?.data?.message ||
          'Failed to load course details'
        )

        setCourse(null)

        return
      }

      const courseData = courseResponse?.data?.course ||
        courseResponse?.data

      if (!courseData) {

        setCourse(null)

        return
      }

      setCourse(courseData)

      // Set reviews
      if (!hasError(reviewResponse)) {

        setReviews(getArrayData(reviewResponse, 'reviews'))

      } else {

        setReviews([])

        console.log(
          'Review API error:',
          reviewResponse?.response?.data || reviewResponse
        )
      }

      // Check enrollment and load lessons
      await checkStudentEnrollment()

    } catch (err) {

      console.log('Course loading error:', err)

      setError('Something went wrong while loading course details')

    } finally {

      setLoading(false)
    }
  }

  useEffect(() => {

    fetchCourseDetails()

  }, [courseId])

  // Refresh reviews and updated course rating
  const refreshCourseReviews = async () => {
    try {
      const [reviewResponse, courseResponse] = await Promise.all([
        getCourseReviewsAPI(courseId),
        viewCourseAPI(courseId)
      ])

      if (!hasError(reviewResponse)) {
        setReviews(getArrayData(reviewResponse, 'reviews'))
      }

      if (!hasError(courseResponse)) {
        const courseData =
          courseResponse?.data?.course || courseResponse?.data

        if (courseData) {
          setCourse(courseData)
        }
      }
    } catch (err) {
      console.log('Refresh reviews error:', err)
    }
  }

  // Free enrollment
  const handleEnroll = async () => {

    const token = sessionStorage.getItem('token')
    const loggedUser = getLoggedUser()

    setEnrollError('')

    // Redirect to login if not logged in
    if (!token || !loggedUser) {

      navigate('/login', {
        state: {
          from: `/courses/${courseId}`
        }
      })

      return
    }

    // Only students can enroll
    if (loggedUser.role !== 'student') {

      setEnrollError('Only students can enroll in this course.')

      return
    }

    if (isEnrolled || enrolling) {
      return
    }

    setEnrolling(true)

    try {

      const response = await enrollCourseAPI(courseId)

      // Handle API errors
      if (hasError(response)) {

        // Backend returns 409 if already enrolled
        if (response?.response?.status === 409) {

          setIsEnrolled(true)

          await fetchLessons()

          return
        }

        setEnrollError(
          response?.response?.data?.message ||
          'Unable to enroll in this course. Please try again.'
        )

        return
      }

      // Enrollment successful
      setIsEnrolled(true)

      // Fetch lessons after enrollment
      const lessonsLoaded = await fetchLessons()

      if (!lessonsLoaded) {

        setEnrollError(
          'You are enrolled, but lessons could not be loaded. Please refresh the page.'
        )
      }

    } catch (err) {

      console.log('Enrollment error:', err)

      setEnrollError('Something went wrong during enrollment.')

    } finally {

      setEnrolling(false)
    }
  }

  // Group lessons by module
  const groupedLessons = lessons.reduce((groups, lesson) => {

    const moduleName = lesson.module || 'Course Lessons'

    if (!groups[moduleName]) {
      groups[moduleName] = []
    }

    groups[moduleName].push(lesson)

    return groups

  }, {})

  // Get course image
  const getCourseImage = () => {

    if (!course?.image) {
      return 'https://via.placeholder.com/800x450?text=Course'
    }

    return course.image.startsWith('http')
      ? course.image
      : `${axiosInstance.defaults.baseURL}${course.image.startsWith('/')
        ? course.image
        : `/${course.image}`}`
  }

  // Course rating
  const rating = course?.rating ?? 0
  const totalReviews = course?.totalReviews ?? reviews.length

  // Loading screen
  if (loading) {

    return (
      <>
        <Header />

        <div className="min-h-[60vh] flex justify-center items-center">
          <p className="text-gray-500 text-lg">
            Loading course details...
          </p>
        </div>

        <Footer />
      </>
    )
  }

  // Error screen
  if (error) {

    return (
      <>
        <Header />

        <div className="min-h-[60vh] flex flex-col justify-center items-center text-center px-5">

          <h2 className="text-2xl font-bold text-red-600">
            {error}
          </h2>

          <button
            onClick={fetchCourseDetails}
            className="bg-primary text-white px-6 py-3 rounded-lg mt-6"
          >
            Try Again
          </button>

          <Link
            to="/courses"
            className="text-primary mt-4"
          >
            Back to Courses
          </Link>

        </div>

        <Footer />
      </>
    )
  }

  // Course not found
  if (!course) {

    return (
      <>
        <Header />

        <div className="min-h-[60vh] flex flex-col justify-center items-center text-center px-5">

          <h2 className="text-3xl font-bold text-gray-800">
            Course Not Found
          </h2>

          <p className="text-gray-500 mt-3">
            The course you are looking for does not exist.
          </p>

          <Link
            to="/courses"
            className="bg-primary text-white px-6 py-3 rounded-lg mt-6"
          >
            Explore Courses
          </Link>

        </div>

        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />

      {/* Course Header */}
      <div className="bg-deep text-white px-5 md:px-20 py-12">

        <p className="text-[#B8B8D5]">

          <Link to="/courses" className="hover:underline">
            Courses
          </Link>

          {' / '}
          {course.category}
          {' / '}
          {course.title}

        </p>

        <div className="md:grid grid-cols-3 gap-10 mt-6">

          <div className="col-span-2">

            <span className="bg-accent px-3 py-1 rounded-full text-sm">
              {course.category}
            </span>

            <h1 className="text-3xl md:text-4xl font-extrabold mt-5">
              {course.title}
            </h1>

            <p className="text-gray-300 mt-5 leading-7">
              {course.description}
            </p>

            <div className="flex flex-wrap gap-5 mt-6 text-sm text-gray-200">

              <span>
                <FaStar className="inline text-yellow-400" />
                {' '}{rating} ({totalReviews} reviews)
              </span>

              <span>
                <FaClock className="inline me-1" />
                {course.duration || 'Duration not specified'}
              </span>

              <span>
                <FaBook className="inline me-1" />
                {lessons.length} Lessons
              </span>

            </div>

            <p className="mt-6">
              Instructor: <b>{course.instructor?.username || 'Instructor'}</b>
            </p>

          </div>

          {/* Enrollment Card */}
          <div className="bg-white text-primary rounded-2xl p-4 shadow-xl mt-8 md:mt-0">

            <img
              className="w-full h-44 object-cover rounded-xl"
              src={getCourseImage()}
              alt={course.title}
            />

            <h2 className="font-bold text-2xl mt-4">
              Free Course
            </h2>

            <p className="text-gray-500 text-sm mt-2">
              Start learning today and improve your skills.
            </p>

            {isEnrolled ? (

              <div className="bg-green-100 text-green-700 text-center p-3 rounded-lg font-bold mt-5">
                You are enrolled in this course
              </div>

            ) : (

              <button
                onClick={handleEnroll}
                disabled={enrolling || checkingEnrollment}
                className="block w-full bg-primary text-white text-center p-3 rounded-lg font-bold mt-5 disabled:opacity-50"
              >
                {enrolling
                  ? 'Enrolling...'
                  : checkingEnrollment
                    ? 'Checking...'
                    : 'Free Enroll Now'}
              </button>

            )}

            {enrollError && (

              <p className="text-red-600 text-sm mt-3">
                {enrollError}
              </p>

            )}

            <div className="mt-5 space-y-3 text-sm text-gray-600">

              <p>
                <FaGraduationCap className="inline me-2" />
                Certificate of Completion
              </p>

              <p>
                <FaPlayCircle className="inline me-2" />
                {lessons.length} Lessons
              </p>

              <p>
                <FaBook className="inline me-2" />
                Course materials
              </p>

            </div>

          </div>

        </div>
      </div>

      {/* Course Information */}
      <div className="px-5 md:px-20 py-12">

        <div className="md:grid grid-cols-3 gap-10">

          <div className="col-span-2">

            <h2 className="text-2xl font-bold">
              About This Course
            </h2>

            <p className="text-gray-600 leading-7 mt-4">
              {course.description}
            </p>

            <p className="text-gray-600 mt-3">
              Difficulty Level: <b>{course.level}</b>
            </p>

            {/* Course Content */}
            <h2 className="text-2xl font-bold mt-10">
              Course Content
            </h2>

            {!isEnrolled ? (

              <div className="bg-lavender p-6 rounded-xl mt-5">

                <FaLock className="text-primary text-2xl mb-3" />

                <h3 className="font-bold text-lg">
                  Course lessons are locked
                </h3>

                <p className="text-gray-600 mt-2">
                  Enroll in this free course to access all lessons,
                  videos and course materials.
                </p>

              </div>

            ) : lessons.length > 0 ? (

              <div className="mt-5 space-y-3">

                {Object.entries(groupedLessons).map(
                  ([moduleName, moduleLessons], index) => (

                    <div
                      key={moduleName}
                      className="bg-lavender p-5 rounded-xl"
                    >

                      <h3 className="font-bold">
                        Module {index + 1}: {moduleName}
                      </h3>

                      <p className="text-sm text-gray-500 mt-2">
                        {moduleLessons.length} Lessons
                      </p>

                      <div className="mt-4 space-y-3">

                        {moduleLessons.map((lesson, lessonIndex) => (

                          <Link
                            key={lesson._id}
                            to={`/student/lessons/${lesson._id}`}
                            className="bg-white rounded-lg p-3 flex justify-between items-center hover:shadow-md transition"
                          >

                            <div>

                              <p className="font-medium text-gray-700">
                                {lesson.order || lessonIndex + 1}. {lesson.title}
                              </p>

                              <p className="text-xs text-gray-500 mt-1">
                                {lesson.lessonType || 'Lesson'}

                                {lesson.duration
                                  ? ` · ${lesson.duration}`
                                  : ''}
                              </p>

                            </div>

                            <FaPlayCircle className="text-primary" />

                          </Link>

                        ))}

                      </div>

                    </div>

                  )
                )}

              </div>

            ) : (

              <p className="text-gray-500 mt-5">
                You are enrolled, but no published lessons are available yet.
              </p>

            )}

          </div>

          {/* Student Reviews */}

          <div className="mt-10 md:mt-0">

            <Reviews
              courseId={courseId}
              isEnrolled={isEnrolled}
              reviews={reviews}
              rating={rating}
              totalReviews={totalReviews}
              onRefresh={refreshCourseReviews}
            />

          </div>

        </div>

      </div>

      <Footer />
    </>
  )
}

export default CourseView
