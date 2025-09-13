import React from "react";

// Importing required assets
import FoundingStory from "../assets/Images/FoundingStory.png";
import BannerImage1 from "../assets/Images/aboutus1.webp";
import BannerImage2 from "../assets/Images/aboutus2.webp";
import BannerImage3 from "../assets/Images/aboutus3.webp";

// Importing components
import Footer from "../components/common/Footer";
import ReviewSlider from "../components/common/ReviewSlider";
import ContactFormSection from "../components/core/AboutPage/ContactFormSection";
import LearningGrid from "../components/core/AboutPage/LearningGrid";
import Quote from "../components/core/AboutPage/Quote";
import StatsComponenet from "../components/core/AboutPage/Stats";
import HighlightText from "../components/core/HomePage/HighlightText";

const About = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-richblack-700">
        <div className="relative mx-auto w-11/12 max-w-maxContent flex flex-col gap-10 text-center text-white">
          <header className="mx-auto py-20 text-4xl font-semibold lg:w-[70%]">
            Driving Innovation in Online Education for a{" "}
            <HighlightText text={"Brighter Future"} />
            <p className="mt-3 text-base font-medium text-richblack-300 lg:w-[95%] mx-auto">
              EduNova is at the forefront of driving innovation in online
              education. We aim to create a brighter future by offering
              cutting-edge courses, leveraging emerging technologies, and
              building a strong learning community.
            </p>
          </header>

          {/* Banner Images */}
          <div className="sm:h-[70px] lg:h-[150px]"></div>
          <div className="absolute bottom-0 left-1/2 w-full translate-x-[-50%] translate-y-[30%] grid grid-cols-3 gap-3 lg:gap-5">
            <img src={BannerImage1} alt="Banner 1" />
            <img src={BannerImage2} alt="Banner 2" />
            <img src={BannerImage3} alt="Banner 3" />
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="border-b border-richblack-700">
        <div className="mx-auto w-11/12 max-w-maxContent flex flex-col gap-10 text-richblack-500">
          <div className="h-[100px]"></div>
          <Quote />
        </div>
      </section>

      {/* Founding Story, Vision, and Mission */}
      <section>
        <div className="mx-auto w-11/12 max-w-maxContent flex flex-col gap-10 text-richblack-500">
          {/* Founding Story */}
          <div className="flex flex-col lg:flex-row justify-between items-center gap-10">
            <div className="my-24 lg:w-[50%] flex flex-col gap-10">
              <h1 className="text-4xl font-semibold bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-transparent">
                Our Founding Story
              </h1>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                Our e-learning platform was born from a shared vision to make
                education accessible and flexible for everyone in a rapidly
                evolving digital world.
              </p>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                We saw limitations in traditional education and believed learning
                should break geographical and systemic barriers.
              </p>
            </div>
            <img
              src={FoundingStory}
              alt="Founding Story"
              className="shadow-[0_0_20px_0] shadow-[#FC6767]"
            />
          </div>

          {/* Vision and Mission */}
          <div className="flex flex-col lg:flex-row justify-between items-center lg:gap-10">
            {/* Vision */}
            <div className="my-24 lg:w-[40%] flex flex-col gap-10">
              <h1 className="text-4xl font-semibold bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-transparent">
                Our Vision
              </h1>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                We aim to revolutionize learning with an intuitive platform
                combining technology, engaging content, and an interactive
                experience.
              </p>
            </div>
            {/* Mission */}
            <div className="my-24 lg:w-[40%] flex flex-col gap-10">
              <h1 className="text-4xl font-semibold bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] bg-clip-text text-transparent">
                Our Mission
              </h1>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                Beyond delivering courses, we build communities for learners to
                connect, share knowledge, and collaborate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsComponenet />

      {/* Learning & Contact Section */}
      <section className="mx-auto mt-20 w-11/12 max-w-maxContent flex flex-col gap-10 text-white">
        <LearningGrid />
        <ContactFormSection />
      </section>

      {/* Reviews Section */}
      <div className="relative mx-auto my-20 w-11/12 max-w-maxContent flex flex-col items-center gap-8 bg-richblack-900 text-white">
        <h1 className="mt-8 text-4xl font-semibold text-center">
          Reviews from other learners
        </h1>
        <ReviewSlider />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default About;
