import { ACCOUNT_TYPE } from "../utils/constants";
export const sidebarLinks = [
  {
    id: 1,
    name: "My Profile",
    path: "/dashboard/my-profile",
    icon: "VscAccount",
  },
  {
    id: 2,
    name: "Dashboard",
    path: "/dashboard/recruiter",
    type: ACCOUNT_TYPE.RECRUITER,
    icon: "VscDashboard",
  },
  {
    id: 3,
    name: "My Jobs",
    path: "/dashboard/my-jobs",
    type: ACCOUNT_TYPE.RECRUITER,
    icon: "VscVm",
  },
  {
    id: 4,
    name: "Add Job",
    path: "/dashboard/add-job",
    type: ACCOUNT_TYPE.RECRUITER,
    icon: "VscAdd",
  },
  {
    id: 5,
    name: "Applications",
    path: "/dashboard/applications",
    type: ACCOUNT_TYPE.RECRUITER,
    icon: "VscVm",
  },
  {
    id: 6,
    name: "My Applications",
    path: "/dashboard/my-applications",
    type: ACCOUNT_TYPE.APPLICANT,
    icon: "VscMortarBoard",
  },
  // {
  //   id: 6,
  //   name: "Cart",
  //   path: "/dashboard/jobs",
  //   type: ACCOUNT_TYPE.STUDENT,
  //   icon: "VscArchive",
  // },
];
