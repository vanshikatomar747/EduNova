import React, { useEffect, useState } from "react"
import {
  TiStarFullOutline,
  TiStarHalfOutline,
  TiStarOutline,
} from "react-icons/ti"

function RatingStars({ Review_Count = 0, Star_Size = 20 }) {
  // State to store the count of full, half, and empty stars
  const [starCount, setStarCount] = useState({
    full: 0,
    half: 0,
    empty: 5,
  })

  useEffect(() => {
    // Ensure Review_Count is a valid number between 0 and 5
    const rating = Math.min(Math.max(Number(Review_Count) || 0, 0), 5)

    // Calculate number of full stars
    const fullStars = Math.floor(rating)

    // Determine if we need a half star
    const halfStar = rating % 1 >= 0.5 ? 1 : 0

    // Remaining stars will be empty
    const emptyStars = 5 - (fullStars + halfStar)

    // Update state
    setStarCount({ full: fullStars, half: halfStar, empty: emptyStars })
  }, [Review_Count])

  return (
    <div className="flex gap-1 text-yellow-100">
      {/* Render full stars */}
      {[...Array(starCount.full)].map((_, i) => (
        <TiStarFullOutline key={`full-${i}`} size={Star_Size} />
      ))}

      {/* Render half star if present */}
      {[...Array(starCount.half)].map((_, i) => (
        <TiStarHalfOutline key={`half-${i}`} size={Star_Size} />
      ))}

      {/* Render remaining empty stars */}
      {[...Array(starCount.empty)].map((_, i) => (
        <TiStarOutline key={`empty-${i}`} size={Star_Size} />
      ))}
    </div>
  )
}

export default RatingStars
