import { useState, useEffect } from "react";
import Logo from "../../assets/Logo/Logo_jobify.svg.png";

const Preloader = () => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 2000); // Animation duration is 2 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showLoader && (
        <div className="w-full h-full min-h-screen flex justify-center items-center bg-gradient-to-b from-blue-900 via-blue-800 to-black">
          <img
            className="w-[500px] h-[200px] animate-zoom-out-fade mix-blend-lighten"
            src={Logo}
            alt="logo"
          />
        </div>
      )}
    </>
  );
};

export default Preloader;
