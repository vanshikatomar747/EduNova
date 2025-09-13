// React and Hooks
import { useEffect, useState } from "react"
// Redux
import { useDispatch, useSelector } from "react-redux"
// React Router
import { Outlet, useParams } from "react-router-dom"

// Components
import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal"
import VideoDetailsSidebar from "../components/core/ViewCourse/VideoDetailsSidebar"

// API and Actions
import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI"
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from "../slices/viewCourseSlice"

export default function ViewCourse() {
  const { courseId } = useParams()
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  // State for managing course review modal
  const [reviewModal, setReviewModal] = useState(false)

  useEffect(() => {
    // Fetch course details and update Redux state
    const fetchCourseDetails = async () => {
      try {
        const courseData = await getFullDetailsOfCourse(courseId, token)

        if (!courseData || !courseData.courseDetails) return

        // Update Redux store with course details
        dispatch(setCourseSectionData(courseData.courseDetails.courseContent))
        dispatch(setEntireCourseData(courseData.courseDetails))
        dispatch(setCompletedLectures(courseData.completedVideos))

        // Calculate total number of lectures
        let lectures = 0
        courseData.courseDetails.courseContent.forEach((section) => {
          lectures += section.subSection.length
        })
        dispatch(setTotalNoOfLectures(lectures))
      } catch (error) {
        console.error("Error fetching course details:", error)
      }
    }

    fetchCourseDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId, token])

  return (
    <>
      {/* Main Layout: Sidebar + Video Content */}
      <div className="relative flex min-h-[calc(100vh-3.5rem)]">
        {/* Sidebar for course sections and navigation */}
        <VideoDetailsSidebar setReviewModal={setReviewModal} />

        {/* Video content area */}
        <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
          <div className="mx-6">
            <Outlet />
          </div>
        </div>
      </div>

      {/* Review Modal (Only visible when enabled) */}
      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </>
  )
}
