export default function IconBtn({
  text,
  onclick,
  children,
  disabled,
  outline = false,
  customClasses,
  type = "button",
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      {...(onclick ? { onClick: onclick } : {})} // attach only if defined
      className={`flex items-center gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 cursor-pointer
        ${outline ? "border border-yellow-50 bg-transparent" : "bg-yellow-50"}
        ${customClasses || ""}`}
    >
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
