import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { editCourseDetails } from "../../../../../services/operations/courseDetailsAPI"
import { resetCourseState, setStep } from "../../../../../slices/courseSlice"
import { COURSE_STATUS } from "../../../../../utils/constants"
import IconBtn from "../../../../common/IconBtn"

export default function PublishCourse() {
  const { register, handleSubmit, setValue, getValues } = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const { course } = useSelector((state) => state.course)
  const [loading, setLoading] = useState(false)

  // Sync the checkbox state with course status
  useEffect(() => {
    if (course?.status === COURSE_STATUS.PUBLISHED) {
      setValue("public", true)
    } else {
      setValue("public", false)
    }
  }, [course?.status, setValue])

  const goBack = () => dispatch(setStep(2))

  const goToCourses = () => {
    dispatch(resetCourseState())
    navigate("/dashboard/my-courses")
  }

  const handleCoursePublish = async () => {
    const isCurrentlyPublished = course?.status === COURSE_STATUS.PUBLISHED
    const makePublic = getValues("public")

    if ((isCurrentlyPublished && makePublic) || (!isCurrentlyPublished && !makePublic)) {
      goToCourses()
      return
    }

    const formData = new FormData()
    formData.append("courseId", course._id)
    formData.append("status", makePublic ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT)

    setLoading(true)
    const result = await editCourseDetails(formData, token)
    setLoading(false)

    if (result) {
      goToCourses()
    }
  }

  const onSubmit = () => handleCoursePublish()

  return (
    <div className="rounded-md border border-richblack-700 bg-richblack-800 p-6">
      <p className="text-2xl font-semibold text-richblack-5">Publish Settings</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="my-6 mb-8">
          <label htmlFor="public" className="inline-flex items-center text-lg">
            <input
              type="checkbox"
              id="public"
              {...register("public")}
              className="h-4 w-4 rounded border-gray-300 bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5"
            />
            <span className="ml-2 text-richblack-400">Make this course public</span>
          </label>
        </div>

        <div className="ml-auto flex max-w-max items-center gap-x-4">
          <button
            disabled={loading}
            type="button"
            onClick={goBack}
            className="flex items-center gap-x-2 rounded-md bg-richblack-300 px-5 py-2 font-semibold text-richblack-900"
          >
            Back
          </button>
          <IconBtn disabled={loading} text={loading ? "Saving..." : "Save Changes"} />
        </div>
      </form>
    </div>
  )
}
