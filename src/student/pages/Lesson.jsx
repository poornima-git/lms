
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link, useParams } from 'react-router-dom'
import {
  FaPlay,
  FaFilePdf,
  FaCheckCircle,
  FaDownload,
  FaBookOpen
} from 'react-icons/fa'

import axiosInstance from '../../api/axiosInstance'

import {
  viewLessonAPI,
  viewCourseAPI,
  getCourseLessonsAPI,
  getCourseProgressAPI,
  completeLessonAPI,
  getCourseQuizzesAPI
} from '../../services/allAPI'

function Lesson() {

  const { lessonId } = useParams()

  const [lesson, setLesson] = useState(null)
  const [course, setCourse] = useState(null)
  const [lessons, setLessons] = useState([])
  const [completed, setCompleted] = useState(false)
  const [quiz, setQuiz] = useState(null)

  const [loading, setLoading] = useState(true)
  const [completing, setCompleting] = useState(false)
  const [error, setError] = useState('')

  // Convert backend file path into a complete URL
  const getFileUrl = (file) => {

    if (!file) return ''

    if (file.startsWith('http')) {
      return file
    }

    return `${axiosInstance.defaults.baseURL}/${file.replace(/\\/g, '/').replace(/^\/+/, '')}`

  }

  // Format lesson duration
  const getDuration = (duration) => {

    if (!duration) return 'Duration not specified'

    return /^\d+$/.test(String(duration))
      ? `${duration} minutes`
      : duration

  }

  // Convert YouTube URL into embed URL
  const getVideoUrl = (url) => {

    if (!url) return ''

    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1]?.split('&')[0]
      return `https://www.youtube.com/embed/${videoId}`
    }

    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0]
      return `https://www.youtube.com/embed/${videoId}`
    }

    return url

  }

  // Load lesson and related course information
  const loadLesson = async () => {

    setLoading(true)
    setError('')

    try {

      const lessonResponse = await viewLessonAPI(lessonId)

      if (lessonResponse?.response) {
        setError(
          lessonResponse.response.data?.message ||
          'Unable to load this lesson.'
        )
        return
      }

      const lessonData = lessonResponse?.data

      if (!lessonData?._id) {
        setError('Lesson not found.')
        return
      }

      setLesson(lessonData)

      // Get course ID from lesson
      const courseId =
        lessonData.course?._id || lessonData.course

      if (!courseId) {
        setError('Course information is unavailable.')
        return
      }

      // Load course, lessons, and progress
      const [
        courseResponse,
        lessonsResponse,
        progressResponse
      ] = await Promise.all([
        viewCourseAPI(courseId),
        getCourseLessonsAPI(courseId),
        getCourseProgressAPI(courseId)
      ])

      if (courseResponse?.response) {
        setError('Unable to load course information.')
        return
      }

      if (lessonsResponse?.response) {
        setError('Unable to load course lessons.')
        return
      }

      const courseData = courseResponse?.data
      const lessonsData = lessonsResponse?.data || []
      const progressData = progressResponse?.response
        ? {}
        : progressResponse?.data || {}

      setCourse(courseData)
      setLessons(lessonsData)

      // Check whether the current lesson is completed
      const completedLessons = progressData.completedLessons || []

      const isCompleted = completedLessons.some((item) => {

        const completedId = item?._id || item

        return String(completedId) === String(lessonData._id)

      })

      setCompleted(isCompleted)

      // Find a published quiz associated with this lesson
      try {

        const quizResponse = await getCourseQuizzesAPI(courseId)

        if (!quizResponse?.response) {

          const quizzes = quizResponse?.data || []

          const relatedQuiz = quizzes.find((item) => {

            const quizLessonId =
              item.lesson?._id || item.lesson

            return String(quizLessonId) === String(lessonData._id)

          })

          setQuiz(relatedQuiz || null)

        }

      } catch (err) {

        console.log('Unable to load lesson quiz:', err)

      }

    } catch (err) {

      console.log(err)
      setError('Something went wrong while loading the lesson.')

    } finally {

      setLoading(false)

    }

  }

  useEffect(() => {
    loadLesson()
  }, [lessonId])

  // Mark lesson as completed
  const handleCompleteLesson = async () => {

    if (completed || completing) return

    setCompleting(true)

    try {

      const response = await completeLessonAPI(lessonId)

      if (response?.response) {
        alert(
          response.response.data?.message ||
          'Unable to complete this lesson.'
        )
        return
      }

      setCompleted(true)

      alert('Lesson marked as completed successfully!')

    } catch (err) {

      console.log(err)
      alert('Something went wrong while completing the lesson.')

    } finally {

      setCompleting(false)

    }

  }

  // Loading screen
  if (loading) {

    return (
      <>
        <Header />

        <div className="min-h-[60vh] flex justify-center items-center">
          <p className="text-gray-500">
            Loading lesson...
          </p>
        </div>

        <Footer />
      </>
    )

  }

  // Error screen
  if (error || !lesson) {

    return (
      <>
        <Header />

        <div className="min-h-[60vh] flex flex-col justify-center items-center text-center px-5">

          <h2 className="text-3xl font-bold text-gray-800">
            Lesson Unavailable
          </h2>

          <p className="text-gray-500 mt-3">
            {error || 'The lesson you are looking for does not exist.'}
          </p>

          <Link
            to="/student/my-courses"
            className="bg-primary text-white px-6 py-3 rounded-lg mt-6"
          >
            Back to My Courses
          </Link>

        </div>

        <Footer />
      </>
    )

  }

  // Group lessons by module
  const modules = lessons.reduce((groups, item) => {

    const moduleName = item.module || 'Course Lessons'

    if (!groups[moduleName]) {
      groups[moduleName] = []
    }

    groups[moduleName].push(item)

    return groups

  }, {})

  const moduleEntries = Object.entries(modules)

  // Current lesson index
  const currentIndex = lessons.findIndex(
    item => String(item._id) === String(lesson._id)
  )

  const nextLesson = lessons[currentIndex + 1]

  const previousLesson = currentIndex > 0
    ? lessons[currentIndex - 1]
    : null

  // Check lesson type
  const isVideo = lesson.lessonType === 'video'
  const isPdf = lesson.lessonType === 'pdf'
  const isText = lesson.lessonType === 'text'

  const videoUrl = getVideoUrl(lesson.videoUrl)
  const fileUrl = getFileUrl(lesson.file)

  return (
    <>
      <Header />

      {/* Lesson Header */}
      <div className="bg-deep text-white px-5 md:px-16 py-6">

        <p className="text-blue-200 text-sm">

          <Link to="/student/my-courses">
            My Courses
          </Link>

          {' / '}

          {course?.title}

        </p>

        <h1 className="text-2xl md:text-3xl font-bold mt-3">
          {course?.title}
        </h1>

        <p className="text-gray-300 mt-2">
          Module: {lesson.module || 'Course Lessons'}
        </p>

      </div>

      <div className="grid lg:grid-cols-4 gap-6 p-5 md:p-10 bg-gray-50">

        {/* Main Lesson Section */}
        <div className="lg:col-span-3">

          {/* Video / PDF / Text Content */}
          <div className="bg-black rounded-xl overflow-hidden">

            {isVideo && videoUrl ? (

              lesson.videoUrl.includes('youtube.com') ||
              lesson.videoUrl.includes('youtu.be') ? (

                <iframe
                  className="w-full aspect-video"
                  src={videoUrl}
                  title={lesson.title}
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>

              ) : (

                <video
                  className="w-full aspect-video"
                  src={videoUrl}
                  controls
                >
                  Your browser does not support video playback.
                </video>

              )

            ) : isPdf && fileUrl ? (

              <iframe
                className="w-full h-[500px] bg-white"
                src={fileUrl}
                title={lesson.title}
              ></iframe>

            ) : isText ? (

              <div className="bg-white text-gray-700 p-8 min-h-[300px]">

                <FaBookOpen className="text-primary text-4xl mb-5" />

                <h2 className="text-2xl font-bold">
                  {lesson.title}
                </h2>

                <p className="mt-5 leading-8 whitespace-pre-wrap">
                  {lesson.content || 'No lesson content available.'}
                </p>

              </div>

            ) : (

              <div className="text-white text-center p-12">
                <p>Lesson content is not available.</p>
              </div>

            )}

          </div>

          {/* Lesson Details */}
          <div className="bg-white rounded-xl p-6 mt-6 shadow-sm">

            <div className="flex flex-col sm:flex-row justify-between gap-4">

              <div>

                <p className="text-primary font-semibold text-sm">
                  LESSON {String(lesson.order || currentIndex + 1).padStart(2, '0')}
                </p>

                <h2 className="text-2xl font-bold mt-2">
                  {lesson.title}
                </h2>

                <p className="text-gray-500 mt-2">
                  Duration: {getDuration(lesson.duration)}
                </p>

              </div>

              <span className={`font-semibold text-sm h-fit ${
                completed ? 'text-green-600' : 'text-blue-600'
              }`}>

                <FaCheckCircle className="inline me-2" />

                {completed ? 'Completed' : 'Available'}

              </span>

            </div>

            <hr className="my-6" />

            <h3 className="text-xl font-bold">
              About This Lesson
            </h3>

            <p className="text-gray-600 leading-7 mt-3 whitespace-pre-wrap">
              {lesson.description || 'No description available.'}
            </p>

            {/* Lesson Resources */}
            {fileUrl && !isPdf && (

              <>
                <h3 className="text-xl font-bold mt-7">
                  Lesson Resources
                </h3>

                <div className="border border-gray-200 rounded-lg p-4 mt-4 flex items-center justify-between gap-4">

                  <div className="flex items-center gap-3">

                    <FaFilePdf className="text-red-500 text-3xl" />

                    <div>

                      <h4 className="font-bold">
                        Lesson Material
                      </h4>

                      <p className="text-sm text-gray-500">
                        Download lesson resource
                      </p>

                    </div>

                  </div>

                  <a
                    href={fileUrl}
                    download
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary font-semibold whitespace-nowrap"
                  >
                    <FaDownload className="inline me-2" />
                    Download
                  </a>

                </div>
              </>

            )}

            {/* Mark Complete */}
            <button
              onClick={handleCompleteLesson}
              disabled={completed || completing}
              className={`w-full p-3 rounded-lg mt-8 font-semibold ${
                completed
                  ? 'bg-green-100 text-green-700 cursor-not-allowed'
                  : 'bg-primary text-white hover:bg-accent'
              }`}
            >

              {completed
                ? '✓ Lesson Completed'
                : completing
                  ? 'Updating Progress...'
                  : 'Mark as Complete'}

            </button>

            {/* Lesson Navigation */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">

              {previousLesson ? (

                <Link
                  to={`/student/lessons/${previousLesson._id}`}
                  className="border border-primary text-primary px-5 py-3 rounded-lg text-center"
                >
                  ← Previous Lesson
                </Link>

              ) : (

                <Link
                  to={`/courses/${course?._id}`}
                  className="border border-primary text-primary px-5 py-3 rounded-lg text-center"
                >
                  Back to Course
                </Link>

              )}

              {nextLesson ? (

                <Link
                  to={`/student/lessons/${nextLesson._id}`}
                  className="bg-primary text-white px-5 py-3 rounded-lg text-center"
                >
                  Next Lesson →
                </Link>

              ) : quiz ? (

                <Link
                  to={`/student/quizzes/${quiz._id}`}
                  className="bg-primary text-white px-5 py-3 rounded-lg text-center"
                >
                  Continue to Quiz →
                </Link>

              ) : (

                <Link
                  to="/student/my-courses"
                  className="bg-primary text-white px-5 py-3 rounded-lg text-center"
                >
                  Back to My Courses
                </Link>

              )}

            </div>

          </div>

        </div>

        {/* Course Content Sidebar */}
        <div className="bg-white rounded-xl shadow-sm p-5 h-fit">

          <h2 className="text-xl font-bold">
            Course Content
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            {moduleEntries.length} modules · {lessons.length} lessons
          </p>

          <div className="mt-5">

            {moduleEntries.map(([moduleName, moduleLessons], index) => (

              <div key={moduleName} className="mb-5">

                <h3 className="bg-blue-50 text-deep font-bold p-3 rounded-lg">
                  Module {index + 1}: {moduleName}
                </h3>

                {moduleLessons.map(item => {

                  const isCurrentLesson =
                    String(item._id) === String(lesson._id)

                  return (

                    <Link
                      key={item._id}
                      to={`/student/lessons/${item._id}`}
                      className={`block p-3 border-b ${
                        isCurrentLesson
                          ? 'bg-blue-50'
                          : 'hover:bg-gray-50'
                      }`}
                    >

                      <FaPlay
                        className={`inline me-2 ${
                          isCurrentLesson
                            ? 'text-primary'
                            : 'text-gray-400'
                        }`}
                      />

                      <span className="text-sm font-semibold">
                        {item.title}
                      </span>

                      <p className="text-xs text-gray-500 ms-6 mt-1">
                        {getDuration(item.duration)}
                      </p>

                    </Link>

                  )

                })}

              </div>

            ))}

          </div>

        </div>

      </div>

      <Footer />
    </>
  )
}

export default Lesson
