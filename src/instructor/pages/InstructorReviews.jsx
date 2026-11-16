
import React, { useEffect, useState } from 'react'
import { getInstructorReviewsAPI } from '../../services/allAPI'
import InstructorHeader from '../components/InstructorHeader'
import InstructorSidebar from '../components/InstructorSidebar'

function InstructorReviews() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [searchKey, setSearchKey] = useState('')
  const [selectedCourse, setSelectedCourse] = useState('All')
  const [selectedRating, setSelectedRating] = useState('All')

  // Load instructor reviews from backend
  const getReviews = async () => {
    try {
      setLoading(true)
      setError('')

      const response = await getInstructorReviewsAPI()

      if (response?.response) {
        setError(
          response.response.data?.message || 'Failed to load reviews.'
        )
        return
      }

      const reviewData = response.data.map(item => ({
        id: item._id,
        studentName: item.student?.username || 'Unknown Student',
        course: item.course?.title || 'Unknown Course',
        rating: Number(item.rating) || 0,
        date: item.createdAt
          ? new Date(item.createdAt).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })
          : 'Date unavailable',
        comment: item.comment || 'No comment provided.'
      }))

      setReviews(reviewData)

    } catch (error) {
      console.error('Error loading reviews:', error)

      setError(
        error.response?.data?.message ||
        'Failed to load reviews. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getReviews()
  }, [])

  // Get course names from actual reviews
  const courses = [
    ...new Set(reviews.map(review => review.course))
  ]

  // Review statistics
  const totalReviews = reviews.length

  const averageRating =
    totalReviews > 0
      ? (
          reviews.reduce((total, review) => total + review.rating, 0) /
          totalReviews
        ).toFixed(1)
      : '0.0'

  const positiveReviews = reviews.filter(
    review => review.rating >= 4
  ).length

  const positivePercentage =
    totalReviews > 0
      ? Math.round((positiveReviews / totalReviews) * 100)
      : 0

  // Search and filter reviews
  const filteredReviews = reviews.filter(review => {
    const matchesSearch =
      review.studentName.toLowerCase().includes(searchKey.toLowerCase()) ||
      review.course.toLowerCase().includes(searchKey.toLowerCase())

    const matchesCourse =
      selectedCourse === 'All' || review.course === selectedCourse

    const matchesRating =
      selectedRating === 'All' ||
      review.rating === Number(selectedRating)

    return matchesSearch && matchesCourse && matchesRating
  })

  const clearFilters = () => {
    setSearchKey('')
    setSelectedCourse('All')
    setSelectedRating('All')
  }

  const renderStars = rating => {
    return (
      <span className="text-lg tracking-wide text-yellow-500">
        {'★'.repeat(rating)}
        {'☆'.repeat(5 - rating)}
      </span>
    )
  }

  return (
    <div>
      <InstructorHeader />

      <div className="flex">
        <InstructorSidebar />

        <main className="min-w-0 flex-1 bg-gray-50 p-8">
          <h1 className="text-3xl font-bold text-navy">
            Course Reviews
          </h1>

          <p className="mt-2 text-gray-500">
            Read student feedback about your courses.
          </p>

          {/* Review Statistics */}
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-500">Average Rating</p>

              <h2 className="mt-2 text-4xl font-bold text-yellow-500">
                {averageRating} / 5
              </h2>

              <p className="mt-2 text-yellow-500">
                {renderStars(Math.round(Number(averageRating)))}
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-500">Total Reviews</p>

              <h2 className="mt-2 text-4xl font-bold text-primary">
                {totalReviews}
              </h2>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-500">Positive Reviews</p>

              <h2 className="mt-2 text-4xl font-bold text-green-600">
                {positivePercentage}%
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Ratings of 4 stars or above
              </p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-navy">
              Search and Filter Reviews
            </h2>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <input
                type="text"
                value={searchKey}
                onChange={e => setSearchKey(e.target.value)}
                placeholder="Search student or course"
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
                value={selectedRating}
                onChange={e => setSelectedRating(e.target.value)}
                className="rounded-lg border border-gray-300 px-4 py-3"
              >
                <option value="All">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
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

          {/* Reviews List */}
          <div className="mt-8">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-bold text-navy">
                Student Reviews
              </h2>

              <span className="text-sm text-gray-500">
                {filteredReviews.length} review(s) found
              </span>
            </div>

            {loading ? (
              <div className="rounded-xl bg-white p-8 text-center shadow-sm">
                <p className="text-gray-500">Loading reviews...</p>
              </div>
            ) : error ? (
              <div className="rounded-xl bg-white p-8 text-center shadow-sm">
                <p className="text-red-500">{error}</p>

                <button
                  onClick={getReviews}
                  className="mt-3 font-semibold text-primary hover:underline"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <div className="space-y-5">
                {filteredReviews.map(review => (
                  <div
                    key={review.id}
                    className="rounded-xl bg-white p-6 shadow-sm"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="font-bold text-navy">
                          {review.studentName}
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                          {review.course} · {review.date}
                        </p>
                      </div>

                      {renderStars(review.rating)}
                    </div>

                    <p className="mt-4 leading-7 text-gray-600">
                      {review.comment}
                    </p>
                  </div>
                ))}

                {filteredReviews.length === 0 && (
                  <div className="rounded-xl bg-white p-8 text-center shadow-sm">
                    <p className="font-semibold text-gray-600">
                      No reviews found.
                    </p>

                    <p className="mt-2 text-sm text-gray-500">
                      Try changing your search or filters.
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

export default InstructorReviews
