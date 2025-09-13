import React from "react";

// Common components
import Footer from "../components/common/Footer";
import ReviewSlider from "../components/common/ReviewSlider";

// Core Contact Page Components
import ContactDetails from "../components/core/ContactUsPage/ContactDetails";
import ContactForm from "../components/core/ContactUsPage/ContactForm";

const Contact = () => {
  return (
    <div>
      {/* Main Contact Section */}
      <div className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white lg:flex-row">
        
        {/* Contact Details Section */}
        <div className="lg:w-[40%]">
          <ContactDetails />
        </div>

        {/* Contact Form Section */}
        <div className="lg:w-[60%]">
          <ContactForm />
        </div>
      </div>

      {/* Reviews Section */}
      <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        <h1 className="mt-8 text-center text-4xl font-semibold">
          Reviews from other learners
        </h1>
        <ReviewSlider />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Contact;
