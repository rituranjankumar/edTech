import toast from 'react-hot-toast';
import { studentEndpoints } from '../apis';
import { apiConnector } from '../apiconnector';
import { setPaymentLoading } from '../../slices/courseSlice';
import { resetCart } from '../../slices/cartSlice';
import { useSelector } from 'react-redux';
const { COURSE_PAYMENT_API, COURSE_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API } = studentEndpoints;

const RZPlogoUrl = "https://razorpay.com/assets/razorpay-glyph.svg"
function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            resolve(true);
        }
        script.onerror = () => {
            reject(true);
        }

        document.body.appendChild(script)
    })
}



export async function buyCourse(courses, token, navigate, dispatch, userDetails) {
    const toastId = toast.loading("loading...")
    try {
        if(userDetails.accountType === "Instructor" || userDetails.accountType=== "Admin")
        {
            toast.error(`you are an ${userDetails.accountType}. you cannot buy a course `)
            toast.dismiss(toastId)
            return ;
        }
            
        //load the script https://checkout.razorpay.com/v1/checkout.js
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")

        if (!res) {
            toast.error("RazorPay checkout  failed to load")
            return ;
        }

        //initiate the order 
        const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API, { courses }, {
            Authorization: `Bearer ${token}`
        })
        // const id= process.env.REACT_APP_RAZORPAY_KEY
        // console.log("id is " ,id);
      //  console.log("orderResponse from the order initiation -> ", orderResponse );
        
        if (!orderResponse?.data?.success) {
            toast.error(orderResponse.data.message);
            throw new Error(orderResponse.data.message);
        }
            
        // create options 
        const option = {
            key: process.env.REACT_APP_RAZORPAY_KEY,
            currency: orderResponse?.data?.message.currency,
            amount: `${orderResponse?.data?.message.amount}`,
            order_id: orderResponse.data.message.id,
            name: "EdTech",
            description: "Thank you for purchasing our course",
            image:  "https://cdn.razorpay.com/logo.svg",
            prefill: {
                name: `${userDetails.firstName}`,
                email: userDetails.email,

            },
            handler: function (response) {
                        console.log("response ",response )
                //send successfull mail
                sendVerificationMail(response.razorpay_payment_id, response.razorpay_order_id, orderResponse?.data?.message.amount, token);
                //verify signature

                ///send the signature inthe verify function to verify the signature 
               verifySignature(response.razorpay_order_id, response.razorpay_payment_id, response.razorpay_signature, courses, token, navigate, dispatch);


                 
            }
        }

       // console.log("Razorpay Options:", option);
        const paymentObject = new window.Razorpay(option);
        paymentObject.open();

        paymentObject.on('payment.failed', function (response) {

            toast.error(`Payment Failed: ${response.error.reason}`);
             // alert(response.error.code);
            // alert(response.error.description);
            // alert(response.error.source);
            // alert(response.error.step);
            // alert(response.error.reason);
            // alert(response.error.metadata.order_id);
            // alert(response.error.metadata.payment_id);
        })


    } catch (error) {
         
        toast.error("failed to buy the course");
         

      //  console.log("error in buying the course")
    }

    toast.dismiss(toastId);
}

async function sendVerificationMail(paymentId, orderId, amount, token) {

    const toastId=toast.loading("loading...");
    try {

        const response = await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, { orderId, paymentId, amount },
            {
                Authorization: `Bearer ${token}`
            })
                console.log("payment mail response ",response);
            if(response)
            {
                toast.success("email has been sent to your registered email ID");
            }

    } catch (error) {
          //  console.log("error in sending the payment email ",error.message);
            toast.error("oops mail for payment not send ");
    }

    toast.dismiss(toastId);
}

async function verifySignature(razorpay_order_id, razorpay_payment_id,  razorpay_signature,courses, token,navigate,dispatch) {
       const toastId = toast.loading("Verifying Payment....");
        dispatch(setPaymentLoading(true));
        try{
            const bodyData={
                razorpay_order_id,razorpay_payment_id,  razorpay_signature,courses
            }
            const response  = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
                Authorization:`Bearer ${token}`,
            })
    
            if(!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.success("payment Successful, you are addded to the course");
            navigate("/dashboard/enrolled-courses");
            dispatch(resetCart());
        }   
        catch(error) {
           // console.log("PAYMENT VERIFY ERROR....", error);
            toast.error("Could not verify Payment");
        }
        toast.dismiss(toastId);
        dispatch(setPaymentLoading(false));
}