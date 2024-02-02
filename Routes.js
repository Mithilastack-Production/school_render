const passport = require("./middleware/authMiddleware");
// Login controller imports
const loginController = require("./controllers/loginController");
// All other controllers imports
const aboutController = require("./controllers/aboutController");
const achievementController = require("./controllers/achievementController");
const activityController = require("./controllers/activityController"); // Adjust the path based on your file structure
const admissionButtonController = require("./controllers/admissionButtonController");
const admissionRequestController = require("./controllers/admissionRequestController");
const blogController = require("./controllers/blogController");
const campusNewsController = require("./controllers/campusNewsController");
const contactController = require("./controllers/contactController");
const facilityController = require("./controllers/facilityController");
const heroController = require("./controllers/heroController"); 
const imageGalleryController = require("./controllers/imageGalleryController");
const mediaCoverageController = require("./controllers/mediaCoverageController");
const messageController = require("./controllers/messageController");
const noticeItemController = require("./controllers/noticeItemController");
const parentTestimonialController = require("./controllers/parentTestimonialsController");
const schoolController = require("./controllers/schoolController");
const socialMediaController = require("./controllers/socialMediaController");
const studentBirthdayController = require("./controllers/studentBirthdayController");
const teacherBirthdayController = require("./controllers/teacherBirthdayController");
const topperController = require("./controllers/topperController");
const VideoGalleryController = require("./controllers/videoGalleryController");


