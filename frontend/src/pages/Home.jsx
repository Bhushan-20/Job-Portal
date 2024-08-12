import React, { useState } from 'react';
import Home1 from "../assets/Images/job-search-1.jpg"
import Offer from "../assets/Images/job-offer.svg"
import CTAButton from '../components/core/HomePage/Button'
import {FaArrowRight} from 'react-icons/fa'
import Banner from '../assets/Images/job-search-video.mp4'
import Banner2 from '../assets/Images/job-search-video-1.mp4'
import TransButton from '../components/core/HomePage/TranspButton'
import Footer from '../components/common/Footer';


const Home = () => {
  const [showMore, setShowMore] = useState(false);
  const toggleShowMore = () => {
    setShowMore(!showMore);
  };
  return (
    <div>
        {/*Section - 1*/}
        <div className='relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white justify-between'>
          {/* Part - 1*/}
          <div className='flex flex-col lg:flex-row gap-20 items-center '>
            <div className='lg:w-[45%] flex gap-10 flex-col mt-[160px]'>
              <p className='text-6xl'>Connecting Talent with Opportunity</p>
              <p className='text-richblack-300 font-bold w-[80%] -mt-3 text-3xl'>
                Your dream job is just a click away with &nbsp;
                <span className='-ml-2 text-yellow-50'>Jobify</span>
              </p>
              <div className='w-fit ml-20 md:ml-0'>
                <CTAButton active={true} linkto={"/login"}>
                  <div className="flex items-center gap-3">
                    Find Jobs
                    <FaArrowRight />
                  </div>
                </CTAButton>
              </div>
            </div>
            
            {/* <div className='lg:w-[55%] mt-[160px]'>
              <img src={Home1} width={800} height={800} className='shadow-black shadow-[-20px_-20px_0_0]'/>
            </div> */}
            <div className='lg:w-[55%] mt-[160px] shadow-blue-200 w-[80%] drop-shadow-lg'>
              <video muted loop autoPlay className="shadow-[20px_20px_rgba(255,255,255)]"><source src={Banner} type='video/mp4'/></video>
            </div>
          </div>

          {/*part - 2 */}
         
          <div className='flex flex-col lg:flex-row gap-20 items-center mt-[100px]'>
              <div className='lg:w-[45%] flex flex-col mt-[160px]'>
                  <div className='w-fit ml-20 md:ml-0 flex flex-wrap gap-4'>
                      <TransButton active={true} linkto={"/login"}>
                          <div className="flex items-center gap-3">
                              Engineering
                              
                          </div>   
                      </TransButton>

                      <TransButton active={true} linkto={"/login"}>
                          <div className="flex items-center gap-3">
                              Finance
                              
                          </div>
                      </TransButton>
                      <TransButton active={true} linkto={"/login"}>
                          <div className="flex items-center gap-3">
                              Sales
                              
                          </div>
                      </TransButton>
                      <TransButton active={true} linkto={"/login"}>
                          <div className="flex items-center gap-3">
                              Information Technology
                              
                          </div>
                      </TransButton>
                      <TransButton active={true} linkto={"/login"}>
                          <div className="flex items-center gap-3">
                              Marketing
                              
                          </div>
                      </TransButton>
                      <TransButton active={true} linkto={"/login"}>
                          <div className="flex items-center gap-3">
                              Customer Support
                              
                          </div>
                      </TransButton>
                      <TransButton active={true} linkto={"/login"}>
                          <div className="flex items-center gap-3">
                              Human Resource
                              
                          </div>
                      </TransButton>
                      {showMore && (
                        <>
                          <TransButton active={true} linkto={"/login"}>
                            <div className="flex items-center gap-3">
                                Business Development 
                            </div>
                          </TransButton>
                          <TransButton active={true} linkto={"/login"}>
                            <div className="flex items-center gap-3">
                                Accounting  
                            </div>
                          </TransButton>
                          <TransButton active={true} linkto={"/login"}>
                              <div className="flex items-center gap-3">
                                  Research                                  
                              </div>
                          </TransButton>
                          <TransButton active={true} linkto={"/login"}>
                              <div className="flex items-center gap-3">
                                Consulting                                  
                              </div>
                          </TransButton>
                        </>
                      )}
                      <button onClick={toggleShowMore} className="text-center flex gap-3 items-center text-[13px] sm:text-[16px] px-6 py-3 rounded-md font-bold border shadow-[2px_2px_0px_0px_rgba(255,255,255,100)] bg-transparent text-white ">
                        {showMore ? "Show Less" : "Show More"}
                        <FaArrowRight/>
                      </button>
                      {/* Add more buttons here as necessary */}
                  </div>
              </div>
              
              {/* Right-side text or video */}
              <div className='lg:w-[55%] mt-[160px] shadow-blue-200 w-[80%] drop-shadow-lg'>
                  <p className='text-6xl'>Find the right job or internship for you</p>
              </div>
          </div>

          {/* Part - 3 */}
          <div className='flex flex-col items-center justify-center bg-gray-100 py-20 mt-[100px]'>
              <p className='text-4xl text-center text-red-800 mb-8'>
                  Post your job for millions of people to see
              </p>
              <CTAButton active={true} linkto={"/signup"} >
                  Post a job
              </CTAButton>
          </div>  
        </div>

        {/*Section-2 */}
        <div className='bg-pure-greys-5 text-richblack-700 pt-14'>
            <div className='flex flex-col ml-20'>
                <div>
                    <p className='text-4xl'>Where Ambition Meets Success</p><br/>
                    <p className='text-richblack-300 font-bold w-[80%] -mt-4 text-3xl'>
                        <span className='text-yellow-50'>Jobify—</span>Bridging the gap between talent and top employers.
                    </p>
                    <div className='w-fit py-3'> 
                        <CTAButton active={true} linkto={"/signup"}>
                            Get Started
                        </CTAButton> 
                    </div>
                </div>
                <div className='flex flex-col lg:flex-row gap-20 items-center -mt-8'>
                    <div className='lg:w-[45%] flex gap-10 flex-col mt-[100px] mb-[100px] relative'>
                        {/* Container with relative positioning */}
                        <img src={Home1} width={500} height={500} className=''/>
                        <img src={Offer} width={300} height={300} className='absolute -top-28 -right-20'/> {/* Overlay Offer image */}
                    </div>
                    <div className='lg:w-[55%] shadow-blue-200 w-[80%] drop-shadow-lg'>
                        <video muted loop autoPlay className="w-[700px]">
                            <source src={Banner2} type='video/mp4'/>
                        </video>
                    </div>                    
                </div>
            </div>
        </div>

         {/*Footer */}
        <Footer/>

    </div>
  )
}

export default Home