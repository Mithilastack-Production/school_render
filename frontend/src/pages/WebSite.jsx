import React, { useEffect, useState } from "react";
import { Suspense, lazy } from "react";
import { OuterComponent } from "../Components/CommonStyledComponent/CommonStyledComponent.js";
import Header from "../Components/WebSitePageComponent/Header.jsx";
import Logo from "../Components/WebSitePageComponent/Logo.jsx";
import Navbar from "../Components/WebSitePageComponent/Navbar.jsx";
import Home from "../Components/WebSitePageComponent/Home.jsx";
import {
    getAbout,
    getAchievements,
    getActivities,
    getAdmissionButtons,
    getBlogs,
    getCampusNews,
    getFacilities,
    getHeroes,
    getImageGallery,
    getMediaCoverage,
    getMessages,
    getNoticeItems,
    getParentTestimonials,
    getSchools,
    getSocialMedia,
    getStudentBirthdays,
    getTeacherBirthdays,
    getToppers,
    getVideoGallery,
} from "../http/index.js";
const MessageFromTopManagement = React.lazy(() =>
    import("../Components/WebSitePageComponent/MessageFromTopManagement.jsx")
);
const FacilitiesOrGallerysParentTestimonial = React.lazy(() =>
    import(
        "../Components/WebSitePageComponent/FacilitiesOrGallerysParentTestimonial.jsx"
    )
);
const Toppers = lazy(() =>
    import("../Components/WebSitePageComponent/Toppers.jsx")
);
const Blog = lazy(() => import("../Components/WebSitePageComponent/Blog.jsx"));
const Birthday = lazy(() =>
    import("../Components/WebSitePageComponent/Birthday.jsx")
);
const ContactUs = lazy(() =>
    import("../Components/WebSitePageComponent/ContactUs.jsx")
);
const Footer = lazy(() =>
    import("../Components/WebSitePageComponent/Footer.jsx")
);
const AboutUs = lazy(() =>
    import("../Components/WebSitePageComponent/AboutUs.jsx")
);
const Notice = lazy(() =>
    import("../Components/WebSitePageComponent/Notice.jsx")
);

