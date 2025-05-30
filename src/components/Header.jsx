import {
  Navbar,
  Button,
  Dropdown,
  Avatar,
  DropdownHeader,
  DropdownDivider,
} from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { signoutSuccess } from "../redux/student/studentSlice";
import { AiOutlineSearch } from "react-icons/ai";

export default function Header() {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const { currentstudent } = useSelector((state) => state.student);
  const { theme } = useSelector((state) => state.theme);

  const handleSignout = async () => {
    try {
      const res = await fetch("/server/student/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.error(error);
    }
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Gallery", path: "/media-gallery" },
    { name: "Alumni", path: "/officebearer" },
    { name: "Jobs", path: "/jobs" },
    { name: "Events", path: "/event" },
    { name: "Posts", path: "/gallery" },
    { name: "Contact", path: "/contact" },
    { name: "About", path: "/about" }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-b border-white/20 dark:border-gray-700/50 shadow-lg">
      {/* Ambient background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 dark:from-blue-400/10 dark:via-purple-400/10 dark:to-pink-400/10"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Section */}
          <Link
            to="/"
            className="flex items-center space-x-3 group transition-all duration-300 hover:scale-105"
          >
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-20 blur-lg group-hover:opacity-40 transition-opacity duration-300"></div>
              <img
                src="/icon.png"
                alt="ConnectAlumni Logo"
                className="relative h-8 w-8 rounded-full shadow-lg"
              />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
              ConnectAlumni
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative px-4 py-2 rounded-xl font-medium transition-all duration-300 group ${
                  path === item.path
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
              >
                {/* Active indicator */}
                {path === item.path && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20 backdrop-blur-sm"></div>
                )}
                
                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <span className="relative z-10">{item.name}</span>
                
                {/* Active dot indicator */}
                {path === item.path && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                )}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            
            {/* Theme Toggle */}
            <button
              onClick={() => dispatch(toggleTheme())}
              className="relative p-2 rounded-xl bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 border border-gray-200/50 dark:border-gray-600/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 text-gray-600 dark:text-gray-300">
                {theme === "light" ? (
                  <FaSun className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" />
                ) : (
                  <FaMoon className="w-4 h-4 transition-transform duration-300 group-hover:-rotate-12" />
                )}
              </div>
            </button>

            {/* User Section */}
            {currentstudent ? (
              <div className="relative">
                <Dropdown
                  arrowIcon={false}
                  inline
                  label={
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-20 blur-sm group-hover:opacity-40 transition-opacity duration-300"></div>
                      <Avatar 
                        alt="user" 
                        img={currentstudent.profilePicture} 
                        rounded 
                        className="relative ring-2 ring-white/20 hover:ring-white/40 transition-all duration-300"
                      />
                    </div>
                  }
                >
                  <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 shadow-xl rounded-xl">
                    <DropdownHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/50 dark:to-purple-900/50">
                      <span className="block text-sm font-semibold text-gray-800 dark:text-gray-200">@{currentstudent.name}</span>
                      <span className="block text-sm text-gray-600 dark:text-gray-400 truncate">
                        {currentstudent.email}
                      </span>
                    </DropdownHeader>
                    <Link to={"/dashboard?tab=profile"}>
                      <Dropdown.Item className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30 transition-all duration-300">
                        <span className="flex items-center space-x-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span>Profile</span>
                        </span>
                      </Dropdown.Item>
                    </Link>
                    <DropdownDivider />
                    <Dropdown.Item 
                      onClick={handleSignout}
                      className="hover:bg-red-50 dark:hover:bg-red-900/30 transition-all duration-300 text-red-600 dark:text-red-400"
                    >
                      <span className="flex items-center space-x-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span>Sign out</span>
                      </span>
                    </Dropdown.Item>
                  </div>
                </Dropdown>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                {/* Login Dropdown */}
                <div className="relative">
                  <Dropdown 
                    label=""
                    dismissOnClick={false}
                    renderTrigger={() => (
                      <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/30 dark:border-gray-600/30 rounded-xl hover:bg-white/80 dark:hover:bg-gray-700/80 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                        Login
                      </button>
                    )}
                  >
                    <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 shadow-xl rounded-xl">
                      <Dropdown.Item className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30 transition-all duration-300">
                        <Link to='/student-login' className="flex items-center space-x-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                          <span>Login as Student</span>
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item className="hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 dark:hover:from-green-900/30 dark:hover:to-blue-900/30 transition-all duration-300">
                        <Link to='/alumni-login' className="flex items-center space-x-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          <span>Login as Alumni</span>
                        </Link>
                      </Dropdown.Item>
                    </div>
                  </Dropdown>
                </div>

                {/* Signup Dropdown */}
                <div className="relative">
                  <Dropdown 
                    label=""
                    dismissOnClick={false}
                    renderTrigger={() => (
                      <button className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-lg transform">
                        Sign Up
                      </button>
                    )}
                  >
                    <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 shadow-xl rounded-xl">
                      <Dropdown.Item className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30 transition-all duration-300">
                        <Link to='/student-signup' className="flex items-center space-x-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                          </svg>
                          <span>Signup as Student</span>
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item className="hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 dark:hover:from-green-900/30 dark:hover:to-blue-900/30 transition-all duration-300">
                        <Link to='/alumni-signup' className="flex items-center space-x-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                          </svg>
                          <span>Signup as Alumni</span>
                        </Link>
                      </Dropdown.Item>
                    </div>
                  </Dropdown>
                </div>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button className="lg:hidden p-2 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/30 dark:border-gray-600/30 hover:bg-white/80 dark:hover:bg-gray-700/80 transition-all duration-300">
              <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-xl mt-2 border border-white/20 dark:border-gray-700/30">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block px-3 py-2 rounded-lg font-medium transition-all duration-300 ${
                  path === item.path
                    ? "text-blue-600 dark:text-blue-400 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30"
                    : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
