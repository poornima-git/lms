
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { FaTrophy, FaCheckCircle, FaTimesCircle } from 'react-icons/fa'
import {
  getMyQuizResultsAPI,
  viewQuizAPI
} from '../../services/allAPI'

function QuizResults() {

  const { quizId } = useParams()
  const [searchParams] = useSearchParams()

  const resultId = searchParams.get('resultId')

  const [result, setResult] = useState(null)
  const [quiz, setQuiz] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadQuizResults()
  }, [quizId, resultId])

  const loadQuizResults = async () => {
    setLoading(true)
    setError('')

    try {
      const [resultsResponse, quizResponse] = await Promise.all([
        getMyQuizResultsAPI(),
        viewQuizAPI(quizId)
      ])

      if (resultsResponse?.response) {
        setError(
          resultsResponse.response.data?.message ||
          'Unable to load quiz results.'
        )
        return
      }

      if (quizResponse?.response) {
        setError(
          quizResponse.response.data?.message ||
          'Unable to load quiz details.'
        )
        return
      }

      const results = resultsResponse?.data || []
      const quizData = quizResponse?.data

      // Find the submitted result using resultId.
      // If resultId is unavailable, use the latest result for this quiz.
      const matchingResults = results.filter(item => {
        const itemQuizId = item.quiz?._id || item.quiz

        return String(itemQuizId) === String(quizId)
      })

      const selectedResult = resultId
        ? matchingResults.find(item => String(item._id) === String(resultId))
        : matchingResults[0]

      if (!selectedResult) {
        setError('No quiz result found. Please attempt the quiz first.')
        return
      }

      setResult(selectedResult)
      setQuiz(quizData)

    } catch (err) {
      setError('Something went wrong while loading quiz results.')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex justify-center items-center">
          <p className="text-primary font-semibold">
            Loading quiz results...
          </p>
        </div>
        <Footer />
      </>
    )
  }

  if (error || !result) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-5">
          <p className="text-red-500 font-semibold text-center">
            {error || 'No quiz result found.'}
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

  const score = result.score || 0
  const totalMarks = result.totalMarks || 0
  const percentage = result.percentage || 0
  const passed = result.passed

  const answers = result.answers || []
  const questions = quiz?.questions || []

  const correctCount = answers.filter(
    answer => answer.isCorrect
  ).length

  const incorrectCount = answers.length - correctCount

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-50 px-5 py-12">

        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-8 md:p-12 text-center">

          <FaTrophy className="text-6xl text-yellow-500 mx-auto" />

          <p className="text-primary font-bold mt-6">
            QUIZ COMPLETED
          </p>

          <h1 className="text-3xl font-extrabold text-deep mt-3">
            Quiz Results
          </h1>

          <p className="text-gray-500 mt-3">
            {quiz?.title || result.quiz?.title || 'Quiz'}
          </p>

          <div className="bg-blue-50 rounded-2xl p-8 mt-8">

            <p className="text-gray-600 font-semibold">
              Your Score
            </p>

            <h2 className="text-6xl font-extrabold text-primary mt-3">
              {percentage}%
            </h2>

            <p className="text-gray-600 mt-2">
              {score} / {totalMarks} marks
            </p>

            <p className={`font-semibold mt-3 ${
              passed ? 'text-green-600' : 'text-red-500'
            }`}>
              {passed ? 'Passed' : 'Needs Improvement'}
            </p>

          </div>

          <div className="grid grid-cols-3 gap-3 mt-8">

            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="text-2xl font-bold">
                {answers.length}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Answered
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="text-2xl font-bold text-green-600">
                {correctCount}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Correct
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="text-2xl font-bold text-red-500">
                {incorrectCount}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Incorrect
              </p>
            </div>

          </div>

          {/* Answer Review */}

          <div className="text-left mt-10">

            <h2 className="text-xl font-bold">
              Answer Review
            </h2>

            {answers.length === 0 ? (
              <p className="text-gray-500 mt-4">
                No answer details available.
              </p>
            ) : (
              answers.map((answer, index) => {

                const question = questions.find(
                  item => String(item._id) === String(answer.questionId)
                )

                const selectedOption =
                  question?.options?.[Number(answer.selectedAnswer)]

                return (
                  <div
                    key={answer.questionId || index}
                    className="border rounded-lg p-4 mt-4"
                  >

                    <div className="flex items-start gap-3">

                      {answer.isCorrect ? (
                        <FaCheckCircle className="text-green-600 mt-1 shrink-0" />
                      ) : (
                        <FaTimesCircle className="text-red-500 mt-1 shrink-0" />
                      )}

                      <div className="flex-1">

                        <p className="font-semibold">
                          Question {index + 1}: {question?.question || 'Question details unavailable'}
                        </p>

                        <p className="text-sm text-gray-600 mt-2">
                          Your answer:{' '}
                          <span className="font-medium">
                            {selectedOption !== undefined
                              ? selectedOption
                              : 'Not answered'}
                          </span>
                        </p>

                        <p className={`text-sm font-semibold mt-2 ${
                          answer.isCorrect
                            ? 'text-green-600'
                            : 'text-red-500'
                        }`}>
                          {answer.isCorrect
                            ? 'Correct Answer'
                            : 'Incorrect Answer'}
                        </p>

                      </div>

                    </div>

                  </div>
                )
              })
            )}

          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-10">

            <Link
              to={`/student/quizzes/${quizId}`}
              className="flex-1 border border-primary text-primary p-3 rounded-lg font-bold text-center"
            >
              Retake Quiz
            </Link>

            <Link
              to="/student"
              className="flex-1 bg-primary text-white p-3 rounded-lg font-bold text-center"
            >
              Back to Dashboard
            </Link>

          </div>

        </div>

      </div>

      <Footer />
    </>
  )
}

export default QuizResults
