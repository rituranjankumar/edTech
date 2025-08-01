import React from 'react'


const Stats = [
    {count: "5K", label: "Active Students"},
    {count: "10+", label: "Mentors"},
    {count: "200+", label: "Courses"},
    {count: "50+", label: "Awards"},
];

const StatsComponent = () => {
  return (
  <section className="bg-richblack-800 p-8 sm:p-12 lg:p-20 rounded-l w-full">
    <div className="flex flex-col lg:flex  xs:flex-row items-center justify-center gap-4 sm:gap-5 lg:gap-x-5 flex-wrap">
        {Stats.map((data, index) => (
            <div key={index} className="text-center min-w-[120px] xs:min-w-0 px-4 py-3 sm:py-0">
                <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold">
                    {data.count}
                </h1>
                <h2 className="text-sm xs:text-base sm:text-lg lg:text-xl mt-1 sm:mt-2">
                    {data.label}
                </h2>
            </div>
        ))}
    </div>
</section>
  )
}

export default StatsComponent
