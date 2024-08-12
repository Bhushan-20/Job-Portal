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
        padding: '0 20px', // Optional padding for responsiveness
      }}
        >
            <img 
            src={Logo} 
            alt="Jobify Logo" 
            style={{ 
            maxWidth: '15%', 
            height: 'auto',
            marginBottom: '20px', // Space between logo and text
            }} 
            />
            <div className='flex flex-col items-center' style={{ maxWidth: '700px' }}>
                <p className='text-7xl pb-5'>
                About <span className='text-yellow-50'>Jobify</span>
                </p>
                <p className='text-xl'>
                At Jobify, we believe that finding the right job is more than just a search—it's a step towards achieving your career aspirations.
                </p>
            </div>
            <div className='flex flex-col items-center mt-16' style={{ maxWidth: '700px' }}>
                <p className='text-4xl'>Mission</p>
                <p className=''>Our mission is to simplify the job search process by offering a user-friendly platform that provides personalized job recommendations, seamless application tracking,</p>
            </div>
      
        </div>
        <Footer/>
      
    </div>
  );
}

export default About;
