const TopCourses = ({ courses }) => {
  if (!courses.length) return null;

  return (
    <div className="bg-richblack-800 p-4 rounded-lg border border-richblack-700">
      <h2 className="text-lg font-semibold mb-4">Top 5 Courses</h2>

      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-richblack-600">
            <th className="text-left py-2">Course</th>
            <th className="text-center">Students</th>
            <th className="text-center">Revenue</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((c) => (
            <tr
              key={c._id}
              className="border-b border-richblack-700 last:border-none"
            >
              <td className="py-2">{c.courseName}</td>
              <td className="text-center">{c.totalStudentsEnrolled}</td>
              <td className="text-center text-yellow-300 font-semibold">
                ₹ {c.totalAmountGenerated}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopCourses;
