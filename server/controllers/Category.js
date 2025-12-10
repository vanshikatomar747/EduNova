const Category = require("../models/Category");

// Utility function to get a random index
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// -------------------- CREATE CATEGORY --------------------
exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    //  Validate required fields
    if (!name) {
      return res.status(400).json({ success: false, message: "Name is required" });
    }

    //  Create category
    const categoryDetails = await Category.create({
      name,
      description: description || "",
    });

    return res.status(200).json({
      success: true,
      message: "Category created successfully",
      data: categoryDetails,
    });
  } catch (error) {
    console.error("Error creating category:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create category",
      error: error.message,
    });
  }
};

// -------------------- SHOW ALL CATEGORIES --------------------
// -------------------- SHOW ALL CATEGORIES --------------------
exports.showAllCategories = async (req, res) => {
  console.log("=== showAllCategories endpoint hit! ===");
  try {
    console.log("Attempting to fetch categories from database...");
    const allCategories = await Category.find();
    console.log("Categories found:", allCategories.length);

    if (allCategories.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No categories found",
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      data: allCategories,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch categories",
      error: error.message,
    });
  }
};


// -------------------- CATEGORY PAGE DETAILS --------------------
exports.categoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body;

    //  Validate categoryId
    if (!categoryId) {
      return res.status(400).json({ success: false, message: "Category ID is required" });
    }

    //  Get courses for the specified category
    const selectedCategory = await Category.findById(categoryId)
      .populate({
        path: "courses",
        match: { status: "Published" },
        populate: "ratingAndReviews",
      })
      .exec();

    //  Handle category not found
    if (!selectedCategory) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    //  Handle case when no courses exist for selected category
    if (!selectedCategory.courses || selectedCategory.courses.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No courses found for the selected category",
      });
    }

    //  Get courses for other categories
    const categoriesExceptSelected = await Category.find({ _id: { $ne: categoryId } });

    let differentCategory = null;
    if (categoriesExceptSelected.length > 0) {
      const randomCategoryId =
        categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]._id;

      differentCategory = await Category.findById(randomCategoryId)
        .populate({
          path: "courses",
          match: { status: "Published" },
        })
        .exec();
    }

    //  Get top-selling courses across all categories
    const allCategories = await Category.find()
      .populate({
        path: "courses",
        match: { status: "Published" },
      })
      .exec();

    const allCourses = allCategories.flatMap((category) => category.courses || []);
    const mostSellingCourses = allCourses
      .sort((a, b) => (b.sold || 0) - (a.sold || 0))
      .slice(0, 10);

    return res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        differentCategory,
        mostSellingCourses,
      },
    });
  } catch (error) {
    console.error("Error fetching category page details:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
