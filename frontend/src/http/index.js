import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setFalse, setSchoolName } from "../AuthSlice";
import Cookies from "js-cookie";
import { TOKEN_VALUE, backendURL } from "../fronendEnv";

const api = axios.create({
    baseURL: backendURL,
    withCredentials: true,
    headers: {
        "Content-type": "application/json", // Set default content-type to handle file uploads
        Accept: "application/json",
    },
});

// Login Routes
export const login = (data) => api.post("/api/login", data);
export const resetPassword = (data) => api.post("/api/reset-password", data);
export const register = (data) => api.post("/api/register", data);

// About Routes
export const getAbout = () => api.get("/api/about");
export const createAbout = (data) => api.post("/api/about", data);
export const updateAbout = (id, data) => api.put(`/api/about/${id}`, data);
export const deleteAbout = (id) => api.delete(`/api/about/${id}`);

// Achievement Routes
export const getAchievements = () => api.get("/api/achievements");
export const createAchievement = (data) => api.post("/api/achievements", data);
export const updateAchievement = (id, data) =>
    api.put(`/api/achievements/${id}`, data);
export const deleteAchievement = (id) => api.delete(`/api/achievements/${id}`);

// Activity Routes
export const getActivities = () => api.get("/api/activities");
export const createActivity = (data) => api.post("/api/activities", data);
export const updateActivity = (id, data) =>
    api.put(`/api/activities/${id}`, data);
export const deleteActivity = (id) => api.delete(`/api/activities/${id}`);

// Admission Button Routes
export const getAdmissionButtons = () => api.get("/api/admissionButtons");
export const createAdmissionButton = (data) =>
    api.post("/api/admissionButtons", data);
export const updateAdmissionButton = (id, data) =>
    api.put(`/api/admissionButtons/${id}`, data);
export const deleteAdmissionButton = (id) =>
    api.delete(`/api/admissionButtons/${id}`);

// Admission Request Routes
export const getAdmissionRequests = () => api.get("/api/admissionRequest");
export const createAdmissionRequest = (data) =>
    api.post("/api/admissionRequest", data);
export const updateAdmissionRequest = (id, data) =>
    api.put(`/api/admissionRequest/${id}`, data);
export const deleteAdmissionRequest = (id) =>
    api.delete(`/api/admissionRequest/${id}`);

// Blog Routes
export const getBlogs = () => api.get("/api/blog");
export const createBlog = (data) => api.post("/api/blog", data);
export const updateBlog = (id, data) => api.put(`/api/blog/${id}`, data);
export const deleteBlog = (id) => api.delete(`/api/blog/${id}`);

// Campus News Routes
export const getCampusNews = () => api.get("/api/campusNews");
export const createCampusNews = (data) => api.post("/api/campusNews", data);
export const updateCampusNews = (id, data) =>
    api.put(`/api/campusNews/${id}`, data);
export const deleteCampusNews = (id) => api.delete(`/api/campusNews/${id}`);

// Contact Routes
export const getContacts = () => api.get("/api/contact");
export const createContact = (data) => api.post("/api/contact", data);
export const updateContact = (id, data) => api.put(`/api/contact/${id}`, data);
export const deleteContact = (id) => api.delete(`/api/contact/${id}`);

// Facility Routes
export const getFacilities = () => api.get("/api/facilities");
export const createFacility = (data) => api.post("/api/facilities", data);
export const updateFacility = (id, data) =>
    api.put(`/api/facilities/${id}`, data);
export const deleteFacility = (id) => api.delete(`/api/facilities/${id}`);

// Hero Routes
export const getHeroes = () => api.get("/api/hero");
export const createHero = (data) => api.post("/api/hero", data);
export const updateHero = (id, data) => api.put(`/api/hero/${id}`, data);
export const deleteHero = (id) => api.delete(`/api/hero/${id}`);

// Image Gallery Routes
export const getImageGallery = () => api.get("/api/imageGallery");
export const createImageGallery = (data) => api.post("/api/imageGallery", data);
export const updateImageGallery = (id, data) =>
    api.put(`/api/imageGallery/${id}`, data);
export const deleteImageGallery = (id) => api.delete(`/api/imageGallery/${id}`);

