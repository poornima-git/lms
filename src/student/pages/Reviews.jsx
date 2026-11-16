
import React, { useState } from 'react'

import {
  addReviewAPI,
  updateReviewAPI,
  deleteReviewAPI
} from '../../services/allAPI'

function Reviews({
  courseId,
  isEnrolled,
  reviews = [],
  rating,
  totalReviews,
  onRefresh
}) {

  // New review form states
  const [newRating, setNewRating] = useState(5)
  const [comment, setComment] = useState('')

  // Edit review states
  const [editingId, setEditingId] = useState(null)
  const [editRating, setEditRating] = useState(5)
  const [editComment, setEditComment] = useState('')

  // Status states
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  // Get logged-in user
  const getLoggedUser = () => {
    try {
      return JSON.parse(sessionStorage.getItem('user') || 'null')
    } catch {
      return null
    }
  }

  const user = getLoggedUser()

  const canReview = isEnrolled && user?.role === 'student'

  // Get current user's ID
  const currentUserId = user?._id || user?.id || user?.userId

  // Find current student's review
  const myReview = reviews.find(review => {
    const studentId = review.student?._id || review.student

    return String(studentId) === String(currentUserId)
  })

  // Display rating stars
  const renderStars = (value) => {
    const safeRating = Math.max(0, Math.min(5, Number(value) || 0))

    return (
      <span className="text-yellow-500 text-lg">
        {'★'.repeat(safeRating)}
        {'☆'.repeat(5 - safeRating)}
      </span>
    )
  }

  // Add review
  const handleAddReview = async (e) => {
    e.preventDefault()

    setError('')
    setMessage('')

    if (!comment.trim()) {
      setError('Please enter your review comment.')
      return
    }

    try {
      setLoading(true)

      const response = await addReviewAPI({
        course: courseId,
        rating: Number(newRating),
        comment: comment.trim()
      })

      if (!response || response?.response) {
        setError(
          response?.response?.data?.message ||
          'Failed to add review.'
        )
        return
      }

      setComment('')
      setNewRating(5)
      setMessage('Review added successfully!')

      await onRefresh?.()

    } catch (err) {
      console.log('Add review error:', err)
      setError('Something went wrong while adding your review.')
    } finally {
      setLoading(false)
    }
  }

  // Start editing
  const handleEdit = (review) => {
    setEditingId(review._id)
    setEditRating(review.rating)
    setEditComment(review.comment)

    setError('')
    setMessage('')
  }

  // Update review
  const handleUpdateReview = async (e) => {
    e.preventDefault()

    setError('')
    setMessage('')

    if (!editComment.trim()) {
      setError('Please enter your review comment.')
      return
    }

    try {
      setLoading(true)

      const response = await updateReviewAPI(editingId, {
        rating: Number(editRating),
        comment: editComment.trim()
      })

      if (!response || response?.response) {
        setError(
          response?.response?.data?.message ||
          'Failed to update review.'
        )
        return
      }

      setEditingId(null)
      setMessage('Review updated successfully!')

      await onRefresh?.()

    } catch (err) {
      console.log('Update review error:', err)
      setError('Something went wrong while updating your review.')
    } finally {
      setLoading(false)
    }
  }

  // Delete review
  const handleDeleteReview = async (reviewId) => {

    const confirmDelete = window.confirm(
      'Are you sure you want to delete your review?'
    )

    if (!confirmDelete) return

    setError('')
    setMessage('')

    try {
      setLoading(true)

      const response = await deleteReviewAPI(reviewId)

      if (!response || response?.response) {
        setError(
          response?.response?.data?.message ||
          'Failed to delete review.'
        )
        return
      }

      setEditingId(null)
      setMessage('Review deleted successfully!')

      await onRefresh?.()

    } catch (err) {
      console.log('Delete review error:', err)
      setError('Something went wrong while deleting your review.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white shadow-sm rounded-xl p-6">

      <h2 className="font-bold text-xl">
        Student Reviews
      </h2>

      {/* Course Rating Summary */}
      <div className="flex items-center gap-3 mt-5">

        <h3 className="text-4xl font-extrabold">
          {Number(rating || 0).toFixed(1)}
        </h3>

        <div>
          {renderStars(rating)}

          <p className="text-xs text-gray-500">
            {totalReviews} Reviews
          </p>
        </div>

      </div>

      <hr className="my-5" />

      {/* Add Review Form */}
      {canReview && !myReview && (

        <form onSubmit={handleAddReview} className="mb-6">

          <h3 className="font-semibold text-gray-700">
            Write a Review
          </h3>

          <label className="block text-sm text-gray-600 mt-3 mb-2">
            Your Rating
          </label>

          <select
            value={newRating}
            onChange={e => setNewRating(Number(e.target.value))}
            className="border rounded-lg p-2 w-full"
          >
            <option value="5">5 - Excellent</option>
            <option value="4">4 - Very Good</option>
            <option value="3">3 - Good</option>
            <option value="2">2 - Fair</option>
            <option value="1">1 - Poor</option>
          </select>

          <textarea
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="Share your learning experience..."
            rows="4"
            className="w-full border rounded-lg p-3 mt-3 outline-none focus:border-primary"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-white px-5 py-2 rounded-lg mt-3 disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit Review'}
          </button>

        </form>
      )}

      {/* Existing User's Review */}
      {canReview && myReview && (

        <div className="mb-6 bg-lavender p-4 rounded-lg">

          <h3 className="font-semibold">
            Your Review
          </h3>

          {editingId === myReview._id ? (

            <form onSubmit={handleUpdateReview} className="mt-3">

              <select
                value={editRating}
                onChange={e => setEditRating(Number(e.target.value))}
                className="border rounded-lg p-2 w-full"
              >
                <option value="5">5 - Excellent</option>
                <option value="4">4 - Very Good</option>
                <option value="3">3 - Good</option>
                <option value="2">2 - Fair</option>
                <option value="1">1 - Poor</option>
              </select>

              <textarea
                value={editComment}
                onChange={e => setEditComment(e.target.value)}
                rows="3"
                className="w-full border rounded-lg p-3 mt-3"
              />

              <div className="flex gap-3 mt-3">

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-primary text-white px-4 py-2 rounded-lg disabled:opacity-50"
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>

                <button
                  type="button"
                  disabled={loading}
                  onClick={() => setEditingId(null)}
                  className="border px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>

              </div>

            </form>

          ) : (

            <>
              {renderStars(myReview.rating)}

              <p className="text-gray-600 mt-2">
                {myReview.comment}
              </p>

              <div className="flex gap-4 mt-3">

                <button
                  type="button"
                  disabled={loading}
                  onClick={() => handleEdit(myReview)}
                  className="text-primary font-semibold"
                >
                  Edit
                </button>

                <button
                  type="button"
                  disabled={loading}
                  onClick={() => handleDeleteReview(myReview._id)}
                  className="text-red-600 font-semibold"
                >
                  Delete
                </button>

              </div>
            </>
          )}

        </div>
      )}

      {/* Enrollment Messages */}
      {!user && (
        <p className="text-sm text-gray-500 mb-4">
          Log in as a student and enroll in this course to write a review.
        </p>
      )}

      {user?.role === 'student' && !isEnrolled && (
        <p className="text-sm text-gray-500 mb-4">
          Enroll in this course to write a review.
        </p>
      )}

      {/* Success and Error Messages */}
      {error && (
        <p className="text-red-600 text-sm mt-3">
          {error}
        </p>
      )}

      {message && (
        <p className="text-green-600 text-sm mt-3">
          {message}
        </p>
      )}

      <hr className="my-5" />

      {/* All Reviews */}
      <h3 className="font-semibold mb-4">
        All Student Reviews
      </h3>

      {reviews.length > 0 ? (

        reviews.map(review => (

          <div
            key={review._id}
            className="mb-5 last:mb-0 border-b pb-4 last:border-0"
          >

            <h4 className="font-bold">
              {review.student?.username || 'Student'}
            </h4>

            {renderStars(review.rating)}

            <p className="text-gray-500 text-sm mt-2">
              {review.comment}
            </p>

          </div>

        ))

      ) : (

        <p className="text-gray-500 text-sm">
          No student reviews available yet.
        </p>

      )}

    </div>
  )
}

export default Reviews
