import { toast } from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { courseEndpoints } from "../apis"

const {
  COURSE_DETAILS_API,
  COURSE_CATEGORIES_API,
  GET_ALL_COURSE_API,
  CREATE_COURSE_API,
  EDIT_COURSE_API,
  CREATE_SECTION_API,
  CREATE_SUBSECTION_API,
  UPDATE_SECTION_API,
  UPDATE_SUBSECTION_API,
  DELETE_SECTION_API,
  DELETE_SUBSECTION_API,
  GET_ALL_INSTRUCTOR_COURSES_API,
  DELETE_COURSE_API,
  GET_FULL_COURSE_DETAILS_AUTHENTICATED,
  CREATE_RATING_API,
  LECTURE_COMPLETION_API,
} = courseEndpoints

// -------------------- Get All Courses --------------------
export const getAllCourses = async () => {
  const toastId = toast.loading("Loading...")
  let result = []
  try {
    const response = await apiConnector("GET", GET_ALL_COURSE_API)
    if (!response?.data?.success) throw new Error("Could Not Fetch Courses")
    result = response?.data?.data
  } catch (error) {
    console.error("GET_ALL_COURSE_API ERROR:", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// -------------------- Fetch Course Details --------------------
export const fetchCourseDetails = async (courseId) => {
  const toastId = toast.loading("Loading...")
  let result = null
  try {
    const response = await apiConnector("POST", COURSE_DETAILS_API, { courseId })
    if (!response.data.success) throw new Error(response.data.message)
    result = response.data
  } catch (error) {
    console.error("COURSE_DETAILS_API ERROR:", error)
    result = error?.response?.data || null
  }
  toast.dismiss(toastId)
  return result
}

// -------------------- Fetch Course Categories --------------------
export const fetchCourseCategories = async () => {
  let result = []
  try {
    const response = await apiConnector("GET", COURSE_CATEGORIES_API)
    if (!response?.data?.success) throw new Error("Could Not Fetch Categories")
    result = response?.data?.data
  } catch (error) {
    console.error("COURSE_CATEGORIES_API ERROR:", error)
    toast.error(error.message)
  }
  return result
}

// -------------------- Add New Course --------------------
export const addCourseDetails = async (data, token) => {
  const toastId = toast.loading("Loading...")
  let result = null
  try {
    const response = await apiConnector("POST", CREATE_COURSE_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    })
    if (!response?.data?.success) throw new Error("Could Not Add Course Details")
    toast.success("Course Created Successfully")
    result = response?.data?.data
  } catch (error) {
    console.error("CREATE_COURSE_API ERROR:", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// -------------------- Edit Course --------------------
export const editCourseDetails = async (data, token) => {
  const toastId = toast.loading("Loading...")
  let result = null
  try {
    const response = await apiConnector("POST", EDIT_COURSE_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    })
    if (!response?.data?.success) throw new Error("Could Not Update Course")
    toast.success("Course Updated Successfully")
    result = response?.data?.data
  } catch (error) {
    console.error("EDIT_COURSE_API ERROR:", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// -------------------- Create Section --------------------
export const createSection = async (data, token) => {
  const toastId = toast.loading("Loading...")
  let result = null
  try {
    const response = await apiConnector("POST", CREATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    if (!response?.data?.success) throw new Error("Could Not Create Section")
    toast.success("Section Created")
    result = response?.data?.updatedCourse
  } catch (error) {
    console.error("CREATE_SECTION_API ERROR:", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// -------------------- Create Subsection --------------------
export const createSubSection = async (data, token) => {
  const toastId = toast.loading("Loading...")
  let result = null
  try {
    const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    if (!response?.data?.success) throw new Error("Could Not Add Lecture")
    toast.success("Lecture Added")
    result = response?.data?.data
  } catch (error) {
    console.error("CREATE_SUBSECTION_API ERROR:", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// -------------------- Update Section --------------------
export const updateSection = async (data, token) => {
  const toastId = toast.loading("Loading...")
  let result = null
  try {
    const response = await apiConnector("POST", UPDATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    if (!response?.data?.success) throw new Error("Could Not Update Section")
    toast.success("Section Updated")
    result = response?.data?.data
  } catch (error) {
    console.error("UPDATE_SECTION_API ERROR:", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// -------------------- Update Subsection --------------------
export const updateSubSection = async (data, token) => {
  const toastId = toast.loading("Loading...")
  let result = null
  try {
    const response = await apiConnector("POST", UPDATE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    if (!response?.data?.success) throw new Error("Could Not Update Lecture")
    toast.success("Lecture Updated")
    result = response?.data?.data
  } catch (error) {
    console.error("UPDATE_SUBSECTION_API ERROR:", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// -------------------- Delete Section --------------------
export const deleteSection = async (data, token) => {
  const toastId = toast.loading("Loading...")
  let result = null
  try {
    const response = await apiConnector("POST", DELETE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    if (!response?.data?.success) throw new Error("Could Not Delete Section")
    toast.success("Section Deleted")
    result = response?.data?.data
  } catch (error) {
    console.error("DELETE_SECTION_API ERROR:", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// -------------------- Delete Subsection --------------------
export const deleteSubSection = async (data, token) => {
  const toastId = toast.loading("Loading...")
  let result = null
  try {
    const response = await apiConnector("POST", DELETE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    if (!response?.data?.success) throw new Error("Could Not Delete Lecture")
    toast.success("Lecture Deleted")
    result = response?.data?.data
  } catch (error) {
    console.error("DELETE_SUBSECTION_API ERROR:", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// -------------------- Fetch Instructor Courses --------------------
export const fetchInstructorCourses = async (token) => {
  const toastId = toast.loading("Loading...")
  let result = []
  try {
    const response = await apiConnector("GET", GET_ALL_INSTRUCTOR_COURSES_API, null, {
      Authorization: `Bearer ${token}`,
    })
    if (!response?.data?.success) throw new Error("Could Not Fetch Instructor Courses")
    result = response?.data?.data
  } catch (error) {
    console.error("INSTRUCTOR_COURSES_API ERROR:", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// -------------------- Delete Course --------------------
export const deleteCourse = async (data, token) => {
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("DELETE", DELETE_COURSE_API, data, {
      Authorization: `Bearer ${token}`,
    })
    if (!response?.data?.success) throw new Error("Could Not Delete Course")
    toast.success("Course Deleted")
  } catch (error) {
    console.error("DELETE_COURSE_API ERROR:", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
}

// -------------------- Get Full Course Details --------------------
export const getFullDetailsOfCourse = async (courseId, token) => {
  const toastId = toast.loading("Loading...")
  let result = null
  try {
    const response = await apiConnector(
      "POST",
      GET_FULL_COURSE_DETAILS_AUTHENTICATED,
      { courseId },
      { Authorization: `Bearer ${token}` }
    )
    if (!response.data.success) throw new Error(response.data.message)
    result = response?.data?.data
  } catch (error) {
    console.error("COURSE_FULL_DETAILS_API ERROR:", error)
    result = error?.response?.data || null
  }
  toast.dismiss(toastId)
  return result
}

// -------------------- Mark Lecture Complete --------------------
export const markLectureAsComplete = async (data, token) => {
  const toastId = toast.loading("Loading...")
  let result = false
  try {
    const response = await apiConnector("POST", LECTURE_COMPLETION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    if (!response.data.message) throw new Error(response.data.error)
    toast.success("Lecture Completed")
    result = true
  } catch (error) {
    console.error("MARK_LECTURE_AS_COMPLETE_API ERROR:", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// -------------------- Create Course Rating --------------------
export const createRating = async (data, token) => {
  const toastId = toast.loading("Loading...")
  let success = false
  try {
    const response = await apiConnector("POST", CREATE_RATING_API, data, {
      Authorization: `Bearer ${token}`,
    })
    if (!response?.data?.success) throw new Error("Could Not Create Rating")
    toast.success("Rating Added")
    success = true
  } catch (error) {
    console.error("CREATE_RATING_API ERROR:", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return success
}
