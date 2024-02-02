import { useLocation } from "react-router-dom";

export default function useActive() {
    const location = useLocation();
    const path = location.pathname;
    switch (path) {
        case "/admin/social-links":
            return 0;
        case "/admin/school-details":
            return 1;
        case "/admin/hero-images":
            return 2;
        case "/admin/apply-quote":
            return 3;
        case "/admin/about-sections":
            return 4;
        case "/admin/notice-items":
            return 5;
        case "/admin/achievements":
            return 6;
        case "/admin/campus-news":
            return 7;
        case "/admin/management-messages":
            return 8;
        case "/admin/facilities":
            return 9;
        case "/admin/activities":
            return 10;
        case "/admin/image-Gallery":
            return 11;
        case "/admin/video-Gallery":
            return 12;
        case "/admin/parent-testimonials":
            return 13;
        case "/admin/media-coverage":
            return 14;
        case "/admin/toppers":
            return 15;
        case "/admin/student-birthdays":
            return 16;
        case "/admin/teacher-birthdays":
            return 17;
        case "/admin/blogs":
            return 18;
        case "/admin/Contact-us":
            return 19;
        case "/admin/apply-admissions":
            return 20;
        default:
            return undefined;
    }
}
