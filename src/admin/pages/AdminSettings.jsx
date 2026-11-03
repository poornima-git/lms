import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'

function AdminSettings() {
  return (
    <div>
      <AdminHeader />

      <div className="flex">
        <AdminSidebar />

        <main className="min-w-0 flex-1 p-8">
          <h1 className="text-3xl font-bold text-navy">Platform Settings</h1>
          <p className="mt-2 text-gray-500">
            Configure your LMS platform preferences.
          </p>

          <div className="mt-8 max-w-3xl space-y-6">
            <section className="rounded-xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-navy">General Information</h2>

              <div className="mt-5 space-y-5">
                <div>
                  <label className="mb-2 block font-semibold">Platform Name</label>
                  <input
                    type="text"
                    defaultValue="LearnHub"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-semibold">Contact Email</label>
                  <input
                    type="email"
                    defaultValue="support@learnhub.com"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-semibold">Platform Description</label>
                  <textarea
                    rows="3"
                    defaultValue="An online learning platform for students and instructors."
                    className="w-full rounded-lg border border-gray-300 px-4 py-3"
                  />
                </div>
              </div>
            </section>

            <section className="rounded-xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-navy">Account Settings</h2>

              <div className="mt-5 space-y-5">
                <div>
                  <label className="mb-2 block font-semibold">Admin Name</label>
                  <input
                    type="text"
                    defaultValue="Admin User"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-semibold">Admin Email</label>
                  <input
                    type="email"
                    defaultValue="admin@learnhub.com"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-semibold">New Password</label>
                  <input
                    type="password"
                    placeholder="Enter new password"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3"
                  />
                </div>
              </div>
            </section>

            <section className="rounded-xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-navy">Course Approval</h2>

              <p className="mt-2 leading-7 text-gray-600">
                New instructor courses should be reviewed by an administrator
                before they become publicly available.
              </p>

              <span className="mt-4 inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                Manual approval enabled
              </span>
            </section>

            <button
              type="button"
              className="rounded-lg bg-primary px-6 py-3 font-semibold text-white hover:bg-deep-blue"
            >
              Save Settings
            </button>

            <p className="text-sm text-gray-500">
              These settings are for UI demonstration only. Changes will not be
              saved until backend functionality is implemented.
            </p>
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminSettings