const TopInstructors = ({ instructors }) => {

  //console.log(instructors);
  if (!instructors?.length) return null;

  return (
    <div className="bg-richblack-800 p-4 rounded-lg border border-richblack-700">
      <h2 className="text-lg font-semibold mb-4">Top 5 Instructors</h2>

      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-richblack-600">
            <th className="text-left py-2">Instructor</th>
            <th className="text-center">Courses</th>
            <th className="text-center">Revenue</th>
          </tr>
        </thead>
        <tbody>
          {instructors.map((i) => (
            <tr
              key={i.instructorId}
              className="border-b border-richblack-700 last:border-none"
            >
              <td className="py-2">{i.name}</td>
              <td className="text-center">{i.totalCourses}</td>
              <td className="text-center text-yellow-300 font-semibold">
                ₹ {i.totalRevenue}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopInstructors;
