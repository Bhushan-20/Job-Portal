import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnecter";
import { applicantEndpoints } from "../apis"; // Updated to import from applicantEndpoints
import { setApplicant } from "../../slices/applicantSlice";
import { setRecruiter } from "../../slices/recruiterSlice";
import {allcategories} from "../apis"

export async function getApplicantDetails(token) {
    const { GET_APPLICANT_DETAILS } = applicantEndpoints;
    const toastId = toast.loading("Loading...");
    let result = {};
    try {
        const response = await apiConnector("GET", GET_APPLICANT_DETAILS, null, { Authorization: `Bearer ${token}` });
        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        result = response.data.data;
    } catch (err) {
        toast.error(err.response?.data?.message || "An error occurred");
    }
    toast.dismiss(toastId);
    return result;
}

export async function getRecruiterDetails(token) {
    const { GET_RECRUITER_DETAILS } = applicantEndpoints;
    const toastId = toast.loading("Loading...");
    let result = {};
    try {
        const response = await apiConnector("GET", GET_RECRUITER_DETAILS, null, { Authorization: `Bearer ${token}` });
        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        result = response.data.data;
    } catch (err) {
        toast.error(err.response?.data?.message || "An error occurred");
    }
    toast.dismiss(toastId);
    return result;
}

export const getAllCategories = async()=> {
    const { CATEGORIES_API } = allcategories;
    let result = [];
  try {
    const response = await apiConnector("GET", CATEGORIES_API)
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Categories")
    }
    result = response?.data?.data
  } catch (error) {
    toast.error(error.response.data.message)
  }
  return result
}

export const categoryPageDetails = async(categoryId) => {
    let result = []
    try{
        const response = await apiConnector("POST",allcategories.CATEGORY_PAGE_DETAILS,{CategoryId: categoryId,})
        if (!response?.data) {
            throw new Error("Could Not Fetch Catagory page data.")
          }
          result = response?.data?.selectedCategory
    }
    catch (error) {
        toast.error(error.response.data.message)
        result = error.response?.data
      }
      return result
}