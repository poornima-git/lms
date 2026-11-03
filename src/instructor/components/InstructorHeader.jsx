import { Link } from 'react-router-dom'

function InstructorHeader() {
  return (
    <header className="flex items-center justify-between bg-white px-6 py-4 shadow-sm">
      <Link to="/instructor" className="text-2xl font-bold text-primary">
        LearnHub
      </Link>

      <div className="flex items-center gap-4">
        <Link
          to="/instructor"
          className="text-sm font-medium text-gray-600 hover:text-primary"
        >
          Instructor Portal
        </Link>

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-light-blue font-bold text-deep-blue">
            JD
          </div>

          <div>
            <p className="font-semibold text-navy">John David</p>
            <p className="text-xs text-gray-500">Instructor</p>
          </div>
        </div>

        <Link
          to="/login"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-deep-blue"
        >
          Logout
        </Link>
      </div>
    </header>
  )
}

export default InstructorHeader