import React, { useEffect, useState } from 'react'
import { VscAdd } from "react-icons/vsc"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {getAllJobs} from "../../../services/operations/recruiterFeaturesAPI"
import JobsTable from './Recruiter/Jobs/JobsTable'
import IconBtn from '../../common/IconBtn'

const MyJobs = () => {
    const { token } = useSelector((state) => state.auth)
    const navigate = useNavigate();
    const [job,setJob] = useState([]);

    useEffect(()=>{
        const fetchJobs = async() => {
          console.log("Jobs",job);
            const result = await getAllJobs(token);
            if(result){
                setJob(result);
            }
        }
        fetchJobs()
    },[])

    return (
        <div>
          <div className="mb-14 flex items-center justify-between">
            <h1 className="text-3xl font-medium text-richblack-5">My Jobs</h1>
            <IconBtn
              text="Add Jobs"
              onclick={() => navigate("/dashboard/add-job")}
            >
              <VscAdd />
            </IconBtn>
          </div>
          {job && <JobsTable job={job} setJob={setJob} />}
        </div>
      )
}

export default MyJobs