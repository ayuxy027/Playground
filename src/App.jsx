import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home_main.jsx";
import About from "./pages/About.jsx";
import StudentLogin from "./pages/StudentLogin.jsx";
import StudentSignup from "./pages/StudentSignup.jsx";
import AlumniLogin from "./pages/AlumniLogin.jsx";
import AlumniSignup from "./pages/AlumniSignup.jsx";
import { Contactus } from "./pages/Contactus.jsx";
import Header from "./components/Header.jsx";
import Jobs from "./pages/Jobs.jsx";
import Footer from "./components/Footer.jsx";
import AdminLayout from "./pages/AdminLayout.jsx";
import AdminJobs from "./pages/AdminJobs.jsx";
import AdminAddEvent from "./pages/AdminAddEvent.jsx";
import Event from "./pages/Event.jsx";
import Contact from "./pages/Contact.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Student_dashboard from "./pages/Student_dashboard.jsx";
import NotFound from "./pages/NotFound.jsx";
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute";
import DisplayAlumni from "./pages/AlumniList.jsx";
import FetchAlumni from "./pages/JobAlumni.jsx";
import CreateGallery from "./pages/CreateGallery.jsx";
import UpdateGallery from "./pages/UpdateGallery.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Gallery from "./pages/Gallery.jsx";
import OnlyAlumniPrivateRoute from "./components/OnlyAlumniPrivateRoute.jsx";
import AdminGallery from "./pages/AdminGallery.jsx";
import GallerySection from "./pages/GallerySection.jsx";
import MediaGallery from "./pages/MediaGallery.jsx";
import CreateSuccessStory from "./pages/CreateSuccessStory.jsx";
import SuccessStories from "./pages/SuccessStories.jsx";
import PostDetails from "./pages/PostDetails.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/alumni-login" element={<AlumniLogin />} />
        <Route path="/student-signup" element={<StudentSignup />} />
        <Route path="/alumni-signup" element={<AlumniSignup />} />
        <Route path="/about" element={<About />} />

        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Student_dashboard />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/gallery/:albumId" element={<GallerySection />} />
          <Route path="/officebearer/:companyname" element={<FetchAlumni />} />
          <Route path="/event" element={<Event />} />
          <Route path="/contactus" element={<Contactus />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/officebearer" element={<DisplayAlumni />} />
          <Route path="/media-gallery" element={<MediaGallery />} />
          <Route path="/success-stories/create" element={<CreateSuccessStory />} />
          <Route path="/success-stories" element={<SuccessStories />} />
          <Route path="/post/:slug" element={<PostDetails />} />
        </Route>
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="insertjobs" element={<AdminJobs />} />
            <Route path="create-post" element={<CreateGallery />} />
            <Route path="update-post/:postId" element={<UpdateGallery />} />
            <Route path="addevent" element={<AdminAddEvent />} />
            <Route path="gallery" element={<AdminGallery />} />
          </Route>
        </Route>
        <Route element={<OnlyAlumniPrivateRoute />}>
          <Route path="/alumni" element={<AdminLayout />}>
            <Route path="insertjobs" element={<AdminJobs />} />
            <Route path="create-post" element={<CreateGallery />} />
            <Route path="update-post/:postId" element={<UpdateGallery />} />
          </Route>
        </Route>

        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
