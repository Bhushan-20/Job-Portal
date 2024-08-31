import React from 'react';
import jobifyLogo from '../../assets/Logo/Logo_jobify.svg.png'; // Add your logo path here
import './Preloader.css'; // Create a CSS file for styling

const Preload = () => {
  return (
    <div className="preloader">
      <img src={jobifyLogo} alt="Jobify Logo" />
    </div>
  );
};

export default Preload;
