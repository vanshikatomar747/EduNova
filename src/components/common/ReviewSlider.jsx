import React, { useEffect, useState } from "react"
import ReactStars from "react-rating-stars-component"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import "../../App.css"
import { FaStar } from "react-icons/fa"
import { Autoplay, FreeMode } from "swiper/modules"
import { apiConnector } from "../../services/apiConnector"
import { ratingsEndpoints } from "../../services/apis"

function ReviewSlider() {
  const [reviews, setReviews] = useState([])
  const truncateWords = 15 // Limit words in review text for cleaner UI

  useEffect(() => {
    // Fetch all reviews on component mount
    const fetchReviews = async () => {
      try {
        const { data } = await apiConnector(
          "GET",
          ratingsEndpoints.REVIEWS_DETAILS_API
        )
        if (data?.success && Array.isArray(data.data)) {
          setReviews(data.data)
        }
      } catch (error) {
        console.error("Error fetching reviews:", error)
      }
    }

    fetchReviews()
  }, [])

  return (
    <div className="text-white">
      <div className="my-[50px] h-[184px] max-w-maxContentTab lg:max-w-maxContent">
        {/* Swiper for review slider */}
        <Swiper
  slidesPerView={reviews.length < 4 ? reviews.length : 4}
  spaceBetween={25}
  loop={reviews.length > 4}  // only loop if more than 4 reviews
  freeMode={true}
  autoplay={{
    delay: 2500,
    disableOnInteraction: false,
  }}
  modules={[FreeMode, Autoplay]}
  className="w-full"
>
          {reviews.map((review, i) => (
            <SwiperSlide key={i}>
              <div className="flex flex-col gap-3 bg-richblack-800 p-3 text-[14px] text-richblack-25">
                {/* User Info */}
                <div className="flex items-center gap-4">
                  <img
                    src={
                      review?.user?.image
                        ? review.user.image
                        : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName || ""} ${review?.user?.lastName || ""}`
                    }
                    alt="User"
                    className="h-9 w-9 rounded-full object-cover"
                  />
                  <div className="flex flex-col">
                    <h1 className="font-semibold text-richblack-5">
                      {`${review?.user?.firstName || ""} ${review?.user?.lastName || ""}`}
                    </h1>
                    <h2 className="text-[12px] font-medium text-richblack-500">
                      {review?.course?.courseName || "Unknown Course"}
                    </h2>
                  </div>
                </div>

                {/* Review Text */}
                <p className="font-medium text-richblack-25">
                  {review?.review?.split(" ").length > truncateWords
                    ? `${review.review.split(" ").slice(0, truncateWords).join(" ")} ...`
                    : review?.review}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-yellow-100">
                    {review?.rating ? review.rating.toFixed(1) : "0.0"}
                  </h3>
                  <ReactStars
                    count={5}
                    value={review?.rating || 0}
                    size={20}
                    edit={false}
                    activeColor="#ffd700"
                    emptyIcon={<FaStar />}
                    fullIcon={<FaStar />}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default ReviewSlider
