// Utility function to calculate the average rating from an array of ratings
export default function GetAvgRating(ratingArr = []) {
  // Validate input: if it's not an array or empty, return 0
  if (!Array.isArray(ratingArr) || ratingArr.length === 0) {
    return 0;
  }

  // Calculate the sum of all ratings (ignore invalid or missing ratings by defaulting to 0)
  const totalRating = ratingArr.reduce((acc, curr) => acc + (curr.rating || 0), 0);

  // Calculate average rating with one decimal precision
  const multiplier = 10; // Controls precision (10 → 1 decimal place)
  const avgRating = Math.round((totalRating / ratingArr.length) * multiplier) / multiplier;

  return avgRating;
}
