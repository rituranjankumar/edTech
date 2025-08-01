const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

//auth
exports.auth = async (req, res, next) => {
    try {
        //get token
        const token = req.cookies.token || req.body.token || (req.headers.authorization && req.headers.authorization.split(" ")[1]);
        console.log("Received Token:", token);

        // if token is missing return res
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "token not found or expired"
            });
        }
        try {
            //verify token
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            //  console.log(payload);
            req.user = payload;
        }
        catch (err) {
            console.log("error while verfying token ->", err);

            if (err.name === "TokenExpiredError") {
                return res.status(401).json({ success: false, message: "Session expired. Please login again." });
            }

            return res.status(401).json({
                success: false,
                message: "invalid token"
            });
        }
        next();
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "  something went wrong while validating the token"
        });
    }
}

//isSTUDENT
exports.isStudent = async (req, res, next) => {

    try {
        const role = req.user.accountType;
        if (role !== "Student") {
            return res.status(401).json({
                success: false,
                message: " This is a protected route for the Student "
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "  role cannot be verified "
        });
    }
}

//is instructor
exports.isInstructor = async (req, res, next) => {

    try {
        const role = req.user.accountType;
        if (role !== "Instructor") {
            return res.status(401).json({
                success: false,
                message: " This is a protected route for the Instructor "
            });
        }

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        if (!user.approved) {
            return res.status(403).json({
                success: false,
                message: "Instructor account is not yet approved by admin",
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "  role cannot be verified "
        });
    }
}
//is admin
exports.isAdmin = async (req, res, next) => {

    try {
        const role = req.user.accountType;
        if (role !== "Admin") {
            return res.status(401).json({
                success: false,
                message: " This is a protected route for the Admin "
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "  role cannot be verified "
        });
    }
}