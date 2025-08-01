const ContactUs = require("../models/ContactUs");
const mailSender = require("../utils/mailSender");


exports.ContactUsController = async (req, res) => {
    try {
        const { firstname, lastname, email, phoneNumber,
            countrycode, submittedAt, message
        } = req.body;
console.log( "printinf the conttact us req body ->",req.body);

        if (!firstname || !lastname || !email || !phoneNumber
            || !countrycode || !message
        ) {
            return res.status(400).json(
                {
                    success:false,
                    message:"Fill all the details ",
                    
                }
            )
        }
 
        // Create document in DB
    const info = await ContactUs.create({
      message: {
        firstname: firstname,
        lastname: lastname,
        email:email,
        phoneNumber:phoneNumber,
        countrycode:countrycode,
        message:message,
        submittedAt: submittedAt || new Date(), // optional if not passed
      },
    });
console.log( "contact us info before saving in db -> ",info);
    if(info)
    {
       await mailSender(
  info.message.email,
  "Customer Support",
  `Dear ${info.message.firstname} ${info.message.lastname},

Thank you for contacting us. We have received your message and will get back to you soon.

Here is a summary of your submission:
Email: ${info.message.email}
Phone: ${info.message.countrycode} ${info.message.phoneNumber}
Message: ${info.message.message}

Regards,
Support Team`
);

    }


    return res.status(200).json({
        success:true,
        message:"feedback has been saved in the database"
    })
    }

    catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Data could not be saved into the db",
                error: error.message,
            }
        )
    }
}
