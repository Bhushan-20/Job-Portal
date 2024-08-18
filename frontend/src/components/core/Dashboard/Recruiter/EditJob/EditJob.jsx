import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getFullDetailsOfJob, updateJob } from "../../../../../services/operations/recruiterFeaturesAPI";
import { setJob } from "../../../../../slices/jobSlice";
import IconBtn from '../../../../common/IconBtn';

const EditJob = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { jobId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const { job } = useSelector((state) => state.job);
  const [categories, setCategories] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    const fetchJobDetails = async () => {
      setLoading(true);
      try {
        const result = await getFullDetailsOfJob(jobId, token);
        if (result?.jobDetails) {
          dispatch(setJob(result.jobDetails));
          Object.keys(result.jobDetails).forEach((key) => {
            setValue(key, result.jobDetails[key]); // Populate form with job data
          });
        }
      } catch (error) {
        console.error("Failed to load job details", error);
      }
      setLoading(false);
    };
    fetchJobDetails();
  }, [jobId, token, dispatch, setValue]);

  const handleFormSubmit = async (data) => {
    setLoading(true);
    try {
      const result = await updateJob(jobId, data, token);
      if (result) {
        dispatch(setJob(result.jobDetails));
        navigate('/dashboard/my-jobs');
      }
    } catch (error) {
      console.error("Failed to update job", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto p-6 text-black shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">Edit Job</h1>
      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* Maximum Applicants */}
          <div className="flex flex-col">
            <label htmlFor="maxApplicants" className="text-lg font-medium text-gray-700">Maximum Applicants</label>
            <input
              id="maxApplicants"
              name="maxApplicants"
              type="number"
              placeholder="Enter maximum number of applicants"
              {...register('maxApplicants', { required: 'Maximum applicants is required' })}
              className="border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.maxApplicants && <p className="text-red-500 text-sm mt-1">{errors.maxApplicants.message}</p>}
          </div>

          {/* Maximum Positions */}
          <div className="flex flex-col">
            <label htmlFor="maxPositions" className="text-lg font-medium text-gray-700">Maximum Positions</label>
            <input
              id="maxPositions"
              name="maxPositions"
              type="number"
              placeholder="Enter maximum number of positions"
              {...register('maxPositions', { required: 'Maximum positions is required' })}
              className="border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.maxPositions && <p className="text-red-500 text-sm mt-1">{errors.maxPositions.message}</p>}
          </div>

          {/* Deadline */}
          <div className="flex flex-col">
            <label htmlFor="deadline" className="text-lg font-medium text-gray-700">Deadline</label>
            <input
              id="deadline"
              name="deadline"
              type="date"
              {...register('deadline', { required: 'Deadline is required' })}
              className="border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.deadline && <p className="text-red-500 text-sm mt-1">{errors.deadline.message}</p>}
          </div>

          <div className="flex justify-end gap-x-4">
            <button
              type="button"
              onClick={() => navigate('/dashboard/my-jobs')}
              className="bg-gray-500 text-white p-3 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
              disabled={loading}
            >
              Cancel
            </button>
            <IconBtn type="submit" disabled={loading} text="Update Job" />
          </div>
        </form>
      )}
    </div>
  );
};

export default EditJob;