// Media Coverage Routes
export const getMediaCoverage = () => api.get("/api/mediaCoverage");
export const createMediaCoverage = (data) =>
    api.post("/api/mediaCoverage", data);
export const updateMediaCoverage = (id, data) =>
    api.put(`/api/mediaCoverage/${id}`, data);
export const deleteMediaCoverage = (id) =>
    api.delete(`/api/mediaCoverage/${id}`);

// Message Routes
export const getMessages = () => api.get("/api/messages");
export const createMessage = (data) => api.post("/api/messages", data);
export const updateMessage = (id, data) => api.put(`/api/messages/${id}`, data);
export const deleteMessage = (id) => api.delete(`/api/messages/${id}`);

// Notice Items Routes
export const getNoticeItems = () => api.get("/api/noticeItems");
export const createNoticeItem = (data) => api.post("/api/noticeItems", data);
export const updateNoticeItem = (id, data) =>
    api.put(`/api/noticeItems/${id}`, data);
export const deleteNoticeItem = (id) => api.delete(`/api/noticeItems/${id}`);

// Parent Testimonial Routes
export const getParentTestimonials = () => api.get("/api/parentTestimonials");
export const createParentTestimonial = (data) =>
    api.post("/api/parentTestimonials", data);
export const updateParentTestimonial = (id, data) =>
    api.put(`/api/parentTestimonials/${id}`, data);
export const deleteParentTestimonial = (id) =>
    api.delete(`/api/parentTestimonials/${id}`);

// School Routes
export const getSchools = () => api.get("/api/schools");
export const getSchoolById = (id) => api.get(`/api/schools/${id}`);
export const createSchool = (data) => api.post("/api/schools", data);
export const updateSchool = (id, data) => api.put(`/api/schools/${id}`, data);
export const deleteSchool = (id) => api.delete(`/api/schools/${id}`);

// Social Media Routes
export const getSocialMedia = () => api.get("/api/socialMedia");
export const getSocialMediaById = (id) => api.get(`/api/socialMedia/${id}`);
export const createSocialMedia = (data) => api.post("/api/socialMedia", data);
export const updateSocialMedia = (id, data) =>
    api.put(`/api/socialMedia/${id}`, data);
export const deleteSocialMedia = (id) => api.delete(`/api/socialMedia/${id}`);

// Student Birthday Routes
export const getStudentBirthdaysAdm = () => api.get("/api/studentBirthdayAdm");
export const getStudentBirthdays = () => api.get("/api/studentBirthday");
export const createStudentBirthday = (data) =>
    api.post("/api/studentBirthday", data);
export const updateStudentBirthday = (id, data) =>
    api.put(`/api/studentBirthday/${id}`, data);
export const deleteStudentBirthday = (id) =>
    api.delete(`/api/studentBirthday/${id}`);

// Teacher Birthday Routes
export const getTeacherBirthdaysAdm = () => api.get("/api/teacherBirthdayAdm");
export const getTeacherBirthdays = () => api.get("/api/teacherBirthday");
export const createTeacherBirthday = (data) =>
    api.post("/api/teacherBirthday", data);
export const updateTeacherBirthday = (id, data) =>
    api.put(`/api/teacherBirthday/${id}`, data);
export const deleteTeacherBirthday = (id) =>
    api.delete(`/api/teacherBirthday/${id}`);

// Topper Routes
export const getToppers = () => api.get("/api/topper");
export const createTopper = (data) => api.post("/api/topper", data);
export const updateTopper = (section, data) =>
    api.put(`/api/topper/${section}`, data);
export const deleteTopper = (id, data) => api.post(`/api/topper/${id}`, data);

// Video Gallery Routes
export const getVideoGallery = () => api.get("/api/videoGallery");
export const createVideoGallery = (data) => api.post("/api/videoGallery", data);
export const updateVideoGallery = (id, data) =>
    api.put(`/api/videoGallery/${id}`, data);
export const deleteVideoGallery = (id) => api.delete(`/api/videoGallery/${id}`);

api.interceptors.request.use((config) => {
    const token = Cookies.get(TOKEN_VALUE);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (config) => {
        return config;
    },
    (error) => {
        if (error.response?.status === 401) {
            Cookies.remove(TOKEN_VALUE);
            window.location.reload();
        }
    }
);

export default api;
