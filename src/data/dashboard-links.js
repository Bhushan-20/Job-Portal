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
    name: "My Jobs",
    path: "/dashboard/my-jobs",
    type: ACCOUNT_TYPE.RECRUITER,
    icon: "VscVm",
  },
  {
    id: 3,
    name: "Add Job",
    path: "/dashboard/add-job",
    type: ACCOUNT_TYPE.RECRUITER,
    icon: "VscAdd",
  },
  {
    id: 4,
    name: "Applications",
    path: "/dashboard/applications",
    type: ACCOUNT_TYPE.RECRUITER,
    icon: "VscVm",
  },
  {
    id: 5,
    name: "My Applications",
    path: "/dashboard/my-applications",
    type: ACCOUNT_TYPE.APPLICANT,
    icon: "VscMortarBoard",
  },
];
