export default function Tab({ tabData, field, setField }) {
    return (
      <div
  style={{
    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
  }}
  className="flex w-fit flex-wrap sm:flex-nowrap bg-richblack-800 p-1 gap-1 sm:gap-x-1 my-6 rounded-full max-w-full sm:max-w-max"
>
  {tabData.map((tab) => (
    <button
      key={tab.id}
      onClick={() => setField(tab.type)}
      className={`${
        field === tab.type
          ? "bg-richblack-900 text-richblack-5"
          : "bg-transparent text-richblack-200"
      } py-1.5 sm:py-2 px-4 sm:px-5 text-sm sm:text-base rounded-full transition-all duration-200`}
    >
      {tab?.tabName}
    </button>
  ))}
</div>

    );
  }