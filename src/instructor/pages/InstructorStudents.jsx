
import React, { useEffect, useState } from 'react'
import axiosInstance from '../../api/axiosInstance'
import InstructorHeader from '../components/InstructorHeader'
import InstructorSidebar from '../components/InstructorSidebar'

function InstructorStudents() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [searchKey, setSearchKey] = useState('')
  const [selectedCourse, setSelectedCourse] = useState('All')
  const [selectedStatus, setSelectedStatus] = useState('All')

  // Load instructor's students from backend
  const getStudents = async () => {
    try {
      setLoading(true)
      setError('')

      const response = await axiosInstance.get('/instructor/students')

      const studentData = response.data.map(item => ({
        id: item._id,
        studentId: item.student?._id,
        name: item.student?.username || 'Unknown Student',
        email: item.student?.email || 'No email',
        course: item.course?.title || 'Unknown Course',
        progress: Number(item.progress) || 0,
        quizScore: item.quizScore,
        status: item.status
      }))

      setStudents(studentData)

    } catch (error) {
      console.error('Error loading students:', error)

      setError(
        error.response?.data?.message ||
        'Failed to load students. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getStudents()
  }, [])

  // Get unique course names from actual student records
  const courses = [
    ...new Set(students.map(student => student.course))
  ]

  // Count unique students, because one student may enroll in multiple courses
  const totalStudents = new Set(
    students.map(student => student.studentId)
  ).size

  const activeLearners = new Set(
    students
      .filter(student => student.status === 'Active')
      .map(student => student.studentId)
  ).size

  // Count completed course enrollments
  const completedCourses = students.filter(
    student => student.status === 'Completed'
  ).length

  // Search and filter students
  const filteredStudents = students.filter(student => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchKey.toLowerCase()) ||
      student.email.toLowerCase().includes(searchKey.toLowerCase())

    const matchesCourse =
      selectedCourse === 'All' || student.course === selectedCourse

    const matchesStatus =
      selectedStatus === 'All' || student.status === selectedStatus

    return matchesSearch && matchesCourse && matchesStatus
  })

  const clearFilters = () => {
    setSearchKey('')
    setSelectedCourse('All')
    setSelectedStatus('All')
  }

  return (
    <div>
      <InstructorHeader />

      <div className="flex">
        <InstructorSidebar />

        <main className="min-w-0 flex-1 bg-gray-50 p-8">
          <h1 className="text-3xl font-bold text-navy">
            My Students
          </h1>

          <p className="mt-2 text-gray-500">
            View enrolled students and their learning progress.
          </p>

          {/* Statistics */}
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <p className="text-gray-500">Total Students</p>
              <h2 className="mt-2 text-3xl font-bold text-primary">
                {totalStudents}
              </h2>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <p className="text-gray-500">Active Learners</p>
              <h2 className="mt-2 text-3xl font-bold text-green-600">
                {activeLearners}
              </h2>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <p className="text-gray-500">Completed Courses</p>
              <h2 className="mt-2 text-3xl font-bold text-deep-blue">
                {completedCourses}
              </h2>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-navy">
              Search and Filter Students
            </h2>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <input
                type="text"
                value={searchKey}
                onChange={e => setSearchKey(e.target.value)}
                placeholder="Search by name or email"
                className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-primary"
              />

              <select
                value={selectedCourse}
                onChange={e => setSelectedCourse(e.target.value)}
                className="rounded-lg border border-gray-300 px-4 py-3"
              >
                <option value="All">All Courses</option>

                {courses.map(course => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>

              <select
                value={selectedStatus}
                onChange={e => setSelectedStatus(e.target.value)}
                className="rounded-lg border border-gray-300 px-4 py-3"
              >
                <option value="All">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-4 font-semibold text-primary hover:underline"
            >
              Clear Filters
            </button>
          </div>

          {/* Student Table */}
          <div className="mt-8 overflow-x-auto rounded-xl bg-white shadow-sm">
            <div className="flex items-center justify-between p-6">
              <h2 className="text-xl font-bold text-navy">
                Student Details
              </h2>

              <span className="text-sm text-gray-500">
                {filteredStudents.length} enrollment(s) found
              </span>
            </div>

            {loading ? (
              <p className="p-8 text-center text-gray-500">
                Loading students...
              </p>
            ) : error ? (
              <div className="p-8 text-center">
                <p className="text-red-500">{error}</p>

                <button
                  onClick={getStudents}
                  className="mt-3 font-semibold text-primary hover:underline"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <table className="w-full min-w-[850px] text-left">
                <thead className="bg-blue-50 text-deep-blue">
                  <tr>
                    <th className="p-4">Student</th>
                    <th className="p-4">Course</th>
                    <th className="p-4">Progress</th>
                    <th className="p-4">Quiz Score</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredStudents.map(student => (
                    <tr key={student.id} className="border-b">
                      <td className="p-4">
                        <p className="font-semibold">
                          {student.name}
                        </p>

                        <p className="text-sm text-gray-500">
                          {student.email}
                        </p>
                      </td>

                      <td className="p-4">
                        {student.course}
                      </td>

                      <td className="p-4">
                        <p className="mb-2 text-sm">
                          {student.progress}%
                        </p>

                        <div
                          className="h-2 w-28 overflow-hidden rounded-full bg-gray-200"
                          role="progressbar"
                          aria-valuenow={student.progress}
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <div
                            className={`h-2 rounded-full ${
                              student.progress === 100
                                ? 'bg-green-500'
                                : 'bg-primary'
                            }`}
                            style={{
                              width: `${student.progress}%`
                            }}
                          ></div>
                        </div>
                      </td>

                      <td className="p-4">
                        {student.quizScore !== null &&
                        student.quizScore !== undefined
                          ? `${student.quizScore}%`
                          : 'Not attempted'}
                      </td>

                      <td className="p-4">
                        <span
                          className={`rounded-full px-3 py-1 text-sm ${
                            student.status === 'Active'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-blue-100 text-deep-blue'
                          }`}
                        >
                          {student.status}
                        </span>
                      </td>
                    </tr>
                  ))}

                  {filteredStudents.length === 0 && (
                    <tr>
                      <td
                        colSpan="5"
                        className="p-8 text-center text-gray-500"
                      >
                        No students found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default InstructorStudents
