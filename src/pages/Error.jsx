import { useEffect } from "react";
import ErrorImg from '../assets/Images/ErrorAstro.webp';
import CTAButton from '../components/core/HomePage/Button';
import { FaArrowRight } from 'react-icons/fa';

function Error() {

  useEffect(() => {
    const body = document.body;

    function createStar() {
      const right = Math.random() * 500;
      const top = Math.random() * window.innerHeight;
      const star = document.createElement("div");
      star.classList.add("star");
      body.appendChild(star);
      
      function runStar() {
        if (parseFloat(star.style.right) >= window.innerWidth) {
          star.remove();
        }
        star.style.right = (parseFloat(star.style.right) || right) + 3 + "px";
      }
      
      star.style.top = top + "px";
      star.style.right = right + "px";
      
      setInterval(runStar, 10);
    }

    const starInterval = setInterval(createStar, 100);

    return () => clearInterval(starInterval);  // Cleanup on component unmount
  }, []);

  return (
    <div className="relative flex flex-col sm:flex-row justify-center items-center gap-x-24 p-4 w-full min-h-screen text-richblack-100 overflow-hidden">
      {/* Error image */}
      <div className='w-[500px] mb-8 sm:w-[408px] sm:mb-0 astronaut'>
        <img src={ErrorImg} alt="Error" style={{ height: '150px' }}/>
      </div>

      {/* Text Section */}
      <div className='flex flex-col justify-center items-center text-center sm:items-start sm:text-left'>
        {/* 404 Number */}
        <h1 className='text-[8rem] font-bold mb-4 text-richblack-500' style={{ textShadow: '2px 2px 10px rgba(0, 0, 0, 0.5)', color: '#FF5722' }}>
          404
        </h1>
        {/* Lost and not found message */}
        <h2 className='text-[1.25rem] font-semibold mb-4 sm:text-[2.75rem]'>
          Lost and not found!
        </h2>

        {/* Message description */}
        <div className='mb-8'>
          <p className='font-normal text-lg text-slate-400'>Seems like we couldn’t find the page you were looking for.</p>
        </div>

        {/* CTA Button */}
        <CTAButton active={true} linkto={"/"}>
          <div className='flex items-center gap-3'>
            Go To Homepage
            <FaArrowRight />
          </div>
        </CTAButton>
      </div>
    </div>
  );
}

export default Error;
