// Import required assets
import signupImg from "../assets/Images/signup.webp"
// Import shared Template component for authentication pages
import Template from "../components/core/Auth/Template"

function Signup() {
  return (
    // Using Template component to render the signup page
    <Template
      title="Join the millions learning to code with EduNova for free"
      description1="Build skills for today, tomorrow, and beyond."
      description2="Education to future-proof your career."
      image={signupImg}       // Background/side image for the signup page
      formType="signup"       // Indicates this form is for signup
    />
  )
}

export default Signup
