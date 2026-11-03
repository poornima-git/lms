
import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { FaStar, FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Courses() {
  return (
    <>
      <Header />

      <div className="bg-deep text-white text-center py-14 px-5">
        <p className="text-[#AFAFD0] font-bold tracking-widest">OUR LEARNING LIBRARY</p>
        <h1 className="text-4xl font-extrabold mt-3">Explore All Courses</h1>
        <p className="text-gray-300 mt-3">Find the right course to develop your skills.</p>
      </div>

      <div className="px-5 md:px-20 py-12">

        <div className="md:flex justify-between items-center mb-10">
          <div>
            <h2 className="text-2xl font-bold">Discover Courses</h2>
            <p className="text-gray-500 mt-1">Showing 6 popular courses</p>
          </div>

          <div className="flex mt-5 md:mt-0">
            <input type="text" placeholder="Search by course name"
              className="border border-gray-200 bg-white p-3 rounded-l-lg w-full md:w-72 outline-none" />
            <button className="bg-primary text-white px-5 rounded-r-lg">
              <FaSearch />
            </button>
          </div>
        </div>

        <div className="md:grid grid-cols-4 gap-8">

          <div className="bg-white p-5 rounded-xl shadow-sm h-fit">
            <h3 className="text-xl font-bold mb-5">Filter Courses</h3>

            <h4 className="font-bold mb-3">Categories</h4>
            <div className="space-y-3 text-gray-600">
              <p><input type="checkbox" className="me-2" /> Development</p>
              <p><input type="checkbox" className="me-2" /> Design</p>
              <p><input type="checkbox" className="me-2" /> Business</p>
              <p><input type="checkbox" className="me-2" /> Marketing</p>
              <p><input type="checkbox" className="me-2" /> Data Science</p>
            </div>

            <hr className="my-5" />

            <h4 className="font-bold mb-3">Difficulty Level</h4>
            <div className="space-y-3 text-gray-600">
              <p><input type="checkbox" className="me-2" /> Beginner</p>
              <p><input type="checkbox" className="me-2" /> Intermediate</p>
              <p><input type="checkbox" className="me-2" /> Advanced</p>
            </div>

            <button className="bg-primary text-white w-full p-3 rounded-lg mt-6">
              Apply Filters
            </button>
          </div>

          <div className="col-span-3 grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 md:mt-0">

            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl">
              <img className="w-full h-44 object-cover" src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800" alt="Web development" />
              <div className="p-4">
                <span className="text-xs bg-lavender text-primary px-3 py-1 rounded-full">Development</span>
                <h3 className="font-bold text-lg mt-3">Complete Web Development</h3>
                <p className="text-sm text-gray-500 mt-2">By Rahul Sharma</p>
                <p className="text-yellow-500 mt-3"><FaStar className="inline" /> 4.9 <span className="text-gray-400">(120 reviews)</span></p>
                <div className="border-t mt-4 pt-4 flex justify-between items-center">
                  <span className="font-bold text-primary">Free</span>
                  <Link to="/courses/1" className="bg-primary text-white px-3 py-2 rounded-lg text-sm">View Details</Link>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl">
              <img className="w-full h-44 object-cover" src="https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800" alt="UI UX" />
              <div className="p-4">
                <span className="text-xs bg-lavender text-primary px-3 py-1 rounded-full">Design</span>
                <h3 className="font-bold text-lg mt-3">UI/UX Design Masterclass</h3>
                <p className="text-sm text-gray-500 mt-2">By Anjali Nair</p>
                <p className="text-yellow-500 mt-3"><FaStar className="inline" /> 4.8 <span className="text-gray-400">(95 reviews)</span></p>
                <div className="border-t mt-4 pt-4 flex justify-between items-center">
                  <span className="font-bold text-primary">Free</span>
                  <Link to="/courses/1" className="bg-primary text-white px-3 py-2 rounded-lg text-sm">View Details</Link>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl">
              <img className="w-full h-44 object-cover" src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800" alt="Data analytics" />
              <div className="p-4">
                <span className="text-xs bg-lavender text-primary px-3 py-1 rounded-full">Data Science</span>
                <h3 className="font-bold text-lg mt-3">Introduction to Data Analytics</h3>
                <p className="text-sm text-gray-500 mt-2">By Arjun Kumar</p>
                <p className="text-yellow-500 mt-3"><FaStar className="inline" /> 4.7 <span className="text-gray-400">(82 reviews)</span></p>
                <div className="border-t mt-4 pt-4 flex justify-between items-center">
                  <span className="font-bold text-primary">Free</span>
                  <Link to="/courses/1" className="bg-primary text-white px-3 py-2 rounded-lg text-sm">View Details</Link>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl">
              <img className="w-full h-44 object-cover" src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800" alt="Digital marketing" />
              <div className="p-4">
                <span className="text-xs bg-lavender text-primary px-3 py-1 rounded-full">Marketing</span>
                <h3 className="font-bold text-lg mt-3">Digital Marketing Essentials</h3>
                <p className="text-sm text-gray-500 mt-2">By Meera Thomas</p>
                <p className="text-yellow-500 mt-3"><FaStar className="inline" /> 4.6 <span className="text-gray-400">(74 reviews)</span></p>
                <div className="border-t mt-4 pt-4 flex justify-between items-center">
                  <span className="font-bold text-primary">Free</span>
                  <Link to="/courses/1" className="bg-primary text-white px-3 py-2 rounded-lg text-sm">View Details</Link>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl">
              <img className="w-full h-44 object-cover" src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800" alt="Python programming" />
              <div className="p-4">
                <span className="text-xs bg-lavender text-primary px-3 py-1 rounded-full">Development</span>
                <h3 className="font-bold text-lg mt-3">Python Programming Basics</h3>
                <p className="text-sm text-gray-500 mt-2">By David Mathew</p>
                <p className="text-yellow-500 mt-3"><FaStar className="inline" /> 4.9 <span className="text-gray-400">(110 reviews)</span></p>
                <div className="border-t mt-4 pt-4 flex justify-between items-center">
                  <span className="font-bold text-primary">Free</span>
                  <Link to="/courses/1" className="bg-primary text-white px-3 py-2 rounded-lg text-sm">View Details</Link>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl">
              <img className="w-full h-44 object-cover" src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800" alt="Business" />
              <div className="p-4">
                <span className="text-xs bg-lavender text-primary px-3 py-1 rounded-full">Business</span>
                <h3 className="font-bold text-lg mt-3">Business Management</h3>
                <p className="text-sm text-gray-500 mt-2">By Sarah Joseph</p>
                <p className="text-yellow-500 mt-3"><FaStar className="inline" /> 4.8 <span className="text-gray-400">(68 reviews)</span></p>
                <div className="border-t mt-4 pt-4 flex justify-between items-center">
                  <span className="font-bold text-primary">Free</span>
                  <Link to="/courses/1" className="bg-primary text-white px-3 py-2 rounded-lg text-sm">View Details</Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Courses
