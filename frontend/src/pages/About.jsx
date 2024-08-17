import React from 'react';
import backgroundImg from "../assets/Images/About-background.jpg";
import Logo from "../assets/Logo/Logo_jobify.svg.png";
import Footer from '../components/common/Footer';

const About = () => {
  return (
    <div>
      <div
        style={{
          position: 'relative',
          backgroundImage: `url(${backgroundImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: '0 20px',
          color: '#000000', // Text color set to black
          overflow: 'hidden',
        }}
      >
        <img 
          src={Logo} 
          alt="Jobify Logo" 
          style={{ 
            maxWidth: '200px', 
            height: 'auto',
            marginBottom: '30px',
            animation: 'fadeIn 2s ease-in-out',
          }} 
        />
        <div className='flex flex-col items-center' style={{ maxWidth: '700px' }}>
          <p className='text-6xl font-bold' style={{ marginBottom: '20px', animation: 'slideIn 2s ease-out' }}>
            About <span className='text-yellow-400'>Jobify</span>
          </p>
          <p className='text-xl' style={{ lineHeight: '1.6', animation: 'fadeIn 2s 1s ease-in-out' }}>
            At Jobify, we believe that finding the right job is more than just a search—it's a step towards achieving your career aspirations.
          </p>
        </div>
        <div className='flex flex-col items-center mt-16' style={{ maxWidth: '700px' }}>
          <p className='text-4xl font-semibold' style={{ marginBottom: '10px', animation: 'slideIn 2s ease-out' }}>Mission</p>
          <p className='text-lg' style={{ lineHeight: '1.6', animation: 'fadeIn 2s 1s ease-in-out' }}>
            Our mission is to simplify the job search process by offering a user-friendly platform that provides personalized job recommendations and seamless application tracking.
          </p>
        </div>
      </div>
      <Footer />
      
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideIn {
          from {
            transform: translateY(30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

export default About;
