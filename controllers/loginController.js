const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const schoolService = require("../services/schoolService");
const { constants } = require("../backendEnv");

exports.login = async function (req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const accessToken = jwt.sign(
            { sub: user._id },
            constants.ACCESS_TOKEN_SECRET,
            { expiresIn: "24h" }
        );

        const school = await schoolService.getAll();
        let schoolName = null;
        if (school.length > 0) {
            schoolName = school[0].name;
        }

        res.cookie(constants.TOKEN_VALUE, accessToken, {
            expiresIn: Date.now() + 1000 * 60 * 60 * 24,
        });

        res.json({ schoolName, message: "Login Successful", accessToken });
    } catch (error) {
        console.log(error); 
        res.status(500).json({ error: "Internal Server Error", error });
    }
};

exports.resetPassword = async function (req, res) {
    try {
        const { oldPassword, newPassword } = req.body;
        const user = req.user;
        if (!user || !(await user.comparePassword(oldPassword))) {
            return res.status(400).json({
                message: "Invalid credentials or old password is wrong",
            });
        }

        user.password = newPassword;
        user.save();

        const accessToken = jwt.sign(
            { sub: user._id },
            constants.ACCESS_TOKEN_SECRET,
            { expiresIn: "24h" }
        );

        res.cookie(constants.TOKEN_VALUE, accessToken, {
            expiresIn: Date.now() + 1000 * 60 * 60 * 24,
        });

        res.json({
            message: "Resend Password Successful",
            accessToken,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error", error });
    }
};

exports.register = async function (req, res) {
    try {
        const { email, password, Kartik } = req.body;
        if (
            Kartik !=
            "RandomKartik!QAZ@WSX#EDC$RFV%TGB^YHN&UJM*IK<(O>)P:?_{!@#$%^&*()zxchkjaheruimcnasriewcxfkashiecxznfkher3v5jsdahfciuysdfhciqweuyisdajciercewdshjf"
        ) {
            return res.status(200).json({ message: "Not Authentic Person" });
        }
        const user = new User({ email, password });
        await user.save();
        res.status(201).json({ message: "User registered successfully." });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
