const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const schoolService = require("../services/schoolService");

exports.login = async function (req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const accessToken = jwt.sign(
            { sub: user._id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "24h" }
        );
         

        const school = await schoolService.getAll();
        let schoolName = null;
        if (school.length > 0) {
            schoolName = school[0].name;
        }
        
        res.cookie('accessToken',accessToken, { expiresIn:Date.now() + 1000 * 60 * 60 * 24 });

        res.json({ schoolName, message: "Login Successful" , accessToken});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" ,error});
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
