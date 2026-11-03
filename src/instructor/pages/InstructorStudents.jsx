import InstructorHeader from '../components/InstructorHeader'
import InstructorSidebar from '../components/InstructorSidebar'

function InstructorStudents() {
  return (
    <div>
      <InstructorHeader />

      <div className="flex">
        <InstructorSidebar />

        <main className="min-w-0 flex-1 p-8">
          <h1 className="text-3xl font-bold text-navy">My Students</h1>
          <p className="mt-2 text-gray-500">
            View enrolled students and their learning progress.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <p className="text-gray-500">Total Students</p>
              <h2 className="mt-2 text-3xl font-bold text-primary">245</h2>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <p className="text-gray-500">Active Learners</p>
              <h2 className="mt-2 text-3xl font-bold text-green-600">198</h2>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <p className="text-gray-500">Completed Courses</p>
              <h2 className="mt-2 text-3xl font-bold text-deep-blue">64</h2>
            </div>
          </div>

          <div className="mt-8 overflow-x-auto rounded-xl bg-white shadow-sm">
            <table className="w-full min-w-[750px] text-left">
              <thead className="bg-blue-50 text-deep-blue">
                <tr>
                  <th className="p-4">Student</th>
                  <th className="p-4">Course</th>
                  <th className="p-4">Progress</th>
                  <th className="p-4">Quiz Score</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-b">
                  <td className="p-4">
                    <p className="font-semibold">Alice Johnson</p>
                    <p className="text-sm text-gray-500">alice@example.com</p>
                  </td>
                  <td className="p-4">React for Beginners</td>
                  <td className="p-4">
                    <p className="mb-2 text-sm">80%</p>
                    <div className="h-2 w-28 rounded-full bg-gray-200">
                      <div className="h-2 w-4/5 rounded-full bg-primary"></div>
                    </div>
                  </td>
                  <td className="p-4">85%</td>
                  <td className="p-4">
                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                      Active
                    </span>
                  </td>
                </tr>

                <tr className="border-b">
                  <td className="p-4">
                    <p className="font-semibold">Michael Smith</p>
                    <p className="text-sm text-gray-500">michael@example.com</p>
                  </td>
                  <td className="p-4">UI/UX Design Basics</td>
                  <td className="p-4">
                    <p className="mb-2 text-sm">55%</p>
                    <div className="h-2 w-28 rounded-full bg-gray-200">
                      <div className="h-2 w-[55%] rounded-full bg-primary"></div>
                    </div>
                  </td>
                  <td className="p-4">72%</td>
                  <td className="p-4">
                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                      Active
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className="p-4">
                    <p className="font-semibold">Sarah Williams</p>
                    <p className="text-sm text-gray-500">sarah@example.com</p>
                  </td>
                  <td className="p-4">React for Beginners</td>
                  <td className="p-4">
                    <p className="mb-2 text-sm">100%</p>
                    <div className="h-2 w-28 rounded-full bg-gray-200">
                      <div className="h-2 w-full rounded-full bg-green-500"></div>
                    </div>
                  </td>
                  <td className="p-4">94%</td>
                  <td className="p-4">
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-deep-blue">
                      Completed
                    </span>
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

export default InstructorStudents