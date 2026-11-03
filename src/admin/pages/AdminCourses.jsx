import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'

function AdminCourses() {
  return (
    <div>
      <AdminHeader />

      <div className="flex">
        <AdminSidebar />

        <main className="min-w-0 flex-1 p-8">
          <h1 className="text-3xl font-bold text-navy">Manage Courses</h1>
          <p className="mt-2 text-gray-500">
            Review courses submitted by instructors and monitor publication status.
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <p className="text-gray-500">All Courses</p>
              <h2 className="mt-2 text-3xl font-bold text-primary">86</h2>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <p className="text-gray-500">Published</p>
              <h2 className="mt-2 text-3xl font-bold text-green-600">68</h2>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <p className="text-gray-500">Pending Review</p>
              <h2 className="mt-2 text-3xl font-bold text-yellow-600">12</h2>
            </div>
          </div>

          <div className="mt-8 overflow-x-auto rounded-xl bg-white shadow-sm">
            <table className="w-full min-w-[800px] text-left">
              <thead className="bg-blue-50 text-deep-blue">
                <tr>
                  <th className="p-4">Course</th>
                  <th className="p-4">Instructor</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-b">
                  <td className="p-4 font-semibold">React for Beginners</td>
                  <td className="p-4">John David</td>
                  <td className="p-4">Development</td>
                  <td className="p-4">
                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                      Published
                    </span>
                  </td>
                  <td className="p-4">
                    <button type="button" className="font-semibold text-primary">
                      View
                    </button>
                  </td>
                </tr>

                <tr className="border-b">
                  <td className="p-4 font-semibold">Advanced React Development</td>
                  <td className="p-4">John David</td>
                  <td className="p-4">Development</td>
                  <td className="p-4">
                    <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
                      Pending
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      type="button"
                      className="mr-3 font-semibold text-green-600"
                    >
                      Approve
                    </button>
                    <button type="button" className="font-semibold text-red-500">
                      Reject
                    </button>
                  </td>
                </tr>

                <tr className="border-b">
                  <td className="p-4 font-semibold">UI/UX Design Basics</td>
                  <td className="p-4">Emma Wilson</td>
                  <td className="p-4">Design</td>
                  <td className="p-4">
                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                      Published
                    </span>
                  </td>
                  <td className="p-4">
                    <button type="button" className="font-semibold text-primary">
                      View
                    </button>
                  </td>
                </tr>

                <tr>
                  <td className="p-4 font-semibold">Python for Data Science</td>
                  <td className="p-4">Emma Wilson</td>
                  <td className="p-4">Data Science</td>
                  <td className="p-4">
                    <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
                      Pending
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      type="button"
                      className="mr-3 font-semibold text-green-600"
                    >
                      Approve
                    </button>
                    <button type="button" className="font-semibold text-red-500">
                      Reject
                    </button>
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

export default AdminCourses