// Import required assets
import loginImg from "../assets/Images/login.webp"
// Import shared Template component
import Template from "../components/core/Auth/Template"

function Login() {
  return (
    // Template component handles layout and rendering of the login form
    <Template
      title="Welcome Back"
      description1="Build skills for today, tomorrow, and beyond."
      description2="Education to future-proof your career."
      image={loginImg}       // Background or side image for the login page
      formType="login"       // Indicates that this is the login form
    />
  )
}

export default Login
