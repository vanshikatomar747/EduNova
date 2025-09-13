import { useEffect, useState } from "react"
import ProgressBar from "@ramonak/react-progress-bar"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getUserEnrolledCourses } from "../../../services/operations/profileAPI"

export default function EnrolledCourses() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [enrolledCourses, setEnrolledCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch enrolled courses
  const fetchEnrolledCourses = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await getUserEnrolledCourses(token)
      const filteredCourses = res.filter((course) => course.status !== "Draft")
      setEnrolledCourses(filteredCourses)
    } catch (err) {
      setError("Failed to load enrolled courses. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEnrolledCourses()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Loading Skeleton
  if (loading) {
    return (
      <div className="p-6">
        <p className="text-3xl text-richblack-50 mb-6">Enrolled Courses</p>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-center gap-4 rounded-lg border border-richblack-700 bg-richblack-800 p-4 animate-pulse"
            >
              <div className="h-14 w-14 rounded-lg bg-richblack-600"></div>
              <div className="flex flex-col gap-2 w-full">
                <div className="h-4 w-1/3 bg-richblack-600 rounded"></div>
                <div className="h-3 w-2/3 bg-richblack-600 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center text-richblack-5">
        <div className="text-center">
          <p className="text-lg mb-4">{error}</p>
          <button
            onClick={fetchEnrolledCourses}
            className="bg-yellow-50 text-richblack-900 px-4 py-2 rounded-md font-semibold hover:bg-yellow-100 transition"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <p className="text-3xl text-richblack-50 mb-6">Enrolled Courses</p>
      {!enrolledCourses.length ? (
        <p className="text-richblack-300 text-center text-lg">
          You have not enrolled in any course yet.
        </p>
      ) : (
        <div className="my-8 text-richblack-5">
          {/* Table Header */}
          <div className="flex rounded-t-lg bg-richblack-500 text-sm md:text-base">
            <p className="w-[45%] px-5 py-3">Course Name</p>
            <p className="w-1/4 px-2 py-3">Duration</p>
            <p className="flex-1 px-2 py-3">Progress</p>
          </div>

          {/* Course Rows */}
          {enrolledCourses.map((course, i, arr) => (
            <div
              className={`flex items-center border border-richblack-700 ${
                i === arr.length - 1 ? "rounded-b-lg" : ""
              }`}
              key={course._id}
            >
              {/* Course Info */}
              <div
                className="flex w-[45%] items-center gap-4 px-5 py-3 cursor-pointer"
                onClick={() => {
                  navigate(
                    `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                  )
                }}
              >
                <img
                  src={course.thumbnail}
                  alt="course_img"
                  className="h-14 w-14 rounded-lg object-cover"
                />
                <div className="flex flex-col gap-1">
                  <p className="font-semibold text-base">{course.courseName}</p>
                  <p className="text-xs text-richblack-300">
                    {course.courseDescription.length > 50
                      ? `${course.courseDescription.slice(0, 50)}...`
                      : course.courseDescription}
                  </p>
                </div>
              </div>

              {/* Duration */}
              <div className="w-1/4 px-2 py-3 text-sm">
                {course?.totalDuration || "N/A"}
              </div>

              {/* Progress */}
              <div className="flex flex-col gap-2 w-1/5 px-2 py-3">
                <p className="text-xs">
                  Progress: {course.progressPercentage || 0}%
                </p>
                <ProgressBar
                  completed={course.progressPercentage || 0}
                  height="8px"
                  isLabelVisible={false}
                  baseBgColor="#2c2f36"
                  bgColor="#ffd60a"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
