
import React from 'react'
import { Link } from 'react-router-dom'

function CourseCard() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl">
      <img
        src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=700"
        alt="Web development course"
        className="h-48 w-full object-cover"
      />
      <div className="p-5">
        <span className="rounded-full bg-[#E6F2FC] px-3 py-1 text-xs font-semibold text-[#0474C4]">
          Web Development
        </span>
        <h3 className="mt-4 text-xl font-bold text-[#262B40]">Complete Web Development</h3>
        <p className="mt-2 text-sm leading-6 text-gray-500">
          Learn HTML, CSS, JavaScript, and the basics of building modern websites.
        </p>
        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
          <span>★ 4.8 Rating</span>
          <span>12 Lessons</span>
        </div>
        <div className="mt-5 flex items-center justify-between">
          <span className="text-xl font-bold text-[#06457F]">₹1,499</span>
          <Link to="/courses/1" className="rounded-lg bg-[#0474C4] px-4 py-2 text-white">
            View Course
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CourseCard
