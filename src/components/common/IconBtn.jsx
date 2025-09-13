// IconBtn Component - A reusable button with optional icon and custom styling
export default function IconBtn({
  text,           // Button text
  onclick,        // Click handler function
  children,       // Optional icon or additional content
  disabled,       // Disable button when true
  outline = false,// Outline style toggle
  customClasses,  // Additional custom classes
  type = "button" // Button type (default: button)
}) {
  return (
    <button
      disabled={disabled} // Disables button when true
      onClick={onclick}   // Handles click event
      type={type}
      // Dynamic classes based on props
      className={`flex items-center gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 cursor-pointer
        ${outline ? "border border-yellow-50 bg-transparent" : "bg-yellow-50"}
        ${customClasses || ""}`}
    >
      {/* If children exist (e.g., icon), render text + icon, else just text */}
      {children ? (
        <>
          <span className={outline ? "text-yellow-50" : ""}>{text}</span>
          {children}
        </>
      ) : (
        text
      )}
    </button>
  )
}
