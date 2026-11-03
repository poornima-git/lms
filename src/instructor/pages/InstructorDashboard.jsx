import { Link } from 'react-router-dom'
import InstructorHeader from '../components/InstructorHeader'
import InstructorSidebar from '../components/InstructorSidebar'

function InstructorDashboard() {
  return (
    <div>
      <InstructorHeader />

      <div className="flex">
        <InstructorSidebar />

        <main className="min-w-0 flex-1 bg-[#F5F8FC] p-5 md:p-8">
          <h1 className="text-3xl font-bold text-navy">Instructor Dashboard</h1>
          <p className="mt-2 text-gray-500">
            Welcome back, John! Here is an overview of your teaching activity.
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-500">Total Courses</p>
              <h2 className="mt-3 text-3xl font-bold text-primary">8</h2>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-500">Total Students</p>
              <h2 className="mt-3 text-3xl font-bold text-primary">245</h2>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-500">Published Courses</p>
              <h2 className="mt-3 text-3xl font-bold text-green-600">6</h2>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-500">Average Rating</p>
              <h2 className="mt-3 text-3xl font-bold text-yellow-500">4.8</h2>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <section className="rounded-xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-navy">Recent Courses</h2>

              <div className="mt-5 space-y-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <h3 className="font-semibold">React for Beginners</h3>
                    <p className="text-sm text-gray-500">86 students</p>
                  </div>
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">
                    Published
                  </span>
                </div>

                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <h3 className="font-semibold">UI/UX Design Basics</h3>
                    <p className="text-sm text-gray-500">54 students</p>
                  </div>
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">
                    Published
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Advanced JavaScript</h3>
                    <p className="text-sm text-gray-500">Course content in progress</p>
                  </div>
                  <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs text-yellow-700">
                    Draft
                  </span>
                </div>
              </div>

              <Link
                to="/instructor/courses"
                className="mt-5 inline-block font-semibold text-primary hover:underline"
              >
                View all courses →
              </Link>
            </section>

            <section className="rounded-xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-navy">Quick Actions</h2>

              <div className="mt-5 space-y-3">
                <Link
                  to="/instructor/create-course"
                  className="block rounded-lg bg-primary px-5 py-4 font-semibold text-white hover:bg-deep-blue"
                >
                  + Create a New Course
                </Link>

                <Link
                  to="/instructor/lessons"
                  className="block rounded-lg border border-light-blue px-5 py-4 font-semibold text-deep-blue hover:bg-blue-50"
                >
                  Manage Lessons
                </Link>

                <Link
                  to="/instructor/quizzes"
                  className="block rounded-lg border border-light-blue px-5 py-4 font-semibold text-deep-blue hover:bg-blue-50"
                >
                  Manage Quizzes
                </Link>

                <Link
                  to="/instructor/students"
                  className="block rounded-lg border border-light-blue px-5 py-4 font-semibold text-deep-blue hover:bg-blue-50"
                >
                  View Students
                </Link>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}

export default InstructorDashboard