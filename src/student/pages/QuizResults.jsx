
import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import { FaTrophy, FaCheckCircle, FaTimesCircle } from 'react-icons/fa'

function QuizResults() {
  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-50 px-5 py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-8 md:p-12 text-center">
          <FaTrophy className="text-6xl text-yellow-500 mx-auto" />

          <p className="text-primary font-bold mt-6">QUIZ COMPLETED</p>
          <h1 className="text-3xl font-extrabold text-deep mt-3">
            Great effort, Poornima!
          </h1>
          <p className="text-gray-500 mt-3">
            This is an example results screen for your frontend design.
          </p>

          <div className="bg-blue-50 rounded-2xl p-8 mt-8">
            <p className="text-gray-600 font-semibold">Your Sample Score</p>
            <h2 className="text-6xl font-extrabold text-primary mt-3">80%</h2>
            <p className="text-green-600 font-semibold mt-3">Passed</p>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-8">
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="text-2xl font-bold">5</h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">Questions</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="text-2xl font-bold text-green-600">4</h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">Correct</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="text-2xl font-bold text-red-500">1</h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">Incorrect</p>
            </div>
          </div>

          <div className="text-left mt-10">
            <h2 className="text-xl font-bold">Answer Review</h2>

            <div className="border rounded-lg p-4 mt-4">
              <FaCheckCircle className="inline text-green-600 me-2" />
              <span className="font-semibold">Question 1: HTML stands for Hyper Text Markup Language.</span>
              <p className="text-sm text-gray-500 mt-2">Correct answer</p>
            </div>

            <div className="border rounded-lg p-4 mt-4">
              <FaCheckCircle className="inline text-green-600 me-2" />
              <span className="font-semibold">Question 2: The largest heading uses the h1 tag.</span>
              <p className="text-sm text-gray-500 mt-2">Correct answer</p>
            </div>

            <div className="border rounded-lg p-4 mt-4">
              <FaTimesCircle className="inline text-red-500 me-2" />
              <span className="font-semibold">Question 3: The hyperlink element is the a tag.</span>
              <p className="text-sm text-gray-500 mt-2">Sample incorrect response</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <Link to="/quiz" className="flex-1 border border-primary text-primary p-3 rounded-lg font-bold">
              Retake Quiz
            </Link>
            <Link to="/student" className="flex-1 bg-primary text-white p-3 rounded-lg font-bold">
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
