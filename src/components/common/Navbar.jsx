import React, { useEffect } from 'react'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { Link, matchPath } from 'react-router-dom'
import { NavbarLinks } from "../../data/navbar-links"
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineShoppingCart } from "react-icons/ai"
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { apiConnector } from '../../services/apiconnector'
import { categories } from '../../services/apis'
import { useState } from 'react'
import { IoIosArrowDropdownCircle } from "react-icons/io"
import { loadUserCartAPI } from '../../services/operations/CartApi'


const subLinks = [
    {
        title: "python",
        link: "/catalog/python"
    },
    {
        title: "web dev",
        link: "/catalog/web-development"
    },
];


const Navbar = () => {
    //  console.log("Printing base url: ",process.env.REACT_APP_BASE_URL);
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const { totalItems } = useSelector((state) => state.cart)
    const location = useLocation();
    const dispatch = useDispatch();
    const [ssubLinks, setSsubLinks] = useState([]);
    // console.log("Token:", token);
    // console.log("User:", user);
    //console.log("Total Items:", totalItems);
    const fetchSublinks = async () => {
        try {
            //   console.log("printing the category url -> ",categories.CATEGORIES_API);
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            //    console.log("Printing Sublinks result:" , result);
            setSsubLinks(result.data.allCategories);
        }
        catch (error) {
            console.log("Could not fetch the category list");
        }
    }
    //console.log("sublink is -> ",ssubLinks)

    useEffect(() => {
        fetchSublinks();
    }, [])

    useEffect(() => {
        if (token && user.accountType === "Student") {
            dispatch(loadUserCartAPI(token));   //  fetch cart once user logs in
        }
    }, [token,dispatch]);



    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    }

    return (
        <div className='flex h-fit items-center justify-center border-b-[1px] border-b-richblack-700 px-2 sm:px-4'>
            <div className='flex w-full max-w-maxContent items-center justify-between'>

                {/* Image */}
                <Link to="/">
                    <img src={logo} width={120} height={40} loading='lazy' className="sm:w-[140px] hidden sm:block sm:h-[42px]" />
                </Link>

                {/* Nav Links */}
                <nav className="   sm:block  hidden  ">
                    <ul className='flex gap-x-4 lg:gap-x-6 text-richblack-25 text-sm sm:text-base'>
                        {
                            NavbarLinks.map((link, index) => (
                                <li key={index}>
                                    {
                                        link.title === "Courses" ? (
                                            <div className='relative   flex   items-center gap-1 sm:gap-2 group'>
                                                <p>{link.title}</p>
                                                <IoIosArrowDropdownCircle />

                                                <div className='invisible absolute left-[50%]
                      translate-x-[-50%] translate-y-[10%]
                      top-[50%] z-20
                      flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900
                      opacity-0 transition-all duration-200 group-hover:visible
                      group-hover:opacity-100 lg:w-[300px] w-[220px] sm:w-[260px]'>

                                                    <div className='absolute left-[50%] top-0
                        translate-x-[80%]
                        translate-y-[-40%] h-6 w-6 rotate-45 rounded bg-richblack-5'>
                                                    </div>

                                                    {
                                                        ssubLinks.length ? (
                                                            ssubLinks.map((subLink, index) => (
                                                                <Link
                                                                    className='flex w-full h-fit'
                                                                    to={`/catalog/${subLink.name.split(" ").join("-")}`}
                                                                    key={index}
                                                                >
                                                                    <p className='text-sm sm:text-lg hover:bg-richblack-50 rounded-lg w-full p-2'>
                                                                        {subLink.name}
                                                                    </p>
                                                                </Link>
                                                            ))
                                                        ) : (<div className='flex justify-center items-center'>
                                                            <span className='navbar-loader  loadder'></span>
                                                        </div>)
                                                    }
                                                </div>
                                            </div>
                                        ) : (
                                            <Link to={link?.path}>
                                                <p className={`${matchRoute(link?.path) ? "text-yellow-400" : "text-richblack-25"}`}>
                                                    {link.title}
                                                </p>
                                            </Link>
                                        )
                                    }
                                </li>
                            ))
                        }
                    </ul>


                </nav>

                {/* for mobile  */}

                <nav className='sm:hidden w-full flex justify-evenly   h-full'>
                    {NavbarLinks?.filter((link) => link.title != "About Us")?.map((link, index) =>
                    (
                        <li key={index}>
                            {
                                link.title === "Courses" ? (
                                    <div className='relative       items-center    gap-2 group'>
                                        <p className='text-white text-[0.75rem] sm:text-sm'>{link.title}</p>
                                        <IoIosArrowDropdownCircle />

                                        <div className='invisible  z-50 absolute left-[50%]
                      translate-x-[-50%] translate-y-[10%]
                      top-[50%]  
                      flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900
                      opacity-0 transition-all duration-200 group-hover:visible
                      group-hover:opacity-100   w-fit sm:w-[260px]'>

                                            <div className='absolute left-[50%] top-0
                        translate-x-[80%]
                        translate-y-[-40%] h-6 w-6 rotate-45 rounded bg-richblack-5'>
                                            </div>

                                            {
                                                ssubLinks.length ? (
                                                    ssubLinks.map((subLink, index) => (
                                                        <Link
                                                            className='flex items-center justify-center gap-2 w-full h-fit'
                                                            to={`/catalog/${subLink.name.split(" ").join("-")}`}
                                                            key={index}
                                                        >
                                                            <p className='text-sm   text-[0.75rem] sm:text-sm  hover:bg-richblack-50 rounded-lg w-full p-2'>
                                                                {subLink.name}
                                                            </p>
                                                        </Link>
                                                    ))
                                                ) : (<div>
                                                    <span className='loadder navbar-loader'></span>

                                                </div>)
                                            }
                                        </div>
                                    </div>
                                ) : (
                                    <Link to={link?.path} className='flex items-center justify-center'>
                                        <p className={`${matchRoute(link?.path) ? "text-yellow-400" : "text-richblack-25"} text-[0.75rem] sm:text-sm`}>
                                            {link.title}
                                        </p>
                                    </Link>
                                )
                            }
                        </li>
                    ))}
                </nav>
                {/* Login/SignUp/Dashboard */}
                <div className='flex items-center gap-3 sm:gap-x-6'>

                    {
                        user && user?.accountType !== "Instructor" && user.accountType !== "Admin" && (
                            <Link to="/dashboard/cart" className='relative'>
                                <AiOutlineShoppingCart className="text-white text-xl sm:text-2xl" />
                                {
                                    totalItems > 0 && (
                                        <span className='absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center'>
                                            {totalItems}
                                        </span>
                                    )
                                }
                            </Link>
                        )
                    }

                    {
                        token === null && (
                            <Link to="/login">
                                <button className='border border-richblack-700 bg-richblack-800 px-3 py-2 text-xs sm:text-sm text-richblack-100 rounded-md'>
                                    Log in
                                </button>
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to="/signup">
                                <button className='border border-richblack-700 bg-richblack-800 px-3 py-2 text-xs sm:text-sm text-richblack-100 rounded-md'>
                                    Sign Up
                                </button>
                            </Link>
                        )
                    }

                    {
                        token !== null && <ProfileDropDown />
                    }

                </div>
            </div>
        </div>

    )
}

export default Navbar
