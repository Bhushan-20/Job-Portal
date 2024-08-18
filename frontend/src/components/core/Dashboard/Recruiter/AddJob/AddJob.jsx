import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import IconBtn from '../../../../common/IconBtn';
import { createJob } from '../../../../../services/operations/recruiterFeaturesAPI'; // Update with the correct path
import { resetJobState } from '../../../../../slices/jobSlice';
import {apiConnector} from "../../../../../services/apiconnecter"
import {allcategories} from "../../../../../services/apis"

const AddJobs = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.auth);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            try {
                const response = await apiConnector("GET", allcategories.CATEGORIES_API);
                console.log("Response->",response);
                setCategories(response.data.categories);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            }
            setLoading(false);
        };
        fetchCategories();
    }, []);


    const handleFormSubmit = async (data) => {
        // Convert form data to FormData object
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('maxApplicants', data.maxApplicants);
        formData.append('maxPositions', data.maxPositions);
        formData.append('dateOfPosting', data.dateOfPosting);
        formData.append('deadline', data.deadline);
        
        // Split skillsets by space and trim any extra spaces
        const skillsetsArray = data.skillsets.trim().split(/\s+/);
        formData.append('skillsets', JSON.stringify(skillsetsArray)); // Convert array to JSON string
        
        formData.append('jobType', data.jobType);
        formData.append('salary', data.salary);
        formData.append('categoryName', data.categoryName);
        formData.append('location', data.location);
        formData.append('company', data.company);
    
        try {
            setLoading(true);
            const result = await createJob(formData, token);
            if (result) {
                dispatch(resetJobState());
                navigate('/dashboard/my-jobs');
            }
        } catch (error) {
            console.error('Failed to create job:', error);
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className="flex justify-center p-6 bg-gray-200 min-h-screen">
        <div className="w-full max-w-3xl bg-richblack-800 rounded-lg shadow-lg p-6">
            <h1 className="mb-8 text-4xl font-medium text-richblack-5">Add Job</h1>
            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex flex-col flex-1">
                        <label htmlFor="title" className="text-lg font-medium text-richblack-5">Job Title</label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            placeholder="Enter job title"
                            {...register('title', { required: 'Job title is required' })}
                            className="w-full rounded-[0.5rem] bg-richblack-900 p-3 text-richblack-5"
                        />
                        {errors.title && <p className="text-red-100">{errors.title.message}</p>}
                    </div>
                    <div className="flex flex-col flex-1">
                    <label htmlFor="company" className="text-lg font-medium text-richblack-5">Company</label>
                    <input
                        id="company"
                        name="company"
                        type="text"
                        placeholder="Enter Company"
                        {...register('company', { required: 'Company name is required' })}
                        className="w-full rounded-[0.5rem] bg-richblack-900 p-3 text-richblack-5"
                    />
                    {errors.title && <p className="text-red-100">{errors.title.message}</p>}
                </div>
                </div>
                

                

                <div className="flex flex-col">
                    <label htmlFor="description" className="text-lg font-medium text-richblack-5">Job Description</label>
                    <textarea
                        id="description"
                        name="description"
                        placeholder="Enter job description"
                        {...register('description', { required: 'Job description is required' })}
                        className="w-full rounded-[0.5rem] bg-richblack-900 p-3 text-richblack-5"
                    />
                    {errors.description && <p className="text-red-100">{errors.description.message}</p>}
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex flex-col flex-1">
                            <label htmlFor="maxApplicants" className="text-lg font-medium text-richblack-5">Max Applicants</label>
                            <input
                                id="maxApplicants"
                                name="maxApplicants"
                                type="number"
                                placeholder="Enter max number of applicants"
                                {...register('maxApplicants', { required: 'Max applicants is required' })}
                                className="w-full rounded-md p-3 bg-richblack-900"
                            />
                            {errors.maxApplicants && <p className="text-red-500 mt-1">{errors.maxApplicants.message}</p>}
                        </div>

                        <div className="flex flex-col flex-1">
                            <label htmlFor="maxPositions" className="text-lg font-medium text-richblack-5">Max Positions</label>
                            <input
                                id="maxPositions"
                                name="maxPositions"
                                type="number"
                                placeholder="Enter max number of positions"
                                {...register('maxPositions', { required: 'Max positions is required' })}
                                className="w-full rounded-md  p-3  bg-richblack-900 "
                            />
                            {errors.maxPositions && <p className="text-red-500 mt-1">{errors.maxPositions.message}</p>}
                        </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex flex-col flex-1">
                            <label htmlFor="dateOfPosting" className="text-lg font-medium text-richblack-5">Date of Posting</label>
                            <input
                                id="dateOfPosting"
                                name="dateOfPosting"
                                type="date"
                                {...register('dateOfPosting', { required: 'Date of posting is required' })}
                                className="w-full rounded-md p-3 bg-richblack-900"
                            />
                             {errors.dateOfPosting && <p className="text-red-100">{errors.dateOfPosting.message}</p>}
                        </div>

                        <div className="flex flex-col flex-1">
                        <label htmlFor="deadline" className="text-lg font-medium text-richblack-5">Application Deadline</label>
                            <input
                                id="deadline"
                                name="deadline"
                                type="date"
                                {...register('deadline', { required: 'Application deadline is required' })}
                                className="w-full rounded-md  p-3  bg-richblack-900 "
                            />
                             {errors.deadline && <p className="text-red-100">{errors.deadline.message}</p>}
                        </div>
                </div>

                
                <div className="flex flex-col">
    <label htmlFor="skillsets" className="text-lg font-medium text-richblack-5">Required Skillsets</label>
    <input
        id="skillsets"
        name="skillsets"
        type="text"
        placeholder="Enter required skillsets separated by spaces"
        {...register('skillsets', { required: 'Skillsets are required' })}
        className="w-full rounded-[0.5rem] bg-richblack-900 p-3 text-richblack-5"
    />
    {errors.skillsets && <p className="text-red-100">{errors.skillsets.message}</p>}
</div>


                <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex flex-col flex-1">
                            <label htmlFor="jobType" className="text-lg font-medium text-richblack-5">Job Type</label>
                            <select
                                id="jobType"
                                name="jobType"
                                {...register('jobType', { required: 'Job type is required' })}
                                className="w-full rounded-[0.5rem] bg-richblack-900 p-3 text-richblack-5"
                            >
                                <option value="" disabled>Select job type</option>
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Internship">Internship</option>
                            </select>
                            {errors.jobType && <p className="text-red-100">{errors.jobType.message}</p>}
                        </div>

                        <div className="flex flex-col flex-1">
                        <label htmlFor="salary" className="text-lg font-medium text-richblack-5">Salary</label>
                            <input
                                id="salary"
                                name="salary"
                                type="text"
                                placeholder="Enter salary"
                                {...register('salary', { required: 'Salary is required' })}
                                className="w-full rounded-[0.5rem] bg-richblack-900 p-3 text-richblack-5"
                            />
                            {errors.salary && <p className="text-red-100">{errors.salary.message}</p>}
                        </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex flex-col flex-1">
                        <label htmlFor="categoryName" className="text-lg font-medium text-richblack-5">Category</label>
                        <select
                            id="categoryName"
                            name="categoryName"
                            {...register('categoryName', { required: 'Category is required' })}
                            className="w-full rounded-[0.5rem] bg-richblack-900 p-3 text-richblack-5"
                        >
                            <option value="" disabled>Select a category</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category?._id}>
                                    {category?.name}
                                </option>
                            ))}
                        </select>
                        {errors.categoryName && <p className="text-red-100">{errors.categoryName.message}</p>}
                        </div>

                        <div className="flex flex-col flex-1">
                        <label htmlFor="location" className="text-lg font-medium text-richblack-5">Location</label>
                        <input
                            id="location"
                            name="location"
                            type="text"
                            placeholder="Enter Location"
                            {...register('location', { required: 'Location is required' })}
                            className="w-full rounded-[0.5rem] bg-richblack-900 p-3 text-richblack-5"
                        />
                        {errors.title && <p className="text-red-100">{errors.title.message}</p>}
                        </div>
                </div>


                <div className="flex justify-end gap-x-2">
                    <button
                        type="button"
                        onClick={() => {
                            dispatch(resetJobState());
                            navigate('/dashboard/my-jobs');
                        }}
                        className="bg-gray-500 text-white p-2 rounded"
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <IconBtn type="submit" disabled={loading} text="Create Job">
                        {/* Icon can be added here if needed */}
                    </IconBtn>
                </div>
            </form>
        </div>
            

            
        </div>
    );
};

export default AddJobs;
