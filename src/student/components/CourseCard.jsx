
import React from 'react'
import { Link } from 'react-router-dom'

function CourseCard({ course }) {

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl">

      {/* Course Image */}
      <img
        src={course.image}
        alt={course.title}
        className="h-48 w-full object-cover"
      />

      <div className="p-5">

        {/* Category */}
        <span className="rounded-full bg-[#E6F2FC] px-3 py-1 text-xs font-semibold text-[#0474C4]">
          {course.category}
        </span>

        {/* Course Title */}
        <h3 className="mt-4 text-xl font-bold text-[#262B40]">
          {course.title}
        </h3>

        {/* Description */}
        <p className="mt-2 text-sm leading-6 text-gray-500">
          {course.description}
        </p>

        {/* Course Details */}
        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
          <span>★ {course.rating} Rating</span>
          <span>{course.lessons} Lessons</span>
        </div>

        {/* Instructor */}
        <p className="mt-3 text-sm text-gray-500">
          Instructor: {course.instructor}
        </p>

        {/* Price and Button */}
        <div className="mt-5 flex items-center justify-between">
          <span className="text-xl font-bold text-[#06457F]">
            Free
          </span>

          <Link
            to={`/courses/${course.id}`}
            className="rounded-lg bg-[#0474C4] px-4 py-2 text-white hover:bg-[#06457F]"
          >
            View Course
          </Link>
        </div>

      </div>
    </div>
  )
}

export default CourseCard
