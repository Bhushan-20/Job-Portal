import React, { useState,useEffect } from 'react';
import logo from "../../assets/Logo/Logo_jobify.svg.png";
import { Link, matchPath, useLocation,useNavigate } from 'react-router-dom';
import { NavbarLinks } from "../../data/navbar-links";
import { useSelector } from 'react-redux';
import { BsChevronDown } from "react-icons/bs";
import { logout } from "../../services/operations/authAPI";
import {apiConnector} from "../../services/apiconnecter"
import {TokenMobNavbarLinks} from '../../data/TokenMobNavbarLinks'
import {MobNavbarLinks} from '../../data/mobnavlinks'
import { IoCloseSharp } from "react-icons/io5";
import ConfirmationModel from './ConfirmationModal'
import { AiOutlineMenu} from "react-icons/ai";
import { useDispatch } from "react-redux";
import {allcategories} from "../../services/apis"
import ProfileDropdown from '../core/Auth/ProfileDropDown';


const Navbar = () => {
    const { token } = useSelector((state) => state.auth);
    const [toggle, setToggle] = useState(false);
    const [toggleSub, setToggleSub] = useState(false);
    const [confirmationModel, setConfirmationModel] = useState(null);
    const location = useLocation();
    const [subLinks, setSubLinks] = useState([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
	const navigate = useNavigate();

    const bbtn1Hnad = () => {
		dispatch(logout(navigate));
		setConfirmationModel(null);
	};

    useEffect(() => {
        fetchCategories(); // Call fetchCategories to load data on component mount
    }, []);
    
    const fetchCategories = async () => {
        setLoading(true);
        try {
            const result = await apiConnector("GET", allcategories.CATEGORIES_API);
            console.log("Sublinks result->", result);
            setSubLinks(result.data.categories || []); // Fallback to empty array if data is not as expected
            console.log("Updated subLinks:", result.data || []);
        } catch (error) {
            console.error("Could not fetch Categories.", error);
            setSubLinks([]); // Ensure subLinks is an array even on error
        } finally {
            setLoading(false);
        }
    };

    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    };

    return (
        <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-400 bg-richblack-100 transition-all duration-200'>
            <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
                {/* Logo */}
                <Link to="/">
                    <img src={logo} alt="Logo" width={160} height={32} loading="lazy" />
                </Link>

                {/* Nav Links */}
                <nav className='hidden md:block'>
                    <ul className='flex gap-x-6 text-richblack-800'>
                        {NavbarLinks.map((link, index) => (
                            <li key={index}>
                                {link.title === "Category" ? (
                                    <div
                                        className={`group relative flex cursor-pointer items-center gap-1 ${
                                            matchRoute("/category/:categoryName") ? "text-yellow-25" : "text-richblack-800"
                                        }`}
                                    >
                                        <p>{link.title}</p>
                                        <BsChevronDown />
                                        <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                                            <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                                            {console.log("subLinks:", subLinks)}
                                            {loading ? (
                                                <p className="text-center">Loading...</p>
                                            ) : subLinks.length > 0 ? (
                                                subLinks.map((subLink, i) => (
                                                    <Link
                                                        to={`/category/${subLink.name.split(" ").join("-").toLowerCase()}`}
                                                        className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                                        key={i}
                                                    >
                                                        <p>{subLink.name}</p>
                                                    </Link>
                                                ))
                                            ) : (
                                                <p className="text-center">No Categories Found</p>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <Link to={link?.path}>
                                        <p className={`${
                                            matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-800"
                                        }`}>
                                            {link.title}
                                        </p>
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Login/SignUp/Dashboard */}
                <div className='hidden items-center gap-x-4 md:flex'>
                    {
                        token === null && (
                        <Link to="/login">
                            <button className="rounded-md border border-richblack-700 bg-richblack-800 px-[20px] py-[9px] text-richblack-100">
                                Log in
                            </button>
                        </Link>)
                    }
                    {    
                        token === null && (
                            <Link to="/signup">
                                    <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
                                        Sign up
                                    </button>
                            </Link>
                        )
                    }
                    {
                        token !== null && <ProfileDropdown/>
                    }
                </div>

                <div
					className="md:hidden flex flex-1 justify-end items-center text-white"
					onClick={() => setToggle(!toggle)}>
					{!toggle ? (
						<div className="object-contain cursor-pointer">
							<AiOutlineMenu fontSize={23} fill="#AFB2BF" />
						</div>
					) : (
						<IoCloseSharp fontSize={25} fill="#AFB2BF" />
					)}
					<div
						className={`${
							!toggle ? "hidden" : "flex"
						} p-6 black-gradient absolute bg-[rgb(5,8,22)] top-[35px] right-0 mx-4 my-2 min-w-[140px] z-50 rounded-xl`}>
						<ul className="list-none flex justify-end items-start flex-col gap-4">
							{token ? (
								<>
									{TokenMobNavbarLinks.map((link, index) => (
										<>
											{link.title === "Logout" ? (
												<>
													<button
														onClick={() =>
															setConfirmationModel({
																text1: "Are you sure?",
																text2:
																	"You will be logged out of your account.",
																btn1Text: "Logout",
																btn2Text: "Cancel",
																btn1Handler: () => bbtn1Hnad(),
																btn2Handler: () => setConfirmationModel(null),
															})
														}
														className="text-[16px] font-poppins text-white font-medium cursor-pointer">
														<span>Logout</span>
													</button>
												</>
											) : link?.title === "Catalog" ? (
												<>
													<div
														onClick={(e) => {
															e.stopPropagation();
															setToggleSub(!toggleSub);
														}}
														className={`flex gap-1 ${
															matchRoute("/catalog/:catalogName")
																? "text-yellow-25"
																: "text-richblack-25"
														} flex flex-col`}>
														<div className="flex items-center justify-center gap-1">
															<p>{link.title}</p>
															<BsChevronDown />
														</div>
														<div
															className={`${
																!toggleSub ? "hidden" : "block"
															} md:hidden border p-2 flex-col rounded-lg text-richblack-5 bg-richblack-900`}>
															{loading ? (
																<p className="text-center">Loading...</p>
															) : subLinks?.length ? (
																<>
																	{subLinks?.map((subLink, i) => (
																		<Link
																			onClick={() => {
																				setToggleSub(!toggleSub);
																				setToggle(!toggle);
																			}}
																			to={`/catalog/${subLink.name
																				.split(" ")
																				.join("-")
																				.toLowerCase()}`}
																			className="rounded-lg bg-transparent"
																			key={i}>
																			<p>{subLink.name}</p>
																		</Link>
																	))}
																</>
															) : (
																<p className="text-center">No Courses Found</p>
															)}
														</div>
													</div>
												</>
											) : (
												<li
													key={index}
													className={`${
														matchRoute(link?.path)
															? "text-yellow-25"
															: "text-richblack-25"
													} font-poppins text-[16px] font-medium cursor-pointer`}
													onClick={() => {
														setToggle(!toggle);
													}}>
													<Link to={link?.path}>{link.title}</Link>
												</li>
											)}
										</>
									))}
								</>
							) : (
								<>
									{MobNavbarLinks.map((link, index) => (
										<>
											{link?.title === "Catalog" ? (
												<>
													<div
														onClick={(e) => {
															e.stopPropagation();
															setToggleSub(!toggleSub);
														}}
														className={`flex gap-1 ${
															matchRoute("/catalog/:catalogName")
																? "text-yellow-25"
																: "text-richblack-800"
														} flex flex-col`}>
														<div className="flex items-center justify-center gap-1">
															<p>{link.title}</p>
															<BsChevronDown />
														</div>
														<div
															className={`${
																!toggleSub ? "hidden" : "block"
															} md:hidden border p-2 flex-col rounded-lg text-richblack-5 bg-richblack-900`}>
															{loading ? (
																<p className="text-center">Loading...</p>
															) : subLinks?.length ? (
																<>
																	{subLinks?.map((subLink, i) => (
																		<Link
																			onClick={() => {
																				setToggleSub(!toggleSub);
																				setToggle(!toggle);
																			}}
																			to={`/catalog/${subLink.name
																				.split(" ")
																				.join("-")
																				.toLowerCase()}`}
																			className="rounded-lg bg-transparent"
																			key={i}>
																			<p>{subLink.name}</p>
																		</Link>
																	))}
																</>
															) : (
																<p className="text-center">No Courses Found</p>
															)}
														</div>
													</div>
												</>
											) : (
												<>
													<li
														key={index}
														className={`${
															matchRoute(link?.path)
																? "text-yellow-25"
																: "text-richblack-800"
														} font-poppins text-[16px] font-medium cursor-pointer`}
														onClick={() => {
															setToggle(!toggle);
														}}>
														<Link to={link?.path}>{link.title}</Link>
													</li>
												</>
											)}
										</>
									))}
								</>
							)}
						</ul>
					</div>
		        </div>
                {confirmationModel && <ConfirmationModel modelData={confirmationModel} />}
            </div>
        </div>
    );
};

export default Navbar;
