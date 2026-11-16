
import apiService from "../api/apiService";


// ================= AUTH APIs =================

// Register API : Auth component when clicking register button
export const registerAPI = async (userData) => {
    return await apiService("POST", "/register", userData)
}

// Login API : Auth component when clicking login button
export const loginAPI = async (userData) => {
    return await apiService("POST", "/login", userData)
}


// ================= USER PROFILE APIs =================

// Get user profile API : Profile component when page loads
export const getUserProfileAPI = async () => {
    return await apiService("GET", "/profile", {})
}

// Update user profile API : Profile component when clicking update button
export const userUpdateAPI = async (userData) => {
    return await apiService("PUT", "/profile", userData)
}


// ================= PUBLIC COURSE APIs =================

// Get home courses API : Home component when page loads
export const getHomeCoursesAPI = async () => {
    return await apiService("GET", "/home-courses", {})
}

// Get all courses API : Courses component when page loads
export const getAllCoursesAPI = async (searchKey = "", category = "", level = "") => {
    return await apiService(
        "GET",
        `/courses?search=${encodeURIComponent(searchKey)}&category=${encodeURIComponent(category)}&level=${encodeURIComponent(level)}`,
        {}
    )
}

// View single course API : CourseView component
export const viewCourseAPI = async (courseId) => {
    return await apiService("GET", `/courses/${courseId}`, {})
}

// Get course reviews API : CourseView component
export const getCourseReviewsAPI = async (courseId) => {
    return await apiService("GET", `/courses/${courseId}/reviews`, {})
}


// ================= STUDENT ENROLLMENT APIs =================

// Enroll course API : CourseView component when clicking enroll button
export const enrollCourseAPI = async (courseId) => {
    return await apiService("POST", "/enroll", { courseId })
}

// Get student enrolled courses API : MyCourses component
export const getMyCoursesAPI = async () => {
    return await apiService("GET", "/my-courses", {})
}

// Check enrollment API : CourseView component
export const checkEnrollmentAPI = async (courseId) => {
    return await apiService("GET", `/check-enrollment/${courseId}`, {})
}


// ================= LESSON APIs =================

// Get course lessons API : Lesson and course learning components
export const getCourseLessonsAPI = async (courseId) => {
    return await apiService("GET", `/course/${courseId}/lessons`, {})
}

// Get single lesson API : Lesson component
export const viewLessonAPI = async (lessonId) => {
    return await apiService("GET", `/lessons/${lessonId}`, {})
}

// Complete lesson API : Lesson component when clicking complete button
export const completeLessonAPI = async (lessonId) => {
    return await apiService("POST", `/lessons/${lessonId}/complete`, {})
}


// ================= PROGRESS APIs =================

// Get all student progress API : LearningProgress component
export const getMyProgressAPI = async () => {
    return await apiService("GET", "/my-progress", {})
}

// Get particular course progress API : Course progress component
export const getCourseProgressAPI = async (courseId) => {
    return await apiService("GET", `/course/${courseId}/progress`, {})
}


// ================= QUIZ APIs =================

// Get course quizzes API : Student quiz section
export const getCourseQuizzesAPI = async (courseId) => {
    return await apiService("GET", `/course/${courseId}/quizzes`, {})
}

// Get single quiz API : Quiz component
export const viewQuizAPI = async (quizId) => {
    return await apiService("GET", `/quizzes/${quizId}`, {})
}

// Submit quiz API : Quiz component when clicking submit button
export const submitQuizAPI = async (quizId, answers) => {
    return await apiService("POST", `/quizzes/${quizId}/submit`, { answers })
}

// Get student quiz results API : QuizResults component
export const getMyQuizResultsAPI = async () => {
    return await apiService("GET", "/my-quiz-results", {})
}

// Get instructor quiz results API : Instructor quiz results
export const getQuizResultsAPI = async (quizId) => {
    return await apiService("GET", `/instructor/quizzes/${quizId}/results`, {})
}


// ================= CERTIFICATE APIs =================

// Get student certificates API : Certificates component
export const getMyCertificatesAPI = async () => {
    return await apiService("GET", "/my-certificates", {})
}

// View certificate API : Certificate details
export const viewCertificateAPI = async (certificateId) => {
    return await apiService("GET", `/certificates/${certificateId}`, {})
}


// ================= STUDENT REVIEW APIs =================

// Add review API : CourseView component
export const addReviewAPI = async (reviewData) => {
    return await apiService("POST", "/reviews", reviewData)
}

// Update review API : Student review component
export const updateReviewAPI = async (reviewId, reviewData) => {
    return await apiService("PUT", `/reviews/${reviewId}`, reviewData)
}

