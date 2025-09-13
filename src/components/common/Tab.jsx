export default function Tab({ tabData, field, setField }) {
  return (
    <div
      // Add a subtle bottom border effect using boxShadow
      style={{
        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
      }}
      className="flex bg-richblack-800 p-1 gap-x-1 my-6 rounded-full max-w-max"
    >
      {/* Render all tabs dynamically */}
      {tabData.map((tab) => (
        <button
          key={tab.id} // Use unique key for performance
          onClick={() => setField(tab.type)} // Update active tab on click
          className={`${
            field === tab.type
              ? "bg-richblack-900 text-richblack-5" // Active Tab
              : "bg-transparent text-richblack-200" // Inactive Tab
          } py-2 px-5 rounded-full transition-all duration-200`}
        >
          {tab?.tabName || "Tab"} {/* Fallback if tabName is missing */}
        </button>
      ))}
    </div>
  )
}
