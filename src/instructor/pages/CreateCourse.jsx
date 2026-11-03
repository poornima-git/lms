import InstructorHeader from '../components/InstructorHeader'
import InstructorSidebar from '../components/InstructorSidebar'

function CreateCourse() {
  return (
    <div>
      <InstructorHeader />

      <div className="flex">
        <InstructorSidebar />

        <main className="min-w-0 flex-1 p-8">
          <h1 className="text-3xl font-bold text-navy">Create Course</h1>
          <p className="mt-2 text-gray-500">
            Add course information and prepare your course for students.
          </p>

          <form className="mt-8 max-w-3xl space-y-6 rounded-xl bg-white p-8 shadow-sm">
            <div>
              <label className="mb-2 block font-semibold">Course Title</label>
              <input
                type="text"
                placeholder="Enter course title"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold">Course Description</label>
              <textarea
                rows="5"
                placeholder="Describe what students will learn"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-primary"
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block font-semibold">Category</label>
                <select className="w-full rounded-lg border border-gray-300 px-4 py-3">
                  <option>Web Development</option>
                  <option>UI/UX Design</option>
                  <option>Programming</option>
                  <option>Data Science</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block font-semibold">Level</label>
                <select className="w-full rounded-lg border border-gray-300 px-4 py-3">
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>
            </div>

            <div>
              <label className="mb-2 block font-semibold">Course Price ($)</label>
              <input
                type="number"
                placeholder="49"
                className="w-full rounded-lg border border-gray-300 px-4 py-3"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold">Course Thumbnail</label>
              <div className="rounded-lg border-2 border-dashed border-light-blue bg-blue-50 p-8 text-center">
                <p className="font-semibold text-deep-blue">Upload course image</p>
                <p className="mt-2 text-sm text-gray-500">PNG or JPG image</p>
                <input type="file" accept="image/*" className="mt-4 max-w-full" />
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                className="rounded-lg border border-primary px-6 py-3 font-semibold text-primary"
              >
                Save as Draft
              </button>

              <button
                type="button"
                className="rounded-lg bg-primary px-6 py-3 font-semibold text-white hover:bg-deep-blue"
              >
                Submit Course
              </button>
            </div>

            <p className="text-sm text-gray-500">
              Demo form only. Saving and publishing will be connected when backend
              functionality is added.
            </p>
          </form>
        </main>
      </div>
    </div>
  )
}

export default CreateCourse