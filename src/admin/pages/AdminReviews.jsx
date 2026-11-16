
import React, { useEffect, useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'

import {
  getAdminReviewsAPI,
  updateAdminReviewStatusAPI
} from '../../services/allAPI'

function AdminReviews() {

  const [reviews, setReviews] = useState([])
  const [searchKey, setSearchKey] = useState('')
  const [ratingFilter, setRatingFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [selectedReview, setSelectedReview] = useState(null)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [updatingId, setUpdatingId] = useState(null)

  // Load reviews from backend
  const fetchReviews = async () => {
    setLoading(true)
    setError('')

    try {
      const response = await getAdminReviewsAPI()

      if (response?.response) {
        setError(response.response.data?.message || 'Failed to load reviews.')
        setReviews([])
      } else {
        const reviewData = Array.isArray(response?.data)
          ? response.data
          : Array.isArray(response?.data?.reviews)
            ? response.data.reviews
            : Array.isArray(response?.reviews)
              ? response.reviews
              : Array.isArray(response)
                ? response
                : []

        setReviews(reviewData)
      }

    } catch (err) {
      console.error('Review loading error:', err)
      setError('Something went wrong while loading reviews.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchReviews()
  }, [])

  // Review statistics
  const visibleReviews = reviews.filter(
    review => review.status !== 'hidden'
  )

  const totalReviews = visibleReviews.length

  const averageRating = totalReviews > 0
    ? (
        visibleReviews.reduce(
          (total, review) => total + Number(review.rating || 0),
          0
        ) / totalReviews
      ).toFixed(1)
    : '0.0'

  const reportedReviews = reviews.filter(
    review => review.status === 'reported'
  ).length

  // Search and filter
  const filteredReviews = reviews.filter(review => {

    const studentName = review.student?.username || ''
    const courseName = review.course?.title || ''
    const comment = review.comment || ''

    const matchesSearch =
      studentName.toLowerCase().includes(searchKey.toLowerCase()) ||
      courseName.toLowerCase().includes(searchKey.toLowerCase()) ||
      comment.toLowerCase().includes(searchKey.toLowerCase())

    const matchesRating =
      ratingFilter === 'All' ||
      Number(review.rating) === Number(ratingFilter)

    const matchesStatus =
      statusFilter === 'All' ||
      review.status === statusFilter.toLowerCase()

    return matchesSearch && matchesRating && matchesStatus
  })

  // Update review status in backend
  const handleUpdateStatus = async (review, status) => {

    if (!review?._id) {
      alert('Review ID is missing.')
      return
    }

    setUpdatingId(review._id)

    try {
      const response = await updateAdminReviewStatusAPI(
        review._id,
        status
      )

      if (response?.response) {
        alert(
          response.response.data?.message ||
          'Failed to update review status.'
        )
        return
      }

      const updatedReview = response?.data || response

      setReviews(prevReviews =>
        prevReviews.map(item =>
          item._id === review._id
            ? {
                ...item,
                ...updatedReview,
                status
              }
            : item
        )
      )

      setSelectedReview(prev =>
        prev?._id === review._id
          ? {
              ...prev,
              ...updatedReview,
              status
            }
          : prev
      )

      alert('Review status updated successfully.')

    } catch (err) {
      console.error('Review status update error:', err)
      alert('Something went wrong while updating the review.')
    } finally {
      setUpdatingId(null)
    }
  }

  // Approve or keep a reported review
  const handleKeepReview = (review) => {
    handleUpdateStatus(review, 'approved')
  }

  // Hide a review
  const handleHideReview = (review) => {
    const confirmHide = window.confirm(
      'Are you sure you want to hide this review?'
    )

    if (confirmHide) {
      handleUpdateStatus(review, 'hidden')
    }
  }

  // Restore a hidden review
  const handleRestoreReview = (review) => {
    handleUpdateStatus(review, 'approved')
  }

  const getStatusStyle = (status) => {
    if (status === 'approved') {
      return 'bg-green-100 text-green-700'
    }

    if (status === 'reported') {
      return 'bg-yellow-100 text-yellow-700'
    }

    return 'bg-red-100 text-red-700'
  }

  const getStatusLabel = (status) => {
    return status
      ? status.charAt(0).toUpperCase() + status.slice(1)
      : 'Unknown'
  }

  const renderStars = (rating) => {
    const value = Math.max(0, Math.min(5, Number(rating) || 0))

    return (
      <span className="text-yellow-500">
        {'★'.repeat(value)}
        {'☆'.repeat(5 - value)}
      </span>
    )
  }

  return (
    <div>
      <AdminHeader />

      <div className="flex">
        <AdminSidebar />

        <main className="min-w-0 flex-1 p-8">

          {/* Page Heading */}
          <h1 className="text-3xl font-bold text-navy">
            Course Reviews
          </h1>

          <p className="mt-2 text-gray-500">
            Monitor student feedback and review reported comments.
          </p>

          {/* Statistics */}
          <div className="mt-8 grid gap-5 md:grid-cols-3">

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <p className="text-gray-500">Total Reviews</p>
              <h2 className="mt-2 text-3xl font-bold text-primary">
                {totalReviews}
              </h2>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <p className="text-gray-500">Average Rating</p>
              <h2 className="mt-2 text-3xl font-bold text-yellow-500">
                {averageRating} / 5
              </h2>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <p className="text-gray-500">Reported Reviews</p>
              <h2 className="mt-2 text-3xl font-bold text-red-500">
                {reportedReviews}
              </h2>
            </div>

          </div>

          {/* Search and Filters */}
          <div className="mt-8 flex flex-wrap gap-4">

            <input
              type="text"
              placeholder="Search student, course or comment..."
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              className="min-w-[220px] flex-1 rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-primary"
            />

            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              className="rounded-lg border border-gray-300 px-4 py-3 outline-none"
            >
              <option value="All">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg border border-gray-300 px-4 py-3 outline-none"
            >
              <option value="All">All Status</option>
              <option value="Approved">Approved</option>
              <option value="Reported">Reported</option>
              <option value="Hidden">Hidden</option>
            </select>

            <button
              type="button"
              onClick={() => {
                setSearchKey('')
                setRatingFilter('All')
                setStatusFilter('All')
              }}
              className="rounded-lg border border-primary px-4 py-3 font-semibold text-primary hover:bg-blue-50"
            >
              Clear Filters
            </button>

          </div>

          {/* Review List */}
          <div className="mt-8 space-y-5">

            {loading ? (
              <div className="rounded-xl bg-white p-8 text-center text-gray-500 shadow-sm">
                Loading reviews...
              </div>
            ) : error ? (
              <div className="rounded-xl bg-white p-8 text-center text-red-500 shadow-sm">
                {error}
              </div>
            ) : filteredReviews.length > 0 ? (
              filteredReviews.map(review => (

                <div
                  key={review._id}
                  className="rounded-xl bg-white p-6 shadow-sm"
                >

                  <div className="flex flex-wrap items-start justify-between gap-4">

                    <div>
                      <h2 className="font-bold text-navy">
                        {review.student?.username || 'Unknown Student'}
                      </h2>

                      <p className="mt-1 text-sm text-gray-500">
                        {review.course?.title || 'Unknown Course'}
                      </p>
                    </div>

                    <span className={`rounded-full px-3 py-1 text-sm ${getStatusStyle(review.status)}`}>
                      {getStatusLabel(review.status)}
                    </span>

                  </div>

                  <p className="mt-3 text-lg">
                    {renderStars(review.rating)}
                  </p>

                  <p className="mt-3 leading-7 text-gray-600">
                    {review.comment}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-3">

                    <button
                      type="button"
                      onClick={() => setSelectedReview(review)}
                      className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50"
                    >
                      View Details
                    </button>

                    {review.status === 'reported' && (
                      <button
                        type="button"
                        disabled={updatingId === review._id}
                        onClick={() => handleKeepReview(review)}
                        className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-deep-blue disabled:opacity-50"
                      >
                        {updatingId === review._id ? 'Updating...' : 'Keep Review'}
                      </button>
                    )}

                    {review.status !== 'hidden' ? (
                      <button
                        type="button"
                        disabled={updatingId === review._id}
                        onClick={() => handleHideReview(review)}
                        className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-500 hover:bg-red-50 disabled:opacity-50"
                      >
                        Hide Review
                      </button>
                    ) : (
                      <button
                        type="button"
                        disabled={updatingId === review._id}
                        onClick={() => handleRestoreReview(review)}
                        className="rounded-lg border border-green-200 px-4 py-2 text-sm font-semibold text-green-600 hover:bg-green-50 disabled:opacity-50"
                      >
                        Restore Review
                      </button>
                    )}

                  </div>

                </div>

              ))
            ) : (
              <div className="rounded-xl bg-white p-8 text-center text-gray-500 shadow-sm">
                No reviews found.
              </div>
            )}

          </div>

          <p className="mt-4 text-sm text-gray-500">
            Showing {filteredReviews.length} of {reviews.length} reviews
          </p>

          {/* Selected Review Details */}
          {selectedReview && (
            <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">

              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-navy">
                  Review Details
                </h2>

                <button
                  type="button"
                  onClick={() => setSelectedReview(null)}
                  className="font-semibold text-red-500"
                >
                  Close
                </button>
              </div>

              <div className="mt-5 space-y-3 text-gray-600">

                <p>
                  <strong>Student:</strong> {selectedReview.student?.username || 'Unknown Student'}
                </p>

                <p>
                  <strong>Course:</strong> {selectedReview.course?.title || 'Unknown Course'}
                </p>

                <p>
                  <strong>Rating:</strong> {selectedReview.rating} / 5
                </p>

                <p>
                  <strong>Status:</strong> {getStatusLabel(selectedReview.status)}
                </p>

                <p>
                  <strong>Comment:</strong> {selectedReview.comment}
                </p>

              </div>

              {selectedReview.status === 'reported' && (
                <button
                  type="button"
                  disabled={updatingId === selectedReview._id}
                  onClick={() => handleKeepReview(selectedReview)}
                  className="mt-5 rounded-lg bg-primary px-5 py-2 font-semibold text-white disabled:opacity-50"
                >
                  Keep Review
                </button>
              )}

              {selectedReview.status === 'hidden' && (
                <button
                  type="button"
                  disabled={updatingId === selectedReview._id}
                  onClick={() => handleRestoreReview(selectedReview)}
                  className="mt-5 rounded-lg border border-green-200 px-5 py-2 font-semibold text-green-600 disabled:opacity-50"
                >
                  Restore Review
                </button>
              )}

            </div>
          )}

        </main>
      </div>
    </div>
  )
}

export default AdminReviews
