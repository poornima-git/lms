
import React, { useEffect, useState } from 'react'
import InstructorHeader from '../components/InstructorHeader'
import InstructorSidebar from '../components/InstructorSidebar'

import {
  getInstructorCoursesAPI,
  getCourseQuizzesAPI,
  getQuizResultsAPI,
  addQuizAPI,
  updateQuizAPI,
  deleteQuizAPI
} from '../../services/allAPI'

function ManageQuizzes() {

  const [courses, setCourses] = useState([])
  const [quizzes, setQuizzes] = useState([])

  const initialQuestion = {
    question: '',
    options: ['', '', '', ''],
    correctAnswer: '',
    marks: 1
  }

  const [quizData, setQuizData] = useState({
    title: '',
    courseId: '',
    timeLimit: ''
  })

  const [questionData, setQuestionData] = useState(initialQuestion)
  const [questions, setQuestions] = useState([])

  const [editingId, setEditingId] = useState(null)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // Load instructor courses and their quizzes
  const loadData = async () => {
    setLoading(true)
    setMessage('')

    try {
      const courseResponse = await getInstructorCoursesAPI()

      if (courseResponse?.response) {
        setMessage(
          courseResponse.response.data?.message || 'Failed to load courses.'
        )
        setLoading(false)
        return
      }

      const courseList = courseResponse?.data || []
      setCourses(courseList)

      if (courseList.length === 0) {
        setQuizzes([])
        setLoading(false)
        return
      }

      // Get quizzes for every course owned by this instructor
      const quizResponses = await Promise.all(
        courseList.map(course => getCourseQuizzesAPI(course._id))
      )

      let allQuizzes = []

      quizResponses.forEach((response, index) => {
        if (!response?.response && Array.isArray(response?.data)) {
          const courseQuizzes = response.data.map(quiz => ({
            ...quiz,
            courseId: courseList[index]._id
          }))

          allQuizzes = [...allQuizzes, ...courseQuizzes]
        }
      })

      // Get actual attempt counts from quiz results
      const quizzesWithAttempts = await Promise.all(
        allQuizzes.map(async quiz => {
          const resultResponse = await getQuizResultsAPI(quiz._id)

          if (resultResponse?.response) {
            return {
              ...quiz,
              attempts: null
            }
          }

          const results = resultResponse?.data || []

          return {
            ...quiz,
            attempts: Array.isArray(results) ? results.length : 0
          }
        })
      )

      setQuizzes(quizzesWithAttempts)

      if (!quizData.courseId && courseList.length > 0) {
        setQuizData(prev => ({
          ...prev,
          courseId: courseList[0]._id
        }))
      }

    } catch (error) {
      console.error('Manage quizzes error:', error)
      setMessage('Something went wrong while loading quizzes.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const getCourseName = (courseId) => {
    const course = courses.find(
      item => String(item._id) === String(courseId)
    )

    return course ? course.title : 'Unknown Course'
  }

  // Calculate total marks from the questions
  const totalMarks = questions.reduce(
    (total, question) => total + Number(question.marks || 0),
    0
  )

  const handleQuizChange = (e) => {
    const { name, value } = e.target

    setQuizData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleQuestionChange = (e) => {
    const { name, value } = e.target

    setQuestionData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...questionData.options]
    updatedOptions[index] = value

    setQuestionData(prev => ({
      ...prev,
      options: updatedOptions
    }))
  }

  // Add a question to the quiz form
  const handleAddQuestion = () => {

    if (!questionData.question.trim()) {
      setMessage('Please enter the question.')
      return
    }

    if (questionData.options.some(option => !option.trim())) {
      setMessage('Please fill in all four answer options.')
      return
    }

    if (
      questionData.correctAnswer === '' ||
      Number(questionData.correctAnswer) < 0 ||
      Number(questionData.correctAnswer) > 3
    ) {
      setMessage('Please select the correct answer.')
      return
    }

    if (!questionData.marks || Number(questionData.marks) <= 0) {
      setMessage('Please enter valid marks for the question.')
      return
    }

    const newQuestion = {
      ...questionData,
      id: Date.now(),
      correctAnswer: Number(questionData.correctAnswer),
      marks: Number(questionData.marks)
    }

    setQuestions(prev => [...prev, newQuestion])
    setQuestionData(initialQuestion)
    setMessage('Question added successfully.')
  }

  const handleRemoveQuestion = (questionId) => {
    setQuestions(prev =>
      prev.filter(question => question.id !== questionId)
    )

    setMessage('Question removed.')
  }

  const handleEditQuestion = (question) => {
    setQuestionData({
      question: question.question,
      options: [...question.options],
      correctAnswer: String(question.correctAnswer),
      marks: question.marks || 1
    })

    setQuestions(prev =>
      prev.filter(item => item.id !== question.id)
    )

    setMessage('Edit the question and add it again.')
  }

  // Convert questions into the format required by the backend
  const prepareQuestions = () => {
    return questions.map(question => ({
      question: question.question,
      options: question.options,
      correctAnswer: Number(question.correctAnswer),
      marks: Number(question.marks)
    }))
  }

  // Create or update quiz
  const handleSaveQuiz = async (e) => {
    e.preventDefault()
    setMessage('')

    if (!quizData.title.trim()) {
      setMessage('Please enter a quiz title.')
      return
    }

    if (!quizData.courseId) {
      setMessage('Please select a course.')
      return
    }

    if (!quizData.timeLimit || Number(quizData.timeLimit) <= 0) {
      setMessage('Please enter a valid time limit.')
      return
    }

    if (questions.length === 0) {
      setMessage('Please add at least one question.')
      return
    }

    if (totalMarks <= 0) {
      setMessage('Total marks must be greater than zero.')
      return
    }

    const quizPayload = {
      title: quizData.title.trim(),
      course: quizData.courseId,
      timeLimit: Number(quizData.timeLimit),
      questions: prepareQuestions()
    }

    setSaving(true)

    try {
      let response

      if (editingId) {
        response = await updateQuizAPI(editingId, quizPayload)
      } else {
        response = await addQuizAPI(quizPayload)
      }

      if (response?.response) {
        setMessage(
          response.response.data?.message ||
          'Unable to save the quiz.'
        )
        return
      }

      setMessage(
        editingId
          ? 'Quiz updated successfully.'
          : 'Quiz created successfully as Draft.'
      )

      handleCancel()
      await loadData()

    } catch (error) {
      console.error('Save quiz error:', error)
      setMessage('Something went wrong while saving the quiz.')
    } finally {
      setSaving(false)
    }
  }

  // Edit existing quiz
  const handleEditQuiz = (quiz) => {
    setEditingId(quiz._id)

    setQuizData({
      title: quiz.title,
      courseId: quiz.courseId || quiz.course,
      timeLimit: quiz.timeLimit || ''
    })

    const existingQuestions = (quiz.questions || []).map(question => ({
      id: question._id || Date.now() + Math.random(),
      question: question.question,
      options: [...question.options],
      correctAnswer: Number(question.correctAnswer),
      marks: question.marks || 1
    }))

    setQuestions(existingQuestions)
    setQuestionData(initialQuestion)
    setMessage('You can now edit this quiz.')

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  // Delete quiz
  const handleDeleteQuiz = async (quizId) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this quiz?'
    )

    if (!confirmDelete) return

    try {
      const response = await deleteQuizAPI(quizId)

      if (response?.response) {
        setMessage(
          response.response.data?.message ||
          'Unable to delete the quiz.'
        )
        return
      }

      if (editingId === quizId) {
        handleCancel()
      }

      setMessage('Quiz deleted successfully.')
      await loadData()

    } catch (error) {
      console.error('Delete quiz error:', error)
      setMessage('Something went wrong while deleting the quiz.')
    }
  }

  // Publish or unpublish quiz
  const handleStatusChange = async (quiz) => {
    const newStatus =
      quiz.status === 'published' ? 'draft' : 'published'

    try {
      const response = await updateQuizAPI(quiz._id, {
        status: newStatus
      })

      if (response?.response) {
        setMessage(
          response.response.data?.message ||
          'Unable to change quiz status.'
        )
        return
      }

      setMessage(
        newStatus === 'published'
          ? 'Quiz published successfully.'
          : 'Quiz moved to Draft.'
      )

      await loadData()

    } catch (error) {
      console.error('Quiz status error:', error)
      setMessage('Something went wrong while changing quiz status.')
    }
  }

  const handleCancel = () => {
    setEditingId(null)

    setQuizData({
      title: '',
      courseId: courses.length > 0 ? courses[0]._id : '',
      timeLimit: ''
    })

    setQuestions([])
    setQuestionData(initialQuestion)
  }

  return (
    <div>
      <InstructorHeader />

      <div className="flex">
        <InstructorSidebar />

        <main className="min-w-0 flex-1 bg-gray-50 p-8">

          <h1 className="text-3xl font-bold text-navy">
            Manage Quizzes
          </h1>

          <p className="mt-2 text-gray-500">
            Create assessments and review quiz information.
          </p>

          {/* Create Quiz Form */}
          <form
            onSubmit={handleSaveQuiz}
            className="mt-8 rounded-xl bg-white p-6 shadow-sm"
          >
            <h2 className="text-xl font-bold text-navy">
              {editingId ? 'Edit Quiz' : 'Create a Quiz'}
            </h2>

            <div className="mt-5">
              <label className="mb-2 block font-semibold">
                Quiz Title
              </label>

              <input
                type="text"
                name="title"
                value={quizData.title}
                onChange={handleQuizChange}
                placeholder="React Fundamentals Quiz"
                className="w-full rounded-lg border border-gray-300 px-4 py-3"
              />
            </div>

            <div className="mt-5">
              <label className="mb-2 block font-semibold">
                Course
              </label>

              <select
                name="courseId"
                value={quizData.courseId}
                onChange={handleQuizChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3"
              >
                <option value="">Select Course</option>

                {courses.map(course => (
                  <option key={course._id} value={course._id}>
                    {course.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block font-semibold">
                  Time Limit (Minutes)
                </label>

                <input
                  type="number"
                  name="timeLimit"
                  min="1"
                  value={quizData.timeLimit}
                  onChange={handleQuizChange}
                  placeholder="20"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3"
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold">
                  Total Marks
                </label>

                <div className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-3">
                  <span className="font-semibold text-navy">
                    {totalMarks}
                  </span>

                  <span className="ml-2 text-sm text-gray-500">
                    (Calculated from question marks)
                  </span>
                </div>
              </div>
            </div>

            {/* Add Question */}
            <div className="mt-8">
              <h3 className="text-lg font-bold text-navy">
                Add Questions
              </h3>

              <div className="mt-4 rounded-lg border border-gray-200 p-5">

                <label className="mb-2 block font-semibold">
                  Question
                </label>

                <input
                  type="text"
                  name="question"
                  value={questionData.question}
                  onChange={handleQuestionChange}
                  placeholder="What is React?"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3"
                />

                <p className="mb-3 mt-5 font-semibold">
                  Answer Options
                </p>

                {questionData.options.map((option, index) => (
                  <input
                    key={index}
                    type="text"
                    value={option}
                    onChange={(e) =>
                      handleOptionChange(index, e.target.value)
                    }
                    placeholder={`Option ${String.fromCharCode(65 + index)}`}
                    className="mb-3 w-full rounded-lg border border-gray-300 px-4 py-3"
                  />
                ))}

                <label className="mb-2 mt-5 block font-semibold">
                  Correct Answer
                </label>

                <select
                  value={questionData.correctAnswer}
                  onChange={(e) =>
                    setQuestionData(prev => ({
                      ...prev,
                      correctAnswer: e.target.value
                    }))
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-3"
                >
                  <option value="">
                    Select Correct Answer
                  </option>

                  {questionData.options.map((option, index) => (
                    <option
                      key={index}
                      value={index}
                      disabled={!option.trim()}
                    >
                      Option {String.fromCharCode(65 + index)} - {option || 'Empty'}
                    </option>
                  ))}
                </select>

                <label className="mb-2 mt-5 block font-semibold">
                  Marks
                </label>

                <input
                  type="number"
                  name="marks"
                  min="1"
                  value={questionData.marks}
                  onChange={handleQuestionChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3"
                />

                <button
                  type="button"
                  onClick={handleAddQuestion}
                  className="mt-5 rounded-lg bg-primary px-6 py-3 font-semibold text-white hover:opacity-90"
                >
                  + Add Question
                </button>
              </div>
            </div>

            {/* Added Questions */}
            {questions.length > 0 && (
              <div className="mt-6">

                <h3 className="text-lg font-bold text-navy">
                  Added Questions ({questions.length})
                </h3>

                <div className="mt-3 space-y-3">

                  {questions.map((question, index) => (
                    <div
                      key={question.id}
                      className="rounded-lg border border-gray-200 p-4"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">

                        <div>
                          <p className="font-semibold text-navy">
                            {index + 1}. {question.question}
                          </p>

                          <p className="mt-2 text-sm text-gray-500">
                            Correct Answer: {question.options[question.correctAnswer]}
                          </p>

                          <p className="mt-1 text-sm text-gray-500">
                            Marks: {question.marks}
                          </p>
                        </div>

                        <div className="flex gap-3">
                          <button
                            type="button"
                            onClick={() => handleEditQuestion(question)}
                            className="font-semibold text-blue-600"
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() => handleRemoveQuestion(question.id)}
                            className="font-semibold text-red-600"
                          >
                            Remove
                          </button>
                        </div>

                      </div>
                    </div>
                  ))}

                </div>
              </div>
            )}

            {message && (
              <p className="mt-5 rounded-lg bg-blue-50 p-3 text-sm font-medium text-deep-blue">
                {message}
              </p>
            )}

            <div className="mt-6 flex flex-wrap gap-3">

              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-primary px-6 py-3 font-semibold text-white disabled:opacity-60"
              >
                {saving
                  ? 'Saving...'
                  : editingId
                    ? 'Update Quiz'
                    : 'Save Quiz'}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-600"
                >
                  Cancel
                </button>
              )}

            </div>
          </form>

          {/* Existing Quizzes */}
          <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">

            <h2 className="text-xl font-bold text-navy">
              Existing Quizzes
            </h2>

            <div className="mt-5 overflow-x-auto">

              <table className="w-full min-w-[850px] text-left">

                <thead className="bg-blue-50 text-deep-blue">
                  <tr>
                    <th className="p-4">Quiz</th>
                    <th className="p-4">Course</th>
                    <th className="p-4">Questions</th>
                    <th className="p-4">Attempts</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>

                <tbody>

                  {loading ? (
                    <tr>
                      <td colSpan="6" className="p-6 text-center text-gray-500">
                        Loading quizzes...
                      </td>
                    </tr>
                  ) : quizzes.map(quiz => (

                    <tr key={quiz._id} className="border-b">

                      <td className="p-4 font-semibold">
                        {quiz.title}
                      </td>

                      <td className="p-4">
                        {getCourseName(quiz.courseId)}
                      </td>

                      <td className="p-4">
                        {quiz.questions?.length || 0}
                      </td>

                      <td className="p-4">
                        {quiz.attempts === null ? '—' : quiz.attempts}
                      </td>

                      <td className="p-4">
                        <span
                          className={`rounded-full px-3 py-1 text-sm font-semibold ${
                            quiz.status === 'published'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {quiz.status === 'published' ? 'Published' : 'Draft'}
                        </span>
                      </td>

                      <td className="p-4">
                        <div className="flex flex-wrap gap-3">

                          <button
                            type="button"
                            onClick={() => handleEditQuiz(quiz)}
                            className="font-semibold text-blue-600"
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() => handleStatusChange(quiz)}
                            className="font-semibold text-green-600"
                          >
                            {quiz.status === 'published' ? 'Unpublish' : 'Publish'}
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeleteQuiz(quiz._id)}
                            className="font-semibold text-red-600"
                          >
                            Delete
                          </button>

                        </div>
                      </td>

                    </tr>

                  ))}

                  {!loading && quizzes.length === 0 && (
                    <tr>
                      <td colSpan="6" className="p-6 text-center text-gray-500">
                        No quizzes available. Create your first quiz.
                      </td>
                    </tr>
                  )}

                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>
    </div>
  )
}

export default ManageQuizzes
