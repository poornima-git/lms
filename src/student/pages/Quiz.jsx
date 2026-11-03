
import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import { FaClock, FaQuestionCircle } from 'react-icons/fa'

function Quiz() {
  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-50 px-5 md:px-20 py-10">
        <div className="max-w-4xl mx-auto">
          <Link to="/lesson/1" className="text-primary font-semibold">
            ← Back to Lesson
          </Link>

          <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10 mt-6">
            <div className="flex flex-col sm:flex-row justify-between gap-5">
              <div>
                <p className="text-primary font-bold text-sm">WEB DEVELOPMENT</p>
                <h1 className="text-3xl font-extrabold mt-2">HTML Basics Quiz</h1>
                <p className="text-gray-500 mt-2">Test your understanding of HTML.</p>
              </div>

              <div className="bg-blue-50 text-deep rounded-xl p-4 h-fit">
                <FaClock className="inline me-2" />
                <span className="font-bold">15 Minutes</span>
                <p className="text-sm mt-2">5 Questions</p>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 mt-7 text-sm text-deep">
              <FaQuestionCircle className="inline me-2" />
              Select one answer for each question. This is a static design preview;
              submitting answers does not calculate a score yet.
            </div>

            <form className="mt-8">
              <div className="border border-gray-200 rounded-xl p-5 mb-5">
                <p className="text-sm text-primary font-bold">QUESTION 01</p>
                <h2 className="font-bold text-lg mt-2">
                  What does HTML stand for?
                </h2>

                <div className="space-y-3 mt-5">
                  <label className="flex gap-3 border rounded-lg p-3">
                    <input type="radio" name="question1" />
                    <span>Hyper Text Markup Language</span>
                  </label>
                  <label className="flex gap-3 border rounded-lg p-3">
                    <input type="radio" name="question1" />
                    <span>High Text Machine Language</span>
                  </label>
                  <label className="flex gap-3 border rounded-lg p-3">
                    <input type="radio" name="question1" />
                    <span>Hyper Tool Multi Language</span>
                  </label>
                </div>
              </div>

              <div className="border border-gray-200 rounded-xl p-5 mb-5">
                <p className="text-sm text-primary font-bold">QUESTION 02</p>
                <h2 className="font-bold text-lg mt-2">
                  Which HTML tag is used for the largest heading?
                </h2>

                <div className="space-y-3 mt-5">
                  <label className="flex gap-3 border rounded-lg p-3">
                    <input type="radio" name="question2" />
                    <span>{'<h6>'}</span>
                  </label>
                  <label className="flex gap-3 border rounded-lg p-3">
                    <input type="radio" name="question2" />
                    <span>{'<h1>'}</span>
                  </label>
                  <label className="flex gap-3 border rounded-lg p-3">
                    <input type="radio" name="question2" />
                    <span>{'<head>'}</span>
                  </label>
                </div>
              </div>

              <div className="border border-gray-200 rounded-xl p-5 mb-5">
                <p className="text-sm text-primary font-bold">QUESTION 03</p>
                <h2 className="font-bold text-lg mt-2">
                  Which tag creates a hyperlink?
                </h2>

                <div className="space-y-3 mt-5">
                  <label className="flex gap-3 border rounded-lg p-3">
                    <input type="radio" name="question3" />
                    <span>{'<a>'}</span>
                  </label>
                  <label className="flex gap-3 border rounded-lg p-3">
                    <input type="radio" name="question3" />
                    <span>{'<p>'}</span>
                  </label>
                  <label className="flex gap-3 border rounded-lg p-3">
                    <input type="radio" name="question3" />
                    <span>{'<img>'}</span>
                  </label>
                </div>
              </div>

              <div className="border border-gray-200 rounded-xl p-5 mb-5">
                <p className="text-sm text-primary font-bold">QUESTION 04</p>
                <h2 className="font-bold text-lg mt-2">
                  Which attribute specifies an image source?
                </h2>

                <div className="space-y-3 mt-5">
                  <label className="flex gap-3 border rounded-lg p-3">
                    <input type="radio" name="question4" />
                    <span>href</span>
                  </label>
                  <label className="flex gap-3 border rounded-lg p-3">
                    <input type="radio" name="question4" />
                    <span>src</span>
                  </label>
                  <label className="flex gap-3 border rounded-lg p-3">
                    <input type="radio" name="question4" />
                    <span>link</span>
                  </label>
                </div>
              </div>

              <div className="border border-gray-200 rounded-xl p-5 mb-5">
                <p className="text-sm text-primary font-bold">QUESTION 05</p>
                <h2 className="font-bold text-lg mt-2">
                  Which element creates a paragraph?
                </h2>

                <div className="space-y-3 mt-5">
                  <label className="flex gap-3 border rounded-lg p-3">
                    <input type="radio" name="question5" />
                    <span>{'<p>'}</span>
                  </label>
                  <label className="flex gap-3 border rounded-lg p-3">
                    <input type="radio" name="question5" />
                    <span>{'<div>'}</span>
                  </label>
                  <label className="flex gap-3 border rounded-lg p-3">
                    <input type="radio" name="question5" />
                    <span>{'<span>'}</span>
                  </label>
                </div>
              </div>

              <Link to="/quiz-results" className="block bg-primary text-white text-center font-bold p-4 rounded-lg">
                Submit Quiz
              </Link>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Quiz
