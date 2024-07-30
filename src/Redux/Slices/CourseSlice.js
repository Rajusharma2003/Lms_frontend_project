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


export const createNewCourse = createAsyncThunk('/course/create' , async (data) => {

    try {
        
        const formdata = new FormData();
        formdata.append('title', data?.title);
        formdata.append('category', data?.category);
        formdata.append('description', data?.description);
        formdata.append('thumbnail', data?.thumbnail);
        formdata.append('createdBy', data?.createdBy);


        const response = axiosInstance.post('/courses' ,formdata )
        toast.promise(response , {
            loading : "wait creating new course",
            success : "course created successfully",
            error : "failed to create course"
        })

        return (await response).data


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