exports.routes = (app) => {
    // Login Routes
    app.post("/api/login", loginController.login);
    app.post("/api/register", loginController.register);

    
    // About Routes
    app.get("/api/about", aboutController.getAll);
    app.post("/api/about",passport.authenticate("jwt", { session: false }), aboutController.create);
    app.put("/api/about/:id",passport.authenticate("jwt", { session: false }), aboutController.update);
    app.delete("/api/about/:id",passport.authenticate("jwt", { session: false }), aboutController.delete);
    // Achievement Routes
    app.get("/api/achievements", achievementController.getAll);
    app.post("/api/achievements",passport.authenticate("jwt", { session: false }), achievementController.create);
    app.put("/api/achievements/:id",passport.authenticate("jwt", { session: false }), achievementController.update);
    app.delete("/api/achievements/:id",passport.authenticate("jwt", { session: false }), achievementController.delete);
    // Activity Routes
    app.get("/api/activities", activityController.getAll);
    app.post("/api/activities",passport.authenticate("jwt", { session: false }), activityController.create);
    app.put("/api/activities/:id",passport.authenticate("jwt", { session: false }), activityController.update);
    app.delete("/api/activities/:id",passport.authenticate("jwt", { session: false }), activityController.delete);
    // Admission Button Routes
    app.get("/api/admissionButtons", admissionButtonController.getAll);
    app.post("/api/admissionButtons",passport.authenticate("jwt", { session: false }), admissionButtonController.create);
    app.put("/api/admissionButtons/:id",passport.authenticate("jwt", { session: false }), admissionButtonController.update);
    app.delete("/api/admissionButtons/:id",passport.authenticate("jwt", { session: false }), admissionButtonController.delete);
    // Admission request Routes
    app.get("/api/admissionRequest", admissionRequestController.getAll);
    app.post("/api/admissionRequest",passport.authenticate("jwt", { session: false }), admissionRequestController.create);
    app.put("/api/admissionRequest/:id",passport.authenticate("jwt", { session: false }), admissionRequestController.update);
    app.delete("/api/admissionRequest/:id", passport.authenticate("jwt", { session: false }),admissionRequestController.delete);
    // Blog Routes
    app.get("/api/blog", blogController.getAll);
    app.post("/api/blog",passport.authenticate("jwt", { session: false }), blogController.create);
    app.put("/api/blog/:id",passport.authenticate("jwt", { session: false }), blogController.update);
    app.delete("/api/blog/:id",passport.authenticate("jwt", { session: false }), blogController.delete);
    // Campus News Models
    app.get("/api/campusNews", campusNewsController.getAll);
    app.post("/api/campusNews",passport.authenticate("jwt", { session: false }), campusNewsController.create);
    app.put("/api/campusNews/:id",passport.authenticate("jwt", { session: false }), campusNewsController.update);
    app.delete("/api/campusNews/:id",passport.authenticate("jwt", { session: false }), campusNewsController.delete);
    // Contact Models
    app.get("/api/contact", contactController.getAll);
    app.post("/api/contact",passport.authenticate("jwt", { session: false }), contactController.create);
    app.put("/api/contact/:id",passport.authenticate("jwt", { session: false }), contactController.update);
    app.delete("/api/contact/:id",passport.authenticate("jwt", { session: false }), contactController.delete);
    // Facility Routes
    app.get("/api/facilities", facilityController.getAll);
    app.post("/api/facilities",passport.authenticate("jwt", { session: false }), facilityController.create);
    app.put("/api/facilities/:id", passport.authenticate("jwt", { session: false }),facilityController.update);
    app.delete("/api/facilities/:id", passport.authenticate("jwt", { session: false }),facilityController.delete);
    // Hero Routes
    app.get("/api/hero", heroController.getAll);
    app.post("/api/hero", passport.authenticate("jwt", { session: false }),heroController.create);
    app.put("/api/hero/:id",passport.authenticate("jwt", { session: false }), heroController.update);
    app.delete("/api/hero/:id",passport.authenticate("jwt", { session: false }), heroController.delete);
    // Image Gallery Routes
    app.get("/api/imageGallery", imageGalleryController.getAll);
    app.post("/api/imageGallery",passport.authenticate("jwt", { session: false }), imageGalleryController.create);
    app.put("/api/imageGallery/:id",passport.authenticate("jwt", { session: false }), imageGalleryController.update);
    app.delete("/api/imageGallery/:id",passport.authenticate("jwt", { session: false }), imageGalleryController.delete);
    // Media Coverage Routes
    app.get("/api/mediaCoverage", mediaCoverageController.getAll);
    app.post("/api/mediaCoverage",passport.authenticate("jwt", { session: false }), mediaCoverageController.create);
    app.put("/api/mediaCoverage/:id",passport.authenticate("jwt", { session: false }), mediaCoverageController.update);
    app.delete("/api/mediaCoverage/:id",passport.authenticate("jwt", { session: false }), mediaCoverageController.delete);
    // Message Routes
    app.get("/api/messages", messageController.getAll);
    app.post("/api/messages",passport.authenticate("jwt", { session: false }), messageController.create);
    app.put("/api/messages/:id",passport.authenticate("jwt", { session: false }), messageController.update);
    app.delete("/api/messages/:id",passport.authenticate("jwt", { session: false }), messageController.delete);
    // Notice Items Routes
    app.get("/api/noticeItems", noticeItemController.getAll);
    app.post("/api/noticeItems",passport.authenticate("jwt", { session: false }), noticeItemController.create);
    app.put("/api/noticeItems/:id",passport.authenticate("jwt", { session: false }), noticeItemController.update);
    app.delete("/api/noticeItems/:id",passport.authenticate("jwt", { session: false }), noticeItemController.delete);
    // Parent Testimonial Routes
    app.get("/api/parentTestimonials", parentTestimonialController.getAll);
    app.post("/api/parentTestimonials",passport.authenticate("jwt", { session: false }), parentTestimonialController.create);
    app.put("/api/parentTestimonials/:id",passport.authenticate("jwt", { session: false }), parentTestimonialController.update);
    app.delete("/api/parentTestimonials/:id",passport.authenticate("jwt", { session: false }),parentTestimonialController.delete);
    // School Routes
    app.get("/api/schools", schoolController.getAll);
    app.post("/api/schools",passport.authenticate("jwt", { session: false }), schoolController.create);
    app.put("/api/schools/:id", passport.authenticate("jwt", { session: false }),schoolController.update);
    app.delete("/api/schools/:id",passport.authenticate("jwt", { session: false }), schoolController.delete);
    // Social Media Routes
    app.get("/api/socialMedia", socialMediaController.getAll);
    app.post("/api/socialMedia", passport.authenticate("jwt", { session: false }),socialMediaController.create);
    app.put("/api/socialMedia/:id",passport.authenticate("jwt", { session: false }), socialMediaController.update);
    app.delete("/api/socialMedia/:id",passport.authenticate("jwt", { session: false }), socialMediaController.delete);
    // Student Birthdays Route
    app.get("/api/studentBirthday", studentBirthdayController.getAll);
    app.post("/api/studentBirthday",passport.authenticate("jwt", { session: false }), studentBirthdayController.create);
    app.put("/api/studentBirthday/:id",passport.authenticate("jwt", { session: false }), studentBirthdayController.update);
    app.delete("/api/studentBirthday/:id",passport.authenticate("jwt", { session: false }), studentBirthdayController.delete);
    // Teacher Birthdays Route
    app.get("/api/teacherBirthday", teacherBirthdayController.getAll);
    app.post("/api/teacherBirthday",passport.authenticate("jwt", { session: false }), teacherBirthdayController.create);
    app.put("/api/teacherBirthday/:id",passport.authenticate("jwt", { session: false }), teacherBirthdayController.update);
    app.delete("/api/teacherBirthday/:id",passport.authenticate("jwt", { session: false }), teacherBirthdayController.delete);
    // Toppers Routes
    app.get("/api/topper", topperController.getAll);
    app.post("/api/topper",passport.authenticate("jwt", { session: false }), topperController.create);
    app.put("/api/topper/:section",passport.authenticate("jwt", { session: false }), topperController.update);
    app.delete("/api/topper/:section",passport.authenticate("jwt", { session: false }), topperController.delete);
    //  videoGallery Routes
    app.get("/api/videoGallery", VideoGalleryController.getAll);
    app.post("/api/videoGallery",passport.authenticate("jwt", { session: false }), VideoGalleryController.create);
    app.put("/api/videoGallery/:id",passport.authenticate("jwt", { session: false }), VideoGalleryController.update);
    app.delete("/api/videoGallery/:id",passport.authenticate("jwt", { session: false }), VideoGalleryController.delete);
};
  