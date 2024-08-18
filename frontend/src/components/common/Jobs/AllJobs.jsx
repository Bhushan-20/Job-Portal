import React, { useEffect, useState } from 'react'
import { VscAdd } from "react-icons/vsc"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {getAllJobs,getAllJobsApplicant} from "../../../services/operations/recruiterFeaturesAPI"
import JobsTable from '../../core/Dashboard/Recruiter/Jobs/JobsTable'
import IconBtn from '../IconBtn'
import AllJobsTable from './AllJobsTable'

const AllJobs = () => {
    const { token } = useSelector((state) => state.auth)
    const navigate = useNavigate();
    const [jobs,setJobs] = useState([]);

    useEffect(()=>{
        const fetchJobs = async() => {
            const result = await getAllJobsApplicant(token)
            if(result){
                setJobs(result);
            }
        }
        fetchJobs()
    },[])

    return (
        <div>
          <div className="mb-14 flex items-center justify-center">
            <h1 className="text-3xl w-[200px] uppercase text-center font-bold mt-6 text-black bg-gradient-to-b from-[#5fbec7] via-[#acec8e] to-[#a13f84] shadow-[2px_2px_0px_0px_rgba(255,255,255,100)]">Jobs</h1>
          </div>
          {jobs && <AllJobsTable jobs={jobs} setJobs={setJobs} />}
        </div>
      )
}

export default AllJobs

