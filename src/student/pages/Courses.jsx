
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { FaStar, FaSearch } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'
import { getAllCoursesAPI } from '../../services/allAPI'

function Courses() {

  const location = useLocation()

  // Get search and category values from URL
  const params = new URLSearchParams(location.search)

  const [searchKey, setSearchKey] = useState(params.get('search') || '')

  const [selectedCategories, setSelectedCategories] = useState(
    params.get('category') ? [params.get('category')] : []
  )

  const [selectedLevels, setSelectedLevels] = useState([])

  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Fetch courses from backend
  const fetchCourses = async () => {
    setLoading(true)
    setError('')

    try {
      const category =
        selectedCategories.length === 1
          ? selectedCategories[0]
          : ''

      const level =
        selectedLevels.length === 1
          ? selectedLevels[0]
          : ''

      const response = await getAllCoursesAPI(
        searchKey,
        category,
        level
      )

      if (response?.response) {
        setError(
          response.response.data?.message ||
          'Failed to load courses'
        )
        setCourses([])
      } else {
        setCourses(response?.data || [])
      }

    } catch (err) {
      console.log(err)
      setError('Something went wrong while loading courses')
      setCourses([])
    } finally {
      setLoading(false)
    }
  }

  // Fetch whenever search or filters change
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCourses()
    }, 300)

    return () => clearTimeout(timer)
  }, [searchKey, selectedCategories, selectedLevels])

  // Handle search input
  const handleSearch = (e) => {
    setSearchKey(e.target.value)
  }

  // Handle category checkbox
  const handleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter(item => item !== category)
      )
    } else {
      setSelectedCategories([...selectedCategories, category])
    }
  }

  // Handle difficulty checkbox
  const handleLevel = (level) => {
    if (selectedLevels.includes(level)) {
      setSelectedLevels(
        selectedLevels.filter(item => item !== level)
      )
    } else {
      setSelectedLevels([...selectedLevels, level])
    }
  }

  // Clear all filters
  const clearFilters = () => {
    setSearchKey('')
    setSelectedCategories([])
    setSelectedLevels([])
  }

  // Display image from backend
  const SERVER_URL = 'http://localhost:3000'

  return (
    <>
      <Header />

      {/* Page Heading */}
      <div className="bg-deep text-white text-center py-14 px-5">
        <p className="text-[#AFAFD0] font-bold tracking-widest">
          OUR LEARNING LIBRARY
        </p>

        <h1 className="text-4xl font-extrabold mt-3">
          Explore All Courses
        </h1>

        <p className="text-gray-300 mt-3">
          Find the right course to develop your skills.
        </p>
      </div>

      <div className="px-5 md:px-20 py-12">

        {/* Search Section */}
        <div className="md:flex justify-between items-center mb-10">

          <div>
            <h2 className="text-2xl font-bold">
              Discover Courses
            </h2>

            <p className="text-gray-500 mt-1">
              Showing {courses.length} courses
            </p>
          </div>

          <div className="flex mt-5 md:mt-0">
            <input
              type="text"
              placeholder="Search by course name"
              value={searchKey}
              onChange={handleSearch}
              className="border border-gray-200 bg-white p-3 rounded-l-lg w-full md:w-72 outline-none"
            />

            <button
              type="button"
              className="bg-primary text-white px-5 rounded-r-lg"
            >
              <FaSearch />
            </button>
          </div>

        </div>

        <div className="md:grid grid-cols-4 gap-8">

          {/* Filter Section */}
          <div className="bg-white p-5 rounded-xl shadow-sm h-fit">

            <h3 className="text-xl font-bold mb-5">
              Filter Courses
            </h3>

            {/* Categories */}
            <h4 className="font-bold mb-3">
              Categories
            </h4>

            <div className="space-y-3 text-gray-600">

              {[
                'Development',
                'Design',
                'Business',
                'Marketing',
                'Data Science'
              ].map(category => (

                <label key={category} className="flex items-center">
                  <input
                    type="checkbox"
                    className="me-2"
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategory(category)}
                  />

                  {category}
                </label>

              ))}

            </div>

            <hr className="my-5" />

            {/* Difficulty Levels */}
            <h4 className="font-bold mb-3">
              Difficulty Level
            </h4>

            <div className="space-y-3 text-gray-600">

              {[
                'Beginner',
                'Intermediate',
                'Advanced'
              ].map(level => (

                <label key={level} className="flex items-center">
                  <input
                    type="checkbox"
                    className="me-2"
                    checked={selectedLevels.includes(level)}
                    onChange={() => handleLevel(level)}
                  />

                  {level}
                </label>

              ))}

            </div>

            <button
              onClick={clearFilters}
              className="bg-primary text-white w-full p-3 rounded-lg mt-6"
            >
              Clear Filters
            </button>

          </div>

          {/* Course Cards */}
          <div className="col-span-3 grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 md:mt-0">

            {loading ? (

              <div className="col-span-full text-center py-16">
                <p className="text-gray-500">
                  Loading courses...
                </p>
              </div>

            ) : error ? (

              <div className="col-span-full text-center py-16">
                <h3 className="text-xl font-bold text-red-600">
                  {error}
                </h3>

                <button
                  onClick={fetchCourses}
                  className="bg-primary text-white px-5 py-2 rounded-lg mt-5"
                >
                  Try Again
                </button>
              </div>

            ) : courses.length > 0 ? (

              courses.map(course => (

                <div
                  key={course._id}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl"
                >

                  <img
                    className="w-full h-44 object-cover"
                    src={
                      course.image
                        ? `${SERVER_URL}${course.image}`
                        : 'https://via.placeholder.com/800x450?text=Course'
                    }
                    alt={course.title}
                  />

                  <div className="p-4">

                    <span className="text-xs bg-lavender text-primary px-3 py-1 rounded-full">
                      {course.category}
                    </span>

                    <h3 className="font-bold text-lg mt-3">
                      {course.title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-2">
                      By {course.instructor?.username || 'Instructor'}
                    </p>

                    <p className="text-sm text-gray-500 mt-2">
                      Level: {course.level}
                    </p>

                    <p className="text-yellow-500 mt-3">
                      <FaStar className="inline" />{' '}
                      {course.rating || 0}

                      <span className="text-gray-400">
                        {' '}({course.totalReviews || 0} reviews)
                      </span>
                    </p>

                    <div className="border-t mt-4 pt-4 flex justify-between items-center">

                      <span className="font-bold text-primary">
                        Free
                      </span>

                      <Link
                        to={`/courses/${course._id}`}
                        className="bg-primary text-white px-3 py-2 rounded-lg text-sm"
                      >
                        View Details
                      </Link>

                    </div>

                  </div>

                </div>

              ))

            ) : (

              <div className="col-span-full text-center py-16">

                <h3 className="text-xl font-bold text-gray-700">
                  No Courses Found
                </h3>

                <p className="text-gray-500 mt-2">
                  Try changing your search or filters.
                </p>

                <button
                  onClick={clearFilters}
                  className="bg-primary text-white px-5 py-2 rounded-lg mt-5"
                >
                  Clear Filters
                </button>

              </div>

            )}

          </div>

        </div>

      </div>

      <Footer />
    </>
  )
}

export default Courses
