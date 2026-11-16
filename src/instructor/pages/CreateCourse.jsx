
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import InstructorHeader from '../components/InstructorHeader'
import InstructorSidebar from '../components/InstructorSidebar'

import {
  addCourseAPI,
  getInstructorCoursesAPI,
  updateCourseAPI
} from '../../services/allAPI'

import axiosInstance from '../../api/axiosInstance'

function CreateCourse() {

  const location = useLocation()
  const navigate = useNavigate()

  const searchParams = new URLSearchParams(location.search)
  const courseId = searchParams.get('courseId')

  const isEditMode = Boolean(courseId)

  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    category: 'Development',
    level: 'Beginner'
  })

  const [thumbnail, setThumbnail] = useState(null)
  const [currentImage, setCurrentImage] = useState('')
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [submittedForApproval, setSubmittedForApproval] = useState(false)

  useEffect(() => {
    if (isEditMode) {
      loadCourse()
    }
  }, [courseId])

  // Load existing course for editing
  const loadCourse = async () => {
    setLoading(true)
    setMessage('')

    const response = await getInstructorCoursesAPI()

    if (response?.response) {
      setMessage(
        response.response.data?.message ||
        'Unable to load course details.'
      )
      setLoading(false)
      return
    }

    const courses = response?.data || []

    const selectedCourse = courses.find(
      course => String(course._id) === String(courseId)
    )

    if (!selectedCourse) {
      setMessage('Course not found or you do not have permission to edit it.')
      setLoading(false)
      return
    }

    setCourseData({
      title: selectedCourse.title || '',
      description: selectedCourse.description || '',
      category: selectedCourse.category || 'Development',
      level: selectedCourse.level || 'Beginner'
    })

    setCurrentImage(selectedCourse.image || '')

    // Check whether the course is already submitted
    setSubmittedForApproval(selectedCourse.status === 'pending')

    setLoading(false)
  }

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target

    setCourseData(prev => ({
      ...prev,
      [name]: value
    }))

    setMessage('')
  }

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0]

    if (!file) return

    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/jpg'
    ]

    if (!allowedTypes.includes(file.type)) {
      setMessage('Please select a JPG or PNG image.')
      setThumbnail(null)
      e.target.value = ''
      return
    }

    setThumbnail(file)
    setMessage('')
  }

  // Get image URL
  const getImageUrl = (image) => {
    if (!image) return ''

    if (image.startsWith('http')) {
      return image
    }

    return `${axiosInstance.defaults.baseURL}${image.startsWith('/')
      ? image
      : `/${image}`}`
  }

  // Save course as draft or submit for approval
  const handleSave = async (status) => {

    if (!courseData.title.trim() || !courseData.description.trim()) {
      setMessage('Please enter the course title and description.')
      return
    }

    setSaving(true)
    setMessage('')

    try {

      const formData = new FormData()

      formData.append('title', courseData.title.trim())
      formData.append('description', courseData.description.trim())
      formData.append('category', courseData.category)
      formData.append('level', courseData.level)
      formData.append('status', status)

      if (thumbnail) {
        formData.append('image', thumbnail)
      }

      let response

      if (isEditMode) {
        response = await updateCourseAPI(courseId, formData)
      } else {
        response = await addCourseAPI(formData)
      }

      if (response?.response) {
        setMessage(
          response.response.data?.message ||
          'Unable to save course.'
        )
        return
      }

      setMessage(
        response?.data?.message ||
        (status === 'pending'
          ? 'Course submitted for approval successfully!'
          : 'Course saved as draft successfully!')
      )

      // Update submission button state
      if (status === 'pending') {
        setSubmittedForApproval(true)
      } else {
        setSubmittedForApproval(false)
      }

      if (isEditMode && thumbnail) {
        setCurrentImage('')
      }

      setThumbnail(null)

    } catch (error) {
      setMessage('Something went wrong. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div>
        <InstructorHeader />

        <div className="flex">
          <InstructorSidebar />

          <main className="min-w-0 flex-1 bg-[#F5F8FC] p-8">
            <p className="text-primary font-semibold">
              Loading course details...
            </p>
          </main>
        </div>
      </div>
    )
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
            {isEditMode ? 'Edit Course' : 'Create Course'}
          </h1>

          <p className="mt-2 text-gray-500">
            {isEditMode
              ? 'Update your course information.'
              : 'Add course information and prepare your course for students.'}
          </p>

          {/* Course Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSave('pending')
            }}
            className="mt-8 max-w-3xl space-y-6 rounded-xl bg-white p-6 md:p-8 shadow-sm"
          >

            {/* Course Title */}
            <div>
              <label className="mb-2 block font-semibold">
                Course Title
              </label>

              <input
                type="text"
                name="title"
                value={courseData.title}
                onChange={handleChange}
                placeholder="Enter course title"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-primary"
              />
            </div>

            {/* Course Description */}
            <div>
              <label className="mb-2 block font-semibold">
                Course Description
              </label>

              <textarea
                name="description"
                value={courseData.description}
                onChange={handleChange}
                rows="5"
                placeholder="Describe what students will learn"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-primary"
              />
            </div>

            {/* Category and Level */}
            <div className="grid gap-6 md:grid-cols-2">

              <div>
                <label className="mb-2 block font-semibold">
                  Category
                </label>

                <select
                  name="category"
                  value={courseData.category}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3"
                >
                  <option value="Development">Development</option>
                  <option value="Design">Design</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Business">Business</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block font-semibold">
                  Level
                </label>

                <select
                  name="level"
                  value={courseData.level}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

            </div>

            {/* Course Price */}
            <div>
              <label className="mb-2 block font-semibold">
                Course Price
              </label>

              <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 font-semibold text-green-700">
                Free Course
              </div>

              <p className="mt-1 text-sm text-gray-500">
                All LearnHub courses are free for students.
              </p>
            </div>

            {/* Course Thumbnail */}
            <div>
              <label className="mb-2 block font-semibold">
                Course Thumbnail
              </label>

              <div className="rounded-lg border-2 border-dashed border-light-blue bg-blue-50 p-8 text-center">

                <p className="font-semibold text-deep-blue">
                  Upload course image
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  PNG or JPG image
                </p>

                {currentImage && !thumbnail && (
                  <div className="mt-4">
                    <img
                      src={getImageUrl(currentImage)}
                      alt="Current course thumbnail"
                      className="mx-auto h-36 w-56 rounded-lg object-cover"
                    />

                    <p className="mt-2 text-sm text-gray-500">
                      Current course image
                    </p>
                  </div>
                )}

                <input
                  type="file"
                  accept="image/png,image/jpeg"
                  onChange={handleImageChange}
                  className="mt-4 max-w-full"
                />

                {thumbnail && (
                  <p className="mt-3 text-sm text-green-700">
                    Selected: {thumbnail.name}
                  </p>
                )}

              </div>
            </div>

            {/* Success or Error Message */}
            {message && (
              <p className={`rounded-lg p-3 text-sm ${
                message.toLowerCase().includes('success')
                  ? 'bg-green-50 text-green-700'
                  : 'bg-red-50 text-red-600'
              }`}>
                {message}
              </p>
            )}

            {/* Form Buttons */}
            <div className="flex flex-wrap gap-4">

              <button
                type="button"
                onClick={() => handleSave('draft')}
                disabled={saving}
                className="rounded-lg border border-primary px-6 py-3 font-semibold text-primary hover:bg-blue-50 disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save as Draft'}
              </button>

              <button
                type="submit"
                disabled={saving || submittedForApproval}
                className="rounded-lg bg-primary px-6 py-3 font-semibold text-white hover:bg-deep-blue disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving
                  ? 'Submitting...'
                  : submittedForApproval
                    ? 'Submitted for Approval'
                    : isEditMode
                      ? 'Update Course'
                      : 'Submit for Approval'}
              </button>

            </div>

            <p className="text-sm text-gray-500">
              Submitted courses will be sent for admin approval before they are published.
            </p>

            <button
              type="button"
              onClick={() => navigate('/instructor/courses')}
              className="text-sm font-semibold text-primary hover:underline"
            >
              ← Back to My Courses
            </button>

          </form>

        </main>

      </div>

    </div>
  )
}

export default CreateCourse
