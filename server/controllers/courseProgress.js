const SubSection = require("../models/Subsection");
const CourseProgress = require("../models/CourseProgress");

// Update Course Progress
exports.updateCourseProgress = async (req, res) => {
  const { courseId, subsectionId } = req.body;
  const userId = req.user.id;

  try {
    // Validate subsection
    const subsection = await SubSection.findById(subsectionId);
    if (!subsection) {
      return res.status(404).json({ error: "Invalid subsection" });
    }

    // Find user's course progress
    const courseProgress = await CourseProgress.findOne({ courseID: courseId, userId });
    if (!courseProgress) {
      return res.status(404).json({ success: false, message: "Course progress does not exist" });
    }

    // Prevent duplicate completion
    if (courseProgress.completedVideos.includes(subsectionId)) {
      return res.status(400).json({ error: "Subsection already completed" });
    }

    // Mark subsection as completed
    courseProgress.completedVideos.push(subsectionId);
    await courseProgress.save();

    return res.status(200).json({ message: "Course progress updated" });
  } catch (error) {
    console.error("Error updating course progress:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Get Progress Percentage
// exports.getProgressPercentage = async (req, res) => {
//   const { courseId } = req.body;
//   const userId = req.user.id;

//   if (!courseId) {
//     return res.status(400).json({ error: "Course ID is required" });
//   }

//   try {
//     // Find progress and populate course details
//     const courseProgress = await CourseProgress.findOne({ courseID: courseId, userId })
//       .populate({ path: "courseID", populate: { path: "courseContent" } })
//       .exec();

//     if (!courseProgress) {
//       return res.status(400).json({ error: "Course progress not found" });
//     }

//     // Count total lectures
//     let lectures = 0;
//     courseProgress.courseID.courseContent.forEach(sec => {
//       lectures += sec.subSection.length || 0;
//     });

//     // Calculate percentage
//     let progressPercentage = (courseProgress.completedVideos.length / lectures) * 100;
//     progressPercentage = Math.round(progressPercentage * 100) / 100; // Round to 2 decimals

//     return res.status(200).json({ data: progressPercentage, message: "Successfully fetched course progress" });
//   } catch (error) {
//     console.error("Error fetching progress:", error.message);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// };
