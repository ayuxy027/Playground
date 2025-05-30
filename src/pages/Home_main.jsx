import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import JobCard from "../components/JobCard";
import featureStats from "../data/featureStats.json";
import infoCards from "../data/infoCards.json";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [events, setEvents] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [members, setMembers] = useState([]);
  const [albums, setAlbums] = useState([]);
  const navigate = useNavigate();
  const { theme } = useSelector((state) => state.theme);

  useEffect(() => {
    fetch("http://localhost:3000/server/gallery/albums")
      .then((res) => res.json())
      .then(setAlbums)
      .catch(console.error);
    const fetchJobs = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/server/job/displayjob",
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (response.ok) {
          const data = await response.json();

          setJobs(data.slice(0, 3));
        } else {
          console.error("Failed to fetch jobs");
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    const fetchEvents = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/server/event/getevents"
        );
        const result = await response.json();

        if (response.ok) {
          setEvents(result.events);
          if (data.events.length < 3) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchJobs();
    fetchEvents();
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/server/student/recent")
      .then((res) => res.json())
      .then((data) => setMembers(data))
      .catch((e) => console.error("Members fetch error:", e));
  }, []);

  const handleShowMore = async () => {
    const startIndex = events.length;
    try {
      const response = await fetch(
        `http://localhost:3000/server/event/getevents?startIndex=${startIndex}`,
        {
          credentials: "include",
        }
      );
      const data = await response.json();
      if (response.ok) {
        setEvents((prev) => [...prev, ...data.events]);
        if (data.events.length < 3) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log("Error fetching more events:", error);
    }
  };

  const handleCardClick = (cardTitle) => {
    if (cardTitle === "SUCCESS STORIES") {
      navigate("/success-stories");
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br to-blue-50 from-slate-50 dark:from-gray-900 dark:to-blue-950">
      {/* Hero Bento Box Section */}
      <div className="px-4 py-6 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 h-auto lg:h-[600px]">
          {/* Main Welcome Card - Large */}
          <div className="overflow-hidden relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-2xl shadow-2xl md:col-span-2 lg:col-span-3 lg:row-span-2 dark:from-blue-700 dark:via-blue-800 dark:to-blue-900 group before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700">
            <div className="absolute inset-0">
              <img
                src="https://cdn.pixabay.com/photo/2018/01/18/09/13/book-3089857_640.jpg"
                alt="Education"
                className="object-cover w-full h-full opacity-20 transition-all duration-700 group-hover:scale-110 group-hover:opacity-30"
              />
              <div className="absolute inset-0 bg-gradient-to-br to-transparent from-blue-900/80 via-blue-800/60"></div>
              <div className="absolute inset-0 bg-gradient-to-t via-transparent to-transparent from-blue-900/90"></div>
            </div>
            <div className="flex relative z-10 flex-col justify-between p-8 h-full">
              <div>
                <div className="inline-block px-4 py-2 mb-6 text-sm font-semibold text-blue-100 rounded-full border backdrop-blur-sm bg-white/10 border-white/20">
                  Welcome to the Future
                </div>
                <h1 className="mb-4 text-4xl font-bold leading-tight text-white drop-shadow-lg lg:text-5xl">
                  Connect<span className="text-blue-200">Alumni</span>
                </h1>
                <p className="mb-6 text-xl leading-relaxed text-blue-100">
                  Building bridges between education and career success through meaningful connections
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button className="px-6 py-3 font-semibold text-blue-600 bg-white rounded-xl transition-all duration-300 transform hover:bg-blue-50 hover:scale-105 hover:shadow-lg">
                  Get Started
                </button>
                <button className="px-6 py-3 font-semibold text-white rounded-xl border-2 backdrop-blur-sm transition-all duration-300 transform border-white/30 hover:bg-white/10 hover:border-white hover:scale-105">
                  Learn More
                </button>
              </div>
            </div>
            {/* Ambient glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl opacity-20 blur-lg transition-opacity duration-500 group-hover:opacity-30"></div>
          </div>

          {/* Career Opportunities Card */}
          <div className="overflow-hidden relative rounded-2xl shadow-xl backdrop-blur-xl transition-all duration-500 md:col-span-2 lg:col-span-2 bg-white/90 dark:bg-gray-800/90 border border-white/20 dark:border-gray-700/50 group hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1">
            <div className="absolute inset-0">
              <img
                src="https://cdn.pixabay.com/photo/2015/07/19/10/00/school-work-851328_640.jpg"
                alt="Career"
                className="object-cover w-full h-full opacity-10 transition-all duration-700 group-hover:scale-110 group-hover:opacity-20"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-gray-800/50 dark:to-gray-900/50"></div>
            </div>
            <div className="flex relative z-10 flex-col justify-between p-6 h-full">
              <div>
                <div className="flex justify-center items-center mb-4 w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                  </svg>
                </div>
                <h3 className="mb-3 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200">
                  Career Opportunities
                </h3>
                <p className="leading-relaxed text-gray-600 dark:text-gray-300">
                  Discover your next professional adventure with our curated job listings
                </p>
              </div>
              <button 
                onClick={() => navigate('/jobs')}
                className="flex gap-2 items-center mt-4 font-semibold text-left text-blue-600 transition-all duration-300 hover:text-blue-700 hover:translate-x-2"
              >
                Explore Jobs 
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
            {/* Ambient border glow */}
            <div className="absolute inset-0 bg-gradient-to-r rounded-2xl opacity-0 transition-opacity duration-500 pointer-events-none from-blue-500/20 to-indigo-500/20 group-hover:opacity-100"></div>
          </div>

          {/* Knowledge Sharing Card */}
          <div className="overflow-hidden relative bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600 rounded-2xl shadow-xl transition-all duration-500 md:col-span-2 lg:col-span-1 dark:from-emerald-600 dark:via-green-600 dark:to-teal-700 group hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1">
            <div className="absolute inset-0">
              <img
                src="https://cdn.pixabay.com/photo/2015/11/19/21/11/book-1052014_640.jpg"
                alt="Knowledge"
                className="object-cover w-full h-full opacity-20 transition-all duration-700 group-hover:scale-110 group-hover:opacity-30"
              />
              <div className="absolute inset-0 bg-gradient-to-br via-transparent to-transparent from-emerald-600/40"></div>
            </div>
            <div className="flex relative z-10 flex-col justify-between p-6 h-full">
              <div>
                <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-lg border backdrop-blur-sm transition-transform duration-300 bg-white/20 border-white/30 group-hover:scale-110">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-bold text-white drop-shadow-sm">
                  Knowledge Sharing
                </h3>
                <p className="text-sm leading-relaxed text-emerald-100">
                  Learn from experienced professionals
                </p>
              </div>
            </div>
            {/* Ambient glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl opacity-20 blur-lg transition-opacity duration-500 group-hover:opacity-30"></div>
          </div>

          {/* Professional Network Card */}
          <div className="overflow-hidden relative bg-gradient-to-br from-purple-500 via-violet-500 to-indigo-600 rounded-2xl shadow-xl transition-all duration-500 md:col-span-2 lg:col-span-2 dark:from-purple-600 dark:via-violet-600 dark:to-indigo-700 group hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1">
            <div className="absolute inset-0">
              <img
                src="https://cdn.pixabay.com/photo/2019/11/19/22/24/watch-4638673_640.jpg"
                alt="Network"
                className="object-cover w-full h-full opacity-20 transition-all duration-700 group-hover:scale-110 group-hover:opacity-30"
              />
              <div className="absolute inset-0 bg-gradient-to-br via-transparent to-transparent from-purple-600/40"></div>
            </div>
            <div className="flex relative z-10 flex-col justify-between p-6 h-full">
              <div>
                <div className="flex justify-center items-center mb-4 w-12 h-12 rounded-xl border backdrop-blur-sm transition-transform duration-300 bg-white/20 border-white/30 group-hover:scale-110">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="mb-3 text-2xl font-bold text-white drop-shadow-sm">
                  Professional Network
                </h3>
                <p className="leading-relaxed text-purple-100">
                  Connect with industry leaders and peers in your field
                </p>
              </div>
              <button 
                onClick={() => navigate('/alumni-list')}
                className="flex gap-2 items-center mt-4 font-semibold text-left text-white transition-all duration-300 hover:text-purple-200 hover:translate-x-2"
              >
                View Network 
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
            {/* Ambient glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl opacity-20 blur-lg transition-opacity duration-500 group-hover:opacity-30"></div>
          </div>

          {/* Stats Mini Cards */}
          <div className="grid grid-cols-1 gap-4 md:col-span-2 lg:col-span-1">
            <div className="overflow-hidden relative p-4 text-white bg-gradient-to-br from-orange-500 to-red-500 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl group">
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 from-orange-400/20 to-red-400/20 group-hover:opacity-100"></div>
              <div className="relative z-10">
                <div className="text-2xl font-bold">500+</div>
                <div className="text-sm opacity-90">Alumni Connected</div>
              </div>
            </div>
            <div className="overflow-hidden relative p-4 text-white bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl group">
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 from-cyan-400/20 to-blue-400/20 group-hover:opacity-100"></div>
              <div className="relative z-10">
                <div className="text-2xl font-bold">150+</div>
                <div className="text-sm opacity-90">Job Placements</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Feature Stats Section */}
      <div className="relative px-4 py-20 mx-auto max-w-7xl">
        {/* Background ambient elements */}
        <div className="overflow-hidden absolute inset-0">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl bg-blue-400/10"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl bg-purple-400/10"></div>
        </div>
        
        <div className="relative z-10">
          <div className="mb-16 text-center">
            <div className="inline-block px-6 py-2 mb-4 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
              Our Success Metrics
            </div>
            <h2 className="mb-6 text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200">
              Our Impact
            </h2>
            <p className="mx-auto max-w-2xl text-xl leading-relaxed text-gray-600 dark:text-gray-300">
              Connecting talented individuals worldwide and creating lasting professional relationships
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-6">
            {featureStats.map(({ icon, value, label }, index) => (
              <div 
                key={value} 
                className="relative p-8 rounded-2xl border shadow-lg backdrop-blur-xl transition-all duration-500 group bg-white/60 dark:bg-gray-800/60 border-white/20 dark:border-gray-700/30 hover:shadow-2xl hover:scale-105 hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br rounded-2xl opacity-0 transition-opacity duration-500 from-blue-500/10 via-purple-500/10 to-pink-500/10 group-hover:opacity-100"></div>
                
                {/* Ambient glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r rounded-2xl opacity-0 blur-lg transition-opacity duration-500 from-blue-600/20 via-purple-600/20 to-pink-600/20 group-hover:opacity-100"></div>
                
                <div className="relative z-10">
                  <div className="flex justify-center mb-6">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-110">
                      <img
                        src={icon}
                        alt={label}
                        className="w-8 h-8 filter brightness-0 invert"
                      />
                    </div>
                  </div>
                  <h3 className="mb-3 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                    {value}
                  </h3>
                  <p className="text-sm font-medium leading-relaxed text-gray-600 dark:text-gray-400">
                    {label}
                  </p>
                </div>
                
                {/* Floating particles effect */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full opacity-40 group-hover:animate-pulse"></div>
                <div className="absolute bottom-6 left-6 w-1 h-1 bg-purple-400 rounded-full opacity-60 group-hover:animate-bounce"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Info Cards Section */}
      <div className="px-4 py-16 mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-800 dark:text-white">Explore Opportunities</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">Discover what connects us together</p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {infoCards.map((card, idx) => (
            <div
              key={card.title}
              onClick={() => handleCardClick(card.title)}
              className={`relative overflow-hidden rounded-2xl shadow-xl group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${idx === 2 ? "cursor-pointer" : ""}`}
            >
              <div className="relative h-80">
                <img
                  src={card.image}
                  alt={card.title}
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t to-transparent from-blue-900/80 via-blue-900/30"></div>
              </div>
              {card.description && (
                <div className="flex absolute inset-0 justify-center items-center p-8 text-white opacity-0 backdrop-blur-sm transition-all duration-500 bg-blue-900/90 group-hover:opacity-100">
                  <p className="text-lg leading-relaxed text-center">{card.description}</p>
                </div>
              )}
              <div className="absolute bottom-0 left-0 w-full">
                <div className="flex items-center pl-6 h-16 text-white bg-blue-600">
                  <h3 className="text-xl font-bold">{card.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Latest Jobs Section */}
      <div className="px-4 py-16 mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-800 dark:text-white">Latest Job Openings</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">Find your next career opportunity</p>
        </div>
        {jobs.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-xl border border-blue-100 backdrop-blur-sm bg-white/70 dark:bg-gray-800/70 dark:border-blue-800">
            <p className="text-xl text-gray-600 dark:text-gray-300">
              No jobs available at the moment.
            </p>
          </div>
        )}
      </div>

      {/* Latest Events Section */}
      <div className="px-4 py-16 mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-800 dark:text-white">Upcoming Events</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">Stay connected with our community</p>
        </div>
        {events.length > 0 ? (
          <div className="space-y-6">
            {events.map((event) => (
              <div key={event._id} className="p-8 rounded-2xl border border-blue-100 shadow-lg backdrop-blur-sm transition-all duration-300 bg-white/70 dark:bg-gray-800/70 dark:border-blue-800 hover:shadow-xl">
                <div className="flex flex-col gap-6 lg:flex-row">
                  <div className="text-center lg:w-1/4 lg:text-left">
                    <div className="inline-block p-4 mb-4 text-white bg-blue-600 rounded-xl">
                      <p className="text-2xl font-bold">
                        {new Date(event.date).toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <p className="font-semibold text-blue-600 dark:text-blue-400">{event.location}</p>
                  </div>
                  <div className="lg:w-3/4">
                    <h3 className="mb-4 text-2xl font-bold text-gray-800 dark:text-white">
                      {event.eventName}
                    </h3>
                    <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
                      <p className="text-gray-600 dark:text-gray-300">
                        <span className="font-semibold text-blue-600 dark:text-blue-400">Time:</span> {event.time}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300">
                        <span className="font-semibold text-blue-600 dark:text-blue-400">Organized By:</span> {event.organizedBy}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300">
                        <span className="font-semibold text-blue-600 dark:text-blue-400">Contact:</span> {event.contactNo}
                      </p>
                    </div>
                    <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                      <span className="font-semibold text-blue-600 dark:text-blue-400">Description:</span> {event.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {showMore && (
              <div className="text-center">
                <button
                  onClick={handleShowMore}
                  className="px-8 py-3 font-semibold text-white bg-blue-600 rounded-xl transition-colors duration-300 hover:bg-blue-700"
                >
                  Show More Events
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="p-12 text-center rounded-xl border border-blue-100 backdrop-blur-sm bg-white/70 dark:bg-gray-800/70 dark:border-blue-800">
            <p className="text-xl text-gray-600 dark:text-gray-300">No events available.</p>
          </div>
        )}
      </div>

      {/* Gallery Albums Section */}
      <div className="px-4 py-16 mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-800 dark:text-white">Gallery</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">Memories from our community</p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {albums.map((a) => (
            <div
              key={a._id}
              className="overflow-hidden rounded-xl border border-blue-100 shadow-lg backdrop-blur-sm transition-all duration-300 cursor-pointer bg-white/70 dark:bg-gray-800/70 dark:border-blue-800 group hover:shadow-xl hover:-translate-y-1"
              onClick={() => navigate(`/gallery/${a._id}`)}
            >
              <img
                src={a.coverImage}
                alt={a.title}
                className="object-cover w-full h-40 transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Latest Members */}
      <div className="px-4 py-16 mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-800 dark:text-white">Latest Members</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">Welcome our newest community members</p>
        </div>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-10">
          {members.map((m) => (
            <div key={m._id} className="relative group">
              <div className="p-3 rounded-2xl border border-blue-100 backdrop-blur-sm transition-all duration-300 bg-white/70 dark:bg-gray-800/70 dark:border-blue-800 hover:shadow-xl">
                <img
                  src={m.profilePicture}
                  alt={m.name}
                  className="object-cover w-full rounded-xl transition-transform duration-300 aspect-square group-hover:scale-105"
                />
                <div className="flex absolute inset-0 justify-center items-end p-2 text-xs text-white rounded-2xl opacity-0 backdrop-blur-sm transition-opacity duration-300 bg-blue-900/80 group-hover:opacity-100">
                  <span className="px-3 py-1 font-semibold text-center bg-blue-600 rounded-full">
                    {m.name}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
