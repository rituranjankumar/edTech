const User=require("../models/User");
exports.verifyInstructor = async (req, res) => {
  try {
    const  {instructorId}  = req.body;
 console.log("instructor id after verifucation ",instructorId)
    const user = await User.findById({_id:instructorId});

    if (!user || user.accountType !== "Instructor") {
      return res.status(404).json({ success: false, message: "Instructor not found" });
    }

    user.approved = true;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Instructor verified successfully",
      updatedInstructor: user,
    });
  } catch (err) {
     console.error("Error in verifying instructor:", err);
    res.status(500).json({
      success: false,
      message: "Error verifying instructor",
    });
  }
};

 

// GET all instructors who are not yet approved
exports.getPendingAccount = async (req, res) => {
  try {
    // Only Admins should be able to access this route
    if (req.user.accountType !== "Admin") {
      return res.status(403).json({
        success: false,
        message: "Only admins can access this route",
      });
    }

    const pendingInstructors = await User.find({
      accountType: "Instructor",
      approved: false,
    });

    res.status(200).json({
      success: true,
      data: pendingInstructors,
      message: "Pending instructor accounts fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching pending accounts:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch pending instructor accounts",
    });
  }
};
