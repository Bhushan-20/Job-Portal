import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";  // Make sure this is imported properly
import { setUserReal } from "./slices/userSlice";
import { ACCOUNT_TYPE } from "./utils/constants";

import Navbar from "./components/common/Navbar";
import Home from "./pages/Home";
import OpenRoute from "./components/core/Auth/OpenRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Settings from "./components/core/Dashboard/Settings/index";
import MyJobs from "./components/core/Dashboard/MyJobs";
import AllJobs from "./components/common/Jobs/AllJobs";
import AddJobs from "./components/core/Dashboard/Recruiter/AddJob/AddJob";
import EditJob from "./components/core/Dashboard/Recruiter/EditJob/EditJob";
import MyApplications from "./components/core/Dashboard/Applicant/MyApplications";
import Category from "./pages/Category";
import Applications from "./components/core/Dashboard/Recruiter/Applications";
import ViewApplication from "./components/core/Dashboard/Recruiter/Jobs/ViewApplication";
import Error from "./pages/Error";
import Preloader from "./components/common/Preload"; // Import Preloader

function App() {
  const { token } = useSelector((state) => state.auth);
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // Global loading state

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Hide Preloader after 4 seconds
    }, 900);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const setData = async () => {
      const decodedToken = await jwtDecode(token);
      if (decodedToken !== userData) {
        setUserData(decodedToken);
        dispatch(setUserReal(decodedToken));
      }
    };
    if (token) {
      setData();
    }
  }, [token, userData, dispatch]);

  if (loading) {
    return <Preloader />; // Show Preloader if loading is true
  }

  return (
    <div className="w-screen min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-black flex flex-col font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="category/:categoryName" element={<Category />} />

        {/* Open Route - for Only Non Logged in User */}
        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />
        <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />
        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />
        <Route path="/jobs" element={<AllJobs />} />

        {/* Private Route - for Only Logged in User */}
        <Route element={<PrivateRoute><Dashboard /></PrivateRoute>}>
          <Route path="dashboard/my-profile" element={<MyProfile />} />
          <Route path="dashboard/Settings" element={<Settings />} />
          {/* ...additional routes */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
