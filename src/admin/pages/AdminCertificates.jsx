import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'

function AdminCertificates() {
  return (
    <div>
      <AdminHeader />

      <div className="flex">
        <AdminSidebar />

        <main className="min-w-0 flex-1 p-8">
          <h1 className="text-3xl font-bold text-navy">Certificates</h1>
          <p className="mt-2 text-gray-500">
            Review issued certificates and student course completions.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <p className="text-gray-500">Certificates Issued</p>
              <h2 className="mt-2 text-3xl font-bold text-primary">342</h2>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <p className="text-gray-500">This Month</p>
              <h2 className="mt-2 text-3xl font-bold text-green-600">48</h2>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <p className="text-gray-500">Pending Review</p>
              <h2 className="mt-2 text-3xl font-bold text-yellow-600">5</h2>
            </div>
          </div>

          <div className="mt-8 overflow-x-auto rounded-xl bg-white shadow-sm">
            <table className="w-full min-w-[750px] text-left">
              <thead className="bg-blue-50 text-deep-blue">
                <tr>
                  <th className="p-4">Certificate ID</th>
                  <th className="p-4">Student</th>
                  <th className="p-4">Course</th>
                  <th className="p-4">Issue Date</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-b">
                  <td className="p-4 font-semibold">LH-2026-001</td>
                  <td className="p-4">Alice Johnson</td>
                  <td className="p-4">React for Beginners</td>
                  <td className="p-4">Oct 10, 2026</td>
                  <td className="p-4">
                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                      Issued
                    </span>
                  </td>
                </tr>

                <tr className="border-b">
                  <td className="p-4 font-semibold">LH-2026-002</td>
                  <td className="p-4">Michael Smith</td>
                  <td className="p-4">UI/UX Design Basics</td>
                  <td className="p-4">Oct 12, 2026</td>
                  <td className="p-4">
                    <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
                      Pending
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className="p-4 font-semibold">LH-2026-003</td>
                  <td className="p-4">Sarah Williams</td>
                  <td className="p-4">HTML and CSS Essentials</td>
                  <td className="p-4">Oct 15, 2026</td>
                  <td className="p-4">
                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                      Issued
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-8 rounded-xl border border-light-blue bg-blue-50 p-6">
            <h2 className="text-lg font-bold text-deep-blue">
              Certificate Policy
            </h2>
            <p className="mt-2 leading-7 text-gray-600">
              Students should receive a certificate after meeting the required
              course completion criteria. Certificate verification and issuance
              will need to be connected to the backend.
            </p>
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminCertificates