
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FaClock, FaQuestionCircle } from 'react-icons/fa'

import {
  viewQuizAPI,
  submitQuizAPI
} from '../../services/allAPI'

function Quiz() {

  const { quizId } = useParams()
  const navigate = useNavigate()

  const [quiz, setQuiz] = useState(null)
  const [answers, setAnswers] = useState({})
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  // Load actual quiz from backend
  const loadQuiz = async () => {

    setLoading(true)
    setError('')

    try {

      const response = await viewQuizAPI(quizId)

      if (response?.response) {
        setError(
          response.response.data?.message ||
          'Unable to load this quiz.'
        )
        return
      }

      if (!response?.data?._id) {
        setError('Quiz not found or unavailable.')
        return
      }

      setQuiz(response.data)

    } catch (err) {

      console.log(err)
      setError('Something went wrong while loading the quiz.')

    } finally {

      setLoading(false)

    }

  }

  useEffect(() => {
    loadQuiz()
  }, [quizId])

  // Select an answer
  const handleAnswerChange = (questionId, selectedAnswer) => {

    setAnswers(previousAnswers => ({
      ...previousAnswers,
      [questionId]: selectedAnswer
    }))

  }

  // Submit quiz to backend
  const handleSubmit = async (e) => {

    e.preventDefault()

    if (!quiz) return

    const questions = quiz.questions || []

    if (questions.some(question => answers[question._id] === undefined)) {
      alert('Please answer all questions before submitting.')
      return
    }

    // Backend expects questionId and numeric selectedAnswer
    const answerData = questions.map(question => ({
      questionId: question._id,
      selectedAnswer: answers[question._id]
    }))

    setSubmitting(true)

    try {

      const response = await submitQuizAPI(quizId, {
        answers: answerData
      })

      if (response?.response) {
        alert(
          response.response.data?.message ||
          'Unable to submit your quiz.'
        )
        return
      }

      const result = response?.data?.result

      if (!result) {
        alert('Quiz submitted, but the result could not be retrieved.')
        return
      }

      // Navigate with the actual backend result
      navigate(
        `/student/quiz-results/${quizId}?resultId=${result._id}&score=${result.score}&total=${result.totalMarks}&percentage=${result.percentage}&passed=${result.passed}`
      )

    } catch (err) {

      console.log(err)
      alert('Something went wrong while submitting the quiz.')

    } finally {

      setSubmitting(false)

    }

  }

  // Loading screen
  if (loading) {

    return (
      <>
        <Header />

        <div className="min-h-[60vh] flex justify-center items-center">
          <p className="text-gray-500">
            Loading quiz...
          </p>
        </div>

        <Footer />
      </>
    )

  }

  // Error screen
  if (error || !quiz) {

    return (
      <>
        <Header />

        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-5 text-center">

          <h1 className="text-3xl font-bold text-deep">
            Quiz Not Available
          </h1>

          <p className="text-gray-500 mt-3">
            {error || 'The requested quiz is not available.'}
          </p>

          <Link
            to="/student/my-courses"
            className="bg-primary text-white px-6 py-3 rounded-lg mt-5"
          >
            Back to My Courses
          </Link>

        </div>

        <Footer />
      </>
    )

  }

  const questions = quiz.questions || []

  const lessonId = quiz.lesson?._id || quiz.lesson

  const courseName =
    quiz.course?.title || quiz.courseName || 'MY COURSE'

  const answeredCount = Object.keys(answers).length

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-50 px-5 md:px-20 py-10">

        <div className="max-w-4xl mx-auto">

          {lessonId ? (

            <Link
              to={`/student/lessons/${lessonId}`}
              className="text-primary font-semibold"
            >
              ← Back to Lesson
            </Link>

          ) : (

            <Link
              to="/student/my-courses"
              className="text-primary font-semibold"
            >
              ← Back to My Courses
            </Link>

          )}

          <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10 mt-6">

            {/* Quiz Heading */}
            <div className="flex flex-col sm:flex-row justify-between gap-5">

              <div>

                <p className="text-primary font-bold text-sm">
                  {courseName.toUpperCase()}
                </p>

                <h1 className="text-3xl font-extrabold mt-2">
                  {quiz.title}
                </h1>

                <p className="text-gray-500 mt-2">
                  {quiz.description || 'Test your understanding of this course.'}
                </p>

              </div>

              <div className="bg-blue-50 text-deep rounded-xl p-4 h-fit">

                <FaClock className="inline me-2" />

                <span className="font-bold">
                  {quiz.timeLimit || 0} Minutes
                </span>

                <p className="text-sm mt-2">
                  {questions.length} Questions
                </p>

              </div>

            </div>

            {/* Instructions */}
            <div className="bg-blue-50 rounded-lg p-4 mt-7 text-sm text-deep">

              <FaQuestionCircle className="inline me-2" />

              Select one answer for each question and submit your quiz.

            </div>

            {/* Answered Questions */}
            <div className="flex justify-between items-center mt-6">

              <p className="text-gray-600 font-semibold">
                Answered Questions
              </p>

              <p className="text-primary font-bold">
                {answeredCount} / {questions.length}
              </p>

            </div>

            {/* Quiz Questions */}
            <form onSubmit={handleSubmit} className="mt-8">

              {questions.map((question, index) => (

                <div
                  key={question._id}
                  className="border border-gray-200 rounded-xl p-5 mb-5"
                >

                  <p className="text-sm text-primary font-bold">
                    QUESTION {String(index + 1).padStart(2, '0')}
                  </p>

                  <h2 className="font-bold text-lg mt-2">
                    {question.question}
                  </h2>

                  <div className="space-y-3 mt-5">

                    {question.options.map((option, optionIndex) => (

                      <label
                        key={optionIndex}
                        className={`flex gap-3 items-center border rounded-lg p-3 cursor-pointer ${
                          answers[question._id] === optionIndex
                            ? 'border-primary bg-blue-50'
                            : 'border-gray-200 hover:bg-gray-50'
                        }`}
                      >

                        <input
                          type="radio"
                          name={`question-${question._id}`}
                          value={optionIndex}
                          checked={
                            answers[question._id] === optionIndex
                          }
                          onChange={() =>
                            handleAnswerChange(
                              question._id,
                              optionIndex
                            )
                          }
                          className="accent-blue-600"
                        />

                        <span>{option}</span>

                      </label>

                    ))}

                  </div>

                </div>

              ))}

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting || questions.length === 0}
                className="w-full bg-primary text-white text-center font-bold p-4 rounded-lg hover:opacity-90 disabled:opacity-60"
              >

                {submitting
                  ? 'Submitting Quiz...'
                  : 'Submit Quiz'}

              </button>

            </form>

          </div>

        </div>

      </div>

      <Footer />
    </>
  )
}

export default Quiz
