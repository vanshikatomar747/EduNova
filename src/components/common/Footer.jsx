// Footer Component - Displays site footer with company info, links, and social icons
import React from "react"
import { Link } from "react-router-dom"
import { FooterLink2 } from "../../data/footer-links"

// Logo
import Logo from "../../assets/Logo/Logo-Full-Light.png"

// Social Icons
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa"

// Footer Sections
const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"]
const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
]
const Plans = ["Paid memberships", "For students", "Business solutions"]
const Community = ["Forums", "Chapters", "Events"]

const Footer = () => {
  return (
    <div className="bg-richblack-800">
      {/* Main Footer Container */}
      <div className="w-11/12 max-w-maxContent mx-auto flex flex-col lg:flex-row gap-8 text-richblack-400 py-14 leading-6">
        
        {/* Top Section: Split into two halves */}
        <div className="flex flex-col lg:flex-row border-b border-richblack-700 w-full pb-5">
          
          {/* Left Half: Company, Resources, Plans, Community */}
          <div className="flex flex-wrap justify-between w-full lg:w-1/2 gap-6 pr-5">
            
            {/* Company Info */}
            <div className="w-[30%] flex flex-col gap-3 mb-7">
              <img src={Logo} alt="Company Logo" className="object-contain" width={142} />
              <h1 className="text-richblack-50 font-semibold text-[16px]">Company</h1>
              <div className="flex flex-col gap-2">
                {["About", "Careers", "Affiliates"].map((item, index) => (
                  <Link
                    key={index}
                    to={item.toLowerCase()}
                    className="text-[14px] hover:text-richblack-50 transition-all"
                  >
                    {item}
                  </Link>
                ))}
              </div>
              {/* Social Icons */}
              <div className="flex gap-3 text-lg">
                <FaFacebook />
                <FaGoogle />
                <FaTwitter />
                <FaYoutube />
              </div>
            </div>

            {/* Resources + Support */}
            <div className="w-[30%] mb-7">
              <h1 className="text-richblack-50 font-semibold text-[16px]">Resources</h1>
              <div className="flex flex-col gap-2 mt-2">
                {Resources.map((item, index) => (
                  <Link
                    key={index}
                    to={item.split(" ").join("-").toLowerCase()}
                    className="text-[14px] hover:text-richblack-50 transition-all"
                  >
                    {item}
                  </Link>
                ))}
              </div>
              <h1 className="text-richblack-50 font-semibold text-[16px] mt-7">Support</h1>
              <Link
                to="/help-center"
                className="text-[14px] hover:text-richblack-50 transition-all mt-2"
              >
                Help Center
              </Link>
            </div>

            {/* Plans + Community */}
            <div className="w-[30%] mb-7">
              <h1 className="text-richblack-50 font-semibold text-[16px]">Plans</h1>
              <div className="flex flex-col gap-2 mt-2">
                {Plans.map((item, index) => (
                  <Link
                    key={index}
                    to={item.split(" ").join("-").toLowerCase()}
                    className="text-[14px] hover:text-richblack-50 transition-all"
                  >
                    {item}
                  </Link>
                ))}
              </div>
              <h1 className="text-richblack-50 font-semibold text-[16px] mt-7">Community</h1>
              <div className="flex flex-col gap-2 mt-2">
                {Community.map((item, index) => (
                  <Link
                    key={index}
                    to={item.split(" ").join("-").toLowerCase()}
                    className="text-[14px] hover:text-richblack-50 transition-all"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Half: Additional Footer Links */}
          <div className="flex flex-wrap justify-between w-full lg:w-1/2 pl-5">
            {FooterLink2.map((section, index) => (
              <div key={index} className="w-[48%] lg:w-[30%] mb-7">
                <h1 className="text-richblack-50 font-semibold text-[16px]">{section.title}</h1>
                <div className="flex flex-col gap-2 mt-2">
                  {section.links.map((linkItem, i) => (
                    <Link
                      key={i}
                      to={linkItem.link}
                      className="text-[14px] hover:text-richblack-50 transition-all"
                    >
                      {linkItem.title}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="w-11/12 max-w-maxContent mx-auto flex flex-col lg:flex-row justify-between items-center text-richblack-400 text-sm pb-14">
        {/* Legal Links */}
        <div className="flex">
          {BottomFooter.map((item, index) => (
            <div
              key={index}
              className={`px-3 ${index !== BottomFooter.length - 1 ? "border-r border-richblack-700" : ""} hover:text-richblack-50 transition-all`}
            >
              <Link to={item.split(" ").join("-").toLowerCase()}>{item}</Link>
            </div>
          ))}
        </div>

        {/* Copy Info */}
        <div className="text-center mt-3 lg:mt-0">
          Made by Vanshika 2025 EduNova
        </div>
      </div>
    </div>
  )
}

export default Footer
