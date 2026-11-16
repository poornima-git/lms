
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import InstructorHeader from '../components/InstructorHeader'
import InstructorSidebar from '../components/InstructorSidebar'

import {
  getInstructorCoursesAPI,
  getCourseLessonsAPI,
  addLessonAPI,
  updateLessonAPI,
  deleteLessonAPI
} from '../../services/allAPI'

function ManageLessons() {

  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const initialCourseId = searchParams.get('courseId')

  const initialForm = {
    title: '',
    type: 'Video',
    videoUrl: '',
    description: '',
    content: '',
    duration: ''
  }

  const [courses, setCourses] = useState([])
  const [selectedCourse, setSelectedCourse] = useState(initialCourseId || '')

  const [lessons, setLessons] = useState([])
  const [lessonData, setLessonData] = useState(initialForm)

  const [lessonFile, setLessonFile] = useState(null)
  const [currentFile, setCurrentFile] = useState('')

  const [editingId, setEditingId] = useState(null)

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('success')

  // Load instructor courses
  useEffect(() => {
    loadCourses()
  }, [])

  // Load lessons whenever selected course changes
  useEffect(() => {
    if (selectedCourse) {
      loadLessons(selectedCourse)
    } else {
      setLessons([])
    }
  }, [selectedCourse])

  // Get instructor courses
  const loadCourses = async () => {
    setLoading(true)

    const response = await getInstructorCoursesAPI()

    if (response?.response) {
      showMessage(
        response.response.data?.message || 'Unable to load courses.',
        'error'
      )
      setLoading(false)
      return
    }

    const courseList = response?.data || []

    setCourses(courseList)

    if (courseList.length > 0) {
      const selectedExists = courseList.some(
        course => String(course._id) === String(initialCourseId)
      )

      setSelectedCourse(
        selectedExists ? initialCourseId : courseList[0]._id
      )
    } else {
      setSelectedCourse('')
    }

    setLoading(false)
  }

  // Get lessons for selected course
  const loadLessons = async (courseId) => {
    setLoading(true)

    const response = await getCourseLessonsAPI(courseId)

    if (response?.response) {
      showMessage(
        response.response.data?.message || 'Unable to load lessons.',
        'error'
      )
      setLessons([])
      setLoading(false)
      return
    }

    setLessons(response?.data || [])
    setLoading(false)
  }

  // Display messages
  const showMessage = (text, type = 'success') => {
    setMessage(text)
    setMessageType(type)
  }

  // Convert frontend type into backend lessonType
  const getBackendLessonType = (type) => {
    if (type === 'Video') return 'video'
    if (type === 'PDF Material') return 'pdf'
    return 'text'
  }

  // Convert backend type into frontend type
  const getFrontendLessonType = (type) => {
    if (type === 'video') return 'Video'
    if (type === 'pdf') return 'PDF Material'
    return 'Text Lesson'
  }

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target

    setLessonData(prev => ({
      ...prev,
      [name]: value
    }))

    setMessage('')
  }

  // Handle lesson type changes
  const handleTypeChange = (e) => {
    const type = e.target.value

    setLessonData(prev => ({
      ...prev,
      type,
      videoUrl: '',
      content: ''
    }))

    setLessonFile(null)
    setCurrentFile('')
    setMessage('')
  }

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0]

    if (!file) {
      setLessonFile(null)
      return
    }

    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]

    if (!allowedTypes.includes(file.type)) {
      showMessage('Please select a PDF, DOC or DOCX file.', 'error')
      e.target.value = ''
      setLessonFile(null)
      return
    }

    setLessonFile(file)
    setCurrentFile('')
    setMessage('')
  }

  // Add or update lesson
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!selectedCourse) {
      showMessage('Please select a course.', 'error')
      return
    }

    if (!lessonData.title.trim()) {
      showMessage('Please enter the lesson title.', 'error')
      return
    }

    if (!lessonData.description.trim()) {
      showMessage('Please enter the lesson description.', 'error')
      return
    }

    if (
      lessonData.type === 'Video' &&
      !lessonData.videoUrl.trim()
    ) {
      showMessage('Please enter the video URL.', 'error')
      return
    }

    if (
      lessonData.type === 'PDF Material' &&
      !lessonFile &&
      !currentFile &&
      !editingId
    ) {
      showMessage('Please upload a PDF or document.', 'error')
      return
    }

    if (
      lessonData.type === 'Text Lesson' &&
      !lessonData.content.trim()
    ) {
      showMessage('Please enter the lesson content.', 'error')
      return
    }

    setSaving(true)
    setMessage('')

    try {

      const formData = new FormData()

      formData.append('course', selectedCourse)
      formData.append('title', lessonData.title.trim())
      formData.append('description', lessonData.description.trim())
      formData.append('lessonType', getBackendLessonType(lessonData.type))
      formData.append('videoUrl', lessonData.videoUrl)
      formData.append('content', lessonData.content)
      formData.append('duration', Number(lessonData.duration) || 0)

      // Preserve existing module and order when editing
      const existingLesson = lessons.find(
        lesson => String(lesson._id) === String(editingId)
      )

      formData.append(
        'module',
        existingLesson?.module || 'General'
      )

      formData.append(
        'order',
        existingLesson?.order || lessons.length + 1
      )

      if (lessonFile) {
        formData.append('file', lessonFile)
      }

      let response

      if (editingId) {
        response = await updateLessonAPI(editingId, formData)
      } else {
        response = await addLessonAPI(formData)
      }

      if (response?.response) {
        showMessage(
          response.response.data?.message || 'Unable to save lesson.',
          'error'
        )
        return
      }

      showMessage(
        response?.data?.message ||
        (editingId
          ? 'Lesson updated successfully.'
          : 'Lesson added successfully.')
      )

      setLessonData(initialForm)
      setLessonFile(null)
      setCurrentFile('')
      setEditingId(null)

      await loadLessons(selectedCourse)

    } catch (error) {
      showMessage('Something went wrong. Please try again.', 'error')
    } finally {
      setSaving(false)
    }
  }

  // Edit lesson
  const handleEdit = (lesson) => {

    setEditingId(lesson._id)

    setLessonData({
      title: lesson.title || '',
      type: getFrontendLessonType(lesson.lessonType),
      videoUrl: lesson.videoUrl || '',
      description: lesson.description || '',
      content: lesson.content || '',
      duration: lesson.duration || ''
    })

    setLessonFile(null)
    setCurrentFile(lesson.file || '')
    setMessage('')

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  // Delete lesson
  const handleDelete = async (lessonId) => {

    const confirmDelete = window.confirm(
      'Are you sure you want to delete this lesson?'
    )

    if (!confirmDelete) return

    const response = await deleteLessonAPI(lessonId)

    if (response?.response) {
      showMessage(
        response.response.data?.message || 'Unable to delete lesson.',
        'error'
      )
      return
    }

    if (String(editingId) === String(lessonId)) {
      handleCancel()
    }

    showMessage('Lesson deleted successfully.')

    await loadLessons(selectedCourse)
  }

  // Cancel editing
  const handleCancel = () => {
    setEditingId(null)
    setLessonData(initialForm)
    setLessonFile(null)
    setCurrentFile('')
    setMessage('')
  }

  // Get file name for display
  const getFileName = (file) => {
    if (!file) return ''

    return file.split('/').pop()
  }

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
            Manage Lessons
          </h1>

          <p className="mt-2 text-gray-500">
            Organize video lessons and downloadable learning materials.
          </p>

          {/* Course Form */}
          <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">

            {/* Course Selection */}
            <div>
              <label className="mb-2 block font-semibold">
                Select Course
              </label>

              <select
                value={selectedCourse}
                onChange={(e) => {
                  setSelectedCourse(e.target.value)
                  handleCancel()
                }}
                disabled={courses.length === 0}
                className="w-full max-w-md rounded-lg border border-gray-300 px-4 py-3"
              >
                {courses.length === 0 && (
                  <option value="">No courses available</option>
                )}

                {courses.map(course => (
                  <option key={course._id} value={course._id}>
                    {course.title}
                  </option>
                ))}
              </select>
            </div>

            {courses.length === 0 && !loading && (
              <p className="mt-4 text-sm text-red-600">
                Please create a course before adding lessons.
              </p>
            )}

            <h2 className="mt-8 text-xl font-bold text-navy">
              {editingId ? 'Edit Lesson' : 'Add New Lesson'}
            </h2>

            <form onSubmit={handleSubmit}>

              {/* Lesson Title and Type */}
              <div className="mt-5 grid gap-5 md:grid-cols-2">

                <div>
                  <label className="mb-2 block font-semibold">
                    Lesson Title
                  </label>

                  <input
                    type="text"
                    name="title"
                    value={lessonData.title}
                    onChange={handleChange}
                    placeholder="Enter lesson title"
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-semibold">
                    Lesson Type
                  </label>

                  <select
                    name="type"
                    value={lessonData.type}
                    onChange={handleTypeChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3"
                  >
                    <option value="Video">Video</option>
                    <option value="PDF Material">PDF Material</option>
                    <option value="Text Lesson">Text Lesson</option>
                  </select>
                </div>

              </div>

              {/* Video URL */}
              {lessonData.type === 'Video' && (
                <div className="mt-5">
                  <label className="mb-2 block font-semibold">
                    Video URL
                  </label>

                  <input
                    type="url"
                    name="videoUrl"
                    value={lessonData.videoUrl}
                    onChange={handleChange}
                    placeholder="https://example.com/video"
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3"
                  />
                </div>
              )}

              {/* PDF or Document Upload */}
              {lessonData.type === 'PDF Material' && (
                <div className="mt-5">
                  <label className="mb-2 block font-semibold">
                    Upload PDF or Material
                  </label>

                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="block w-full rounded-lg border border-gray-300 p-3"
                  />

                  {currentFile && !lessonFile && (
                    <p className="mt-2 text-sm text-gray-600">
                      Current file: {getFileName(currentFile)}
                    </p>
                  )}

                  {lessonFile && (
                    <p className="mt-2 text-sm text-green-700">
                      Selected: {lessonFile.name}
                    </p>
                  )}
                </div>
              )}

              {/* Text Lesson Content */}
              {lessonData.type === 'Text Lesson' && (
                <div className="mt-5">
                  <label className="mb-2 block font-semibold">
                    Lesson Content
                  </label>

                  <textarea
                    name="content"
                    value={lessonData.content}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Enter lesson content"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3"
                  />
                </div>
              )}

              {/* Duration */}
              <div className="mt-5">
                <label className="mb-2 block font-semibold">
                  Duration (Minutes)
                </label>

                <input
                  type="number"
                  name="duration"
                  min="0"
                  value={lessonData.duration}
                  onChange={handleChange}
                  placeholder="Enter duration"
                  className="w-full max-w-md rounded-lg border border-gray-300 px-4 py-3"
                />
              </div>

              {/* Lesson Description */}
              <div className="mt-5">
                <label className="mb-2 block font-semibold">
                  Lesson Description
                </label>

                <textarea
                  name="description"
                  value={lessonData.description}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Describe this lesson"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3"
                />
              </div>

              {/* Message */}
              {message && (
                <p className={`mt-4 rounded-lg p-3 text-sm ${
                  messageType === 'success'
                    ? 'bg-green-50 text-green-700'
                    : 'bg-red-50 text-red-600'
                }`}>
                  {message}
                </p>
              )}

              {/* Buttons */}
              <div className="mt-5 flex flex-wrap gap-3">

                <button
                  type="submit"
                  disabled={saving || !selectedCourse}
                  className="rounded-lg bg-primary px-6 py-3 font-semibold text-white hover:bg-deep-blue disabled:opacity-50"
                >
                  {saving
                    ? 'Saving...'
                    : editingId
                      ? 'Update Lesson'
                      : 'Add Lesson'}
                </button>

                {editingId && (
                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={saving}
                    className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-600"
                  >
                    Cancel
                  </button>
                )}

              </div>

            </form>
          </div>

          {/* Existing Lessons */}
          <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">

            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-bold text-navy">
                Existing Lessons
              </h2>

              <span className="rounded-full bg-blue-50 px-3 py-1 text-sm text-primary">
                {lessons.length} Lessons
              </span>
            </div>

            {loading ? (
              <p className="py-10 text-center text-gray-500">
                Loading lessons...
              </p>
            ) : (
              <div className="mt-5 divide-y">

                {lessons.map((lesson, index) => (

                  <div
                    key={lesson._id}
                    className="flex flex-wrap items-center justify-between gap-4 py-4"
                  >

                    <div className="min-w-0 flex-1">

                      <p className="font-semibold">
                        {index + 1}. {lesson.title}
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        {getFrontendLessonType(lesson.lessonType)}
                        {lesson.duration > 0 &&
                          ` · ${lesson.duration} minutes`}
                        {lesson.file &&
                          ` · ${getFileName(lesson.file)}`}
                      </p>

                    </div>

                    <div className="flex flex-wrap items-center gap-2">

                      <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                        Published
                      </span>

                      <button
                        type="button"
                        onClick={() => handleEdit(lesson)}
                        className="rounded-lg border border-primary px-3 py-1 text-sm text-primary hover:bg-blue-50"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(lesson._id)}
                        className="rounded-lg border border-red-500 px-3 py-1 text-sm text-red-600 hover:bg-red-50"
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                ))}

                {lessons.length === 0 && (
                  <div className="py-10 text-center text-gray-500">
                    <p className="font-semibold">
                      No lessons available.
                    </p>

                    <p className="mt-2 text-sm">
                      Add your first lesson using the form above.
                    </p>
                  </div>
                )}

              </div>
            )}

          </div>

        </main>
      </div>
    </div>
  )
}

export default ManageLessons
