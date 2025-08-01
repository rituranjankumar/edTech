import { useSelector } from "react-redux"
import RenderSteps from "./RenderSteps"

export default function AddCourse() {
  const {editCourse}=useSelector((state)=>state.course);
  return (
    <div className="relative text-richblack-100 p-4 min-h-screen">
      <h1 className="text-2xl font-bold mb-4"> {!editCourse?"Add course ":"Edit Course"}</h1>

      <div className="flex flex-col md:flex-row gap-6">
        
        <div className="flex-1">
          <RenderSteps />
        </div>

         
        <div className="w-full md:w-1/3 bg-richblack-800 border border-richblack-700 rounded-md p-4 h-fit">
          <p className="text-lg font-semibold mb-2 text-yellow-50">Code Upload Tips</p>
          <ul className="list-disc list-inside text-sm text-richblack-300 space-y-1">
            <li>Set the Course Price option or make it free.</li>
            <li>Standard size for the course thumbnail is 1024x576.</li>
            <li>Video section controls the course overview video.</li>
            <li>Set the Course Price option or make it free.</li>
            <li>Standard size for the course thumbnail is 1024x576.</li>
            <li>Video section controls the course overview video.</li>
            <li>Set the Course Price option or make it free.</li>
            <li>Standard size for the course thumbnail is 1024x576.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
