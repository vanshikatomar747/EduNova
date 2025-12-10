const Course = require("../models/Course");
const Category = require("../models/Category");
const Section = require("../models/Section");
const SubSection = require("../models/Subsection");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const CourseProgress = require("../models/CourseProgress");
const { convertSecondsToDuration } = require("../utils/secToDuration");

// Create a new course
exports.createCourse = async (req, res) => {
  try {
    if (!req.files?.thumbnailImage) {
      console.log("No thumbnail file received", req.files);
    }
    
    console.log("req.body:", req.body);
console.log("req.files:", req.files);
console.log("req.user:", req.user);


    const userId = req.user.id;
    const {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      tag: _tag,
      category,
      status,
      instructions: _instructions,
    } = req.body;

    // Validate instructor
    const instructorDetails = await User.findById(userId);
    if (!instructorDetails || instructorDetails.accountType !== "Instructor") {
      return res.status(404).json({
        success: false,
        message: "Instructor Details Not Found",
      });
    }

    // Validate category
    const categoryDetails = await Category.findById(category);
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category Details Not Found",
      });
    }

    // Validate and parse tags and instructions
    let tag = [];
    let instructions = [];
    try {
      tag = typeof _tag === "string" ? JSON.parse(_tag) : _tag;
      instructions = typeof _instructions === "string" ? JSON.parse(_instructions) : _instructions;
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Invalid format for tag or instructions",
      });
    }

    // Validate required fields
    if (!courseName || !courseDescription || !whatYouWillLearn || !price || !tag.length || !instructions.length) {
      return res.status(400).json({
        success: false,
        message: "All fields are mandatory",
      });
    }

    // Validate thumbnail
    const thumbnail = req.files?.thumbnailImage;
    if (!thumbnail) {
      return res.status(400).json({
        success: false,
        message: "Thumbnail image is required",
      });
    }

    // Upload thumbnail to Cloudinary
    const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

    // Create course
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn,
      price,
      tag,
      category: categoryDetails._id,
      thumbnail: thumbnailImage.secure_url,
      status: status || "Draft",
      instructions,
    });

    // Update instructor and category
    await User.findByIdAndUpdate(instructorDetails._id, { $push: { courses: newCourse._id } });
    await Category.findByIdAndUpdate(categoryDetails._id, { $push: { courses: newCourse._id } });

    return res.status(200).json({
      success: true,
      data: newCourse,
      message: "Course Created Successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to create course",
      error: error.message,
    });
  }
};

// Edit course
exports.editCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ success: false, message: "Course not found" });

    // Update thumbnail if provided
    if (req.files?.thumbnailImage) {
      const thumbnailImage = await uploadImageToCloudinary(req.files.thumbnailImage, process.env.FOLDER_NAME);
      course.thumbnail = thumbnailImage.secure_url;
    }

    // Update fields
    for (const key in req.body) {
      if (req.body.hasOwnProperty(key)) {
        if (key === "tag" || key === "instructions") {
          course[key] = typeof req.body[key] === "string" ? JSON.parse(req.body[key]) : req.body[key];
        } else if (key !== "courseId") {
          course[key] = req.body[key];
        }
      }
    }

    await course.save();

    const updatedCourse = await Course.findById(courseId)
      .populate({ path: "instructor", populate: { path: "additionalDetails" } })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({ path: "courseContent", populate: { path: "subSection" } })
      .exec();

    return res.json({ success: true, message: "Course updated successfully", data: updatedCourse });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

// Get all published courses
exports.getAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find({ status: "Published" })
      .select("courseName price thumbnail instructor ratingAndReviews studentsEnrolled")
      .populate("instructor")
      .exec();

    return res.status(200).json({ success: true, data: allCourses });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Can't fetch courses", error: error.message });
  }
};

// Get course details
exports.getCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;
    const courseDetails = await Course.findById(courseId)
      .populate({ path: "instructor", populate: { path: "additionalDetails" } })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({ path: "courseContent", populate: { path: "subSection", select: "-videoUrl" } })
      .exec();

    if (!courseDetails) return res.status(404).json({ success: false, message: "Course not found" });

    let totalDurationInSeconds = 0;
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((sub) => {
        totalDurationInSeconds += parseInt(sub.timeDuration || 0);
      });
    });

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds);

    return res.status(200).json({ success: true, data: { courseDetails, totalDuration } });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get full course details for a user
exports.getFullCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;

    const courseDetails = await Course.findById(courseId)
      .populate({ path: "instructor", populate: { path: "additionalDetails" } })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({ path: "courseContent", populate: { path: "subSection" } })
      .exec();

    const courseProgress = await CourseProgress.findOne({ courseID: courseId, userId });

    let totalDurationInSeconds = 0;
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((sub) => {
        totalDurationInSeconds += parseInt(sub.timeDuration || 0);
      });
    });

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds);

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
        completedVideos: courseProgress?.completedVideos || [],
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get courses for an instructor
exports.getInstructorCourses = async (req, res) => {
  try {
    const instructorId = req.user.id;
    const courses = await Course.find({ instructor: instructorId }).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: courses });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Delete course
exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ success: false, message: "Course not found" });

    // Remove course from students
    for (const studentId of course.studentsEnroled || []) {
      await User.findByIdAndUpdate(studentId, { $pull: { courses: courseId } });
    }

    // Delete sections and subsections
    for (const sectionId of course.courseContent || []) {
      const section = await Section.findById(sectionId);
      if (section) {
        for (const subSectionId of section.subSection || []) {
          await SubSection.findByIdAndDelete(subSectionId);
        }
        await Section.findByIdAndDelete(sectionId);
      }
    }

    // Delete course
    await Course.findByIdAndDelete(courseId);

    return res.status(200).json({ success: true, message: "Course deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
