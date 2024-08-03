import { useEffect } from "react";
import toast from "react-hot-toast";
import {BiRupee} from 'react-icons/bi'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";

import HomeLayout from '../../Layouts/HomeLayout'
import { getRazorpayId, purchaseCourseBundle, verifyUserPayment } from "../../Redux/Slices/RazorpaySlice";

function CheckoutPage() {


    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Get the userData and some paymentInformation to the state.
    const razorpayKey = useSelector((state) => state?.razorpay?.key)
    const subscription_id = useSelector((state) => state?.razorpay?.subscription_id)
    // const isPaymentVerified = useSelector((state) => state?.razorpay?.isPaymentVerified)

    // This is the userData.
    const userData = useSelector((state) => state?.auth?.data)

    const paymentDetails = {
        razorpay_payment_id : "",
        razorpay_subscription_id : "",
        razorpay_signature : ""
    }



    async function handleSubscription(e) {
        e.preventDefault()

        // if(!razorpayKey || !subscription_id){
        if(!razorpayKey){
            toast.error('something went wrong id & key is not find')
            return
        }

        const option = {
            key : razorpayKey,
            subscription_id : subscription_id,
            name : 'Coursify Pvt.Ltd.',
            description : 'Subscription',
            theme : {
                color : '#F37254' 
            },
            prefill : {
                email : userData.email,
                name : userData.fullName
            },
            handler : async function(response) {
                paymentDetails.razorpay_payment_id = response.razorpay_payment_id;
                paymentDetails.razorpay_signature = response.razorpay_signature;
                paymentDetails.razorpay_subscription_id = response.razorpay_subscription_id;

                toast.success('Payment successfully')

                // Verify the payment status inside the db.
               const res = await dispatch(verifyUserPayment(paymentDetails));
                res?.payload?.success ? navigate("/checkout/success") : navigate('/checkout/fail');
            }
        }

        // the open browser url is in the index.html page.
        const paymentObject = new window.Razorpay(option)
        paymentObject.open()
    }
    async function load() {
        await dispatch(getRazorpayId());
        await dispatch(purchaseCourseBundle());
    }


    useEffect(() => {
        load()
    }, [])


    return (
        <HomeLayout>
            <form
             onSubmit={handleSubscription}
             className=" min-h-[90vh] flex flex-col justify-center items-center text-white"
             >

                <div className="w-80 h-[26rem] flex flex-col justify-center shadow-[0_0_10px_black] rounded-lg relative">
                    <h1 className="bg-yellow-500 absolute top-0 w-full text-center py-4 text-2xl font-bold rounded-tl-lg">Subscription Bundle</h1>

                    <div className="px-4 space-y-5 text-center">
                        <p className="text-[17px]">
                            This purchase will allow to access all available courses
                            of our platform for {""}
                            <span className=" text-yellow-500 font-bold">
                                <br />
                                1 Year Duration
                            </span>
                            All the existing and new launched courses will be also available

                        </p>

                        <p className=" flex justify-center items-center gap-1 text-2xl font-bold text-yellow-500">
                            <BiRupee/> <span>499</span> only
                        </p>

                        <div className=" text-gray-200">
                            <p>100% refund on cancellation</p>
                            <p>* Term and conditions applied *</p>
                        </div>

                        <button type="submit" className=" bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 absolute bottom-0 left-0 text-lg font-bold rounded-bl-lg rounded-br-lg w-full py-2">
                            Buy Now
                        </button>



                    </div>
                </div>

             </form>

        </HomeLayout>
    )






}


export default CheckoutPage