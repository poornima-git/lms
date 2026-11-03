import { Link } from 'react-router-dom'
import InstructorHeader from '../components/InstructorHeader'
import InstructorSidebar from '../components/InstructorSidebar'

function InstructorCourses() {
  return (
    <div>
      <InstructorHeader />

      <div className="flex">
        <InstructorSidebar />

        <main className="min-w-0 flex-1 p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-navy">My Courses</h1>
              <p className="mt-2 text-gray-500">
                View and manage your courses.
              </p>
            </div>

            <Link
              to="/instructor/create-course"
              className="rounded-lg bg-primary px-5 py-3 font-semibold text-white hover:bg-deep-blue"
            >
              + Create Course
            </Link>
          </div>

          <div className="mt-8 overflow-x-auto rounded-xl bg-white shadow-sm">
            <table className="w-full min-w-[700px] text-left">
              <thead className="bg-blue-50 text-deep-blue">
                <tr>
                  <th className="p-4">Course</th>
                  <th className="p-4">Students</th>
                  <th className="p-4">Lessons</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-b">
                  <td className="p-4 font-semibold">React for Beginners</td>
                  <td className="p-4">86</td>
                  <td className="p-4">12</td>
                  <td className="p-4">
                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                      Published
                    </span>
                  </td>
                  <td className="p-4">
                    <Link to="/instructor/lessons" className="font-semibold text-primary">
                      Manage
                    </Link>
                  </td>
                </tr>

                <tr className="border-b">
                  <td className="p-4 font-semibold">UI/UX Design Basics</td>
                  <td className="p-4">54</td>
                  <td className="p-4">10</td>
                  <td className="p-4">
                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                      Published
                    </span>
                  </td>
                  <td className="p-4">
                    <Link to="/instructor/lessons" className="font-semibold text-primary">
                      Manage
                    </Link>
                  </td>
                </tr>

                <tr className="border-b">
                  <td className="p-4 font-semibold">Advanced JavaScript</td>
                  <td className="p-4">0</td>
                  <td className="p-4">4</td>
                  <td className="p-4">
                    <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
                      Draft
                    </span>
                  </td>
                  <td className="p-4">
                    <Link to="/instructor/create-course" className="font-semibold text-primary">
                      Edit
                    </Link>
                  </td>
                </tr>

                <tr>
                  <td className="p-4 font-semibold">HTML and CSS Essentials</td>
                  <td className="p-4">105</td>
                  <td className="p-4">15</td>
                  <td className="p-4">
                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                      Published
                    </span>
                  </td>
                  <td className="p-4">
                    <Link to="/instructor/lessons" className="font-semibold text-primary">
                      Manage
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  )
}

export default InstructorCourses