// Delete review API : Student review component
export const deleteReviewAPI = async (reviewId) => {
    return await apiService("DELETE", `/reviews/${reviewId}`, {})
}


// ================= INSTRUCTOR COURSE APIs =================

// Add course API : CreateCourse component
export const addCourseAPI = async (courseData) => {
    return await apiService("POST", "/instructor/courses", courseData)
}

// Get instructor courses API : InstructorCourses component
export const getInstructorCoursesAPI = async () => {
    return await apiService("GET", "/instructor/courses", {})
}

// Update course API : CreateCourse component
export const updateCourseAPI = async (courseId, courseData) => {
    return await apiService("PUT", `/instructor/courses/${courseId}`, courseData)
}

// Delete course API : InstructorCourses component
export const deleteCourseAPI = async (courseId) => {
    return await apiService("DELETE", `/instructor/courses/${courseId}`, {})
}


// ================= INSTRUCTOR LESSON APIs =================

// Add lesson API : ManageLessons component
export const addLessonAPI = async (lessonData) => {
    return await apiService("POST", "/instructor/lessons", lessonData)
}

// Update lesson API : ManageLessons component
export const updateLessonAPI = async (lessonId, lessonData) => {
    return await apiService("PUT", `/instructor/lessons/${lessonId}`, lessonData)
}

// Delete lesson API : ManageLessons component
export const deleteLessonAPI = async (lessonId) => {
    return await apiService("DELETE", `/instructor/lessons/${lessonId}`, {})
}


// ================= INSTRUCTOR QUIZ APIs =================

// Add quiz API : ManageQuizzes component
export const addQuizAPI = async (quizData) => {
    return await apiService("POST", "/instructor/quizzes", quizData)
}

// Update quiz API : ManageQuizzes component
export const updateQuizAPI = async (quizId, quizData) => {
    return await apiService("PUT", `/instructor/quizzes/${quizId}`, quizData)
}

// Delete quiz API : ManageQuizzes component
export const deleteQuizAPI = async (quizId) => {
    return await apiService("DELETE", `/instructor/quizzes/${quizId}`, {})
}


// ================= INSTRUCTOR REVIEW APIs =================

// Get instructor reviews API : InstructorReviews component
export const getInstructorReviewsAPI = async () => {
    return await apiService("GET", "/instructor/reviews", {})
}


// ================= ADMIN APIs =================

// Get admin dashboard API : AdminDashboard component
export const getAdminDashboardAPI = async () => {
    return await apiService("GET", "/admin/dashboard", {})
}


// Get all users API : AdminUsers component
export const getAllUsersAPI = async () => {
    return await apiService("GET", "/admin/users", {})
}

// Add user API : AddUsers component
export const addUserAPI = async (userData) => {
    return await apiService("POST", "/admin/users", userData)
}

// Update user status API : AdminUsers component
export const updateUserStatusAPI = async (userId, status) => {
    return await apiService("PUT", `/admin/users/${userId}/status`, { status })
}

// Update user role API : AdminUsers component
export const updateUserRoleAPI = async (userId, role) => {
    return await apiService("PUT", `/admin/users/${userId}/role`, { role })
}

// Delete user API : AdminUsers component
export const deleteUserAPI = async (userId) => {
    return await apiService("DELETE", `/admin/users/${userId}`, {})
}


// ================= ADMIN COURSE APIs =================

// Get all courses API : AdminCourses component
export const getAdminCoursesAPI = async () => {
    return await apiService("GET", "/admin/courses", {})
}

// Update course status API : AdminCourses component
export const updateAdminCourseStatusAPI = async (courseId, status) => {
    return await apiService("PUT", `/admin/courses/${courseId}/status`, { status })
}


// ================= ADMIN REVIEW APIs =================

// Get all reviews API : AdminReviews component
export const getAdminReviewsAPI = async () => {
    return await apiService("GET", "/admin/reviews", {})
}

// Update review status API : AdminReviews component
export const updateAdminReviewStatusAPI = async (reviewId, status) => {
    return await apiService("PUT", `/admin/reviews/${reviewId}/status`, { status })
}


// ================= ADMIN CERTIFICATE APIs =================

// Get all certificates API : AdminCertificates component
export const getAdminCertificatesAPI = async () => {
    return await apiService("GET", "/admin/certificates", {})
}

// Update certificate status API : AdminCertificates component
export const updateCertificateStatusAPI = async (certificateId, status) => {
    return await apiService("PUT", `/admin/certificates/${certificateId}/status`, { status })
}
