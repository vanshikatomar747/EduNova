const RatingAndReview = require("../models/RatingandReview");
const Course = require("../models/Course");
const mongoose = require("mongoose");

// Create a new rating and review
exports.createRating = async (req, res) => {
  try {
    const userId = req.user.id;
    const { rating, review, courseId } = req.body;

    if (!rating || !review || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Rating, review, and course ID are required",
      });
    }

    // Check if the user is enrolled in the course
    const courseDetails = await Course.findOne({
      _id: courseId,
      studentsEnroled: userId,
    });
    if (!courseDetails) {
      return res.status(403).json({
        success: false,
        message: "You are not enrolled in this course",
      });
    }

    // Check if the user has already reviewed the course
    const alreadyReviewed = await RatingAndReview.findOne({
      user: userId,
      course: courseId,
    });
    if (alreadyReviewed) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this course",
      });
    }

    // Create a new rating and review
    const ratingReview = await RatingAndReview.create({
      rating,
      review,
      course: courseId,
      user: userId,
    });

    // Add the rating and review reference to the course
    await Course.findByIdAndUpdate(courseId, {
      $push: { ratingAndReviews: ratingReview._id },
    });

    return res.status(201).json({
      success: true,
      message: "Rating and review added successfully",
      ratingReview,
    });
  } catch (error) {
    console.error("Error creating rating:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to create rating and review",
      error: error.message,
    });
  }
};

// Get the average rating for a course
exports.getAverageRating = async (req, res) => {
  try {
    const { courseId } = req.body;
    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Course ID is required",
      });
    }

    // Calculate average rating using aggregation
    const result = await RatingAndReview.aggregate([
      { $match: { course: new mongoose.Types.ObjectId(courseId) } },
      { $group: { _id: null, averageRating: { $avg: "$rating" } } },
    ]);

    return res.status(200).json({
      success: true,
      averageRating: result.length > 0 ? result[0].averageRating : 0,
    });
  } catch (error) {
    console.error("Error fetching average rating:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to get average rating",
      error: error.message,
    });
  }
};

// Get all ratings and reviews (sorted by rating)
exports.getAllRatingReview = async (req, res) => {
  try {
    const allReviews = await RatingAndReview.find({})
      .sort({ rating: -1 }) // Highest rating first
      .populate("user", "firstName lastName email image") // Populate user fields
      .populate("course", "courseName") // Populate course name
      .exec();

    return res.status(200).json({
      success: true,
      data: allReviews,
    });
  } catch (error) {
    console.error("Error fetching all reviews:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve ratings and reviews",
      error: error.message,
    });
  }
};
