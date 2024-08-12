export default function IconBtn({
    text,
    onclick,
    children,
    disabled,
    outline = false,
    customClasses,
    type,
  }) {
    return (
      <button
        disabled={disabled}
        onClick={onclick}
        className={`flex items-center ${
          outline ? "border bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]" : "bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]"
        } cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 ${customClasses}`}
        type={type}
      >
        {children ? (
          <>
            <span className={`${outline && "bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]"}`}>{text}</span>
            {children}
          </>
        ) : (
          text
        )}
      </button>
    )
  }
  