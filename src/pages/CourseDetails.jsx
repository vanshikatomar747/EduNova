import React, { useEffect, useState } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

// Common Components
import ConfirmationModal from "../components/common/ConfirmationModal";
import Footer from "../components/common/Footer";
import RatingStars from "../components/common/RatingStars";

// Core Components
import CourseAccordionBar from "../components/core/Course/CourseAccordionBar";
import CourseDetailsCard from "../components/core/Course/CourseDetailsCard";

// Services & Utils
import { formatDate } from "../services/formatDate";
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI";
import { BuyCourse } from "../services/operations/studentFeaturesAPI";
import GetAvgRating from "../utils/avgRating";

// Error Page
import Error from "./Error";

function CourseDetails() {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.profile);
  const { paymentLoading } = useSelector((state) => state.course);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get courseId from URL params
  const { courseId } = useParams();

  // State for course details and UI handling
  const [response, setResponse] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [avgReviewCount, setAvgReviewCount] = useState(0);
  const [isActive, setIsActive] = useState([]); // Track accordion state
  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);

  // Fetch course details on component mount or when courseId changes
  useEffect(() => {
    (async () => {
      try {
        const res = await fetchCourseDetails(courseId);
        setResponse(res);
      } catch (error) {
        console.log("Could not fetch Course Details", error);
      }
    })();
  }, [courseId]);

  // Calculate average review rating
  useEffect(() => {
    const count = GetAvgRating(response?.data?.courseDetails.ratingAndReviews);
    setAvgReviewCount(count);
  }, [response]);

  // Calculate total number of lectures
  useEffect(() => {
    let lectures = 0;
    response?.data?.courseDetails?.courseContent?.forEach((sec) => {
      lectures += sec.subSection.length || 0;
    });
    setTotalNoOfLectures(lectures);
  }, [response]);

  // Handle Accordion toggle
  const handleActive = (id) => {
    setIsActive(
      !isActive.includes(id)
        ? [...isActive, id]
        : isActive.filter((item) => item !== id)
    );
  };

  // Handle Buy Course logic
  const handleBuyCourse = () => {
    if (token) {
      BuyCourse(token, [courseId], user, navigate, dispatch);
    } else {
      setConfirmationModal({
        text1: "You are not logged in!",
        text2: "Please login to purchase the course.",
        btn1Text: "Login",
        btn2Text: "Cancel",
        btn1Handler: () => navigate("/login"),
        btn2Handler: () => setConfirmationModal(null),
      });
    }
  };

  // Loader when fetching or processing payment
  if (loading || !response || paymentLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  // Show error page if course details not fetched
  if (!response.success) return <Error />;

  // Destructure course details for easy access
  const {
    courseName,
    courseDescription,
    thumbnail,
    price,
    whatYouWillLearn,
    courseContent,
    ratingAndReviews,
    instructor,
    studentsEnrolled,
    createdAt,
  } = response.data?.courseDetails;

  return (
    <>
      {/* Hero Section */}
      <div className="relative w-full bg-richblack-800">
        <div className="mx-auto box-content px-4 lg:w-[1260px] 2xl:relative">
          {/* Course Info */}
          <div className="mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start xl:max-w-[810px]">
            
            {/* Thumbnail for Mobile */}
            <div className="relative block max-h-[30rem] lg:hidden">
              <div className="absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]"></div>
              <img src={thumbnail} alt="course thumbnail" className="w-full" />
            </div>

            {/* Course Details */}
            <div className="z-30 my-5 flex flex-col gap-4 py-5 text-lg text-richblack-5">
              <p className="text-4xl font-bold sm:text-[42px]">{courseName}</p>
              <p className="text-richblack-200">{courseDescription}</p>
              <div className="flex flex-wrap items-center gap-2 text-md">
                <span className="text-yellow-25">{avgReviewCount}</span>
                <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
                <span>({ratingAndReviews.length} reviews)</span>
                <span>{studentsEnrolled.length} students enrolled</span>
              </div>
              <p>Created By {`${instructor.firstName} ${instructor.lastName}`}</p>
              <div className="flex flex-wrap gap-5 text-lg">
                <p className="flex items-center gap-2">
                  <BiInfoCircle /> Created at {formatDate(createdAt)}
                </p>
                <p className="flex items-center gap-2">
                  <HiOutlineGlobeAlt /> English
                </p>
              </div>
            </div>

            {/* Pricing & Buy Button for Mobile */}
            <div className="flex w-full flex-col gap-4 border-y border-y-richblack-500 py-4 lg:hidden">
              <p className="text-3xl font-semibold">Rs. {price}</p>
              <button className="yellowButton" onClick={handleBuyCourse}>
                Buy Now
              </button>
              <button className="blackButton">Add to Cart</button>
            </div>
          </div>

          {/* Sidebar Course Card for Desktop */}
          <div className="right-[1rem] top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 lg:absolute lg:block">
            <CourseDetailsCard
              course={response.data.courseDetails}
              setConfirmationModal={setConfirmationModal}
              handleBuyCourse={handleBuyCourse}
            />
          </div>
        </div>
      </div>

      {/* Course Details Section */}
      <div className="mx-auto box-content px-4 text-richblack-5 lg:w-[1260px]">
        <div className="mx-auto max-w-maxContentTab xl:max-w-[810px]">
          
          {/* What you'll learn */}
          <div className="my-8 border border-richblack-600 p-8">
            <p className="text-3xl font-semibold">What you'll learn</p>
            <div className="mt-5">
              <ReactMarkdown>{whatYouWillLearn}</ReactMarkdown>
            </div>
          </div>

          {/* Course Content */}
          <div className="max-w-[830px]">
            <p className="text-[28px] font-semibold">Course Content</p>
            <div className="flex justify-between gap-2 flex-wrap">
              <div className="flex gap-2">
                <span>{courseContent.length} section(s)</span>
                <span>{totalNoOfLectures} lecture(s)</span>
                <span>{response.data?.totalDuration} total length</span>
              </div>
              <button
                className="text-yellow-25"
                onClick={() => setIsActive([])}
              >
                Collapse all sections
              </button>
            </div>

            {/* Accordion */}
            <div className="py-4">
              {courseContent.map((course, index) => (
                <CourseAccordionBar
                  key={index}
                  course={course}
                  isActive={isActive}
                  handleActive={handleActive}
                />
              ))}
            </div>

            {/* Author Info */}
            <div className="mb-12 py-4">
              <p className="text-[28px] font-semibold">Author</p>
              <div className="flex items-center gap-4 py-4">
                <img
                  src={
                    instructor.image
                      ? instructor.image
                      : `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`
                  }
                  alt="Author"
                  className="h-14 w-14 rounded-full object-cover"
                />
                <p className="text-lg">{`${instructor.firstName} ${instructor.lastName}`}</p>
              </div>
              <p className="text-richblack-50">{instructor?.additionalDetails?.about}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Confirmation Modal */}
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
}

export default CourseDetails;
