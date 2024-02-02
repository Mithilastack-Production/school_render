// packages imports
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const password = require("./middleware/authMiddleware");
const { routes } = require("./Routes");

// database imports
const DbConnect = require("./DatabaseConnection");
DbConnect();

const app = express();
const port = process.env.PORT || 4000;

// Middlewares
const allowedOrigins = [
    "https://schoolmithilastack.azurewebsites.net/",
    // "https://www.unifiedglobalschool.com"
];
const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
};
app.use(cookieParser());
app.use(cors(corsOptions));

app.use(bodyParser.json({ limit: "8mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(password.initialize());
app.use("/storage", express.static("storage"));
app.use(express.static(path.resolve(__dirname, "frontend/build")));

routes(app);

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend/build", "index.html"));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
