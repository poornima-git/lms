
import { Routes, Route } from 'react-router-dom'

// Public Pages
import Home from './student/pages/Home'
import Courses from './student/pages/Courses'
import CourseView from './student/pages/CourseView'

// Authentication
import Auth from './components/Auth'

// Student Pages
import StudentDashboard from './student/pages/StudentDashboard'
import Lesson from './student/pages/Lesson'
import Quiz from './student/pages/Quiz'
import Certificates from './student/pages/Certificates'
import Profile from './student/pages/Profile'

// Instructor Pages
import InstructorDashboard from './instructor/pages/InstructorDashboard'
import InstructorCourses from './instructor/pages/InstructorCourses'
import CreateCourse from './instructor/pages/CreateCourse'
import ManageLessons from './instructor/pages/ManageLessons'
import ManageQuizzes from './instructor/pages/ManageQuizzes'
import InstructorStudents from './instructor/pages/InstructorStudents'
import InstructorReviews from './instructor/pages/InstructorReviews'

// Admin Pages
import AdminDashboard from './admin/pages/AdminDashboard'
import AdminUsers from './admin/pages/AdminUsers'
import AdminCourses from './admin/pages/AdminCourses'
import AdminCertificates from './admin/pages/AdminCertificates'
import AdminReviews from './admin/pages/AdminReviews'
import AdminSettings from './admin/pages/AdminSettings'
import AddUsers from './admin/pages/AddUsers'

// Not Found Page
import Pnf from './components/Pnf'

function App() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<Home />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/courses/1" element={<CourseView />} />

      {/* Authentication */}
      <Route path="/login" element={<Auth />} />
      <Route path="/register" element={<Auth />} />

      {/* Student Pages */}
      <Route path="/student" element={<StudentDashboard />} />
      <Route path="/lesson/1" element={<Lesson />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/certificates" element={<Certificates />} />
      <Route path="/profile" element={<Profile />} />

      {/* Instructor Pages */}
      <Route path="/instructor" element={<InstructorDashboard />} />
      <Route path="/instructor/courses" element={<InstructorCourses />} />
      <Route path="/instructor/create-course" element={<CreateCourse />} />
      <Route path="/instructor/lessons" element={<ManageLessons />} />
      <Route path="/instructor/quizzes" element={<ManageQuizzes />} />
      <Route path="/instructor/students" element={<InstructorStudents />} />
      <Route path="/instructor/reviews" element={<InstructorReviews />} />

      {/* Admin Pages */}
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/users" element={<AdminUsers />} />
      <Route path="/admin/courses" element={<AdminCourses />} />
      <Route path="/admin/certificates" element={<AdminCertificates />} />
      <Route path="/admin/reviews" element={<AdminReviews />} />
      <Route path="/admin/settings" element={<AdminSettings />} />
      <Route path="/admin/add-user" element={<AddUsers />} />

      {/* 404 Page */}
      <Route path="*" element={<Pnf />} />
    </Routes>
  )
}

export default App
