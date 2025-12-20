import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import InstructorChart from "../Instructor/InstructorChart";
import { HiHandRaised } from "react-icons/hi2";
import { fetchAdminCourses, getAdminDashData } from "../../../../services/operations/courseDetailsAPI";
 import StatCard from "./StatCard"
 
import TopCourses from "./topCourses";
import TopInstructors from "./topInstructor";



const AdminDashboard = () => {
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);

    const [loading, setLoading] = useState(false);
    const [courses, setCourses] = useState([]);
    const [instructorsChartData, setinstructorsChartData] = useState([]);
    const [topCourse, setTopCourse] = useState([]);
    const [topInstructor, setTopInstructor] = useState([]);
    const [instructorPerformance, setInstructorPerformance] = useState([]);

    // Fetch Admin Data
    const fetchAdminDashboardData = async () => {
        setLoading(true);
        try {
            const courseData = await fetchAdminCourses(token);
            const adminDashData = await getAdminDashData(token);

            setinstructorsChartData(adminDashData.courses || []);
            setTopCourse(adminDashData.topCourses || []);
            setTopInstructor(adminDashData.topInstructors || []);
            setInstructorPerformance(adminDashData.instructors || []);




            setCourses(courseData || []);
             
        } catch (error) {
           // console.error("Admin dashboard error:", error);
        } finally {
            setLoading(false);

        }
    };

    useEffect(() => {
        fetchAdminDashboardData();
    }, []);
    //console.log("courses ", courses)
   // console.log("chart data ", instructorsChartData)
    //  Calculations
    const totalStudents = instructorsChartData?.reduce(
        (acc, curr) => acc + curr.totalStudentsEnrolled,
        0
    );

    const totalRevenue = instructorsChartData?.reduce(
        (acc, curr) => acc + curr.totalAmountGenerated,
        0
    );

    const avgRevenue =
        instructorsChartData?.length > 0 ? Math.round(totalRevenue / courses.length) : 0;



    return (
        <div className="min-h-screen w-full p-4 text-white">
            {loading ? (
                <div className="flex justify-center items-center h-[80vh]">
                    <div className="w-12 h-12 border-4 border-t-yellow-400 border-b-yellow-400 border-l-gray-700 border-r-gray-700 rounded-full animate-spin"></div>
                </div>
            ) : (
                <div className="max-w-[1200px] mx-auto flex flex-col gap-8">
                    {/* Header */}
                    <div className="bg-richblack-800 w-fit p-4 rounded">
                        <div className="flex gap-3 items-center">
                            <h1 className="text-2xl font-semibold">
                                Welcome Admin, {user?.firstName}
                            </h1>
                            <HiHandRaised className="text-yellow-100 text-2xl" />
                        </div>
                        <p className="text-sm text-richblack-300">
                            Platform Overview & Control Panel
                        </p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <StatCard title="Total Courses" value={courses.length} />
                        <StatCard title="Total Students" value={totalStudents} />
                        <StatCard title="Total Revenue" value={`₹ ${totalRevenue}`} />
                        <StatCard title="Avg Revenue / Course" value={`₹ ${avgRevenue}`} />
                    </div>

                    {/* Charts */}
                    {instructorsChartData.length > 0 && (
                        <div className="border border-richblack-800 rounded p-4  ">
                            <InstructorChart courses={instructorsChartData} />
                        </div>
                    )}


                    {/* Platform Insights */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <TopCourses courses={topCourse} />
                        <TopInstructors instructors={topInstructor} />

                    </div>

                    {/* Instructor Performance */}
                    <div className="bg-richblack-800 rounded-lg p-4">
                        <h2 className="text-lg font-semibold mb-4">
                            Instructor Performance
                        </h2>
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-richblack-600">
                                    <th className="text-left py-2">Instructor</th>
                                    <th>Courses</th>
                                    <th>Students</th>
                                    <th>Revenue</th>
                                </tr>
                            </thead>
                            <tbody>
                                {instructorPerformance.map((inst, i) => (
                                    <tr
                                        key={i}
                                        className="border-b border-richblack-700 last:border-none"
                                    >
                                        <td className="py-2">{inst.name}</td>
                                        <td className="text-center">{inst.totalCourses}</td>
                                        <td className="text-center">{inst.totalStudents}</td>
                                        <td className="text-center text-yellow-300">
                                            ₹ {inst.totalRevenue}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Course Management */}

                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
