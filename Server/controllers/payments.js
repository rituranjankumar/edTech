const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const { courseEnrollmentEmail } = require("../mail/templates/courseEnrollmentEmail");
const crypto = require("crypto");
require("dotenv").config();
const { paymentSuccessEmail } = require("../utils/paymentSuccessEmail");
const CourseProgress = require("../models/CourseProgress");
//capture payment and initiate the Razorpay order

// exports.capturePayment = async (req, res) => {

//     //userid and courseid should be known
//     const { course_id } = req.body;
//     const userId = req.user.id;
//     //validation
//     if (!course_id) {
//         return res.status(400).json({
//             success: false,
//             message: "Please provide valid course id"
//         })
//     }
//     //validcourseid and valid course detail
//     let course;
//     try {
//         course = await Course.findById(course_id);
//         if (!course) {
//             return res.status(400).json({
//                 success: false,
//                 message: "could not find the course"
//             })
//         }

//         //user already paid for the same
//         ///convert the userId into object id
//         const uid = new mongoose.Types.ObjectId(userId);
//         if (course.studentsEnrolled.includes(uid)) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Student is already enrolled"
//             })
//         }

//     }
//     catch (error) {
//         console.log(error);
//         return res.status(200).json({
//             success: false,
//             message: error.message
//         })

//     }


//     //create order 
//     const amount = course.price;
//     const currency = "INR";

//     const options = {
//         amount: amount * 100,
//         currency: currency,
//         receipt: Math.random() * Date.now().toString(),
//         note: {
//             courseId: course_id,
//             userId: userId
//         }
//     }

//     try {
//         //create order
//         const paymentResponse =   instance.orders.create(options);
//         console.log("order created -> ",paymentResponse);

//         //return res
//         return res.status(200).json({
//             success: true,
//             message: "Order created successfully",
//             courseName: course.Name,
//             courseDescription: course.courseDescription,
//             thumbnail: course.thumbnail,
//             orderId: paymentResponse.id,
//             currency: paymentResponse.currency,
//             amount: paymentResponse.amount

//         })
//     }
//     catch (error) {
//         console.error("Error creating payment order:", error);
//         return res.status(500).json({
//             success: false,
//             message: error.message,
//         });
//     }

//     //return response
// }


// //verify signature of razorpay and server

// exports.verifySignature = async (req, res) => {
//     //my secret key
//     const webhookSecret = process.env.RAZORPAY_SECRET_SIGNATURE_KEY;

//     //razorpay secret key from api hit in razorpay after successful payment
//     const signature = req.headers["x-razorpay-signature"];

//     if (!signature) {
//         return res.status(400).json({
//             success: false,
//             message: "Signature missing in request headers",
//         });
//     }



//     //steps to encrypt our weebhook =secret key and later compare it to the razorpay secret signature key

//     // **Create HMAC SHA256 Signature**
//     const expectedSignature = crypto
//         .createHmac("sha256", webhookSecret)
//         .update(JSON.stringify(req.body)) // **Raw Body for Signature Verification**
//         .digest("hex");  // Generate the signature in hexadecimal format

//     //match
//     if (expectedSignature === signature) {
//         console.log("Payment is authorized", req.body);

//         const { userId, courseId } = req.body.payload.payment.entity.notes;

//         //perform the operation like course enrollment
//         try {

//             //find the course and enrolll the student in it
//             const enrolledCourse = await Course.findByIdAndUpdate({ _id: courseId },
//                 { $push: { studentsEnrolled: userId } },
//                 { new: true },
//             );

//             if (!enrolledCourse) {
//                 return res.status(500).json({
//                     success: false,
//                     message: "Course not found"
//                 });
//             }
//             console.log("enrolled courses->", enrolledCourse)
//             //find the student and add the course in list of enrolledcourses

//             const enrolledStudent = await User.findByIdAndUpdate({
//                 _id: userId
//             },
//                 { $push: { courses: courseId } },
//                 { new: true }
//             );
//             console.log("enrolled student ->", enrolledStudent);

//             //mails send
//             const emailResponse = await mailSender(enrolledStudent.email,
//                 "Successfull enrollment in new course",
//                 courseEnrollmentEmail(enrolledCourse.Name, enrolledStudent.Name));
//             console.log("email send for course enrollment->", emailResponse);

//             //return response
//             return res.status(200).json({
//                 success: true,
//                 message: "Signature verified and course enrolled successfully",

//             })

//         } catch (error) {
//             console.log("error in verifying signature", error);

