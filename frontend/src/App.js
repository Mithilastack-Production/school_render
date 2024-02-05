import React from "react";
import WebSite from "./pages/WebSite.jsx";
import { ToastContainer } from "react-toastify";
import { createGlobalStyle } from "styled-components";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import SocialMedia from "./Components/AdminPageComponent/SocialMedia.jsx";
import School from "./Components/AdminPageComponent/School.jsx";
import Hero from "./Components/AdminPageComponent/Hero.jsx";
import About from "./Components/AdminPageComponent/About.jsx";
import NoticeItem from "./Components/AdminPageComponent/NoticeItem.jsx";
import Achievement from "./Components/AdminPageComponent/Achievement.jsx";
import CampusNews from "./Components/AdminPageComponent/CampusNews.jsx";
import Message from "./Components/AdminPageComponent/Message.jsx";
import Facility from "./Components/AdminPageComponent/Facility.jsx";
import Activity from "./Components/AdminPageComponent/Activity.jsx";
import ImageGallery from "./Components/AdminPageComponent/ImageGallery.jsx";
import VideoGallery from "./Components/AdminPageComponent/VideoGallery.jsx";
import ParentTestimonial from "./Components/AdminPageComponent/ParentTestimonial.jsx";
import MediaCoverage from "./Components/AdminPageComponent/MediaCoverage.jsx";
import StudentBirthday from "./Components/AdminPageComponent/StudentBirthday.jsx";
import TeacherBirthday from "./Components/AdminPageComponent/TeacherBirthday.jsx";
import Contact from "./Components/AdminPageComponent/Contact.jsx";
import AdmissionRequest from "./Components/AdminPageComponent/AdmissionRequest.jsx";
import AdmissionButton from "./Components/AdminPageComponent/AdmissionButton.jsx";
import Admin from "./Components/AdminPageComponent/Admin.jsx";
import Blog from "./Components/AdminPageComponent/Blog.jsx";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import useActive from "./hooks/useActive.js";
import TopperAdmin from "./Components/AdminPageComponent/Topper.jsx";
import { TOKEN_VALUE } from "./fronendEnv.js";
import ResetPassword from "./Components/AdminPageComponent/ResetPassword.jsx";

const adminRoutes = [
    { path: "social-links", component: <SocialMedia /> },
    { path: "school-details", component: <School /> },
    { path: "hero-images", component: <Hero /> },
    { path: "apply-quote", component: <AdmissionButton /> },
    { path: "about-sections", component: <About /> },
    { path: "notice-items", component: <NoticeItem /> },
    { path: "achievements", component: <Achievement /> },
    { path: "campus-news", component: <CampusNews /> },
    { path: "management-messages", component: <Message /> },
    { path: "facilities", component: <Facility /> },
    { path: "activities", component: <Activity /> },
    { path: "image-Gallery", component: <ImageGallery /> },
    { path: "video-Gallery", component: <VideoGallery /> },
    { path: "parent-testimonials", component: <ParentTestimonial /> },
    { path: "media-coverage", component: <MediaCoverage /> },
    { path: "toppers", component: <TopperAdmin /> },
    { path: "student-birthdays", component: <StudentBirthday /> },
    { path: "teacher-birthdays", component: <TeacherBirthday /> },
    { path: "blogs", component: <Blog /> },
    { path: "Contact-us", component: <Contact /> },
    { path: "apply-admissions", component: <AdmissionRequest /> },
    { path: "reset-password", component: <ResetPassword /> },
];

const App = () => {
    return (
        <>
            <BrowserRouter>
                <GlobalStyle />
                <ToastContainer />
                <Routes>
                    <Route path="/" element={<WebSite />} />
                    <Route
                        path="/login"
                        element={<PublicRoute element={<LoginPage />} />}
                    />
                    <Route path="admin">
                        {adminRoutes.map(({ path, component }) => (
                            <Route
                                key={path}
                                path={path}
                                element={<PrivateRoute element={component} />}
                            />
                        ))}
                        <Route path="*" element={<Navigate to="/login" />} />
                        <Route index element={<Navigate to="/login" />} />
                    </Route>
                    <Route path="/*" element={<Navigate to="/" />} replace />
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;

const PrivateRoute = ({ element }) => {
    const auth = useSelector((state) => state.auth.isAuthenticated);
    const cookie = Cookies.get(TOKEN_VALUE);
    const isAuthenticated = auth || cookie;
    const active = useActive();
    return isAuthenticated ? (
        <Admin active={active}> {element} </Admin>
    ) : (
        <Navigate to="/login" />
    );
};

const PublicRoute = ({ element }) => {
    const auth = useSelector((state) => state.auth.isAuthenticated);
    const cookie = Cookies.get(TOKEN_VALUE);
    const isAuthenticated = auth || cookie;
    return isAuthenticated ? <Navigate to="/admin/social-links" /> : element;
};

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
`;
