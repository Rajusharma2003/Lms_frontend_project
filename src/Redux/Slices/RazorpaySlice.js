import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {toast} from 'react-hot-toast'

import  axiosInstance from '../../Helpers/axiosInstance'


const initialState = {
    key : "",
    subscription_id : "",
    isPaymentVerified : false,
    allPayment : {},
    finalMonths : {},
    monthlySalesRecord : []
}


export const getRazorpayId = createAsyncThunk('/razorpay/getId', async () => {

    try {
        const response = await axiosInstance.get('/payments/razorpay-key');
        return response.data

    } catch (error) {
        toast.error('Failed to load Id/Data')
    }
})


export const purchaseCourseBundle = createAsyncThunk('/purchaseCourse', async () => {

    try {
        const response = await axiosInstance.post('/payments/subscribe');
        console.log(response.data);
        return response.data

    } catch (error) {
        // toast.error(error?.response?.data?.message)
        toast.error('this is from purchaseCourseBundle error')
    }
})



export const verifyUserPayment = createAsyncThunk('/payments/verify', async (data) => {

    try {
        const response = await axiosInstance.post('/payments/verify', {
            razorpay_payment_id :data.razorpay_payment_id,
            razorpay_subscription_id :data.razorpay_subscription_id,
            razorpay_signature :data.razorpay_signature
        });
        return response.data

    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})


export const getPaymentRecord = createAsyncThunk('/payments/record', async () => {

    try {
        const response =  await axiosInstance.get('/payments?count=100',);
        return response.data
        // toast.promise( response , {
        //     loading : 'getting the payment records',
        //     success : (data) => {
        //         return data?.data?.message
        //     },
        //     error : 'Failed to get payment records'
        // })
        // return ( await response).data

    } catch (error) {
        toast.error('Operation Failed pls try again')
    }
})



export const cancelCourseBundle = createAsyncThunk('/payments/cancel', async () => {

    try {
        const response =  await axiosInstance.post('/payments/unsubscribe');
        toast.promise( response , {
            loading : 'unsubscribe the bundle',
            success : (data) => {
                return data?.data?.message
            },
            error : 'Failed to unsubscribe'
        })

        // console.log(response , 'from cancelbun');
        return ( await response).data

    } catch (error) {
        toast.error(error?.response?.data?.message)

    }
})




const razorpaySlice = createSlice({
    name : "razorpay",
    initialState ,
    reducers : {},
    extraReducers : (builder) => {
        builder
              .addCase(getRazorpayId.fulfilled , (state , action) => {
                state.key = action?.payload?.key
              })    
              .addCase(purchaseCourseBundle.fulfilled , (state , action) => {
                state.subscription_id = action?.payload?.subscription_id
              })
              .addCase(verifyUserPayment.fulfilled , (state , action) => {
                toast.success(action?.payload?.message)
                state.isPaymentVerified = action?.payload?.success
              })
              .addCase(verifyUserPayment.rejected , (state , action) => {
                toast.success(action?.payload?.message)
                state.isPaymentVerified = action?.payload?.success
              })
              .addCase(getPaymentRecord.fulfilled , (state , action) => {
                // console.log('pa' , action);
                state.allPayment = action?.payload?.allPayments
                state.finalMonths = action?.payload?.finalMonths
                state.monthlySalesRecord = action?.payload?.monthlySalesRecord
              })
              
    }
})



export default razorpaySlice.reducer