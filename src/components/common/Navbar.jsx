import { useEffect, useState } from "react"
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
import { BsChevronDown } from "react-icons/bs"
import { useSelector } from "react-redux"
import { Link, matchPath, useLocation } from "react-router-dom"

import logo from "../../assets/Logo/Logo-Full-Light.png"
import { NavbarLinks } from "../../data/navbar-links"
import { apiConnector } from "../../services/apiConnector"
import { categories } from "../../services/apis"
import { ACCOUNT_TYPE } from "../../utils/constants"
import ProfileDropdown from "../core/Auth/ProfileDropDown"

function Navbar() {
  // Global state
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { totalItems } = useSelector((state) => state.cart)

  // Local state
  const [subLinks, setSubLinks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const location = useLocation()

  // Fetch categories for Catalog dropdown
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API)
        const data = res?.data?.data

        // Validate response and set subLinks
        if (Array.isArray(data)) {
          setSubLinks(data)
        } else {
          setSubLinks([])
          console.warn("Invalid category data received:", res)
        }
      } catch (err) {
        console.error("Could not fetch Categories:", err)
        setError("Failed to load categories")
        setSubLinks([])
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  // Check if current route matches the given route
  const matchRoute = (route) => matchPath({ path: route }, location.pathname)

  return (
    <div
      className={`flex h-14 items-center justify-center border-b border-richblack-700 ${
        location.pathname !== "/" ? "bg-richblack-800" : ""
      } transition-all duration-200`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Logo" width={142} height={28} loading="lazy" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div
                    className={`group relative flex cursor-pointer items-center gap-1 ${
                      matchRoute("/catalog/:catalogName")
                        ? "text-yellow-25"
                        : "text-richblack-25"
                    }`}
                  >
                    <p>{link.title}</p>
                    <BsChevronDown />
                    
                    {/* Dropdown Menu */}
                    <div className="invisible absolute left-1/2 top-1/2 z-[1000] w-[200px] translate-x-[-50%] translate-y-[3em] rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 shadow-lg transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                      {/* Dropdown Arrow */}
                      <div className="absolute left-1/2 top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 rounded bg-richblack-5"></div>

                      {loading ? (
                        <p className="text-center">Loading...</p>
                      ) : error ? (
                        <p className="text-center text-red-500">{error}</p>
                      ) : subLinks.length > 0 ? (
                        subLinks
                          .filter(
                            (subLink) =>
                              Array.isArray(subLink?.courses) &&
                              subLink.courses.length > 0
                          )
                          .map((subLink, i) => (
                            <Link
                              key={i}
                              to={`/catalog/${subLink.name
                                .split(" ")
                                .join("-")
                                .toLowerCase()}`}
                              className="block rounded-lg py-3 pl-4 hover:bg-richblack-50"
                            >
                              {subLink.name}
                            </Link>
                          ))
                      ) : (
                        <p className="text-center">No Courses Found</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Section */}
        <div className="hidden items-center gap-x-4 md:flex">
          {/* Show Cart only for students */}
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center rounded-full bg-richblack-600 text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {/* Show Login/Signup or Profile Dropdown */}
          {token === null ? (
            <>
              <Link to="/login">
                <button className="rounded-md border border-richblack-700 bg-richblack-800 px-3 py-2 text-richblack-100">
                  Log in
                </button>
              </Link>
              <Link to="/signup">
                <button className="rounded-md border border-richblack-700 bg-richblack-800 px-3 py-2 text-richblack-100">
                  Sign up
                </button>
              </Link>
            </>
          ) : (
            <ProfileDropdown />
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="mr-4 md:hidden"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-14 left-0 w-full bg-richblack-800 p-4 md:hidden">
          <ul className="flex flex-col gap-4 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                <Link to={link?.path}>{link.title}</Link>
              </li>
            ))}
            {token === null ? (
              <>
                <Link to="/login">
                  <button className="block w-full rounded bg-yellow-50 py-2 text-black">
                    Log in
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="block w-full rounded bg-yellow-50 py-2 text-black">
                    Sign up
                  </button>
                </Link>
              </>
            ) : (
              <ProfileDropdown />
            )}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Navbar
