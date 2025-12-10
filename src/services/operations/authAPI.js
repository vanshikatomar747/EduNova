import { toast } from "react-hot-toast"
import { setLoading, setToken } from "../../slices/authSlice"
import { resetCart } from "../../slices/cartSlice"
import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiConnector"
import { endpoints } from "../apis"

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints

// -------------------- SEND OTP --------------------
export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))

    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      })

      // Check success response
      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("OTP Sent Successfully")
      navigate("/verify-email")
    } catch (error) {
      console.error("SENDOTP API ERROR:", error)
      toast.error("Could Not Send OTP")
    }

    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

// -------------------- SIGNUP --------------------
export function signUp(
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))

    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
      })

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Signup Successful")
      navigate("/login")
    } catch (error) {
      console.error("SIGNUP API ERROR:", error)
      toast.error("Signup Failed")
      navigate("/signup")
    }

    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

// -------------------- LOGIN --------------------
export function login(email, password, navigate) {
  return async (dispatch) => {
    console.log("API Base URL:", process.env.REACT_APP_BASE_URL);
    console.log("Full URL:", `${process.env.REACT_APP_BASE_URL}/auth/login`);
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))

    try {
      const response = await apiConnector("POST", LOGIN_API, { email, password })

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      // Save token and user in Redux and Local Storage
      dispatch(setToken(response.data.token))
      const userImage =
        response.data?.user?.image ||
        `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
      dispatch(setUser({ ...response.data.user, image: userImage }))
      localStorage.setItem("token", JSON.stringify(response.data.token))

      toast.success("Login Successful")
      navigate("/dashboard/my-profile")
    } catch (error) {
      console.error("LOGIN API ERROR:", error)
      toast.error("Login Failed")
    }

    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

// -------------------- REQUEST PASSWORD RESET TOKEN --------------------
export function getPasswordResetToken(email, setEmailSent) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))

    try {
      const response = await apiConnector("POST", RESETPASSTOKEN_API, { email })

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Reset Email Sent")
      setEmailSent(true)
    } catch (error) {
      console.error("RESETPASSTOKEN ERROR:", error)
      toast.error("Failed To Send Reset Email")
    }

    toast.dismiss(toastId)
    dispatch(setLoading(false))
  }
}

// -------------------- RESET PASSWORD --------------------
export function resetPassword(password, confirmPassword, token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))

    try {
      const response = await apiConnector("POST", RESETPASSWORD_API, {
        password,
        confirmPassword,
        token,
      })

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Password Reset Successfully")
      navigate("/login")
    } catch (error) {
      console.error("RESETPASSWORD ERROR:", error)
      toast.error("Failed To Reset Password")
    }

    toast.dismiss(toastId)
    dispatch(setLoading(false))
  }
}

// -------------------- LOGOUT --------------------
export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null))
    dispatch(setUser(null))
    dispatch(resetCart())

    // Clear stored data
    localStorage.removeItem("token")
    localStorage.removeItem("user")

    toast.success("Logged Out")
    navigate("/")
  }
}
