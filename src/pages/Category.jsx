import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { apiConnector } from "../services/apiconnecter";
import { allcategories } from "../services/apis";
import { categoryPageDetails } from "../services/operations/fetchDataAPI";
import { applyJob } from "../services/operations/applicantFeaturesAPI";

const Category = () => { 
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false);
    const { categoryName } = useParams();
    const [categoryPageData, setCategoryPageData] = useState(null);
    const [categoryId, setCategoryId] = useState("");

    useEffect(() => {
        fetchCategories(); // Call fetchCategories to load data on component mount
    }, [categoryName]); // Include categoryName in the dependency array to refetch when the category changes

    const fetchCategories = async () => {
        try {
            const result = await apiConnector("GET", allcategories.CATEGORIES_API);
    
            const categories = result.data.categories;
              
            const category = categories?.find((ct) => 
                ct.name.split(" ").join("-").toLowerCase() === categoryName.toLowerCase()
            );
    
            const category_id = category?._id;
            setCategoryId(category_id);
    
        } catch (error) {
            console.error("Could not fetch Categories.", error);
        }
    };

    useEffect(() => {
        if (categoryId) {
            (async () => {
                try {
                    const res = await categoryPageDetails(categoryId);
                    setCategoryPageData(res);
                } catch (error) {
                    console.error("Error fetching category page details:", error);
                }
            })();
        }
    }, [categoryId]);

    const handleApply = async (jobId) => {
        const sop = "This is my statement of purpose"; // Replace with actual SOP
        try {
            await applyJob(jobId, sop, token);
        } catch (error) {
            console.error("Failed to apply for job:", error);
        }
    };

    const hasDeadlinePassed = (deadline) => {
        const deadlineDate = new Date(deadline);
        return deadlineDate < new Date();
    };

    // Helper function to split the category name into letters and animate them
    const renderCategoryName = (name) => {
        return name.split("").map((letter, index) => (
            <span 
                key={index} 
                className="letter" 
                style={{ animationDelay: `${index * 0.1}s` }}
            >
                {letter}
            </span>
        ));
    };

    return (
        <div>
            <div className="box-content px-4">
                <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent">
                    <p className="text-5xl text-yellow-200">
                        {categoryPageData?.name ? renderCategoryName(categoryPageData.name) : "Loading..."}
                    </p>
                    <p className="text-2xl text-richblack-5">
                        {categoryPageData?.description || "Loading..."}
                    </p>
                </div>
            </div>

            <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                <div className="section_heading text-white text-3xl">Jobs Available</div>
                
                {loading ? (
                    <div className="text-white mt-4">Loading jobs...</div>
                ) : categoryPageData?.jobs?.length > 0 ? (
                    <div className="py-8">
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            {categoryPageData?.jobs.map((job, i) => (
                                <div key={i} className="p-6 bg-richblack-800 rounded-lg shadow-md">
                                    <h3 className="text-xl font-bold text-yellow-25">
                                        {job.title}
                                    </h3>
                                    <p className="text-sm text-richblack-200 mt-2">
                                        {job.description}
                                    </p>
                                    
                                    <div className="mt-4">
                                        <p className="text-sm text-richblack-50">
                                            <span className="font-semibold text-richblack-100">Company:</span> {job.company}
                                        </p>
                                        <p className="text-sm text-richblack-50">
                                            <span className="font-semibold text-richblack-100">Location:</span> {job.location}
                                        </p>
                                        <p className="text-sm text-richblack-50">
                                            <span className="font-semibold text-richblack-100">Salary:</span> {job.salary}
                                        </p>
                                        <p className="text-sm text-richblack-50">
                                            <span className="font-semibold text-richblack-100">Type:</span> {job.jobType}
                                        </p>
                                        <p className="mb-2 font-semibold text-richblack-100">
                                            Skills: {job.skillsets.map((skill) => (
                                                <span key={skill} className="inline-block bg-richblack-700 text-richblack-300 text-sm px-2 py-1 mr-2 rounded-lg">
                                                    {skill}
                                                </span>
                                            ))}
                                        </p>
                                        <p className="mb-2 text-richblack-100" style={{ color: hasDeadlinePassed(job.deadline) ? 'red' : 'richblack-100' }}>
                                            {hasDeadlinePassed(job.deadline) ? (
                                                "No longer accepting applications"
                                            ) : (
                                                `Last Date to Apply: ${new Date(job.deadline).toLocaleDateString()}`
                                            )}
                                        </p>
                                    </div>
                                    <div className="mt-4 flex justify-end">
                                        {user?.accountType === "Applicant" && !hasDeadlinePassed(job.deadline) && (
                                            <button
                                                onClick={() => handleApply(job._id)}
                                                className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer rounded-md py-2 px-6 font-semibold text-richblack-900"
                                            >
                                                Apply
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="text-red-500 mt-4">No jobs available for this category.</div>
                )}
            </div>
        </div>
    );
};

export default Category;
