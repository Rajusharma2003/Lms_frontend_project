import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
    courseData : []
}


export const getAllCourse = createAsyncThunk("/courses/get" , async () => {

    try {
        const res  = axiosInstance.get("/courses")
    toast.promise( res , {
        loading : "loading course data..",
        success : "Courses loaded successfully",
        error : "Failed to load courses"
    })
    return (await res).data.courses
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
    
})



const courseSlice = createSlice(  {
    name : 'course',
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(getAllCourse.fulfilled , (state ,action) => {

            if(action.payload){
                console.log(action.payload);
                state.courseData = [ ...action.payload]
            }
        })
    }

})


export default courseSlice.reducer