import { Link } from 'react-router-dom'

function InstructorSidebar() {
  return (
    <aside className="min-h-screen w-64 shrink-0 bg-[#29285B] p-5 text-white">
      <h2 className="mb-8 text-xl font-bold">Instructor Menu</h2>

      <nav className="space-y-2">
        <Link
          to="/instructor"
          className="block rounded-lg bg-primary px-4 py-3 hover:bg-accent"
        >
          Dashboard
        </Link>

        <Link
          to="/instructor/courses"
          className="block rounded-lg px-4 py-3 hover:bg-accent"
        >
          My Courses
        </Link>

        <Link
          to="/instructor/create-course"
          className="block rounded-lg px-4 py-3 hover:bg-accent"
        >
          Create Course
        </Link>

        <Link
          to="/instructor/lessons"
          className="block rounded-lg px-4 py-3 hover:bg-accent"
        >
          Manage Lessons
        </Link>

        <Link
          to="/instructor/quizzes"
          className="block rounded-lg px-4 py-3 hover:bg-accent"
        >
          Manage Quizzes
        </Link>

        <Link
          to="/instructor/students"
          className="block rounded-lg px-4 py-3 hover:bg-accent"
        >
          My Students
        </Link>

        <Link
          to="/instructor/reviews"
          className="block rounded-lg px-4 py-3 hover:bg-accent"
        >
          Course Reviews
        </Link>
      </nav>

      <div className="mt-12 rounded-xl bg-white/10 p-4">
        <p className="font-semibold">Need help?</p>
        <p className="mt-2 text-sm text-gray-300">
          Contact the LearnHub support team for assistance.
        </p>
      </div>
    </aside>
  )
}

export default InstructorSidebar