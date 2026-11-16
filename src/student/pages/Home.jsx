
import React, { useEffect, useState } from 'react'

import Header from '../components/Header'
import Footer from '../components/Footer'

import {
  FaSearch,
  FaStar,
  FaArrowRight,
  FaLaptopCode,
  FaChartLine,
  FaPalette,
  FaBullhorn,
  FaPlayCircle,
  FaGraduationCap
} from 'react-icons/fa'

import { Link, useNavigate } from 'react-router-dom'
import { getHomeCoursesAPI } from '../../services/allAPI'
import axiosInstance from '../../api/axiosInstance'

function Home() {

  const navigate = useNavigate()

  const [searchKey, setSearchKey] = useState('')

  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Fetch featured courses from backend
  const fetchCourses = async () => {

    setLoading(true)
    setError('')

    try {

      const response = await getHomeCoursesAPI()

      if (response?.response) {
        setError(
          response.response.data?.message ||
          'Failed to load featured courses'
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

  useEffect(() => {
    fetchCourses()
  }, [])

  // Search courses
  const handleSearch = (e) => {
    e.preventDefault()

    if (searchKey.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchKey.trim())}`)
    } else {
      navigate('/courses')
    }
  }

  // Navigate to selected category
  const handleCategory = (category) => {
    navigate(`/courses?category=${encodeURIComponent(category)}`)
  }

  // Get course image
  const getCourseImage = (image) => {

    if (!image) {
      return 'https://via.placeholder.com/800x450?text=Course'
    }

    return image.startsWith('http')
      ? image
      : `${axiosInstance.defaults.baseURL}${image.startsWith('/')
        ? image
        : `/${image}`}`
  }

  return (
    <>
      <Header />

      {/* Hero Section */}
      <div className="bg-deep text-white">

        <div className="md:grid grid-cols-2 items-center px-6 md:px-20 py-16 md:py-24 gap-10">

          <div>

            <p className="text-secondary font-bold tracking-widest mb-4">
              YOUR JOURNEY STARTS HERE
            </p>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Unlock Your Potential With
              <span className="text-[#AFAFD0]"> Online Learning</span>
            </h1>

            <p className="text-gray-300 mt-6 leading-7 max-w-xl">
              Explore expert-led courses, learn practical skills, and take
              the next step towards achieving your personal and professional goals.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">

              <Link
                to="/courses"
                className="bg-white text-deep px-6 py-3 rounded-lg font-bold hover:bg-lavender"
              >
                Explore Courses <FaArrowRight className="inline ms-2" />
              </Link>

              <Link
                to="/register"
                className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-deep"
              >
                Join LearnHub
              </Link>

            </div>

            <div className="flex gap-8 mt-10">

              <div>
                <h3 className="text-3xl font-bold">120+</h3>
                <p className="text-gray-300 text-sm">Online Courses</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold">50+</h3>
                <p className="text-gray-300 text-sm">Expert Instructors</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold">2K+</h3>
                <p className="text-gray-300 text-sm">Happy Students</p>
              </div>

            </div>

          </div>

          <div className="mt-12 md:mt-0 relative">

            <img
              className="w-full h-[350px] md:h-[450px] object-cover rounded-3xl shadow-2xl"
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1000"
              alt="Students learning together"
            />

            <div className="absolute bottom-5 left-5 bg-white text-deep p-4 rounded-xl shadow-lg">

              <div className="flex items-center">

                <FaGraduationCap className="text-3xl me-3 text-accent" />

                <div>
                  <h4 className="font-bold">Learn at your pace</h4>
                  <p className="text-xs text-gray-500">Anytime, anywhere</p>
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>

      {/* Search Section */}
      <div className="px-5 md:px-20 -mt-0">

        <div className="bg-white shadow-lg rounded-2xl p-5 md:p-8 md:flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold">
              Find your next course
            </h2>

            <p className="text-gray-500 mt-1">
              What would you like to learn today?
            </p>

          </div>

          <form
            onSubmit={handleSearch}
            className="flex mt-5 md:mt-0 md:w-1/2"
          >

            <input
              type="text"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              placeholder="Search courses..."
              className="border border-gray-200 rounded-l-lg p-3 w-full outline-none focus:border-accent"
            />

            <button
              type="submit"
              className="bg-primary text-white px-5 rounded-r-lg"
            >
              <FaSearch />
            </button>

          </form>

        </div>

      </div>

      {/* Categories */}
      <section className="px-5 md:px-20 py-16">

        <div className="text-center mb-10">

          <p className="text-secondary font-bold tracking-widest">
            LEARN SOMETHING NEW
          </p>

          <h2 className="text-3xl md:text-4xl font-extrabold mt-2">
            Explore Categories
          </h2>

          <p className="text-gray-500 mt-3">
            Choose an area and discover courses made for you.
          </p>

        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

          <button
            onClick={() => handleCategory('Development')}
            className="bg-white p-7 rounded-2xl shadow-sm text-center hover:shadow-lg transition"
          >
            <FaLaptopCode className="text-4xl text-primary mx-auto" />

            <h3 className="font-bold mt-4">Development</h3>

            <p className="text-gray-500 text-sm mt-1">Explore Courses</p>
          </button>

          <button
            onClick={() => handleCategory('Business')}
            className="bg-white p-7 rounded-2xl shadow-sm text-center hover:shadow-lg transition"
          >
            <FaChartLine className="text-4xl text-accent mx-auto" />

            <h3 className="font-bold mt-4">Business</h3>

            <p className="text-gray-500 text-sm mt-1">Explore Courses</p>
          </button>

          <button
            onClick={() => handleCategory('Design')}
            className="bg-white p-7 rounded-2xl shadow-sm text-center hover:shadow-lg transition"
          >
            <FaPalette className="text-4xl text-secondary mx-auto" />

            <h3 className="font-bold mt-4">Design</h3>

            <p className="text-gray-500 text-sm mt-1">Explore Courses</p>
          </button>

          <button
            onClick={() => handleCategory('Marketing')}
            className="bg-white p-7 rounded-2xl shadow-sm text-center hover:shadow-lg transition"
          >
            <FaBullhorn className="text-4xl text-primary mx-auto" />

            <h3 className="font-bold mt-4">Marketing</h3>

            <p className="text-gray-500 text-sm mt-1">Explore Courses</p>
          </button>

        </div>

      </section>

      {/* Featured Courses */}
      <section className="bg-lavender px-5 md:px-20 py-16">

        <div className="flex flex-wrap justify-between items-end mb-10">

          <div>

            <p className="text-secondary font-bold tracking-widest">
              POPULAR COURSES
            </p>

            <h2 className="text-3xl md:text-4xl font-extrabold mt-2">
              Featured Courses
            </h2>

            <p className="text-gray-500 mt-2">
              Learn from our most popular courses.
            </p>

          </div>

          <Link to="/courses" className="text-primary font-bold mt-4">
            View All Courses <FaArrowRight className="inline ms-2" />
          </Link>

        </div>

        <div className="grid md:grid-cols-3 gap-7">

          {loading ? (

            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">
                Loading featured courses...
              </p>
            </div>

          ) : error ? (

            <div className="col-span-full text-center py-12">

              <p className="text-red-600">
                {error}
              </p>

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
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl"
              >

                <img
                  className="w-full h-52 object-cover"
                  src={getCourseImage(course.image)}
                  alt={course.title}
                />

                <div className="p-5">

                  <div className="flex justify-between text-sm">

                    <span className="bg-lavender text-primary px-3 py-1 rounded-full">
                      {course.category}
                    </span>

                    <span className="text-gray-500">
                      {course.level}
                    </span>

                  </div>

                  <h3 className="font-bold text-xl mt-4">
                    {course.title}
                  </h3>

                  <p className="text-gray-500 text-sm mt-2">
                    By {course.instructor?.username || 'Instructor'}
                  </p>

                  <p className="text-gray-500 text-sm mt-2">
                    {course.description}
                  </p>

                  <div className="flex justify-between mt-5 text-sm">

                    <span className="text-yellow-500">
                      <FaStar className="inline" /> {course.rating || 0}

                      <span className="text-gray-400">
                        ({course.totalReviews || 0})
                      </span>
                    </span>

                    <span className="text-gray-500">
                      {course.duration || 'Self-paced'}
                    </span>

                  </div>

                  <div className="border-t mt-4 pt-4 flex justify-between items-center">

                    <span className="font-bold text-primary">
                      Free
                    </span>

                    <Link
                      to={`/courses/${course._id}`}
                      className="bg-primary text-white px-4 py-2 rounded-lg text-sm"
                    >
                      View Course
                    </Link>

                  </div>

                </div>

              </div>

            ))

          ) : (

            <div className="col-span-full text-center py-12">

              <h3 className="text-xl font-bold text-gray-700">
                No Featured Courses Available
              </h3>

              <p className="text-gray-500 mt-2">
                Published courses will appear here.
              </p>

              <Link
                to="/courses"
                className="inline-block bg-primary text-white px-5 py-2 rounded-lg mt-5"
              >
                Explore Courses
              </Link>

            </div>

          )}

        </div>

      </section>

      {/* Why LearnHub */}
      <section className="px-5 md:px-20 py-16">

        <div className="md:grid grid-cols-2 gap-12 items-center">

          <div>

            <img
              className="w-full h-80 object-cover rounded-2xl"
              src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1000"
              alt="Student studying"
            />

          </div>

          <div>

            <p className="text-secondary font-bold tracking-widest">
              WHY CHOOSE US
            </p>

            <h2 className="text-3xl md:text-4xl font-extrabold mt-3">
              Build Skills That Move You Forward
            </h2>

            <p className="text-gray-500 mt-4 leading-7">
              LearnHub brings quality learning resources together in one place.
              Study at your own pace and keep track of every achievement.
            </p>

            <div className="mt-7 space-y-5">

              <div className="flex items-center">

                <FaPlayCircle className="text-2xl text-accent me-4" />

                <div>
                  <h3 className="font-bold">Flexible Online Learning</h3>
                  <p className="text-sm text-gray-500">
                    Access lessons whenever it suits you.
                  </p>
                </div>

              </div>

              <div className="flex items-center">

                <FaGraduationCap className="text-2xl text-accent me-4" />

                <div>
                  <h3 className="font-bold">Learn from Expert Instructors</h3>
                  <p className="text-sm text-gray-500">
                    Explore practical lessons and learning materials.
                  </p>
                </div>

              </div>

              <div className="flex items-center">

                <FaStar className="text-2xl text-accent me-4" />

                <div>
                  <h3 className="font-bold">Certificates and Achievements</h3>
                  <p className="text-sm text-gray-500">
                    Celebrate your progress and course completion.
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Testimonial */}
      <section className="bg-white px-5 md:px-20 py-16 text-center">

        <p className="text-secondary font-bold tracking-widest">
          STUDENT FEEDBACK
        </p>

        <h2 className="text-3xl md:text-4xl font-extrabold mt-2">
          What Our Students Say
        </h2>

        <div className="max-w-2xl mx-auto mt-10 bg-lavender p-8 rounded-2xl">

          <div className="text-yellow-500 text-xl mb-4">
            ★★★★★
          </div>

          <p className="text-gray-600 leading-7">
            "LearnHub made learning new skills simple and enjoyable.
            The lessons were easy to follow, and I could learn at my own pace.
            I really enjoyed the learning experience!"
          </p>

          <img
            className="w-16 h-16 rounded-full object-cover mx-auto mt-6"
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200"
            alt="Student"
          />

          <h3 className="font-bold mt-3">Poornima V</h3>

          <p className="text-gray-500 text-sm">
            Web Development Student
          </p>

        </div>

      </section>

      {/* Call to Action */}
      <section className="bg-primary text-white text-center px-5 py-16">

        <h2 className="text-3xl md:text-4xl font-extrabold">
          Ready to Start Learning?
        </h2>

        <p className="mt-3 text-gray-200">
          Join LearnHub and take the next step in your learning journey.
        </p>

        <Link
          to="/register"
          className="inline-block mt-7 bg-white text-primary px-7 py-3 rounded-lg font-bold hover:bg-lavender"
        >
          Get Started Now <FaArrowRight className="inline ms-2" />
        </Link>

      </section>

      <Footer />

    </>
  )
}

export default Home
