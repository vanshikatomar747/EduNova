const express = require("express")
const router = express.Router()
const { auth, isInstructor, isStudent, isAdmin } = require("../middleware/auth")

const {
  createCourse, getAllCourses, getCourseDetails, getFullCourseDetails,
  editCourse, getInstructorCourses, deleteCourse
} = require("../controllers/Course")

const {
  showAllCategories, createCategory, categoryPageDetails
} = require("../controllers/Category")

const { createSection, updateSection, deleteSection } = require("../controllers/Section")
const { createSubSection, updateSubSection, deleteSubSection } = require("../controllers/Subsection")
const { createRating, getAverageRating, getAllRatingReview } = require("../controllers/RatingandReview")
const { updateCourseProgress } = require("../controllers/courseProgress")

// -------------------- Course routes --------------------
router.post("/createCourse", auth, isInstructor, createCourse)
router.post("/editCourse", auth, isInstructor, editCourse)
router.post("/addSection", auth, isInstructor, createSection)
router.post("/updateSection", auth, isInstructor, updateSection)
router.post("/deleteSection", auth, isInstructor, deleteSection)
router.post("/addSubSection", auth, isInstructor, createSubSection)
router.post("/updateSubSection", auth, isInstructor, updateSubSection)
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection)
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses)
router.get("/getAllCourses", getAllCourses)
router.post("/getCourseDetails", getCourseDetails)
router.post("/getFullCourseDetails", auth, getFullCourseDetails)
router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress)
router.delete("/deleteCourse", auth, isInstructor, deleteCourse) // fixed

// -------------------- Category routes --------------------
router.post("/createCategory", auth, isAdmin, createCategory)
router.get("/showAllCategories", showAllCategories)
router.post("/getCategoryPageDetails", categoryPageDetails)

// -------------------- Rating & Review --------------------
router.post("/createRating", auth, isStudent, createRating)
router.get("/getAverageRating", getAverageRating)
router.get("/getReviews", getAllRatingReview)

module.exports = router
