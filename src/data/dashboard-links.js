import { ACCOUNT_TYPE } from "../utils/constants";
// export const sidebarLinks = [
//   {
//     id: 1,
//     name: "My Profile",
//     path: "/dashboard/my-profile",
//     icon: "VscAccount",
//   },
//   {
//     id: 2,
//     name: "Dashboard",
//     path: "/dashboard/instructor",
//     type: ACCOUNT_TYPE.INSTRUCTOR,
//     icon: "VscDashboard",
//   },
//   {
//     id: 3,
//     name: "My Courses",
//     path: "/dashboard/my-courses",
//     type: ACCOUNT_TYPE.INSTRUCTOR,
//     icon: "VscVm",
//   },
//   {
//     id: 4,
//     name: "Add Course",
//     path: "/dashboard/add-course",
//     type: ACCOUNT_TYPE.INSTRUCTOR,
//     icon: "VscAdd",
//   },
//   {
//     id: 5,
//     name: "Enrolled Courses",
//     path: "/dashboard/enrolled-courses",
//     type: ACCOUNT_TYPE.STUDENT,
//     icon: "VscMortarBoard",
//   },
//   {
//     id: 6,
//     name: "Purchase History",
//     path: "/dashboard/purchase-history",
//     type: ACCOUNT_TYPE.STUDENT,
//     icon: "VscHistory",
//   },
// ];

export const sidebarLinks = [
  {
    id: 1,
    name: "My Profile",
    path: "my-profile", // ← relative
    icon: "VscAccount",
  },
  {
    id: 2,
    name: "Dashboard",
    path: "admin-Dashboard",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscDashboard",
  },
    {
    id: 3,
    name: "Dashboard",
    path: "instructor",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: "VscDashboard",
  },
  {
    id: 4,
    name: "My Courses",
    path: "my-courses",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: "VscVm",
  },
    {
    id: 5,
    name: "Courses",
    path: "Admin-courses",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscVm",
  },
  {
    id: 6,
    name: "Add Course",
    path: "add-course",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: "VscAdd",
  },
  {
    id: 7,
    name: "Enrolled Courses",
    path: "enrolled-courses",
    type: ACCOUNT_TYPE.STUDENT,
    icon: "VscMortarBoard",
  },
  {
    id: 8,
    name: "Verify Instructor",
    path: "verify-instructor",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "MdPendingActions",
  },
  {
    id: 9,
    name: "Create Category",
    path: "create-category",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscGitPullRequestCreate",
  },
    {
    id: 10,
    name: "Create Admin",
    path: "create-admin",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscGitPullRequestCreate",
  },
];