//             return res.status(500).json({
//                 success: false,
//                 message: error.message

//             });
//         }
//     }

//     //if signature is not matched 

//     else {
//         return res.status(400).json({
//             success: false,
//             message: "Signature not matched"

//         });
//     }

// }

exports.capturePayment = async (req, res) => {

    const { courses } = req.body;
    const userId = req.user.id;

    if (courses.length === 0) {
        return res.json({ success: false, message: "Please provide Course Id" });
    }

    let totalAmount = 0;

    for (const course_id of courses) {
        let course;
        try {

            course = await Course.findById(course_id);
            if (!course) {
                return res.status(200).json({ success: false, message: "Could not find the course" });
            }

            const uid = new mongoose.Types.ObjectId(userId);
            if (course.studentsEnrolled.includes(uid)) {
                return res.status(200).json({ success: false, message: "Student is already Enrolled" });
            }

            totalAmount += course.price;
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: error.message });
        }
    }
    const currency = "INR";
    const options = {
        amount: totalAmount * 100,
        currency,
        receipt: Math.random(Date.now()).toString(),
    }

    try {
        const paymentResponse = await instance.orders.create(options);
        res.json({
            success: true,
            message: paymentResponse,
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, mesage: "Could not Initiate Order" });
    }

}


//verify the payment
exports.verifyPayment = async (req, res) => {
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.courses;
    const userId = req.user.id;

    if (!razorpay_order_id ||
        !razorpay_payment_id ||
        !razorpay_signature || !courses || !userId) {
        return res.status(200).json({ success: false, message: "Payment Failed" });
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex");

    if (expectedSignature === razorpay_signature) {
        //enroll karwao student ko
        await enrollStudents(courses, userId, res);
        //return res
        return res.status(200).json({ success: true, message: "Payment Verified" });
    }
    return res.status(200).json({ success: "false", message: "Payment Failed" });

}


const enrollStudents = async (courses, userId, res) => {

    if (!courses || !userId) {
        return res.status(400).json({ success: false, message: "Please Provide data for Courses or UserId" });
    }

    for (const courseId of courses) {
        try {

            console.log("course id is => ", courseId)
            //find the course and enroll the student in it
            const enrolledCourse = await Course.findOneAndUpdate(
                { _id: courseId },
                { $push: { studentsEnrolled: userId } },
                { new: true },
            )

            if (!enrolledCourse) {
                return res.status(500).json({ success: false, message: "Course not Found" });
            }
            // if (!courseId) return res.status(400).json({ message: "Course ID missing" });


            console.log("Creating CourseProgress for", {
                courseId: courseId,
                userId: userId
            });
            console.log("course id is => ", courseId); // Your console log

            if (!courseId || !mongoose.Types.ObjectId.isValid(courseId)) {
                return res.status(400).json({ success: false, message: "Invalid courseId" });
            }
            const courseProgress = await CourseProgress.create({
                courseId: courseId,
                userId: userId,
                completedVideos: [],
            });

            //find the student and add the course to their list of enrolledCOurses
            const enrolledStudent = await User.findByIdAndUpdate(userId,
                {
                    $push: {
                        courses: courseId,
                        courseProgress: courseProgress._id,
                    }
                }, { new: true })

            ///bachhe ko mail send kardo
            const emailResponse = await mailSender(
                enrolledStudent.email,
                `Successfully Enrolled into ${enrolledCourse.Name}`,
                courseEnrollmentEmail(enrolledCourse.Name, `${enrolledStudent.firstName}`)
            )
            //console.log("Email Sent Successfully", emailResponse.response);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: error.message });
        }
    }

}

exports.sendPaymentSuccessEmail = async (req, res) => {
    const { orderId, paymentId, amount } = req.body;

    const userId = req.user.id;

    if (!orderId || !paymentId || !amount || !userId) {
        return res.status(400).json({ success: false, message: "Please provide all the fields" });
    }

    try {
        //student ko dhundo
        const enrolledStudent = await User.findById(userId);
        await mailSender(
            enrolledStudent.email,
            `Payment Recieved`,
            paymentSuccessEmail(`${enrolledStudent.firstName}`,
                amount / 100, orderId, paymentId)
        )

        return res.status(200).json({
            success: true,
            message: "successfully send the payment mail"
        })
    }
    catch (error) {


        console.log("error in sending mail", error)
        return res.status(500).json({ success: false, message: "Could not send email", error: error.message })
    }
}

