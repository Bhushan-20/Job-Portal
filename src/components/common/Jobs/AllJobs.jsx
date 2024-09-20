import React, { useEffect, useState } from 'react';
import { VscAdd } from "react-icons/vsc";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllJobsApplicant } from "../../../services/operations/recruiterFeaturesAPI";
import AllJobsTable from './AllJobsTable';
import { FaSearch } from 'react-icons/fa';

const AllJobs = () => {
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedJobTypes, setSelectedJobTypes] = useState({
        fullTime: false,
        partTime: false,
        internship: false,
    });

    // Fetching all jobs on component mount
    useEffect(() => {
        const fetchJobs = async () => {
            const result = await getAllJobsApplicant(token);
            if (result) {
                setJobs(result);
                setFilteredJobs(result); // Initially set filtered jobs to all jobs
            }
        }
        fetchJobs();
    }, [token]);

    // Handle search query and filter jobs accordingly
    const handleSearch = () => {
        let filtered = jobs;

        // Filter by job type
        if (selectedJobTypes.fullTime || selectedJobTypes.partTime || selectedJobTypes.internship) {
            filtered = filtered.filter((job) => {
                if (selectedJobTypes.fullTime && job.jobType === 'Full-time') return true;
                if (selectedJobTypes.partTime && job.jobType === 'Part-time') return true;
                if (selectedJobTypes.internship && job.jobType === 'Internship') return true;
                return false;
            });
        }

        // Filter by search query
        if (searchQuery.trim() !== "") {
            const lowerCaseQuery = searchQuery.toLowerCase();
            filtered = filtered.filter((job) =>
                (job.title && job.title.toLowerCase().includes(lowerCaseQuery)) ||
                (job.company && job.company.toLowerCase().includes(lowerCaseQuery)) ||
                (job.location && job.location.toLowerCase().includes(lowerCaseQuery))
            );
        }

        setFilteredJobs(filtered);
    };

    useEffect(() => {
        handleSearch();
    }, [searchQuery, selectedJobTypes]);

    // Handle checkbox change for job types
    const handleJobTypeChange = (e) => {
        setSelectedJobTypes({
            ...selectedJobTypes,
            [e.target.name]: e.target.checked,
        });
    };

    return (
        <div className="px-4 md:px-10 py-6">
            <div className="mb-14 flex items-center justify-center flex-col">
                <h1 className="text-4xl uppercase text-center font-bold mt-6 text-pink-200 drop-shadow-lg">Jobs</h1>

                {/* Search Bar */}
                <div className="flex justify-center mt-10 w-full">
                    <div className="flex items-center border-2 border-gray-300 rounded-full shadow-md overflow-hidden w-full max-w-xl bg-white">
                        <input
                            type="text"
                            className="w-full px-6 py-3 text-richblack-800 focus:outline-none rounded-l-full"
                            placeholder="Search for jobs..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button
                            className="bg-yellow-500 text-white px-6 py-3 rounded-r-full hover:bg-yellow-600 transition-all duration-300 ease-in-out"
                            onClick={handleSearch}
                        >
                            <FaSearch />
                        </button>
                    </div>
                </div>

                {/* Job Type Filters */}
                <div className="flex justify-center mt-6 space-x-6">
                    <label className="flex items-center bg-gray-800 text-white px-4 py-2 rounded-full shadow-md cursor-pointer transition transform hover:scale-105">
                        <input
                            type="checkbox"
                            name="fullTime"
                            checked={selectedJobTypes.fullTime}
                            onChange={handleJobTypeChange}
                            className="accent-yellow-500 mr-2"
                        />
                        Full-time
                    </label>
                    <label className="flex items-center bg-gray-800 text-white px-4 py-2 rounded-full shadow-md cursor-pointer transition transform hover:scale-105">
                        <input
                            type="checkbox"
                            name="partTime"
                            checked={selectedJobTypes.partTime}
                            onChange={handleJobTypeChange}
                            className="accent-yellow-500 mr-2"
                        />
                        Part-time
                    </label>
                    <label className="flex items-center bg-gray-800 text-white px-4 py-2 rounded-full shadow-md cursor-pointer transition transform hover:scale-105">
                        <input
                            type="checkbox"
                            name="internship"
                            checked={selectedJobTypes.internship}
                            onChange={handleJobTypeChange}
                            className="accent-yellow-500 mr-2"
                        />
                        Internship
                    </label>
                </div>
            </div>

            {/* Display the filtered jobs */}
            {filteredJobs.length > 0 ? (
                <AllJobsTable jobs={filteredJobs} setJobs={setJobs} />
            ) : (
                <p className="text-center text-red-500">No jobs found for your search.</p>
            )}
        </div>
    );
};

export default AllJobs;