const WebSite = () => {
    const [links, setLinks] = useState([]);

    const [school, setSchool] = useState({});

    const [heroImages, setHeroImages] = useState([]);

    const [admissionBtn, setAdmissionBtn] = useState({});

    const [abouts, setAbouts] = useState([]);

    const [noticeItem, setNoticeItem] = useState([]);

    const [achievement, setAchievement] = useState([]);

    const [campusNews, setCampusNews] = useState([]);

    const [messageFromTopManagement, setmessageFromTopManagement] = useState(
        []
    );

    const [facilities, setFacilities] = useState([]);

    const [activity, setActivity] = useState([]);

    const [imageGallery, setImageGallery] = useState([]);

    const [videoGallery, setVideoGallery] = useState([]);

    const [parentTestimonial, setParentTestimonial] = useState([]);

    const [mediaCoverage, setMediaCoverage] = useState([]);

    const [topper, setTopper] = useState([]);

    const [studentBirthday, setStudentBirthday] = useState([]);

    const [teacherBirthday, setTeacherBirthday] = useState([]);

    const [blogs, setBlogs] = useState([]);

    const [linksMessage, setLinksMessage] = useState();
    const [schoolMessage, setSchoolMessage] = useState(null);
    const [heroImagesMessage, setHeroImagesMessage] = useState(null);
    const [admissionBtnMessage, setAdmissionBtnMessage] = useState(null);
    const [aboutsMessage, setAboutsMessage] = useState(null);
    const [noticeItemMessage, setNoticeItemMessage] = useState(null);
    const [achievementMessage, setAchievementMessage] = useState(null);
    const [campusNewsMessage, setCampusNewsMessage] = useState(null);
    const [
        messageFromTopManagementMessage,
        setMessageFromTopManagementMessage,
    ] = useState(null);
    const [facilitiesMessage, setFacilitiesMessage] = useState(null);
    const [imageGalleryMessage, setImageGalleryMessage] = useState(null);
    const [videoGalleryMessage, setVideoGalleryMessage] = useState(null);
    const [parentTestimonialMessage, setParentTestimonialMessage] =
        useState(null);
    const [mediaCoverageMessage, setMediaCoverageMessage] = useState(null);
    const [topperMessage, setTopperMessage] = useState(null);
    const [studentBirthdayMessage, setStudentBirthdayMessage] = useState(null);
    const [teacherBirthdayMessage, setTeacherBirthdayMessage] = useState(null);
    const [blogsMessage, setBlogsMessage] = useState(null);
    const [activityMessage, setactivityMessage] = useState(null);

    const getAboutPart = () => {
        const about = abouts.filter(
            (about) => about.heading.toLowerCase() === "about us"
        );
        if (about.length) {
            return about[0].message?.split(".")[0];
        }
        return null;
    };

    useEffect(() => {
        (async function () {
            try {
                const res = await getSocialMedia();
                if (res.data.length === 0) {
                    setLinksMessage("No Social Media Available");
                }
                setLinks(res.data);
            } catch (err) {
                console.log(err);
                setLinksMessage("Failed to get social media");
            }
        })();
        (async function () {
            try {
                const res = await getHeroes();
                const images = res.data.map((item) => item.src);
                setHeroImages(images);
            } catch (err) {
                console.log(err);
                setHeroImagesMessage("Failed to get hero images");
            }
        })();
        (async function () {
            try {
                const res = await getAdmissionButtons();
                if (res.data.length) {
                    setAdmissionBtn(res.data[0]);
                } else {
                    setAdmissionBtnMessage("Admission Message Not Added");
                }
            } catch (err) {
                console.log(err);
                setAdmissionBtnMessage("Failed to get Admission Message");
            }
        })();
        (async function () {
            try {
                const res = await getAbout();
                if (res.data.length === 0) {
                    setAboutsMessage("No Message for this section");
                }
                setAbouts(res.data);
            } catch (err) {
                console.log(err);
                setAboutsMessage("Failed to get About Us");
            }
        })();
        (async function () {
            try {
                const res = await getAchievements();
                if (res.data.length === 0) {
                    setAchievementMessage("Achievement Not Available");
                }
                setAchievement(res.data);
            } catch (err) {
                console.log(err);
                setAchievementMessage("Failed to get Achievement");
            }
        })();
        (async function () {
            try {
                const res = await getCampusNews();
                if (res.data.length === 0) {
                    setCampusNewsMessage("Campus News Not Available");
                }
                setCampusNews(res.data);
            } catch (err) {
                console.log(err);
                setAchievementMessage("Failed to get Campus news");
            }
        })();
        (async function () {
            try {
                const res = await getSchools();
                if (res.data.length) {
                    setSchool(res.data[0]);
                } else {
                    setSchoolMessage("School information not available");
                }
            } catch (err) {
                console.log(err);
                setSchoolMessage("Failed to get School details");
            }
        })();
        (async function () {
            try {
                const res = await getNoticeItems();
                setNoticeItem(res.data);
                if (res.data.length === 0) {
                    setNoticeItemMessage("No Notice items available");
                }
            } catch (err) {
                console.log(err);
                setNoticeItemMessage("Failed to get Notices");
            }
        })();
        (async function () {
            try {
                const res = await getMessages();
                setmessageFromTopManagement(res.data);
                if (res.data.length === 0) {
                    setMessageFromTopManagementMessage("No Messages Available");
                }
            } catch (err) {
                console.log(err);
                setMessageFromTopManagementMessage(
                    "Failed to get Top Management"
                );
            }
        })();
        (async function () {
            try {
                const res = await getFacilities();
                setFacilities(res.data);
                if (res.data.length === 0) {
                    setFacilitiesMessage("Facilities Not Available");
                }
            } catch (err) {
                console.log(err);
                setFacilitiesMessage("Failed to get Facility");
            }
        })();
        (async function () {
            try {
                const res = await getActivities();
                if (res.data.length === 0) {
                    setactivityMessage("Activities Not Available");
                }
                setActivity(res.data);
            } catch (err) {
                console.log(err);
                setactivityMessage("Failed to get Activity");
            }
        })();
        (async function () {
            try {
                const res = await getImageGallery();
                if (res.data.length === 0) {
                    setImageGalleryMessage("No Image Available");
                }
                setImageGallery(res.data);
            } catch (err) {
                console.log(err);
                setImageGalleryMessage("Failed to get Image Gallery");
            }
        })();
        (async function () {
            try {
                const res = await getMediaCoverage();
                if (res.data.length === 0) {
                    setMediaCoverageMessage("No Media Coverage Available");
                }
                setMediaCoverage(res.data);
            } catch (err) {
                console.log(err);
                setMediaCoverageMessage("Failed to get media coverage");
            }
        })();
        (async function () {
            try {
                const res = await getParentTestimonials();
                if (res.data.length === 0) {
                    setParentTestimonialMessage(
                        "No Parent Testimonials Available"
                    );
                }
                setParentTestimonial(res.data);
            } catch (err) {
                console.log(err);
                setParentTestimonialMessage(
                    "Failed to get parent testimonials"
                );
            }
        })();
        (async function () {
            try {
                const res = await getVideoGallery();
                if (res.data.length === 0) {
                    setVideoGalleryMessage("No Videos Available");
                }
                setVideoGallery(res.data);
            } catch (err) {
                console.log(err);
                setVideoGalleryMessage("Failed to get video gallery");
            }
        })();
        (async function () {
            try {
                const res = await getBlogs();
                if (res.data.length === 0) {
                    setBlogsMessage("Blogs Not Available");
                }
                setBlogs(res.data);
            } catch (err) {
                console.log(err);
                setBlogsMessage("Failed to get Blogs");
            }
        })();
        (async function () {
            try {
                const res = await getStudentBirthdays();
                setStudentBirthday(res.data);
                if (res.data.length === 0) {
                    setStudentBirthdayMessage("No birthdays today");
                }
            } catch (err) {
                console.log(err);
                setStudentBirthdayMessage("Failed to get Student Birthdays");
            }
        })();
        (async function () {
            try {
                const res = await getTeacherBirthdays();
                setTeacherBirthday(res.data);
                if (res.data.length === 0) {
                    setTeacherBirthdayMessage("No birthdays today");
                }
            } catch (err) {
                console.log(err);
                setTeacherBirthdayMessage("Failed to get Teacher Birthdays");
            }
        })();
        (async function () {
            try {
                const res = await getToppers();
                setTopper(res.data);
                if (res.data.length === 0) {
                    setTeacherBirthdayMessage("No Topper");
                }
            } catch (err) {
                console.log(err);
                setTopperMessage("Failed to get toppers list");
            }
        })();
    }, []);

    return (
        <>
            <OuterComponent>
                <Header links={links} linksMessage={linksMessage} />
                <Logo school={school} schoolMessage={schoolMessage} />
                <Navbar />
                <Home
                    school={school}
                    heroImages={heroImages}
                    admissionBtn={admissionBtn}
                    schoolMessage={schoolMessage}
                    heroImagesMessage={heroImagesMessage}
                    admissionBtnMessage={admissionBtnMessage}
                />
                <Suspense fallback={<div>Loading...</div>}>
                    <AboutUs abouts={abouts} aboutsMessage={aboutsMessage} />
                    <Notice
                        noticeItem={noticeItem}
                        achievement={achievement}
                        campusNews={campusNews}
                        noticeItemMessage={noticeItemMessage}
                        achievementMessage={achievementMessage}
                        campusNewsMessage={campusNewsMessage}
                    />
                    <MessageFromTopManagement
                        messageFromTopManagement={messageFromTopManagement}
                        messageFromTopManagementMessage={
                            messageFromTopManagementMessage
                        }
                    />

                    <Toppers topper={topper} topperMessage={topperMessage} />

                    <Birthday
                        studentBirthday={studentBirthday}
                        teacherBirthday={teacherBirthday}
                        studentBirthdayMessage={studentBirthdayMessage}
                        teacherBirthdayMessage={teacherBirthdayMessage}
                    />

                    <Blog blogs={blogs} blogsMessage={blogsMessage} />

                    <FacilitiesOrGallerysParentTestimonial
                        showData={facilities}
                        heading={"FACILITIES"}
                        id={"Facilities"}
                        message={facilitiesMessage}
                        color="aliceblue"
                    />
                    <FacilitiesOrGallerysParentTestimonial
                        showData={imageGallery}
                        heading={"IMAGE GALLERY"}
                        id={"Gallery"}
                        message={imageGalleryMessage}
                        color="gainsboro"
                    />
                    <FacilitiesOrGallerysParentTestimonial
                        showData={videoGallery}
                        heading={"VIDEO GALLERY"}
                        id={"Gallery"}
                        isVideo={true}
                        message={videoGalleryMessage}
                        color="honeydew"
                    />
                    <FacilitiesOrGallerysParentTestimonial
                        showData={parentTestimonial}
                        heading={"PARENTS TESTIMONIALS"}
                        isVideo={true}
                        message={parentTestimonialMessage}
                        color="khaki"
                    />
                    <FacilitiesOrGallerysParentTestimonial
                        showData={activity}
                        heading={"ACTIVITIES"}
                        id={"Activities"}
                        isVideo={false}
                        message={activityMessage}
                        color="teal"
                    />
                    <FacilitiesOrGallerysParentTestimonial
                        showData={mediaCoverage}
                        heading={"MEDIA COVERAGE"}
                        message={mediaCoverageMessage}
                        color="mintcream"
                    />
                    <ContactUs school={school} schoolMessage={schoolMessage} />
                    <Footer
                        school={school}
                        schoolMessage={schoolMessage}
                        about={getAboutPart()}
                    />
                </Suspense>
            </OuterComponent>
        </>
    );
};

export default WebSite;

// pop-up at center
// admin and other page createion and routing
// Image load optimization
