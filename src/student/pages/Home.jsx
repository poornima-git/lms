
import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { FaSearch, FaStar, FaArrowRight, FaLaptopCode, FaChartLine, FaPalette, FaBullhorn, FaPlayCircle, FaGraduationCap } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Home() {
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
              <Link to="/courses" className="bg-white text-deep px-6 py-3 rounded-lg font-bold hover:bg-lavender">
                Explore Courses <FaArrowRight className="inline ms-2" />
              </Link>
              <Link to="/register" className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-deep">
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
      <div className="px-5 md:px-20 -mt-1">
        <div className="bg-white shadow-lg rounded-2xl p-5 md:p-8 md:flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Find your next course</h2>
            <p className="text-gray-500 mt-1">What would you like to learn today?</p>
          </div>
          <div className="flex mt-5 md:mt-0 md:w-1/2">
            <input
              type="text"
              placeholder="Search courses..."
              className="border border-gray-200 rounded-l-lg p-3 w-full outline-none focus:border-accent"
            />
            <Link to="/courses" className="bg-primary text-white p-4 rounded-r-lg">
              <FaSearch />
            </Link>
          </div>
        </div>
      </div>

      {/* Categories */}
      <section className="px-5 md:px-20 py-16">
        <div className="text-center mb-10">
          <p className="text-secondary font-bold tracking-widest">LEARN SOMETHING NEW</p>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-2">Explore Categories</h2>
          <p className="text-gray-500 mt-3">Choose an area and discover courses made for you.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          <div className="bg-white p-7 rounded-2xl shadow-sm text-center hover:shadow-lg">
            <FaLaptopCode className="text-4xl text-primary mx-auto" />
            <h3 className="font-bold mt-4">Development</h3>
            <p className="text-gray-500 text-sm mt-1">24 Courses</p>
          </div>
          <div className="bg-white p-7 rounded-2xl shadow-sm text-center hover:shadow-lg">
            <FaChartLine className="text-4xl text-accent mx-auto" />
            <h3 className="font-bold mt-4">Business</h3>
            <p className="text-gray-500 text-sm mt-1">18 Courses</p>
          </div>
          <div className="bg-white p-7 rounded-2xl shadow-sm text-center hover:shadow-lg">
            <FaPalette className="text-4xl text-secondary mx-auto" />
            <h3 className="font-bold mt-4">Design</h3>
            <p className="text-gray-500 text-sm mt-1">16 Courses</p>
          </div>
          <div className="bg-white p-7 rounded-2xl shadow-sm text-center hover:shadow-lg">
            <FaBullhorn className="text-4xl text-primary mx-auto" />
            <h3 className="font-bold mt-4">Marketing</h3>
            <p className="text-gray-500 text-sm mt-1">12 Courses</p>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="bg-lavender px-5 md:px-20 py-16">
        <div className="flex flex-wrap justify-between items-end mb-10">
          <div>
            <p className="text-secondary font-bold tracking-widest">POPULAR COURSES</p>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-2">Featured Courses</h2>
            <p className="text-gray-500 mt-2">Learn from our most popular courses.</p>
          </div>
          <Link to="/courses" className="text-primary font-bold mt-4">
            View All Courses <FaArrowRight className="inline ms-2" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-7">

          <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl">
            <img className="w-full h-52 object-cover" src="https://www.simplilearn.com/ice9/free_resources_article_thumb/is_web_development_good_career.jpg" alt="Web development" />
            <div className="p-5">
              <div className="flex justify-between text-sm">
                <span className="bg-lavender text-primary px-3 py-1 rounded-full">Development</span>
                <span className="text-gray-500">Beginner</span>
              </div>
              <h3 className="font-bold text-xl mt-4">Complete Web Development</h3>
              <p className="text-gray-500 text-sm mt-2">Learn HTML, CSS, JavaScript and React from the basics.</p>
              <div className="flex justify-between mt-5 text-sm">
                <span className="text-yellow-500"><FaStar className="inline" /> 4.9 <span className="text-gray-400">(120)</span></span>
                <span className="text-gray-500">8 Weeks</span>
              </div>
              <div className="border-t mt-4 pt-4 flex justify-between items-center">
                <span className="font-bold text-primary">Free</span>
                <Link to="/courses/1" className="bg-primary text-white px-4 py-2 rounded-lg text-sm">View Course</Link>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl">
            <img className="w-full h-52 object-cover" src="https://www.yujdesigns.com/wp-content/uploads/2026/05/UI-VS-UX-banner.webp" alt="UI UX design" />
            <div className="p-5">
              <div className="flex justify-between text-sm">
                <span className="bg-lavender text-primary px-3 py-1 rounded-full">Design</span>
                <span className="text-gray-500">Intermediate</span>
              </div>
              <h3 className="font-bold text-xl mt-4">UI/UX Design Masterclass</h3>
              <p className="text-gray-500 text-sm mt-2">Create beautiful interfaces and meaningful user experiences.</p>
              <div className="flex justify-between mt-5 text-sm">
                <span className="text-yellow-500"><FaStar className="inline" /> 4.8 <span className="text-gray-400">(95)</span></span>
                <span className="text-gray-500">6 Weeks</span>
              </div>
              <div className="border-t mt-4 pt-4 flex justify-between items-center">
                <span className="font-bold text-primary">Free</span>
                <Link to="/courses/1" className="bg-primary text-white px-4 py-2 rounded-lg text-sm">View Course</Link>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl">
            <img className="w-full h-52 object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlwIdLvbipEdSI9OWnAxf9NZvhAYrAEahpLozYxTgARplkFssa5ImK2L0&s=10" alt="Data analytics" />
            <div className="p-5">
              <div className="flex justify-between text-sm">
                <span className="bg-lavender text-primary px-3 py-1 rounded-full">Data Science</span>
                <span className="text-gray-500">Beginner</span>
              </div>
              <h3 className="font-bold text-xl mt-4">Introduction to Data Analytics</h3>
              <p className="text-gray-500 text-sm mt-2">Understand data, dashboards and practical analysis.</p>
              <div className="flex justify-between mt-5 text-sm">
                <span className="text-yellow-500"><FaStar className="inline" /> 4.7 <span className="text-gray-400">(82)</span></span>
                <span className="text-gray-500">5 Weeks</span>
              </div>
              <div className="border-t mt-4 pt-4 flex justify-between items-center">
                <span className="font-bold text-primary">Free</span>
                <Link to="/courses/1" className="bg-primary text-white px-4 py-2 rounded-lg text-sm">View Course</Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Why LearnHub */}
      <section className="px-5 md:px-20 py-16">
        <div className="md:grid grid-cols-2 gap-12 items-center">
          <div>
            <img className="w-full h-80 object-cover rounded-2xl" src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1000" alt="Student studying" />
          </div>
          <div>
            <p className="text-secondary font-bold tracking-widest">WHY CHOOSE US</p>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-3">Build Skills That Move You Forward</h2>
            <p className="text-gray-500 mt-4 leading-7">
              LearnHub brings quality learning resources together in one place.
              Study at your own pace and keep track of every achievement.
            </p>
            <div className="mt-7 space-y-5">
              <div className="flex items-center">
                <FaPlayCircle className="text-2xl text-accent me-4" />
                <div>
                  <h3 className="font-bold">Flexible Online Learning</h3>
                  <p className="text-sm text-gray-500">Access lessons whenever it suits you.</p>
                </div>
              </div>
              <div className="flex items-center">
                <FaGraduationCap className="text-2xl text-accent me-4" />
                <div>
                  <h3 className="font-bold">Learn from Expert Instructors</h3>
                  <p className="text-sm text-gray-500">Explore practical lessons and learning materials.</p>
                </div>
              </div>
              <div className="flex items-center">
                <FaStar className="text-2xl text-accent me-4" />
                <div>
                  <h3 className="font-bold">Certificates and Achievements</h3>
                  <p className="text-sm text-gray-500">Celebrate your progress and course completion.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="bg-white px-5 md:px-20 py-16 text-center">
        <p className="text-secondary font-bold tracking-widest">STUDENT FEEDBACK</p>
        <h2 className="text-3xl md:text-4xl font-extrabold mt-2">What Our Students Say</h2>
        <div className="max-w-2xl mx-auto mt-10 bg-lavender p-8 rounded-2xl">
          <div className="text-yellow-500 text-xl mb-4">★★★★★</div>
          <p className="text-gray-600 leading-7">
            "LearnHub made learning new skills simple and enjoyable.
            The lessons were easy to follow, and I could learn at my own pace.
            I really enjoyed the learning experience!"
          </p>
          <img className="w-16 h-16 rounded-full object-cover mx-auto mt-6" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200" alt="Student" />
          <h3 className="font-bold mt-3">Poornima V</h3>
          <p className="text-gray-500 text-sm">Web Development Student</p>
        </div>
      </section>

      {/* Call to action */}
      <section className="bg-primary text-white text-center px-5 py-16">
        <h2 className="text-3xl md:text-4xl font-extrabold">Ready to Start Learning?</h2>
        <p className="mt-3 text-gray-200">Join LearnHub and take the next step in your learning journey.</p>
        <Link to="/register" className="inline-block mt-7 bg-white text-primary px-7 py-3 rounded-lg font-bold hover:bg-lavender">
          Get Started Now <FaArrowRight className="inline ms-2" />
        </Link>
      </section>

      <Footer />
    </>
  )
}

export default Home
