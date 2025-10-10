
const otpGenerator = require("otp-generator");
const User = require("../models/User");
const Otp = require("../models/Otp");
const validator = require("validator");
const bcrypt = require("bcrypt");
const Profile = require("../models/Profile")
const jwt = require("jsonwebtoken");
const { passwordUpdated } = require("../mail/templates/passwordUpdate");
 
const mailSender = require("../utils/mailSender");
require("dotenv").config();

//send otp
 exports.sendOtp = async (req, res) => {
    try {
        const { email } = req.body;

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format.",
            });
        }
        //if user already exists
        const checkUserPresent = await User.findOne({email});
        if (checkUserPresent) {
            return res.status(401).json({
                success: false,
                message: "User already registered"
            });
        }

        //check if otp is unique or not and generating the otp untill a unique otp is not generated

        let otp;
        let isUnique = false;

        while (!isUnique) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                specialChars: false,
                lowerCaseAlphabets: false,
            });

            const existingotp = await Otp.findOne({otp:otp});
            if (!existingotp) {
                isUnique = true;
            }

        }
        console.log("OTP generated ->", otp);

        //otp entry in db
        //before entriing the otp in db the pre middleware will send the otp to the email provided
        const otpBody = await Otp.create({ email, otp });

        console.log("otp body saved in db-> ", otpBody);
        // return response

        res.status(200).json({
            success: true,
            message: `OTP sent successfully `
        });

    }
    catch (error) {

        console.log("error in creating otp ", error)
        return res.status(500).json({
            success: false,
            message:"error in creating the otp",
            error: error.message
        });
    }
}

//sign up
exports.signUp = async (req, res) => {
    try {
        //data fetch
        const { firstName, lastName, email, password, confirmPassword
            , accountType, otp
        } = req.body;

        // validate data
        if (!firstName || !lastName || !email || !password || !confirmPassword ||
            !accountType || !otp
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            }
            );
        }
        //check email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format.",
            });
        }

        //match password and conferm password
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password and confirmPassword should be same",
            });
        }
        //check for existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "user already registered",
            });
        }


   


        //find most recent otp for the user
        const recentOtp = await Otp.findOne({ email }).sort({ createdAt: -1 }).limit(1); // Sort by createdAt in descending order
        //.limit(1): Ensures that only the first document from the sorted results is returned..
        // find() with .limit(1) returns an array with one document,
        //  whereas .findOne() directly returns the document (not wrapped in an array).

        //validate otp
        if (recentOtp?.length == 0) {
            return res.status(400).json({
                success: false,
                message: "Otp not found",
            });
        } else if (otp != recentOtp.otp) {
            return res.status(400).json({
                success: false,
                message: "invalid Otp",
            });
        }
        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //additionnal detail is related to profile schema so create it first
        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null,
            countrycode:null
        })
        //db entry
        const user = await User.create({
            firstName, 
            lastName, 
            email,
            password: hashedPassword,
            accountType,
            additionalDetails: profileDetails._id,
            approved:false,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}${lastName}`,
        })

        if (accountType === "Instructor") {
  // Send email to admin with instructor info and verification link
  await mailSender(
    process.env.ADMIN_EMAIL, // Admin email from .env
    "Instructor Verification Needed",
    `An instructor account was created by ${firstName} ${lastName} (${email}). Please verify them in the admin dashboard.`
  );
}

        // return response
        return res.status(200).json({
            success: true,
            message: "User is registerd successfully",
            user,
        });
    }
    catch (error) {
         console.log("error in sign up controller ",error);
        return res.status(500).json({
           
            error:error.message,
            success: false,
            message: "User cannot be registerd .Please try again",
        });
    }
}

//login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        //check email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format.",
            });
        }

        if (!email || !password) {
            return res.status(403).json({
                success: false,
                message: "All fields are required, please try again",
            });
        }


        // if user does not exist  
        const user = await User.findOne({ email }).populate("additionalDetails");
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "user not registered. Please create the account",
            });
        }

    //    console.log("user in login ",user);
        //password compare
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            //if matched create the token with payload
            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType
            }
            //generate jwt
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "50h",
            });
            //insert the token in user
            user.token = token;
            user.password = undefined;

            //create the token and send in the cookie or 
            // header
            //    res.header('Authorization', `Bearer ${token}`).send({ token }); 
            //send response
            const options = {
                httpOnly: true, // Prevents client-side scripts from accessing the cookie
                secure: process.env.NODE_ENV === 'production', // Sends the cookie only over HTTPS in production
                maxAge: 2 * 24 * 60 * 60 * 1000, // Cookie expiry in milliseconds (2 hour)
            };
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "Logged in successfully"
            });
        }

        else {
            return res.status(401).json({
                success: false,
                message: "Password in incorrect"
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Login failed ,please try again"
        });
    }
}
//change password
exports.PasswordChange = async (req, res) => {
    try {
        //get data from req.body
        //get oldPassword, newPassword, confirmNewPassword
        const { email, oldPassword, newPassword, confirmNewPassword } = req.body;
        //check email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format.",
            });
        }

        if (!newPassword || !oldPassword || !confirmNewPassword) {
            return res.status(403).json({
                success: false,
                message: "All fields are required, please try again",
            });
        }

        //confirm password nad newpassword should be same
        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({
                success: false,
                message: "New passwords do not match.",
            });
        }

        
        //get user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
              success: false,
              message: "User not found.",
            });
          }
          
        //validation pass match and empty
        const isMatch = await bcrypt.compare(oldPassword, user.password)


        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Password in incorrect"
            });
        }
        //hash the password
        const newHashedPassword=await bcrypt.hash(newPassword,10);
        //update the password in database
        const updatedUser = await User.findByIdAndUpdate(user._id,
            {
                password: newHashedPassword,
            },
            { new: true })


            updatedUser.password=undefined;

        //send mail for password updated and return response
         const fullName = `${updatedUser?.firstName } ${updatedUser?.lastName }`.trim();
        const emailResponse=await mailSender(email, "Password successfully changed",  passwordUpdated(updatedUser.email,fullName));

        console.log( "emailsent for password change->",emailResponse);

            return res.status(200).json({
                success: true,
                message: "password changed successfully",
                updatedUser,
            });
            
    }
    catch (error) {
        console.error("Error changing password:", error);

        return res.status(500).json({
            success: false,
            message: " unable to change the password, please try again later"
        });
    }
}
